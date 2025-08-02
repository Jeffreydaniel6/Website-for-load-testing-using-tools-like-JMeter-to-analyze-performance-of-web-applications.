jconst express = require('express');
const app = express();
const PORT = 3000; 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const fileUpload = require('express-fileupload'); // Middleware for file uploads
const { exec } = require('child_process'); // To run JMeter commands
const fs = require('fs'); // To handle file system operations

app.use(fileUpload());

// Endpoint to upload test file
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const testFile = req.files.testFile;
    // Save the uploaded file
    testFile.mv(`./uploads/${testFile.name}`, (err) => {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

// Endpoint to run load test
app.get('/run-load-test', (req, res) => {
    exec('jmeter -n -t ./jmeter/test_plan.jmx -l ./results/test_results.jtl', (error, stdout, stderr) => {
        console.log(stdout); // Log the standard output from JMeter
        console.error(stderr); // Log any errors from JMeter

        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error running load test');
        }

        // Read the results from the JMeter output file
        const resultsFilePath = './results/test_results.jtl'; // Ensure this path is correct
        const results = fs.readFileSync(resultsFilePath, 'utf8');

        // Parse the results (this will depend on the format of the JMeter output)
        const lines = results.split('\n').filter(line => line.trim() !== '');
        const totalRequests = lines.length; // Total number of lines
        const successfulRequests = lines.filter(line => line.includes('success')).length; // Count successful requests
        const failedRequests = totalRequests - successfulRequests; // Calculate failed requests
        const responseTimes = lines.map(line => {
            const match = line.match(/response_time:\s*(\d+)ms/);
            return match ? parseInt(match[1]) : 0; // Extract response time
        }).filter(time => time > 0); // Filter out invalid times

        const averageResponseTime = (responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length).toFixed(2) + "ms"; // Calculate average
        const maxResponseTime = responseTimes.length > 0 ? Math.max(...responseTimes) + "ms" : "0ms"; // Calculate max response time
        const throughput = (totalRequests / (responseTimes.length * 0.001)).toFixed(2) + " requests/sec"; // Calculate throughput

        // Prepare the report data based on the analysis
        const reportData = {
            total_requests: totalRequests,
            successful_requests: successfulRequests,
            failed_requests: failedRequests,
            average_response_time: averageResponseTime,
            max_response_time: maxResponseTime,
            throughput: throughput
        };

        res.json(reportData);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Load test service running on http://localhost:${PORT}`);
});

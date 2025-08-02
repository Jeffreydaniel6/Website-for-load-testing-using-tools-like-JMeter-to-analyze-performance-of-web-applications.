⚙️ Load Testing Web Application using JMeter

This project is a web-based platform designed to perform load testing on web applications using **Apache JMeter**, with a tech stack involving **React**, **Flask**, and **Node.js**. It allows users to upload `.jmx` test plan files, execute tests, and visualize key performance metrics such as **response time**, **error rate**, and **throughput** in real time.

---

🎯 Objective

To build a web application that enables developers and testers to evaluate the performance and scalability of other web applications using customizable load tests powered by **JMeter**.

---

🧠 Problem Statement

Manual load testing using JMeter can be complex and time-consuming. This project simplifies the process by providing a user-friendly interface to configure, run, and analyze load tests, helping teams identify performance bottlenecks and optimize application stability.

---

🔧 Key Features

* Frontend (React):

  * Upload `.jmx` test files
  * Run load tests with a click
  * Display formatted test results

* Backend (Node.js + Flask):

  * Handles file upload and test execution
  * Uses `child_process.exec()` to run JMeter commands
  * Parses `.jtl` output files for performance metrics

* Visualization:

  * Displays response times, success/failure rates, and throughput using formatted output or charts

* Deployment:

  * Containerized using **Docker** for scalable deployment
  * Tested across devices and browsers

---

📋 Project Modules

🔹 Module 1 – Frontend

* HTML form for uploading test files
* JavaScript functions to call backend APIs for uploading and running tests
* Displays test results using `<pre>` tags for clarity

🔹 Module 2 – Backend

* Node.js server with Express for routing
* Handles file uploads and triggers JMeter tests
* Reads `.jtl` files and extracts metrics for response

🔹 Module 3 – Execution & Display

* Full workflow from file upload to result display
* Ensures clear and actionable insights into system performance

---

✅ Conclusion

This Load Testing Web Application offers an effective solution for testing the robustness and scalability of web systems. With a clean UI, real-time analytics, and JMeter integration, the project serves as a valuable tool for performance evaluation in development and QA workflows.



Let me know if you want to include a 100-character short summary, badges, Docker instructions, or screenshots section!

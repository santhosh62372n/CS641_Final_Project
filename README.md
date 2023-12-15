# CS641_Final_Project
 
Recorder App

Overview

Recorder App is a simple web application built with React, Node.js, Express, and MongoDB. It allows users to create, view, and delete records.

Table of Contents
•	Features
•	Getting Started
•	Prerequisites
•	Installation
•	Technologies
•	Usage
•	API Endpoints
•	Contributing

Features
•	Create a new record with a title and content.
•	View the list of records.
•	Delete a record.

Getting Started

Prerequisites
Before you begin, ensure you have the following installed:
•	Node.js
•	npm
•	MongoDB

Installation
1.	Clone the repository:
bashCopy code
git clone https://github.com/your-username/recorder-app.git 
2.	Navigate to the project directory:
bashCopy code
cd recorder-app 
3.	Install dependencies for both the server and client:
bashCopy code
cd server npm install cd ../client npm install

Technologies

React
MongoDB
Express
NPM
ForDeployment:
Vercel
Railway

Usage

1.	Start the MongoDB server:
bashCopy code
# Start MongoDB locally mongod 
2.	Start the server:
bashCopy code
cd server npm start 
3.	Start the client:
bashCopy code
cd ../client npm start 
4.	Open your browser and visit http://localhost:3000 to use the Recorder App.
   
API Endpoints

•	GET /api/records: Get the list of all records.
•	POST /api/records: Create a new record.
•	Request Body: { "title": "Your Title", "content": "Your Content" }
•	DELETE /api/records/:id: Delete a record by ID.

Contributing

If you'd like to contribute, please follow these steps:
1.	Fork the repository.
2.	Create a new branch (git checkout -b feature/your-feature).
3.	Commit your changes (git commit -m 'Add your feature').
4.	Push to the branch (git push origin feature/your-feature).
5.	Open a pull request.


# Fitness Tracker API 

This project is created for testing the Fitness Tracker API. This API allows users to track their fitness activities, including workouts, steps, distances, calories burned, and personal goals.


## Installation

You can start by cloning this project to your local machine. Then follow the steps below to install the necessary dependencies:

1- Navigate to the project directory and run the following command in your terminal or command prompt:
    <npm install>
2- Initialize npm: Run the following command in the terminal to initialize npm and create a "package.json" file:
    <npm init -y>
3- Install Express and Mongoose: Install Express and Mongoose by running the following command in the terminal:
    <npm install express mongoose>
4- Update package.json: Open your "package.json" file and add the following line to specify the module type:
    "type": "module"
5- Run the server: Start your server by running the following command in the terminal:
   <node server.js>
6- Verify server status: Once the server is running, you should see the message "Listening on port http://localhost:3000" in the terminal. 
7- Generate mock data: To generate mock data, install Faker.js by running the following command in the terminal:
    <npm install @faker-js/faker --save-dev> 
8- Run seed script: Generate mock data by running the following command in the terminal:
    <node seedDB.js>
9- Restart the server: After generating mock data, restart the server by running:
    <node server.js>
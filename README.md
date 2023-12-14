# TheFitLab
About TheFitLab

TheFitLab is a comprehensive fitness web application designed to enhance the fitness journey of users through technology. Our platform offers personalized fitness plans, real-time tracking, and a user-friendly interface, making fitness accessible and engaging for everyone.
Key Features

    Personalized Fitness Plans: Tailored workout plans based on user preferences and goals.
    Progress Tracking: Monitor your workout progress .

Getting Started
Prerequisites

To run TheFitLab locally, you need to have the following installed:

    Node.js
    MongoDB
    MongoDB Compass 

Installation

Follow these steps to get TheFitLab running on your local machine:
1. Clone the Repository

git clone https://github.com/JustCris02/TheFitLab.git
cd TheFitLab

2. MongoDB Setup

Ensure MongoDB is installed and running on your local machine. MongoDB Compass can also be installed for an easier database management experience.

    Download and install MongoDB Compass from here.
    Connect Compass to your local MongoDB instance, typically at mongodb://localhost:27017.

3. Backend Setup

Navigate to the backend directory:

cd backend

Install the necessary dependencies:

npm install

4. Starting the Backend Server

Run the following command to start the backend server:

node server.js

The server should be running on http://localhost:5000.
5. Frontend Setup

Open a new terminal window and navigate to the frontend directory from the root of the project:

cd frontend

Install the frontend dependencies:

npm install

6. Starting the Frontend Application

Run the frontend application:

npm run dev

The application should now be running on http://localhost:5173.
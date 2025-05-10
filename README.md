# Profile Page Web App

A full-stack user profile management app built with React, Node.js, and MongoDB.

## Local Setup Instructions

1. **Requirements**:
   - Node.js and npm
   - MongoDB Atlas account
   - (Optional) MongoDB Compass to view data

2. **MongoDB Setup**:
   - Create a cluster in MongoDB Atlas.
   - Create a database named `profile-page`.
   - From your cluster, click "Connect" > "Compass" and copy the connection URI.

3. **Environment Variables**:
   - In the `/server` folder, create a `.env` file and add:

     ```
     MONGODB_URI=<your MongoDB URI>
     JWT_SECRET=<your secret key>
     NODE_ENV=development
     ```

4. **Run the App**:
   - In the `/client` folder:

     ```
     npm install
     npm run dev
     ```

   - In the `/server` folder:

     ```
     npm install
     node index.js
     ```

## Features

- User registration with profile picture upload
- Login/logout with JWT stored in cookies
- View and edit user profile
- MongoDB integration for persistent user data
- Protected routes

## How to Use

- Go to `http://localhost:5173`
- Sign up with full profile details
- Log in with the newly created account
- View or edit your profile on the home page
- Visit MongoDB Atlas to see saved user info
- Click the profile icon in the top-right to log out

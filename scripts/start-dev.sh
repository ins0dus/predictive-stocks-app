#!/bin/bash

# Start the backend server in the background
echo "Starting backend server..."
cd backend
python app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to initialize (5 seconds)..."
sleep 5

# Start the mobile app development server
echo "Starting mobile app development server..."
cd mobile
npm start

# When the mobile app server is terminated, kill the backend server
echo "Shutting down backend server..."
kill $BACKEND_PID 
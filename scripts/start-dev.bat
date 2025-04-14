@echo off
ECHO Starting Budget Stocks App Development Environment

ECHO Starting backend server...
START /B CMD /C "cd backend && python app.py"

ECHO Waiting for backend to initialize (5 seconds)...
TIMEOUT /T 5 /NOBREAK

ECHO Starting mobile app development server...
cd mobile
npm start

ECHO Development servers are now running! 
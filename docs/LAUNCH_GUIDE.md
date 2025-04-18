# Budget Stocks App Launch Guide

This guide will help you launch the Budget Stocks App in both development and production environments.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Production Deployment](#production-deployment)
   - [Backend Deployment](#backend-deployment)
   - [Frontend Deployment](#frontend-deployment)
3. [Monitoring and Maintenance](#monitoring-and-maintenance)
4. [Troubleshooting](#troubleshooting)

## Development Setup

### Prerequisites

- Node.js 14+ and npm 6+
- Python 3.8+ and pip
- Git

### Clone the Repository

```bash
git clone <your-repository-url>
cd budget-stocks-app
```

### One-Click Setup

We provide a one-click setup script to get both the backend and frontend running locally:

#### Windows:
```bash
# Run setup script
node setup.js

# Then start the app with:
start-dev.bat
```

#### macOS/Linux:
```bash
# Run setup script
node setup.js

# Then start the app with:
bash start-dev.sh
```

### Manual Setup

If you prefer to set up manually:

#### Backend Setup:

```bash
# Navigate to backend directory
cd budget_stocks_app/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables (copy example file)
cp .env.example .env

# Run the backend server
python app.py
```

#### Frontend Setup:

```bash
# Navigate to mobile directory
cd budget_stocks_app/mobile

# Install dependencies
npm install

# Start the development server
npm start
```

## Production Deployment

For production deployment, we recommend:
1. Deploying the Flask backend to Heroku or another Python-friendly hosting service
2. Deploying the React Native frontend to Netlify as a web application

### Backend Deployment

#### Deploy to Heroku

```bash
# Navigate to backend directory
cd budget_stocks_app/backend

# Login to Heroku
heroku login

# Create a Heroku app
heroku create budget-stocks-api

# Set environment variables
heroku config:set DEBUG=False
heroku config:set CORS_ORIGIN=https://your-netlify-app.netlify.app

# Deploy to Heroku
git add .
git commit -m "Preparing for Heroku deployment"
git push heroku main
```

#### Alternative Backend Hosting

You can also deploy the backend to:
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform
- PythonAnywhere

### Frontend Deployment

#### Deploy to Netlify

1. **Prepare for Web Deployment**:

```bash
# Navigate to mobile directory
cd budget_stocks_app/mobile

# Install web dependencies
npm install react-native-web react-dom @expo/webpack-config

# Update package.json to include web build script
# (This should already be done in the repository)
```

2. **Update API URL**:

Edit `budget_stocks_app/mobile/config.js` to point to your production backend:

```javascript
const API_URL = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:5000/api'
  : 'https://your-heroku-app.herokuapp.com/api';
```

3. **Deploy to Netlify**:

   a. Using Netlify CLI:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Build the web version
   npm run build:web

   # Deploy to Netlify
   netlify deploy --prod
   ```

   b. Using Netlify Dashboard:
   - Log in to Netlify
   - Click "New site from Git"
   - Connect to your GitHub repository
   - Set build command to: `cd mobile && npm run build:web`
   - Set publish directory to: `mobile/web-build`
   - Click "Deploy site"

4. **Configure Environment Variables in Netlify**:
   - In your Netlify dashboard, go to Site settings > Build & deploy > Environment
   - Add the environment variable `REACT_APP_API_URL` with your backend URL

## Monitoring and Maintenance

### Backend Monitoring

- Use Heroku's built-in logging: `heroku logs --tail`
- Set up New Relic or Sentry for application monitoring
- Configure error alerts via email

### Frontend Monitoring

- Use Netlify's analytics to monitor site traffic and performance
- Set up build notifications for successful/failed deployments
- Implement client-side error tracking using Sentry or LogRocket

## Troubleshooting

### Common Issues

#### Backend Issues

1. **API Not Responding**: 
   - Check if your Heroku dyno is running: `heroku ps`
   - Check logs for errors: `heroku logs --tail`

2. **Database Connectivity Issues**:
   - Verify database credentials are set correctly
   - Check if your database service is running

#### Frontend Issues

1. **Build Failures on Netlify**:
   - Check build logs in Netlify dashboard
   - Ensure all dependencies are properly installed
   - Verify your build commands are correct

2. **API Connection Errors**:
   - Check CORS configuration on your backend
   - Verify API URL is correctly set in your frontend
   - Test API endpoints directly using Postman or curl

3. **Missing Environment Variables**:
   - Ensure all required environment variables are set in Netlify

### Getting Help

If you encounter issues not covered here:
- Check the project documentation
- Search the issue tracker on GitHub
- Join our community Discord for real-time help

---

With this guide, you should be able to successfully launch and maintain your Budget Stocks App in both development and production environments. 
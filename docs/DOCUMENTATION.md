# Budget Stocks App - Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Backend](#backend)
   - [API Endpoints](#api-endpoints)
   - [Machine Learning Models](#machine-learning-models)
   - [Stock Analysis](#stock-analysis)
4. [Mobile App](#mobile-app)
   - [Screens](#screens)
   - [Components](#components)
   - [State Management](#state-management)
5. [Development Environment](#development-environment)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Extending the Application](#extending-the-application)

## Overview

Budget Stocks App is a comprehensive application designed to help investors identify and analyze budget-friendly stocks with growth potential. The app combines traditional financial analysis with advanced machine learning techniques to provide users with data-driven investment recommendations.

Key features include:
- Daily analysis of stocks within a specified price range
- Advanced prediction models including LSTM neural networks and ensemble methods
- Technical indicator calculations (RSI, EMA, MACD)
- Customizable watchlists for tracking favorite stocks
- Detailed stock analysis with predicted returns and confidence levels
- Generated charts visualizing historical prices and predictions
- Mobile-friendly interface with dark mode support

## Architecture

The application follows a client-server architecture:

```
Budget Stocks App
├── Backend (Flask API Server)
│   ├── Machine Learning Models
│   ├── Stock Analysis
│   └── API Endpoints
└── Mobile App (React Native)
    ├── Screens
    ├── Components
    ├── API Services
    └── State Management
```

### Technologies Used:

**Backend:**
- Python 3.8+
- Flask for API server
- Pandas, NumPy for data processing
- yfinance for stock data
- TensorFlow/Keras for LSTM models
- Scikit-learn for traditional ML models
- PyTorch for Transformer models
- Matplotlib for chart generation

**Mobile App:**
- React Native
- Expo framework
- React Navigation
- Async Storage for local data
- Context API for state management

## Backend

The backend server is a Python application built with Flask. It handles data acquisition, processing, machine learning predictions, and serves API endpoints for the mobile app.

### API Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/health` | GET | Health check endpoint | None |
| `/api/stocks/top` | GET | Get top stock picks | `limit` (optional) |
| `/api/stocks/analysis/{ticker}` | GET | Get detailed analysis for a stock | `ticker` (path) |
| `/api/stocks/search` | GET | Search for stocks | `q` (query) |
| `/api/settings` | GET | Get app settings | None |
| `/api/settings` | POST | Update app settings | Settings object |

### Machine Learning Models

The application uses multiple machine learning approaches for stock prediction:

1. **Linear Regression**: Baseline model for simple trend prediction
2. **Random Forest**: Ensemble model for better handling of non-linear relationships
3. **Gradient Boosting**: Advanced ensemble technique with sequential improvement
4. **LSTM (Long Short-Term Memory)**: Neural network designed for sequence prediction
5. **Transformer**: Advanced attention-based model for time series prediction

The ML models are implemented in `ml_models.py` and include:
- Data preprocessing and normalization
- Feature engineering
- Model training and evaluation
- Prediction generation

### Stock Analysis

The stock analysis module (`stock_analysis.py`) performs comprehensive analysis on stocks:

1. **Data Acquisition**: Fetches historical stock data using yfinance
2. **Technical Indicators**: Calculates RSI, EMA, MACD
3. **Prediction**: Uses ML models to predict future prices
4. **Chart Generation**: Creates visual charts of historical prices and predictions
5. **Result Storage**: Saves analysis results to JSON for quick retrieval

## Mobile App

The mobile app is built with React Native and Expo, providing a cross-platform solution for iOS and Android.

### Screens

1. **Home Screen**: Displays top stock picks and market overview
2. **Details Screen**: Shows detailed analysis for a specific stock
3. **Watchlist Screen**: Shows saved stocks for quick access
4. **Settings Screen**: Allows customization of app settings
5. **About Screen**: Provides information about the app

### Components

1. **StockCard**: Displays basic stock information in a card format
2. **PredictionChart**: Visualizes stock predictions
3. **ApiStatusBanner**: Shows API connection status
4. **WatchlistButton**: Toggle button for adding/removing stocks from watchlist
5. **TechnicalIndicator**: Displays technical indicators with explanations

### State Management

The app uses React Context API for state management, implemented in `AppProvider.js`. Key state includes:

1. **User Settings**: Theme preference, notification settings, price range
2. **Watchlist**: List of user's saved stocks
3. **API Connection**: Status of connection to backend
4. **App Theme**: Light/dark mode based on settings and system preference

## Development Environment

The application includes a development environment setup script `start-dev.bat` (Windows) that:

1. Starts the backend server
2. Waits for server initialization
3. Starts the mobile app development server

Environment variables are defined in `.env` file for the backend.

### Prerequisite Installation

The `setup.js` script checks for and guides installation of:
- Python 3.8+
- Node.js 14+
- Required Python packages
- Required Node.js packages

## Deployment

### Backend Deployment

The backend can be deployed to various platforms:

1. **VPS/Dedicated Server**:
   - Recommend using Gunicorn as WSGI server
   - Nginx as reverse proxy
   - Supervisor for process management

2. **Cloud Services**:
   - AWS Elastic Beanstalk
   - Google Cloud Run
   - Heroku

### Mobile App Deployment

The mobile app can be built and published using Expo:

1. **Development Builds**:
   ```
   expo build:android -t apk
   expo build:ios -t simulator
   ```

2. **Production Builds**:
   ```
   expo build:android -t app-bundle
   expo build:ios -t archive
   ```

3. **Web Deployment**:
   ```
   expo build:web
   ```

## Testing

Testing strategies for the application:

1. **Backend Unit Tests**:
   - Test ML model accuracy
   - Test API endpoint responses
   - Test stock analysis calculations

2. **Mobile App Testing**:
   - Component testing
   - Navigation testing
   - API integration testing

3. **End-to-End Testing**:
   - Full user flow testing
   - Performance testing

## Troubleshooting

Common issues and solutions:

### Backend Issues

1. **API Connection Failed**:
   - Check if backend server is running
   - Verify API URL in mobile app configuration
   - Check network connectivity and firewall settings

2. **ML Model Errors**:
   - Ensure all required dependencies are installed
   - Check for data format issues
   - Consider using simpler fallback models

### Mobile App Issues

1. **Blank Screens**:
   - Check console for JavaScript errors
   - Verify component rendering conditions
   - Check API responses for unexpected data

2. **Loading Forever**:
   - Check API connection
   - Verify data loading states and error handling
   - Implement timeouts for API requests

## Extending the Application

Guidelines for extending the app:

### Adding New ML Models

1. Update `ml_models.py` with your new model class
2. Implement training and prediction methods
3. Update `stock_analysis.py` to use the new model
4. Add environment variable to toggle the model

### Adding New Screens

1. Create a new screen component in `screens/`
2. Add the screen to the navigation stack in `App.js`
3. Create routes to navigate to the new screen

### Adding New API Endpoints

1. Add the endpoint in `app.py`
2. Implement the required functionality
3. Update API client in mobile app to use the new endpoint

### Database Integration

The app is prepared for future database integration:
1. Uncomment and configure database settings in `.env`
2. Implement database models and migrations
3. Update API endpoints to use database instead of file storage

### Email Notifications

To enable email notifications:
1. Uncomment and configure email settings in `.env`
2. Implement email sending functionality in the backend
3. Add notification preference settings in the mobile app 
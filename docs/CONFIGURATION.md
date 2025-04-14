# Configuration Guide - Budget Stocks App

This guide explains how to configure both the backend and mobile app components of the Budget Stocks App.

## Backend Configuration

The backend uses a `.env` file for environment variable configuration. Create a `.env` file in the `/backend` directory by copying the `.env.example` file and adjusting the values as needed.

### Server Configuration

```
# Server configuration
PORT=5000
DEBUG=True
LOG_LEVEL=INFO
```

- `PORT`: The port number the Flask server will run on
- `DEBUG`: Set to `True` for development, `False` for production
- `LOG_LEVEL`: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)

### Machine Learning Configuration

```
# Machine learning configuration
USE_ENSEMBLE_MODEL=True
USE_LSTM=False
MAX_STOCKS_TO_ANALYZE=100
PREDICTION_DAYS_AHEAD=5
```

- `USE_ENSEMBLE_MODEL`: Whether to use the ensemble model for predictions
- `USE_LSTM`: Whether to include LSTM neural networks in predictions (more resource-intensive)
- `MAX_STOCKS_TO_ANALYZE`: Maximum number of stocks to analyze for top picks
- `PREDICTION_DAYS_AHEAD`: Number of days ahead to predict

### Stock Price Range Settings

```
# Stock price range settings
MIN_PRICE=2.00
MAX_PRICE=5.00
```

- `MIN_PRICE`: Minimum stock price to consider for analysis
- `MAX_PRICE`: Maximum stock price to consider for analysis

### Scheduled Analysis

```
# Scheduled analysis (24-hour format, UTC)
ANALYSIS_TIME=01:00
```

- `ANALYSIS_TIME`: Time to run the daily scheduled analysis (24-hour format, UTC)

### API Keys

```
# API Keys (replace with your own)
YAHOO_FINANCE_API_KEY=your_api_key_here
# NEWS_API_KEY=your_news_api_key
# FINNHUB_API_KEY=your_finnhub_api_key
```

- Add any API keys needed for data sources

### Security Settings

```
# Security settings
CORS_ORIGIN=http://localhost:19006
```

- `CORS_ORIGIN`: Origins allowed to access the API

### Database Configuration (Future Implementation)

```
# Database connection (when implemented)
# DB_HOST=localhost
# DB_NAME=budget_stocks
# DB_USER=user
# DB_PASSWORD=password
```

- Uncomment and configure when implementing the database

### Email Notifications (Future Implementation)

```
# Email notifications (when implemented)
# SMTP_SERVER=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=user@example.com
# SMTP_PASSWORD=your_password
# NOTIFICATION_EMAIL=alerts@example.com
```

- Uncomment and configure when implementing email notifications

## Mobile App Configuration

The mobile app is configured through the `config.js` file in the `/mobile` directory.

### API Configuration

```javascript
// API configuration
const API = {
  BASE_URL: __DEV__ 
    ? 'http://localhost:5000/api'
    : 'https://api.budgetstocks.com/api',
  TIMEOUT: 15000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
};
```

- `BASE_URL`: The base URL for API requests (different for development and production)
- `TIMEOUT`: Request timeout in milliseconds
- `HEADERS`: Default headers for API requests

### App Settings

```javascript
// App settings
const APP = {
  APP_NAME: 'Budget Stocks',
  APP_VERSION: '2.0.0',
  API_TIMEOUT: 15000,
};
```

- `APP_NAME`: Display name of the application
- `APP_VERSION`: Current version of the application
- `API_TIMEOUT`: Timeout for API requests in milliseconds

### Feature Flags

```javascript
// Feature flags
const FEATURES = {
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_BIOMETRICS: false,
  ENABLE_WATCHLIST: true,
};
```

- Toggle features on or off for testing or gradual rollout

### Caching Settings

```javascript
// Caching settings (TTL in milliseconds)
const CACHE = {
  STOCKS_TTL: 15 * 60 * 1000, // 15 minutes
  TOP_PICKS_TTL: 60 * 60 * 1000, // 1 hour
  NEWS_TTL: 30 * 60 * 1000, // 30 minutes
};
```

- Time-to-live settings for cached data

### UI Settings

```javascript
// UI settings
const UI = {
  // Theme colors
  COLORS: {
    PRIMARY: '#1e88e5',
    SECONDARY: '#26a69a',
    ACCENT: '#ff9800',
    BACKGROUND: '#f5f5f5',
    TEXT: '#212121',
    TEXT_LIGHT: '#757575',
  },
  
  // Status colors
  STATUS: {
    ERROR: '#f44336',
    WARNING: '#ff9800',
    SUCCESS: '#4caf50',
  },
  
  // Animation duration in ms
  ANIMATION_DURATION: 300,
  
  // Limits
  WATCHLIST_MAX_STOCKS: 20,
};
```

- Colors, animation settings, and UI limits

### Prediction Settings

```javascript
// Prediction settings
const PREDICTION = {
  DEFAULT_DAYS_AHEAD: 5,
  RISK_LEVELS: {
    LOW: { min: 1, max: 3 },
    MEDIUM: { min: 4, max: 7 },
    HIGH: { min: 8, max: 10 },
  },
};
```

- Default prediction settings and risk level definitions

### Error Messages

```javascript
// Error messages
const ERRORS = {
  API_UNAVAILABLE: 'The prediction server is currently unavailable. Please try again later.',
  CONNECTION_ERROR: 'Connection error. Please check your internet connection and try again.',
  NO_STOCKS_FOUND: 'No stocks found matching your criteria.',
  LOAD_ERROR: 'Failed to load data. Please try refreshing.',
};
```

- Standardized error messages

## Customizing Configuration

### Backend

1. Copy the `.env.example` file to `.env` in the `/backend` directory:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Edit the `.env` file with your preferred text editor:
   ```bash
   nano backend/.env
   ```

3. Save the changes and restart the backend server:
   ```bash
   python backend/app.py
   ```

### Mobile App

1. Open the `config.js` file in the `/mobile` directory:
   ```bash
   nano mobile/config.js
   ```

2. Modify the configurations as needed
3. Save the changes and restart the mobile app development server:
   ```bash
   cd mobile && npm start
   ```

## Configuration Best Practices

1. **Never commit sensitive values** like API keys to version control
2. **Use different configurations** for development and production environments
3. **Document any custom configurations** you add for future reference
4. **Keep default values reasonable** so the app works out-of-the-box
5. **Validate configuration values** at startup to catch errors early

## Troubleshooting

### Common Configuration Issues

#### Backend

- **API Connection Errors**: Ensure `PORT` is correctly set and matches the port in mobile app configuration
- **Model Errors**: If experiencing performance issues, try setting `USE_LSTM=False`
- **API Key Errors**: Ensure all required API keys are valid and properly formatted

#### Mobile App

- **API Connection Errors**: Verify that `BASE_URL` matches your backend configuration
- **Display Issues**: Adjust the color scheme in `UI.COLORS` to match your preferences
- **Performance Issues**: Increase cache TTLs if experiencing slow performance

If you encounter persistent issues, check the application logs and consult the troubleshooting section in the [Backend Documentation](./backend/README.md) or [Mobile App Documentation](./mobile/README.md). 
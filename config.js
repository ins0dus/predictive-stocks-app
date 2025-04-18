/**
 * Budget Stocks App - Configuration
 * 
 * This file contains configuration settings for the Budget Stocks App.
 * Edit this file to customize the application behavior.
 */

// Check if we have runtime config (deployed environment)
const hasRuntimeConfig = typeof window !== 'undefined' && window.RUNTIME_CONFIG;

// API Configuration
const isDevelopment = process.env.NODE_ENV !== 'production';

// Set the API URL based on environment with multiple fallbacks
const API_URL = 
  // 1. Check for runtime config (set during Netlify build)
  (hasRuntimeConfig && window.RUNTIME_CONFIG.API_URL) ||
  // 2. Check for React environment variable  
  process.env.REACT_APP_API_URL || 
  // 3. Use development vs production default
  (isDevelopment 
    ? 'http://localhost:5000/api'  // Development
    : 'https://budget-stocks-api.herokuapp.com/api');  // Default production

// App configuration
const Config = {
  // API settings
  API_URL,
  API_TIMEOUT: 15000, // 15 seconds
  
  // App settings
  APP_NAME: 'Budget Stocks',
  APP_VERSION: '1.0.0',
  
  // Feature flags
  FEATURES: {
    ENABLE_NOTIFICATIONS: true,
    ENABLE_DARK_MODE: true,
    ENABLE_OFFLINE_MODE: true,
    ENABLE_BIOMETRICS: false,
    ENABLE_WATCHLIST: true,
  },
  
  // Caching settings
  CACHE: {
    STOCKS_TTL: 24 * 60 * 60 * 1000, // 24 hours
    TOP_PICKS_TTL: 6 * 60 * 60 * 1000, // 6 hours
    NEWS_TTL: 12 * 60 * 60 * 1000, // 12 hours
  },
  
  // UI settings
  UI: {
    THEME_COLOR: '#2E7D32',
    SECONDARY_COLOR: '#1976D2',
    ERROR_COLOR: '#D32F2F',
    WARNING_COLOR: '#FFA000',
    SUCCESS_COLOR: '#388E3C',
    DEFAULT_ANIMATION_DURATION: 300,
    MAX_STOCKS_IN_WATCHLIST: 30,
    CHART_DEFAULT_DAYS: 30,
  },
  
  // Default prediction settings
  PREDICTION: {
    DEFAULT_DAYS_AHEAD: 5,
    SHOW_CONFIDENCE_INTERVAL: true,
    DEFAULT_RISK_TOLERANCE: 'moderate', // 'low', 'moderate', 'high'
  },
  
  // Error messages
  ERRORS: {
    API_UNAVAILABLE: 'The server is currently unavailable. Please try again later.',
    CONNECTION_ERROR: 'Connection error. Please check your internet connection.',
    TIMEOUT_ERROR: 'Request timed out. Please try again.',
    STOCK_NOT_FOUND: 'Stock information not found. Please try a different ticker.',
  }
};

// Debug log in development
if (isDevelopment) {
  console.log('Config loaded with API_URL:', Config.API_URL);
}

// Export the configuration
export default Config; 
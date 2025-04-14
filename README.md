# Budget Stocks App (Enhanced Version)

A complete solution for finding and analyzing budget-friendly stocks in the $2-$5 range with high growth potential. This project consists of a Python/Flask backend for predictions and analysis, and a React Native mobile app for user interaction.

## 🚀 Quick Start

### One-Click Setup

We've made it simple to get started with a single setup script that handles both the backend and frontend:

#### Windows:
```bash
# Run Node.js setup script
node setup.js

# Then start the app with:
start-dev.bat
```

#### macOS/Linux:
```bash
# Run Node.js setup script
node setup.js

# Then start the app with:
bash start-dev.sh
```

The setup script will:
1. Check for prerequisites (Python, Node.js)
2. Set up the Python virtual environment
3. Install all required dependencies
4. Create necessary placeholder files
5. Get everything ready to run

For manual setup, refer to the [detailed setup guide](./SETUP.md).

## Project Structure

- `/backend` - Flask API that performs stock analysis and delivers predictions
- `/mobile` - React Native mobile app for displaying predictions and tracking stocks
- `/backend/data_sources` - Enhanced data integration from multiple sources
- `/backend/models` - Advanced prediction models including ensemble methods
- `/mobile/components` - UI components for visualizing predictions and risk metrics

## Enhanced Features

This version includes significant upgrades to both prediction accuracy and user experience:

- **Multi-Source Data Integration**: Combines stock data, news, sentiment, sector performance, and economic indicators
- **Advanced Prediction Models**: Ensemble learning with Random Forest, Gradient Boosting, and optional LSTM neural networks
- **Risk Analysis System**: Sophisticated risk assessment with multiple factors and visual indicators
- **Improved Mobile Experience**: Interactive charts, sentiment analysis display, and comprehensive metrics
- **Real-time Notifications**: Alerts for significant stock movements and prediction changes
- **Stock Advisor**: Quick buy/sell recommendations with holding period guidance for any ticker

[View Complete Enhanced Features Documentation](./ENHANCED_FEATURES.md)

## Core Features

- Machine learning-based stock predictions using ensemble methods
- Technical indicator analysis including RSI, MACD, and EMA
- Daily top 5 stock picks in the budget-friendly price range
- Detailed analysis with prediction charts and expected returns
- Mobile app with watchlist functionality and customizable settings
- **NEW**: Sentiment analysis from news and social media
- **NEW**: Risk assessment metrics with visual indicators
- **NEW**: Interactive prediction visualization with confidence metrics
- **NEW**: Stock Advisor tab for instant buy/sell decisions on any ticker

## Documentation

Each part of the project includes its own detailed documentation:

- [Backend Documentation](./backend/README.md)
- [Mobile App Documentation](./mobile/README.md)
- [Complete Setup Guide](./SETUP.md)
- [Enhanced Features](./ENHANCED_FEATURES.md)
- [API Documentation](./backend/API.md)
- [Database Schema](./backend/database_schema.sql) (for future implementation)

## Machine Learning Approaches

The enhanced stock prediction system uses several advanced machine learning techniques:

1. **Ensemble Methods**: Combines RandomForest and Gradient Boosting models for more stable predictions
2. **LSTM Neural Networks**: Deep learning for time series prediction
3. **Technical Indicators**: Incorporates RSI, MACD, Bollinger Bands, and moving averages as features
4. **Sentiment Analysis**: Natural language processing on news articles to gauge market sentiment
5. **Feature Engineering**: Creates windows of historical data with enhanced features
6. **Economic Indicators**: Incorporates macroeconomic data for more comprehensive analysis
7. **Natural Language Analysis**: Generates human-readable explanations of predictions

## Running the Application

Once setup is complete, you can run the application using the provided scripts:

```bash
# Windows
start-dev.bat

# macOS/Linux
bash start-dev.sh
```

This will start both the backend server and the mobile app development server.

## Configuration

The app is highly configurable through environment variables and config files:

- Backend: `.env` file in the `/backend` directory
- Mobile: `config.js` in the `/mobile` directory

See the [Configuration Guide](./CONFIGURATION.md) for complete details.

## Deployment

### Backend

The backend can be deployed as a Docker container:

```bash
cd backend
docker build -t budget-stocks-api .
docker run -p 5000:5000 budget-stocks-api
```

### Mobile App

The mobile app can be built for iOS and Android using Expo:

```bash
cd mobile
expo build:android  # For Android
expo build:ios      # For iOS
```

## Testing

- Backend API tests: `cd backend && python test_api.py`
- Mobile app tests: `cd mobile && npm test`

## Future Roadmap

- Real-time data streaming for live updates
- Continuous model training with new data
- User personalization with custom risk tolerances
- Social features for community insights
- Portfolio management with virtual budget stock portfolios
- Desktop application support
- Enhanced visualization options

## Disclaimer

Stock predictions involve inherent risk. This application is for educational purposes only and should not be considered financial advice. Always do your own research before investing. The enhanced prediction models, while more sophisticated, still cannot predict market movements with certainty. 
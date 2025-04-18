# Predictive Stocks App

A React-based stock dashboard application with real-time data and predictive analytics, enhanced with budget-friendly stock analysis features.

## 🚀 Quick Start

### Prerequisites
- Node.js
- npm or yarn
- Docker (optional, for containerization)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ins0dus/predictive-stocks-app.git
cd predictive-stocks-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your API keys:
```env
ALPHA_VANTAGE_API_KEY=your_key_here
YAHOO_FINANCE_API_KEY=your_key_here
DISCORD_BOT_TOKEN=your_token_here
```

4. Start the development server:
```bash
npm start
```

## Features

- **Real-time Stock Data**: Live updates from multiple data sources including Alpha Vantage and Yahoo Finance
- **Predictive Analytics**: Machine learning-based stock predictions and trend analysis
- **Interactive Dashboard**: Modern UI with real-time charts and analytics
- **Budget Stock Analysis**: Focus on stocks in the $2-$5 range with high growth potential
- **Discord Integration**: Real-time alerts and commands through Discord bot
- **Multi-Source Data**: Combines stock data, news, sentiment, and economic indicators
- **Risk Analysis**: Sophisticated risk assessment with visual indicators
- **Stock Advisor**: Quick buy/sell recommendations with holding period guidance

## Project Structure

```
/src
  /components      # React components
  /services        # API and data services
  /types          # TypeScript type definitions
  /utils          # Utility functions
  /hooks          # Custom React hooks
  /context        # React context providers
  /styles         # CSS and styling files
```

## Documentation

- [API Documentation](./docs/API.md)
- [Component Documentation](./docs/Components.md)
- [Discord Bot Setup](./docs/DiscordBot.md)

## Docker Support

Build and run the application using Docker:

```bash
docker build -t predictive-stocks-app .
docker run -p 3000:3000 predictive-stocks-app
```

## Testing

Run the test suite:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This application is for educational purposes only and should not be considered financial advice. Always do your own research before making investment decisions. The prediction models, while sophisticated, cannot predict market movements with certainty.

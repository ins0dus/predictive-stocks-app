import { StockData, SearchResult, StockQuote } from '../types/stock';
import { getYahooQuote, searchYahooStocks, YahooQuote, convertYahooToStockData } from './yahooFinanceService';

export const searchStocks = async (query: string): Promise<SearchResult[]> => {
  try {
    return await searchYahooStocks(query);
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const yahooQuote = await getYahooQuote(symbol);
    return {
      symbol: yahooQuote.symbol,
      price: yahooQuote.regularMarketPrice,
      change: yahooQuote.regularMarketChange,
      changePercent: yahooQuote.regularMarketChangePercent,
      dailyHigh: yahooQuote.regularMarketDayHigh,
      dailyLow: yahooQuote.regularMarketDayLow,
      volume: yahooQuote.regularMarketVolume,
      lastUpdated: new Date(yahooQuote.regularMarketTime * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getStockDetails = async (symbol: string): Promise<StockData> => {
  try {
    const yahooQuote = await getYahooQuote(symbol);
    return convertYahooToStockData(yahooQuote);
  } catch (error) {
    console.error('Error fetching stock details:', error);
    throw error;
  }
};

export const searchStocksWithFallback = async (query: string) => {
  try {
    // First try Alpha Vantage
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();

    if (data.bestMatches && data.bestMatches.length > 0) {
      return data.bestMatches.map((match: any) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        exchange: match['8. region']
      }));
    }

    // Fallback to Yahoo Finance
    return await searchStocks(query);
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

export const getStockQuoteWithFallback = async (symbol: string): Promise<StockData> => {
  try {
    // First try Alpha Vantage
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();

    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        name: quote['01. symbol'], // Alpha Vantage doesn't provide name in quote
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        dailyHigh: parseFloat(quote['03. high']),
        dailyLow: parseFloat(quote['04. low']),
        volume: parseInt(quote['06. volume']),
        marketCap: 0, // Alpha Vantage doesn't provide market cap
        peRatio: 0, // Alpha Vantage doesn't provide P/E ratio
        dividendYield: 0, // Alpha Vantage doesn't provide dividend yield
        lastUpdated: Math.floor(Date.now() / 1000).toString()
      };
    }

    // Fallback to Yahoo Finance
    const yahooQuote = await getStockQuote(symbol);
    return convertYahooToStockData(yahooQuote);
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
}; 
import { StockData, SearchResult, StockQuote } from '../types/stock';

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const searchStocks = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data.bestMatches) {
      return data.bestMatches.map((match: any) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        exchange: match['4. region']
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data['Global Quote']) {
      const quote = data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        dailyHigh: parseFloat(quote['03. high']),
        dailyLow: parseFloat(quote['04. low']),
        volume: parseInt(quote['06. volume']),
        lastUpdated: quote['07. latest trading day']
      };
    }
    throw new Error('No quote data available');
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getStockDetails = async (symbol: string): Promise<StockData> => {
  try {
    const response = await fetch(
      `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    
    if (data.Symbol) {
      return {
        symbol: data.Symbol,
        name: data.Name,
        price: parseFloat(data.Price),
        change: parseFloat(data.Change),
        changePercent: parseFloat(data.ChangePercent),
        dailyHigh: parseFloat(data.DayHigh),
        dailyLow: parseFloat(data.DayLow),
        volume: parseInt(data.Volume),
        marketCap: parseFloat(data.MarketCapitalization),
        peRatio: parseFloat(data.PERatio),
        dividendYield: parseFloat(data.DividendYield),
        lastUpdated: new Date().toISOString()
      };
    }
    throw new Error('No stock details available');
  } catch (error) {
    console.error('Error fetching stock details:', error);
    throw error;
  }
}; 
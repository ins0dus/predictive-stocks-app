import { searchStocks as yahooSearchStocks, getStockQuote as yahooGetStockQuote, YahooQuote } from './yahooFinanceService';
import { StockData, SearchResult } from '../types/stock';

const convertYahooToStockData = (quote: YahooQuote): StockData => {
  return {
    symbol: quote.symbol,
    name: quote.symbol, // We'll update this when we have the name
    price: quote.regularMarketPrice,
    change: quote.regularMarketChange,
    changePercent: quote.regularMarketChangePercent,
    dailyHigh: quote.regularMarketDayHigh,
    dailyLow: quote.regularMarketDayLow,
    volume: quote.regularMarketVolume,
    marketCap: quote.marketCap,
    peRatio: quote.trailingPE,
    dividendYield: quote.dividendYield,
    lastUpdated: quote.regularMarketTime.toISOString()
  };
};

export const searchStocks = async (query: string): Promise<SearchResult[]> => {
  try {
    const results = await yahooSearchStocks(query);
    return results.map(result => ({
      symbol: result.symbol,
      name: result.name,
      exchange: result.exchange
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
};

export const getStockQuote = async (symbol: string): Promise<StockData> => {
  try {
    const quote = await yahooGetStockQuote(symbol);
    return convertYahooToStockData(quote);
  } catch (error) {
    console.error('Error getting stock quote:', error);
    throw error;
  }
};

export const getStockDetails = async (symbol: string): Promise<StockData> => {
  try {
    const quote = await yahooGetStockQuote(symbol);
    return convertYahooToStockData(quote);
  } catch (error) {
    console.error('Error getting stock details:', error);
    throw error;
  }
};

export const searchStocksWithFallback = async (query: string): Promise<SearchResult[]> => {
  try {
    return await yahooSearchStocks(query);
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
}; 
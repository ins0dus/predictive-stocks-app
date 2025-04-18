import { StockData, SearchResult, StockQuote } from '../types/stock';
import { getYahooQuote, searchYahooStocks, YahooQuote } from './yahooFinanceService';

const convertYahooToStockData = (yahooQuote: YahooQuote): StockData => ({
  symbol: yahooQuote.symbol,
  price: yahooQuote.regularMarketPrice,
  change: yahooQuote.regularMarketChange,
  changePercent: yahooQuote.regularMarketChangePercent,
  dailyHigh: yahooQuote.regularMarketDayHigh,
  dailyLow: yahooQuote.regularMarketDayLow,
  volume: yahooQuote.regularMarketVolume,
  marketCap: yahooQuote.marketCap,
  peRatio: yahooQuote.trailingPE,
  dividendYield: yahooQuote.dividendYield,
  lastUpdated: yahooQuote.regularMarketTime.toISOString()
});

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
      lastUpdated: yahooQuote.regularMarketTime.toISOString()
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
import { StockData } from '../types/stock';
import yahooFinance from 'yahoo-finance2';

export interface YahooQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  marketCap?: number;
  trailingPE?: number;
  regularMarketTime: Date;
}

interface YahooSearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

interface YahooSearchResponse {
  quotes: Array<{
    symbol: string;
    longname?: string;
    shortname?: string;
    exchange?: string;
  }>;
}

export const searchStocks = async (query: string): Promise<YahooSearchResult[]> => {
  try {
    const results = await yahooFinance.search(query) as YahooSearchResponse;
    return results.quotes.map(quote => ({
      symbol: quote.symbol,
      name: quote.longname || quote.shortname || quote.symbol,
      exchange: quote.exchange || 'Unknown'
    }));
  } catch (error) {
    console.error('Error searching stocks with Yahoo Finance:', error);
    return [];
  }
};

export const getStockQuote = async (symbol: string): Promise<YahooQuote> => {
  try {
    const quote = await yahooFinance.quote(symbol);
    return {
      symbol: quote.symbol,
      regularMarketPrice: quote.regularMarketPrice || 0,
      regularMarketChange: quote.regularMarketChange || 0,
      regularMarketChangePercent: quote.regularMarketChangePercent || 0,
      regularMarketDayHigh: quote.regularMarketDayHigh || 0,
      regularMarketDayLow: quote.regularMarketDayLow || 0,
      regularMarketVolume: quote.regularMarketVolume || 0,
      marketCap: quote.marketCap,
      trailingPE: quote.trailingPE,
      regularMarketTime: quote.regularMarketTime || new Date()
    };
  } catch (error) {
    console.error('Error fetching Yahoo Finance quote:', error);
    throw error;
  }
};

export const convertYahooToStockData = (quote: YahooQuote): StockData => {
  try {
    return {
      symbol: quote.symbol,
      name: quote.symbol, // Yahoo Finance doesn't provide name in quote
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      dailyHigh: quote.regularMarketDayHigh,
      dailyLow: quote.regularMarketDayLow,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap,
      peRatio: quote.trailingPE,
      lastUpdated: quote.regularMarketTime.toISOString()
    };
  } catch (error) {
    console.error('Error converting Yahoo Finance quote:', error);
    throw error;
  }
}; 
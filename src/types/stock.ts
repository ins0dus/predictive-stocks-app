export interface StockData {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  dailyHigh: number;
  dailyLow: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  lastUpdated: string;
}

export interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
}

export interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  dailyHigh: number;
  dailyLow: number;
  volume: number;
  lastUpdated: string;
} 
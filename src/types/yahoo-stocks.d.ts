declare module 'yahoo-stocks' {
  interface StockData {
    symbol: string;
    name: string;
  }

  interface StockQuote {
    symbol: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    open: number;
    previousClose: number;
    volume: number;
  }

  function searchStocks(query: string): Promise<StockData[]>;
  function getStock(symbol: string): Promise<StockQuote>;

  export { searchStocks, getStock };
} 
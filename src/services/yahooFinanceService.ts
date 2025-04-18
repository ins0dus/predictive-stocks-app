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
  dividendYield?: number;
  regularMarketTime: Date;
}

export const getYahooQuote = async (symbol: string): Promise<YahooQuote> => {
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
      dividendYield: quote.dividendYield,
      regularMarketTime: new Date(quote.regularMarketTime * 1000)
    };
  } catch (error) {
    console.error('Error fetching Yahoo Finance quote:', error);
    throw error;
  }
};

export const searchYahooStocks = async (query: string) => {
  try {
    const results = await yahooFinance.search(query);
    return results.quotes.map(quote => ({
      symbol: quote.symbol,
      name: quote.longname || quote.shortname || '',
      exchange: quote.exchange || ''
    }));
  } catch (error) {
    console.error('Error searching Yahoo Finance:', error);
    return [];
  }
}; 
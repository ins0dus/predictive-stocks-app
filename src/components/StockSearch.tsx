import React, { useState, useEffect } from 'react';
import { searchStocks, getStockQuote } from '../services/stockService';
import { SearchResult, StockData } from '../types/stock';

interface StockSearchProps {
  onStockSelect: (stock: StockData) => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ onStockSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        setError('');
        try {
          const searchResults = await searchStocks(query);
          setResults(searchResults);
        } catch (err) {
          setError('Failed to search stocks');
          setResults([]);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSelectStock = async (result: SearchResult) => {
    try {
      const stockData = await getStockQuote(result.symbol);
      onStockSelect(stockData);
      setQuery('');
      setResults([]);
    } catch (err) {
      setError('Failed to fetch stock data');
    }
  };

  return (
    <div className="stock-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a stock symbol..."
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <div className="search-results">
          {results.map(result => (
            <div
              key={result.symbol}
              className="search-result-item"
              onClick={() => handleSelectStock(result)}
            >
              <strong>{result.symbol}</strong> - {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSearch; 
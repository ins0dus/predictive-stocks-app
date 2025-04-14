import React, { useState } from 'react';
import './App.css';
import StockSearch from './components/StockSearch';
import StockCard from './components/StockCard';
import { StockData } from './types/stock';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);

  const handleAddStock = (stock: StockData) => {
    if (!stocks.find(s => s.symbol === stock.symbol)) {
      setStocks(prevStocks => [...prevStocks, stock]);
    }
  };

  const handleRemoveStock = (symbol: string) => {
    setStocks(prevStocks => prevStocks.filter(stock => stock.symbol !== symbol));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Market Dashboard</h1>
        <StockSearch onStockSelect={handleAddStock} />
      </header>
      <main className="App-main">
        <div className="stocks-container">
          {stocks.length === 0 ? (
            <p className="empty-message">Search and add stocks to track them here</p>
          ) : (
            <div className="stocks-grid">
              {stocks.map(stock => (
                <StockCard
                  key={stock.symbol}
                  stock={stock}
                  onRemove={() => handleRemoveStock(stock.symbol)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="App-footer">
        <p>Data provided by Alpha Vantage</p>
      </footer>
    </div>
  );
};

export default App; 
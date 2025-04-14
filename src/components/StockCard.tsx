import React from 'react';
import { StockData } from '../types/stock';

interface StockCardProps {
  stock: StockData;
  onRemove: () => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onRemove }) => {
  const { symbol, name, price, change, changePercent } = stock;
  const isPositive = change >= 0;

  return (
    <div className="stock-card">
      <div className="stock-card-header">
        <h2 className="stock-symbol">{symbol}</h2>
        <button className="remove-button" onClick={onRemove}>×</button>
      </div>
      {name && <p className="stock-name">{name}</p>}
      <p className="stock-price">${price.toFixed(2)}</p>
      <p className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
      </p>
      <div className="stock-details">
        <p>High: ${stock.dailyHigh.toFixed(2)}</p>
        <p>Low: ${stock.dailyLow.toFixed(2)}</p>
        <p>Volume: {stock.volume.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StockCard; 
import { useEffect, useState } from 'react';
import { market_assets } from '../data/stocks';
import { fetch_realtime_prices, RealTimePrice } from '../utils/api';
import { motion } from 'motion/react';

export function TopStocksTicker() {
  const [prices, setPrices] = useState<RealTimePrice[]>([]);

  useEffect(() => {
    // Select top 5 symbols
    const topSymbols = market_assets.slice(0, 5).map(a => a.ticker_symbol);
    
    const loadPrices = async () => {
      const data = await fetch_realtime_prices(topSymbols);
      if (data.length > 0) setPrices(data);
    };
    
    loadPrices();
    
    // Refresh every 10 minutes
    const interval = setInterval(loadPrices, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (prices.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.5 }}
      className="mt-6 flex flex-wrap gap-4 md:gap-6 items-center justify-center md:justify-start"
    >
      <span className="text-[10px] md:text-xs font-bold text-[#ccff00]/60 uppercase tracking-widest mr-2 border border-[#ccff00]/20 px-2 py-1 rounded">Live Top 5</span>
      {prices.map(p => (
        <div key={p.symbol} className="flex items-center gap-2 text-xs md:text-sm font-mono font-bold">
          <span className="text-white">{p.symbol}</span>
          <span className="text-zinc-400">${p.price.toFixed(2)}</span>
          <span className={p.change_percentage >= 0 ? "text-[#ccff00]" : "text-red-500"}>
            {p.change_percentage >= 0 ? "+" : ""}{p.change_percentage}%
          </span>
        </div>
      ))}
    </motion.div>
  );
}

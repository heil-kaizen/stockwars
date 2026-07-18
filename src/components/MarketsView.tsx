import { motion } from 'motion/react';
import { market_assets } from '../data/stocks';
import { StockCard } from './StockCard';
import { useEffect, useState } from 'react';
import { fetch_realtime_prices } from '../utils/api';
import { TokenizedStock } from '../types';

export function MarketsView() {
  const [assets, setAssets] = useState<TokenizedStock[]>(market_assets);

  useEffect(() => {
    const loadPrices = async () => {
      const symbols = market_assets.map(a => a.ticker_symbol);
      const liveData = await fetch_realtime_prices(symbols);
      
      if (liveData.length > 0) {
        setAssets(prev => prev.map(asset => {
          const live = liveData.find(d => d.symbol === asset.ticker_symbol);
          if (live) {
            return {
              ...asset,
              current_price: live.price,
              change_percentage: live.change_percentage
            };
          }
          return asset;
        }));
      }
    };
    
    // Initial fetch
    loadPrices();
    
    // Refresh every 10 minutes
    const interval = setInterval(loadPrices, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Recalculate top pick based on latest data
  const topPickAsset = [...assets].sort((a, b) => b.change_percentage - a.change_percentage)[0];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-12"
      >
        <div className="inline-block px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded text-[#ccff00] text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">
          Official Tournament
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4">
          Global Top Stocks Tournament
        </h2>
        <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
          Welcome to the ultimate trading battleground. Live tokenized representations of the largest technology and industrial leaders. 
          Click copy on any asset to instantly grab the contract address for DEX routing and join the tournament.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset, idx) => (
          <StockCard 
            key={asset.identifier} 
            asset_data={{...asset, is_top_pick: asset.identifier === topPickAsset?.identifier}} 
            render_index={idx} 
          />
        ))}
      </div>
    </div>
  );
}

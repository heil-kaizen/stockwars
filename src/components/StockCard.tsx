import React from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { TokenizedStock } from '../types';
import { execute_clipboard_copy } from '../utils/clipboard';

interface StockCardProps {
  asset_data: TokenizedStock;
  render_index: number;
  key?: React.Key;
}

export function StockCard({ asset_data, render_index }: StockCardProps) {
  const [is_copied, set_is_copied] = useState(false);

  const handle_address_copy = async () => {
    if (!asset_data.token_address) return;
    const success = await execute_clipboard_copy(asset_data.token_address);
    if (success) {
      set_is_copied(true);
      setTimeout(() => set_is_copied(false), 2000);
    }
  };

  if (asset_data.is_coming_soon) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: (render_index % 8) * 0.05 }}
        className="group p-6 border border-white/5 bg-[#0a1224]/30 flex flex-col justify-center items-center h-full min-h-[220px] rounded-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)]"></div>
        <span className="font-black text-zinc-600 uppercase tracking-[0.3em] text-sm relative z-10">Coming Soon</span>
      </motion.div>
    );
  }

  const is_positive = asset_data.change_percentage >= 0;

  return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: (render_index % 8) * 0.05 }}
      className="group p-6 border border-white/10 bg-[#0a1224]/50 hover:bg-[#0a1224]/80 hover:border-white/20 transition-all flex flex-col rounded-xl min-h-[220px]"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-white leading-tight mb-1">
            {asset_data.company_name}
          </h3>
          <p className="text-xs text-zinc-500 font-mono">{asset_data.ticker_symbol}.tok</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-white text-lg font-medium">
            ${asset_data.current_price.toFixed(2)}
          </p>
          <p className={`text-xs font-mono ${is_positive ? 'text-[#ccff00]' : 'text-red-500'}`}>
            {is_positive ? '+' : ''}{asset_data.change_percentage}%
          </p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/5">
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-bold">Token Contract</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-black/50 border border-white/10 rounded-md px-2 py-2 text-[10px] font-mono text-zinc-400 truncate">
            {asset_data.token_address}
          </div>
          <button
            onClick={handle_address_copy}
            className="p-2 bg-[#ccff00] text-black rounded-md text-[10px] font-black hover:brightness-110 active:scale-95 transition-all cursor-pointer min-w-[50px] flex justify-center items-center h-[30px]"
          >
            {is_copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

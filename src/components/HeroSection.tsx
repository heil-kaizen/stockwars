import { motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { TokenizedStock } from '../types';
import { useState } from 'react';
import { execute_clipboard_copy } from '../utils/clipboard';

interface HeroSectionProps {
  top_pick_asset: TokenizedStock;
}

export function HeroSection({ top_pick_asset }: HeroSectionProps) {
  const [is_copied, set_is_copied] = useState(false);

  const handle_address_copy = async () => {
    const success_flag = await execute_clipboard_copy(top_pick_asset.token_address);
    if (success_flag) {
      set_is_copied(true);
      setTimeout(() => set_is_copied(false), 2000);
    }
  };

  const formatName = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return <>{words[0]}<br/>{words.slice(1).join(' ')}</>;
    }
    return name;
  };

  return (
    <>
      <div className="mb-auto">
        <div className="inline-block px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded text-[#ccff00] text-[10px] font-bold tracking-widest uppercase mb-6">
          Featured Asset Selection
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[110px] leading-[0.85] font-black italic tracking-tighter uppercase mb-4"
        >
          {formatName(top_pick_asset.company_name)}
        </motion.h1>
        <p className="max-w-md text-zinc-400 text-sm leading-relaxed mb-8">
          Tokenized institutional-grade liquidity for the AI revolution. {top_pick_asset.ticker_symbol}.tok provides instant settlement and cross-chain composability for high-frequency trading.
        </p>
        <div className="flex gap-4">
          <div className="bg-[#ccff00] text-black p-6 rounded-2xl flex-1 flex flex-col">
            <span className="text-[10px] font-black uppercase mb-1 opacity-60">Alpha Score</span>
            <span className="text-4xl font-black">98.4</span>
          </div>
          <div className="bg-zinc-800 p-6 rounded-2xl flex-1 flex flex-col">
            <span className="text-[10px] font-black uppercase mb-1 text-zinc-500">Market Cap</span>
            <span className="text-4xl font-black">{top_pick_asset.market_capitalization}</span>
          </div>
          <div className="bg-zinc-800 p-6 rounded-2xl flex-1 flex flex-col">
            <span className="text-[10px] font-black uppercase mb-1 text-zinc-500">24h Vol</span>
            <span className="text-4xl font-black">{top_pick_asset.trading_volume_24h}</span>
          </div>
        </div>
      </div>

      {/* Detailed Token Info Bar */}
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mt-12 flex items-center justify-between">
        <div className="overflow-hidden mr-4">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Contract Address</p>
          <p className="text-2xl font-mono font-bold tracking-tight text-[#ccff00] truncate">
            {top_pick_asset.token_address}
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <button 
            onClick={handle_address_copy}
            className="px-8 py-4 bg-[#ccff00] text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform cursor-pointer flex items-center gap-2"
          >
            {is_copied ? <Check size={20} /> : <Copy size={20} />}
            {is_copied ? 'Copied!' : 'Copy Token Address'}
          </button>
          <button className="px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/5 cursor-pointer">
            View Analytics
          </button>
        </div>
      </div>
    </>
  );
}

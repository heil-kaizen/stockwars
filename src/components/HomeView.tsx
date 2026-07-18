import { motion } from 'motion/react';
import { Check, Copy, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { execute_clipboard_copy } from '../utils/clipboard';
import { TopStocksTicker } from './TopStocksTicker';

export function HomeView({ onNavigate }: { onNavigate: () => void }) {
  const [is_copied, set_is_copied] = useState(false);
  const platform_contract = "0x8F8b0E8D7F7A02C3F2B3B090C8eA6E1E4Ff53C3C";

  const handle_copy = async () => {
    const success = await execute_clipboard_copy(platform_contract);
    if (success) {
      set_is_copied(true);
      setTimeout(() => set_is_copied(false), 2000);
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col justify-center min-h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6"
      >
        <div className="inline-block px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded text-[#ccff00] text-[10px] font-bold tracking-widest uppercase w-fit">
          Decentralized Equity Protocol
        </div>
        
        <h1 className="text-[11vw] sm:text-6xl md:text-8xl lg:text-[120px] font-black italic tracking-tighter uppercase mb-2 flex flex-wrap items-center">
          <span>Stonk</span>
          <span className="relative ml-2 sm:ml-4 md:ml-6 px-4 md:px-8 pt-2 pb-1 md:pt-4 md:pb-2 flex items-center justify-center mt-2 sm:mt-0">
            <span className="absolute inset-0 bg-[#ccff00] rounded-sm -skew-x-[12deg]"></span>
            <span className="relative text-black leading-none z-10">Warz</span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mt-4">
          The next evolution of global trading. Access the top 15 largest traditional market assets via high-performance tokenized infrastructure. 
          Trade top-tier equities with instant settlement, cross-chain composability, and institutional-grade liquidity.
        </p>

        <TopStocksTicker />

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <button 
            onClick={onNavigate}
            className="bg-[#ccff00] text-black px-8 py-4 font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform cursor-pointer flex items-center justify-center gap-2 w-full sm:w-fit"
          >
            Enter Markets <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16 md:mt-20"
      >
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Official Platform Contract</p>
        <div className="bg-[#0a1224]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full overflow-hidden">
            <p className="text-lg sm:text-2xl font-mono font-bold tracking-tight text-[#ccff00] truncate">
              {platform_contract}
            </p>
          </div>
          <button 
            onClick={handle_copy}
            className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            {is_copied ? <Check size={16} /> : <Copy size={16} />}
            {is_copied ? 'Copied' : 'Copy Address'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from 'react';
import { HomeView } from './components/HomeView';
import { MarketsView } from './components/MarketsView';
import { WhitepaperView } from './components/WhitepaperView';
import { TwitterIcon, LogoIcon } from './components/Icons';
import { TickerBackground } from './components/TickerBackground';

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'markets' | 'whitepaper'>('home');

  return (
    <div className="flex flex-col h-screen w-full bg-[#060b16] text-white font-sans overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TickerBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b16] via-[#060b16]/50 to-[#060b16] opacity-90"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ccff00] opacity-[0.03] blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      {/* Header Navigation */}
      <nav className="relative z-10 h-20 px-6 md:px-10 flex items-center justify-between border-b border-white/5 shrink-0 bg-[#060b16]/60 backdrop-blur-md">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <LogoIcon className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tighter uppercase">STONKWARZ</span>
        </div>
        
        <div className="flex gap-4 md:gap-10 text-xs md:text-sm font-medium uppercase tracking-widest text-zinc-400">
          <button 
            onClick={() => setActivePage('home')}
            className={`transition-colors uppercase tracking-widest text-xs md:text-sm font-medium cursor-pointer ${activePage === 'home' ? 'text-[#ccff00]' : 'hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActivePage('markets')}
            className={`transition-colors uppercase tracking-widest text-xs md:text-sm font-medium cursor-pointer ${activePage === 'markets' ? 'text-[#ccff00]' : 'hover:text-white'}`}
          >
            Markets
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="https://x.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#ccff00] transition-colors">
            <TwitterIcon className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
        {activePage === 'home' && <HomeView onNavigate={() => setActivePage('markets')} />}
        {activePage === 'markets' && <MarketsView />}
        {activePage === 'whitepaper' && <WhitepaperView />}
      </main>

      {/* Bottom Nav / Footer */}
      <footer className="relative z-10 h-12 px-6 md:px-10 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase shrink-0 bg-[#060b16]/60 backdrop-blur-md">
        <div className="flex gap-4 md:gap-6 items-center">
          <span className="hidden sm:inline">Status: <span className="text-[#ccff00]">Operational</span></span>
          <button 
            onClick={() => setActivePage('whitepaper')}
            className={`transition-colors font-bold tracking-widest uppercase cursor-pointer ${activePage === 'whitepaper' ? 'text-[#ccff00]' : 'hover:text-white'}`}
          >
            Whitepaper
          </button>
        </div>
        <div className="flex gap-4 md:gap-6 items-center">
          <span className="hidden sm:inline">Latency: 24ms</span>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#ccff00] transition-colors flex items-center gap-2">
            <span className="hidden sm:inline font-sans font-bold">Follow on</span> <TwitterIcon className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}

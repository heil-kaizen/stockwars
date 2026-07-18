import { useMemo } from 'react';
import { market_assets } from '../data/stocks';
import { TokenizedStock } from '../types';

const TickerRow = ({ direction, duration, data }: { direction: 'normal' | 'reverse', duration: number, data: TokenizedStock[] }) => {
  // Create a long enough string of data by duplicating
  const rowData = useMemo(() => {
    if (data.length === 0) return [];
    let duplicated = [...data, ...data, ...data, ...data, ...data];
    return duplicated.map((d, i) => {
      const isPos = d.change_percentage >= 0;
      return {
        id: i,
        isPos,
        text: `${d.ticker_symbol} ${d.current_price.toFixed(2)} ${isPos ? '+' : ''}${d.change_percentage.toFixed(2)}% ${isPos ? '▲' : '▼'}`
      };
    });
  }, [data]);

  const content = (
    <div className="flex gap-12 px-6 items-center min-w-max">
      {rowData.map(d => (
        <span key={d.id} className={`font-mono text-2xl md:text-4xl font-bold tracking-widest ${d.isPos ? 'text-[#ccff00]' : 'text-red-500'}`}>
          {d.text}
        </span>
      ))}
    </div>
  );

  if (rowData.length === 0) return null;

  return (
    <div 
      className="flex whitespace-nowrap min-w-max will-change-transform" 
      style={{ 
        animation: `marquee${direction === 'reverse' ? '-reverse' : ''} ${duration}s linear infinite`,
        transform: 'translateZ(0)'
      }}
    >
      {content}
      {content}
    </div>
  );
}

export function TickerBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col gap-12 md:gap-20 justify-center opacity-[0.10] pointer-events-none transform -skew-y-[12deg] scale-[1.5] z-0 select-none">
      <TickerRow direction="normal" duration={60} data={market_assets} />
      <TickerRow direction="reverse" duration={75} data={market_assets} />
      <TickerRow direction="normal" duration={50} data={market_assets} />
      <TickerRow direction="reverse" duration={80} data={market_assets} />
      <TickerRow direction="normal" duration={65} data={market_assets} />
    </div>
  );
}

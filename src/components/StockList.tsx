import { TokenizedStock } from '../types';
import { StockCard } from './StockCard';

interface StockListProps {
  assets_collection: TokenizedStock[];
}

export function StockList({ assets_collection }: StockListProps) {
  return (
    <>
      {assets_collection.map((asset, idx) => (
        <StockCard 
          key={asset.identifier} 
          asset_data={asset} 
          render_index={idx} 
        />
      ))}
    </>
  );
}

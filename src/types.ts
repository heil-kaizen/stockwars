export interface TokenizedStock {
  identifier: string;
  ticker_symbol: string;
  company_name: string;
  current_price: number;
  change_percentage: number;
  token_address: string;
  market_capitalization: string;
  trading_volume_24h: string;
  is_top_pick?: boolean;
  is_coming_soon?: boolean;
}

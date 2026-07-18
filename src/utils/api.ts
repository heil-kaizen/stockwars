export interface RealTimePrice {
  symbol: string;
  price: number;
  change_percentage: number;
}

export const fetch_realtime_prices = async (symbols: string[]): Promise<RealTimePrice[]> => {
  if (symbols.length === 0) return [];
  
  try {
    const symbols_string = symbols.join(',');
    // We proxy through Vite to bypass CORS
    const response = await fetch(`/api/yahoo/v8/finance/spark?symbols=${symbols_string}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch prices: ${response.status}`);
    }

    const data = await response.json();
    const results: RealTimePrice[] = [];

    for (const symbol of symbols) {
      const stockData = data[symbol];
      if (stockData && stockData.close && stockData.close.length > 0) {
        // Find the last valid close price (sometimes the last element is null)
        let currentPrice = stockData.close[stockData.close.length - 1];
        let i = stockData.close.length - 1;
        while (currentPrice === null && i > 0) {
          i--;
          currentPrice = stockData.close[i];
        }

        const previousClose = stockData.previousClose;
        
        if (currentPrice !== undefined && currentPrice !== null && previousClose) {
          const change = ((currentPrice - previousClose) / previousClose) * 100;
          results.push({
            symbol,
            price: currentPrice,
            change_percentage: Number(change.toFixed(2))
          });
        }
      }
    }

    return results;
  } catch (error) {
    console.error("Error fetching real-time prices:", error);
    return [];
  }
};

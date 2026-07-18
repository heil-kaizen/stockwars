import fs from 'fs';
import path from 'path';
import https from 'https';

const stocks = [
  { symbol: 'nvda', url: 'https://www.google.com/s2/favicons?domain=nvidia.com&sz=128' },
  { symbol: 'aapl', url: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128' },
  { symbol: 'msft', url: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128' },
  { symbol: 'goog', url: 'https://www.google.com/s2/favicons?domain=abc.xyz&sz=128' },
  { symbol: 'amzn', url: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128' },
  { symbol: 'meta', url: 'https://www.google.com/s2/favicons?domain=meta.com&sz=128' },
  { symbol: 'tsla', url: 'https://www.google.com/s2/favicons?domain=tesla.com&sz=128' },
  { symbol: 'brk.b', url: 'https://www.google.com/s2/favicons?domain=berkshirehathaway.com&sz=128' },
  { symbol: 'tsm', url: 'https://www.google.com/s2/favicons?domain=tsmc.com&sz=128' },
  { symbol: 'avgo', url: 'https://www.google.com/s2/favicons?domain=broadcom.com&sz=128' },
  { symbol: 'lly', url: 'https://www.google.com/s2/favicons?domain=lilly.com&sz=128' },
  { symbol: 'wmt', url: 'https://www.google.com/s2/favicons?domain=walmart.com&sz=128' },
];

const dir = path.join(process.cwd(), 'public', 'stocks');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  for (const stock of stocks) {
    const dest = path.join(dir, `${stock.symbol}.png`);
    console.log(`Downloading ${stock.symbol}...`);
    
    await new Promise((resolve) => {
      const request = (url) => {
        https.get(url, (res) => {
          if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
            console.log(`Redirecting ${stock.symbol}...`);
            request(res.headers.location);
          } else if (res.statusCode === 200) {
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
          } else {
            console.log(`Failed ${stock.symbol}: ${res.statusCode}`);
            resolve();
          }
        }).on('error', (e) => {
          console.error(`Error ${stock.symbol}:`, e.message);
          resolve();
        });
      };
      
      request(stock.url);
    });
  }
}

download().then(() => console.log('Done downloading logos!'));

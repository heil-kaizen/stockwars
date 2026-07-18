# Tokenized Equities Exchange

    __  __            __        __          
   / /_/ /____  _____/ /_____  / /_  ____  
  / __/ //_/ / / / _ \ __/ _ \/ __ \/ __ \ 
 / /_/ ,< / /_/ /  __/ /_/  __/ / / / /_/ /
 \__/_/|_|\__, /\___/\__/\___/_/ /_/\____/ 
         /____/                            

A professional, high-performance interface for discovering and interacting with tokenized stocks. 
This platform provides a streamlined view of tokenized market assets, complete with one-click 
contract address copying for rapid trade execution.

## Features

- **Market Overview:** Real-time simulated price feeds and 24-hour volume metrics.
- **Top Pick Algorithm:** Algorithmic highlighting of the highest conviction asset.
- **Rapid Execution:** One-click address copying to clipboard for decentralized exchange routing.
- **High-Contrast Interface:** Institutional-grade dark mode aesthetic focusing on data clarity.

## Technical Architecture

- **Framework:** React 19 / TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React

## Configuration

To update the token addresses, modify the \`src/data/stocks.ts\` file. 
The application relies on standard \`0x\` prefixed EVM compatible addresses.

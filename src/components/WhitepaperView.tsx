import { motion } from 'motion/react';

export function WhitepaperView() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-[10px] font-bold tracking-widest uppercase mb-8">
          Protocol Documentation
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-12 text-[#ccff00]">
          StonkWarz Whitepaper
        </h1>

        <div className="space-y-12 text-zinc-300 leading-relaxed font-sans text-base md:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">1. Abstract</h2>
            <p>
              StonkWarz bridges the gap between traditional global equities and decentralized finance. 
              By tokenizing the world's largest 15 companies by market capitalization, we provide a frictionless, 
              24/7 trading environment that eliminates the bottlenecks of legacy brokerage systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">2. Technology Architecture</h2>
            <p>
              Our smart contracts are built to ensure 1:1 backing of traditional assets in a secure, audited vault system.
              The tokenized assets (.tok) are standard compliant, allowing for seamless integration into existing 
              decentralized exchanges, lending protocols, and automated market makers (AMMs).
            </p>
            <p className="mt-4">
              Price oracles provide real-time updates directly from major traditional exchanges, ensuring 
              that the tokenized representation accurately reflects the underlying asset's market value with minimal latency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">3. Top Market Equities</h2>
            <p>
              We strategically selected all the available top technology, AI, and global leaders in the market—including NVIDIA, Apple, Alphabet, 
              and TSMC—due to their immense market capitalization and high liquidity. This curated list focuses the 
              liquidity of the decentralized market onto the most robust and highly demanded global equities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">4. Security & Compliance</h2>
            <p>
              All contracts are fully verified and immutable upon deployment. StonkWarz utilizes multi-signature 
              wallets and time-locks for any protocol upgrades, ensuring community transparency and maximum security 
              against malicious vectors.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

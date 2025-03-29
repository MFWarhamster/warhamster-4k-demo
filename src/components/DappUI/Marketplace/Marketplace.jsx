"use client";
import { useState } from 'react';

export default function Marketplace() {
  const [message, setMessage] = useState('');
  const [mintedNFTs, setMintedNFTs] = useState([]);

  const tiers = ['S', 'A', 'B'];

  const mintNewRelease = () => {
    const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
    const newNFT = {
      id: mintedNFTs.length + 1,
      tier: randomTier,
      name: `Warhamster ${mintedNFTs.length + 1}`,
    };

    setMintedNFTs([...mintedNFTs, newNFT]);
    setMessage(`You minted a Tier ${randomTier} NFT!`);
  };

  const mintCTiers = () => {
    const newCTiers = Array.from({ length: 10 }, (_, i) => ({
      id: mintedNFTs.length + i + 1,
      tier: 'C',
      name: `Warhamster ${mintedNFTs.length + i + 1}`,
    }));

    setMintedNFTs([...mintedNFTs, ...newCTiers]);
    setMessage('You minted 10 random C-Tier NFTs!');
  };

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-semibold text-center">NFT Marketplace</h2>

      <div className="flex justify-center gap-4 my-6">
        <button
          className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded"
          onClick={mintNewRelease}
        >
          Mint New Release (S/A/B Random)
        </button>

        <button
          className="bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded"
          onClick={mintCTiers}
        >
          Mint 10 C-Tier NFTs
        </button>
      </div>

      {message && (
        <p className="text-center text-green-400 my-4">{message}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mintedNFTs.map((nft) => (
          <div key={nft.id} className="p-4 rounded bg-gray-800 shadow">
            <h3 className="font-semibold">{nft.name}</h3>
            <p>Tier: {nft.tier}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

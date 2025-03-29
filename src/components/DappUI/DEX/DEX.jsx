"use client";
import { useState } from 'react';

export default function DEX() {
  const [solBalance, setSolBalance] = useState(10);
  const [war4kBalance, setWar4kBalance] = useState(1000);
  const [swapAmount, setSwapAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);

  const handleSwap = () => {
    const amount = parseFloat(swapAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    if (isBuying) {
      if (solBalance < amount) {
        alert("Not enough SOL!");
        return;
      }
      setSolBalance(solBalance - amount);
      setWar4kBalance(war4kBalance + amount * 100);
    } else {
      if (war4kBalance < amount) {
        alert("Not enough WAR4K!");
        return;
      }
      setWar4kBalance(war4kBalance - amount);
      setSolBalance(solBalance + amount / 100);
    }

    setSwapAmount('');
  };

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-4 text-center">Simulated DEX</h2>

      <div className="mb-6 text-center">
        <p className="text-xl">SOL Balance: {solBalance.toFixed(2)}</p>
        <p className="text-xl">WAR4K Balance: {war4kBalance.toFixed(0)}</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="number"
          placeholder={isBuying ? "Amount in SOL" : "Amount in WAR4K"}
          value={swapAmount}
          onChange={(e) => setSwapAmount(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white text-center"
        />

        <button
          onClick={handleSwap}
          className="bg-green-500 hover:bg-green-600 py-2 px-6 rounded"
        >
          {isBuying ? "Buy WAR4K" : "Sell WAR4K"}
        </button>

        <button
          onClick={() => setIsBuying(!isBuying)}
          className="mt-2 underline"
        >
          Switch to {isBuying ? "Sell WAR4K" : "Buy WAR4K"}
        </button>
      </div>
    </section>
  );
}

"use client";
import { useState } from 'react';

// Simulated NFTs with accurate tier and cost
const initialNFTs = [
  ...Array.from({ length: 2 }, (_, i) => ({ id: i + 1, name: `Warhamster S-${i+1}`, tier: 'S', HP: 250, Melee: 50, Range: 40, Speed: 15, Cost: 10 })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: i + 3, name: `Warhamster A-${i+1}`, tier: 'A', HP: 180, Melee: 35, Range: 30, Speed: 12, Cost: 6 })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: i + 7, name: `Warhamster B-${i+1}`, tier: 'B', HP: 150, Melee: 25, Range: 20, Speed: 10, Cost: 5 })),
  ...Array.from({ length: 10 }, (_, i) => ({ id: i + 11, name: `Warhamster C-${i+1}`, tier: 'C', HP: 100, Melee: 10, Range: 5, Speed: 8, Cost: 2 })),
];

export default function ArmyBuilder() {
  const [selectedStackIndex, setSelectedStackIndex] = useState(null);
  const [stacks, setStacks] = useState(Array(16).fill([]));
  const [unlockedStacks, setUnlockedStacks] = useState(6);

  const toggleNFT = (nft) => {
    const currentStack = stacks[selectedStackIndex] || [];
    const isAdded = currentStack.some((item) => item.id === nft.id);
    const totalCost = currentStack.reduce((sum, item) => sum + item.Cost, 0);

    if (!isAdded && totalCost + nft.Cost > 20) {
      alert("Exceeded stack capacity!");
      return;
    }

    const updatedStack = isAdded
      ? currentStack.filter((item) => item.id !== nft.id)
      : [...currentStack, nft];

    setStacks(stacks.map((s, i) => (i === selectedStackIndex ? updatedStack : s)));
  };

  const purchaseStack = () => {
    if (unlockedStacks < 16) setUnlockedStacks(unlockedStacks + 1);
  };

  const getStackStats = (stack) => ({
    HP: stack.reduce((sum, nft) => sum + nft.HP, 0),
    Melee: stack.reduce((sum, nft) => sum + nft.Melee, 0),
    Range: stack.reduce((sum, nft) => sum + nft.Range, 0),
    Speed: stack.reduce((sum, nft) => sum + nft.Speed, 0),
    Cost: stack.reduce((sum, nft) => sum + nft.Cost, 0),
  });

  const calculateStrength = (stats) =>
    stats.HP + stats.Melee + stats.Range + stats.Speed - stats.Cost;

  const stackStats = selectedStackIndex !== null ? getStackStats(stacks[selectedStackIndex]) : null;
  const armyStats = stacks.reduce(
    (acc, stack) => {
      const stats = getStackStats(stack);
      return {
        HP: acc.HP + stats.HP,
        Melee: acc.Melee + stats.Melee,
        Range: acc.Range + stats.Range,
        Speed: acc.Speed + stats.Speed,
        Cost: acc.Cost + stats.Cost,
      };
    },
    { HP: 0, Melee: 0, Range: 0, Speed: 0, Cost: 0 }
  );

  const armyStrength = calculateStrength(armyStats);

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-semibold text-center mb-4">Army Builder</h2>

      <div className="flex gap-4">
        <div>
          <h3 className="font-semibold text-center">Army Grid</h3>
          <div className="grid grid-cols-2 gap-2">
            {stacks.map((stack, idx) => (
              <button
                key={idx}
                className={`p-2 rounded ${idx < unlockedStacks ? 'bg-green-600' : 'bg-gray-700 opacity-50 cursor-not-allowed'}`}
                onClick={() => idx < unlockedStacks && setSelectedStackIndex(idx)}
              >
                Stack {idx + 1}
              </button>
            ))}
          </div>
          {unlockedStacks < 16 && (
            <button
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded"
              onClick={purchaseStack}
            >
              Purchase Stack (${25 * (unlockedStacks - 5)})
            </button>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-center">Available NFTs</h3>
          {selectedStackIndex !== null ? (
            <div className="h-56 overflow-auto">
              {initialNFTs.map((nft) => {
                const stack = stacks[selectedStackIndex] || [];
                const checked = stack.some((item) => item.id === nft.id);
                return (
                  <label key={nft.id} className="block bg-gray-800 rounded p-2 my-1">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleNFT(nft)}
                      className="mr-2"
                    />
                    {nft.name} (Tier: {nft.tier}, Cost: {nft.Cost})
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-center mt-8">Select a stack first.</p>
          )}
        </div>

        <div className="bg-gray-800 rounded p-4">
          <h3 className="font-semibold text-center">Stats Window</h3>
          {stackStats && (
            <>
              <h4 className="mt-2 font-semibold">Selected Stack:</h4>
              <p>HP: {stackStats.HP}</p>
              <p>Melee: {stackStats.Melee}</p>
              <p>Range: {stackStats.Range}</p>
              <p>Speed: {stackStats.Speed}</p>
              <p>Capacity Used: {stackStats.Cost}/20</p>
              <p className="mt-2 text-yellow-400">Strength: {calculateStrength(stackStats)}</p>
            </>
          )}
          <h4 className="mt-4 font-semibold">Total Army Stats:</h4>
          <p>HP: {armyStats.HP}</p>
          <p>Melee: {armyStats.Melee}</p>
          <p>Range: {armyStats.Range}</p>
          <p>Speed: {armyStats.Speed}</p>
          <p>Capacity Used: {armyStats.Cost}/{unlockedStacks * 20}</p>
          <p className="mt-2 text-yellow-400">Army Strength: {armyStrength}</p>
        </div>
      </div>
    </section>
  );
}

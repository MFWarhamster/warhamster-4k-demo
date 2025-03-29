"use client";
import { useState } from 'react';
import BattleGame from "./BattleGame";

export default function Battle() {
  const [mode, setMode] = useState(null);

  return (
    <section className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-semibold text-center mb-4">Battle Modes</h2>

      <div className="flex justify-center gap-4 mb-8">
        <button onClick={() => setMode('spar')} className="py-2 px-4 rounded bg-blue-600">Spar</button>
        <button onClick={() => setMode('pvp')} className="py-2 px-4 rounded bg-red-600">PvP</button>
        <button onClick={() => setMode('conquest')} className="py-2 px-4 rounded bg-green-600">Conquest</button>
      </div>

      {mode && (
        <>
          <div className="mt-4 text-center mb-8">
            <h3 className="font-semibold text-xl capitalize">{mode} Mode Selected</h3>
          </div>
          <BattleGame mode={mode} />
        </>
      )}
    </section>
  );
}

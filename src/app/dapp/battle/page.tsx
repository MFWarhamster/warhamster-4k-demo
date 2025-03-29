"use client";

import { useState } from "react";
import BattleGame from "@/components/DappUI/Battle/BattleGame";

export default function BattlePage() {
  const [mode, setMode] = useState("spar");

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Select Battle Mode</h1>

      <div className="flex gap-4 mb-6">
        {["spar", "pvp", "conquest"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded ${
              mode === m ? "bg-purple-600" : "bg-gray-700"
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Remove old test messages */}
      {/* Always show the BattleGame component */}
      <BattleGame />

    </div>
  );
}

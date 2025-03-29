"use client";
import React, { useState, useEffect } from "react";

export default function BattleGame() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    // Dummy data to render something on screen
    const mockUnits = [
      { id: 1, name: "Unit A", HP: 100, Speed: 5 },
      { id: 2, name: "Unit B", HP: 80, Speed: 7 },
    ];
    setUnits(mockUnits);
  }, []);

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Battle Game</h2>
      <div className="grid grid-cols-2 gap-4">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="border border-gray-600 p-4 rounded bg-gray-800"
          >
            <p className="font-semibold">{unit.name}</p>
            <p>HP: {unit.HP}</p>
            <p>Speed: {unit.Speed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

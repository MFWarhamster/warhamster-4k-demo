"use client";
import React, { useState, useEffect } from "react";

export default function BattleGame({ mode }) {
  const [stacks, setStacks] = useState({ attacker: [], defender: [] });
  const [turnIndex, setTurnIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [log, setLog] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [hoveredUnit, setHoveredUnit] = useState(null);

  const buildInitialUnits = () => {
    const attacker = Array.from({ length: 8 }).map((_, i) => ({
      id: `attacker-${i}`,
      name: `Ham A${i}`,
      team: "attacker",
      hp: 100,
      melee: 25,
      range: 10,
      speed: 20,
      cost: 2,
      col: 1,
      row: i,
      stance: "forward",
      alive: true,
    }));

    const defender = Array.from({ length: 8 }).map((_, i) => ({
      id: `defender-${i}`,
      name: `Scam B${i}`,
      team: "defender",
      hp: 100,
      melee: 20,
      range: 8,
      speed: 18,
      cost: 2,
      col: 6,
      row: i,
      stance: "pause",
      alive: true,
    }));

    return { attacker, defender };
  };

  useEffect(() => {
    setStacks(buildInitialUnits());
  }, []);

  const allUnits = [...stacks.attacker, ...stacks.defender].filter((u) => u.alive).sort((a, b) => b.speed - a.speed);
  const activeUnit = allUnits[turnIndex % allUnits.length];

  const handleCommandChange = (unitId, newStance) => {
    const newStacks = { ...stacks };
    const all = [...newStacks.attacker, ...newStacks.defender];
    const unit = all.find((u) => u.id === unitId);
    if (unit) {
      unit.stance = newStance;
      setStacks(newStacks);
      setLog((prev) => [...prev, `${unit.name} stance set to ${newStance}`]);
    }
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-xl font-bold mb-4">Battle Mode: {mode}</h2>

      <div className="grid grid-cols-8 gap-1 border border-white mb-6">
        {Array.from({ length: 64 }).map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;

          const unit = [...stacks.attacker, ...stacks.defender].find(
            (u) => u.row === row && u.col === col && u.alive
          );

          return (
            <div
              key={i}
              onClick={() => unit && setSelectedUnitId(unit.id)}
              onMouseEnter={() => unit && setHoveredUnit(unit)}
              onMouseLeave={() => setHoveredUnit(null)}
              className={`w-12 h-12 border border-gray-600 flex items-center justify-center text-sm text-center cursor-pointer ${unit?.id === selectedUnitId ? "bg-yellow-400 text-black" : ""}`}
              title={
                unit
                  ? `HP: ${unit.hp}\nMelee: ${unit.melee}\nRange: ${unit.range}\nSpeed: ${unit.speed}\nStance: ${unit.stance}`
                  : ""
              }
            >
              {unit ? unit.name[0] : ""}
            </div>
          );
        })}
      </div>

      {selectedUnitId && (
        <div className="mt-4 text-center">
          <p className="font-semibold mb-2">Selected: {selectedUnitId}</p>
          <button onClick={() => handleCommandChange(selectedUnitId, "forward")} className="bg-blue-600 px-3 py-1 rounded m-1">Forward</button>
          <button onClick={() => handleCommandChange(selectedUnitId, "pause")} className="bg-gray-600 px-3 py-1 rounded m-1">Pause</button>
          <button onClick={() => handleCommandChange(selectedUnitId, "range")} className="bg-purple-600 px-3 py-1 rounded m-1">Range</button>
        </div>
      )}

      {hoveredUnit && (
        <div className="mt-4 text-center text-sm bg-gray-800 p-2 rounded">
          <p className="font-semibold">Hovered: {hoveredUnit.name}</p>
          <p>HP: {hoveredUnit.hp}</p>
          <p>Melee: {hoveredUnit.melee}</p>
          <p>Range: {hoveredUnit.range}</p>
          <p>Speed: {hoveredUnit.speed}</p>
          <p>Stance: {hoveredUnit.stance}</p>
        </div>
      )}

      <div className="mt-4 bg-black/50 p-2 rounded h-32 overflow-auto">
        <p className="font-semibold">Combat Log:</p>
        {log.map((entry, i) => (
          <p key={i} className="text-sm">
            {entry}
          </p>
        ))}
      </div>
    </div>
  );
}
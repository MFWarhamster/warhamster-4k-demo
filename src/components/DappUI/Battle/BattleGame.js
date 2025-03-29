"use client";
import React, { useState, useEffect } from "react";

export default function BattleGame({ mode }) {
  const [stacks, setStacks] = useState(buildInitialUnits());
  const [turnIndex, setTurnIndex] = useState(0);
  const [round, setRound] = useState(1);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const [log, setLog] = useState([]);
  const [selectedArmyIndex, setSelectedArmyIndex] = useState(0); // Optional if using army list

  useEffect(() => {
    setStacks(buildInitialUnits());
  }, [selectedArmyIndex]);

  const allUnits = [...stacks.attacker, ...stacks.defender]
    .filter((u) => u.alive)
    .sort((a, b) => b.Speed - a.Speed);

  const activeUnit = allUnits[turnIndex % allUnits.length];

  const moveForward = (unit) => {
    const newStacks = { ...stacks };
    const stack = newStacks[unit.team].find((u) => u.id === unit.id);
    if (stack && ((unit.team === "attacker" && stack.col < 6) || (unit.team === "defender" && stack.col > 1))) {
      stack.col += unit.team === "attacker" ? 1 : -1;
    }
    return newStacks;
  };

  const applyTurn = () => {
    let newStacks = { ...stacks };
    const unit = activeUnit;
    if (!unit || !unit.alive) return;

    const opposingTeam = unit.team === "attacker" ? "defender" : "attacker";
    const target = stacks[opposingTeam].find(
      (u) => u.row === unit.row && u.col === unit.col && u.alive
    );

    if (target) {
      target.HP -= unit.Melee;
      if (target.HP <= 0) {
        target.alive = false;
        setLog((prev) => [...prev, `${unit.id} killed ${target.id}`]);
      } else {
        setLog((prev) => [...prev, `${unit.id} hit ${target.id} for ${unit.Melee}`]);
      }
    } else {
      if (unit.stance === "forward") {
        newStacks = moveForward(unit);
      } else if (unit.stance === "range") {
        const inRange = stacks[opposingTeam].find(
          (u) => Math.abs(u.col - unit.col) <= 2 && u.row === unit.row && u.alive
        );
        if (inRange) {
          inRange.HP -= unit.Range;
          if (inRange.HP <= 0) {
            inRange.alive = false;
            setLog((prev) => [...prev, `${unit.id} killed ${inRange.id} (ranged)`]);
          } else {
            setLog((prev) => [...prev, `${unit.id} hit ${inRange.id} for ${unit.Range}`]);
          }
        }
      }
    }

    setStacks(newStacks);
    setTurnIndex((t) => t + 1);
  };

  const handleCommandChange = (unitId, newStance) => {
    const newStacks = { ...stacks };
    const allUnits = [...newStacks.attacker, ...newStacks.defender];
    const unit = allUnits.find((u) => u.id === unitId);
    if (unit) {
      unit.stance = newStance;
      setStacks(newStacks);
      setLog((prev) => [...prev, `${unit.id} stance set to ${newStance}`]);
    }
  };

  useEffect(() => {
    if (round > 16) return;

    const aliveAttackers = stacks.attacker.filter((u) => u.alive);
    const aliveDefenders = stacks.defender.filter((u) => u.alive);
    if (aliveAttackers.length === 0 || aliveDefenders.length === 0) return;

    const timeout = setTimeout(() => {
      applyTurn();
      if ((turnIndex + 1) % allUnits.length === 0) {
        setRound((r) => r + 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [turnIndex, stacks]);

  return (
    <div className="text-white bg-gray-900 p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Battle Simulation</h2>
      <p className="text-center mb-2">Round {round}</p>

      <div className="grid grid-cols-8 gap-1 border border-gray-700">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => {
            const unit = [...stacks.attacker, ...stacks.defender].find(
              (u) => u.row === row && u.col === col && u.alive
            );
            return (
              <div
                key={`${row}-${col}`}
                onClick={() => unit && setSelectedUnitId(unit.id)}
                onMouseEnter={() => unit && setHoveredUnit(unit)}
                onMouseLeave={() => setHoveredUnit(null)}
                className={`w-12 h-12 border border-gray-600 flex items-center justify-center text-sm text-center cursor-pointer ${unit?.id === selectedUnitId ? "bg-yellow-400 text-black" : ""}`}
                title={
                  unit
                    ? `HP: ${unit.HP}\nMelee: ${unit.Melee}\nRange: ${unit.Range}\nSpeed: ${unit.Speed}\nStance: ${unit.stance}`
                    : ""
                }
              >
                {unit ? unit.id.split("-")[0][0].toUpperCase() : ""}
              </div>
            );
          })
        )}
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
          <p className="font-semibold">Hovered: {hoveredUnit.id}</p>
          <p>HP: {hoveredUnit.HP}</p>
          <p>Melee: {hoveredUnit.Melee}</p>
          <p>Range: {hoveredUnit.Range}</p>
          <p>Speed: {hoveredUnit.Speed}</p>
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

"use client";

import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [nftInventory, setNftInventory] = useState([]);
  const [armyStacks, setArmyStacks] = useState(Array(16).fill([]));
  const [selectedArmyIndex, setSelectedArmyIndex] = useState(0);

  return (
    <GameContext.Provider
      value={{
        nftInventory,
        setNftInventory,
        armyStacks,
        setArmyStacks,
        selectedArmyIndex,
        setSelectedArmyIndex,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);


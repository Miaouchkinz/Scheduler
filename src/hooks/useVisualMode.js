import React, { useState } from "react";

export const useVisualMode = (initialMode) => {
  const [currentMode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace) => {
    replace? setMode(newMode) :
    setHistory([...history, currentMode]);
    setMode(newMode);
  }

  const back = () => {
    const newHistory = [...history]

    setMode(newHistory.pop())
    setHistory(newHistory)
  }

  return { mode: currentMode, transition, back };
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type DisplayMode = "romanji" | "kana";

type DisplayModeContextType = {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
};

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);

export function DisplayModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DisplayMode>("romanji");

  // Charger la préférence depuis localStorage lors du montage
  useEffect(() => {
    const savedMode = localStorage.getItem("display-mode");
    if (savedMode && (savedMode === "kana" || savedMode === "romanji")) {
      setMode(savedMode);
    }
  }, []);

  // Sauvegarder la préférence dans localStorage
  useEffect(() => {
    localStorage.setItem("display-mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "kana" ? "romanji" : "kana");
  };

  return (
    <DisplayModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </DisplayModeContext.Provider>
  );
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext);
  if (context === undefined) {
    throw new Error("useDisplayMode doit être utilisé à l'intérieur d'un DisplayModeProvider");
  }
  return context;
}
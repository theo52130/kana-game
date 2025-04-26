"use client";

import { createContext, useContext, useEffect, useState } from "react";

type DisplayMode = "romanji" | "japonais" | "english";

type DisplayModeContextType = {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
};

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);

export function DisplayModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DisplayMode>("english");

  // Charger la préférence depuis localStorage lors du montage
  useEffect(() => {
    const savedMode = localStorage.getItem("display-mode");
    if (savedMode && (savedMode === "japonais" || savedMode === "romanji" || savedMode === "english")) {
      setMode(savedMode);
    }
  }, []);

  // Sauvegarder la préférence dans localStorage
  useEffect(() => {
    localStorage.setItem("display-mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => {
      if (prevMode === "japonais") return "english";
      if (prevMode === "english") return "romanji";
      if (prevMode === "romanji") return "japonais";
      return "japonais";
    });
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
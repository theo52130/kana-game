"use client";

import { useDisplayMode } from "@/hooks/useDisplayMode";

type DualDisplayTextProps = {
  japonais: string | React.ReactNode;
  romanji: string | React.ReactNode;
  english?: string | React.ReactNode;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
};

export const KanaDisplayText = ({ 
  japonais, 
  romanji, 
  english,
  className = "", 
  element = "span" 
}: DualDisplayTextProps) => {
  const { mode } = useDisplayMode();
  
  // Choisir le texte en fonction du mode
  let text;
  if (mode === "japonais") {
    text = japonais;
  } else if (mode === "english") {
    text = english;
  } else {
    text = romanji;
  }
  
  const Element = element;
  return <Element className={className}>{text}</Element>;
};
"use client";

import { useDisplayMode } from "@/hooks/useDisplayMode";

type DualDisplayTextProps = {
  kana: string | React.ReactNode;
  romanji: string | React.ReactNode;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
};

export const KanaDisplayText = ({ 
  kana, 
  romanji, 
  className = "", 
  element = "span" 
}: DualDisplayTextProps) => {
  const { mode } = useDisplayMode();
  const text = mode === "kana" ? kana : romanji;
  
  const Element = element;
  return <Element className={className}>{text}</Element>;
};
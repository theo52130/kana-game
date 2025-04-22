"use client";

import { useEffect, useState } from "react";
import { title, subtitle } from "@/components/primitives";
import { useDisplayMode } from "@/hooks/useDisplayMode";
import { Button } from "@heroui/button";
import { KanaDisplayText } from "@/components/kana-display-text";
import HiraganaPageTrain from "@/components/trainPage/hiraganaPage/page";
import KatakanaPageTrain from "@/components/trainPage/katakanaPage/page";
import { KanamiLoading } from "@/components/loading";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-red-900/20 dark:border-red-500/20 flex flex-col h-full relative overflow-hidden ${className}`}
    style={{
      backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.03), transparent 70%)"
    }}
  >
    {/* Élément décoratif de style japonais */}
    <div className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-3xl bg-red-700" />
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 border-b border-red-900/10 dark:border-red-500/10">{children}</div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 flex flex-col flex-grow">{children}</div>
);

export default function ApprendrePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState("hiragana");
  const { mode: displayMode } = useDisplayMode();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fonction qui détermine la position de la barre selon le mode d'affichage
  const getBarPosition = () => {
    if (categories === "hiragana") {
      if (displayMode === "japonais") {
        return "7px"; // Position ajustée pour les kana
      } else {
        return "11px"; // Position pour hiragana reste inchangée
      }
    } else {
      // Ajustement pour katakana selon le mode d'affichage
      if (displayMode === "japonais") {
        return "120px"; // Position ajustée pour les kana
      } else {
        return "135px"; // Position originale pour français/anglais
      }
    }
  };

  if (!isMounted) {
    return <KanamiLoading 
      romanji="Chargement"
      japonais="ローディング中"
      english="Loading"
  />;;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className={title({ size: "lg" })}>
          <KanaDisplayText
            japonais={
              <>
                <span className="text-red-700 dark:text-red-500">かな</span>を学ぶ
              </>
            }
            romanji={
              <>
                Apprendre les <span className="text-red-700 dark:text-red-500">Kanas</span>
              </>
            }
            english={
              <>
                Learn <span className="text-red-700 dark:text-red-500">Kanas</span>
              </>
            }
            element="span"
          />
        </h1>
        <KanaDisplayText
          japonais="あなたのトレーニングをカスタマイズする。"
          romanji="Personnaliser votre entrainement."
          english="Customize your training."
          element="p"
          className={`${subtitle()} text-slate-700 dark:text-slate-300`}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg shadow-md p-4 flex justify-start gap-8 relative bg-white dark:bg-zinc-900 border border-red-900/10 dark:border-red-500/10">
          <div 
            className="relative cursor-pointer pb-2 text-slate-800 dark:text-slate-200"
            onClick={() => setCategories("hiragana")}
          >
            <KanaDisplayText
              japonais="ひらがな"
              romanji="Hiragana"
              english="Hiragana"
              element="p"
              className={"font-bold text-xl"}
            />
          </div>
          
          <div 
            className="relative cursor-pointer pb-2 text-slate-800 dark:text-slate-200"
            onClick={() => setCategories("katakana")}
          >
            <KanaDisplayText
              japonais="カタカナ"
              romanji="Katakana"
              english="Katakana"
              element="p"
              className={"font-bold text-xl"}
            />
          </div>
          
          {/* Barre animée avec position dynamique */}
          <div 
            className="absolute h-1 bg-red-700 dark:bg-red-500 rounded-full transition-all duration-300 ease-in-out"
            style={{
              bottom: "12px",
              left: getBarPosition(),
              width: "98px",
            }}
          />
        </div>
      </div>

      {categories === "hiragana" ? (
        <HiraganaPageTrain />
      ) : (
        <KatakanaPageTrain />
      )}
    </>
  );
}

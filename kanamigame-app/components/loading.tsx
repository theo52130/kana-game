import React from "react";
import { motion } from "framer-motion";
import { useDisplayMode } from "@/hooks/useDisplayMode";

// Nouvelle structure pour les messages multilingues
type LoadingMessageProps = {
  romanji?: string;
  japonais?: string;
  english?: string;
  defaultMessage?: string;
};

export const KanamiLoading = ({ 
  romanji = "Chargement", 
  japonais = "ローディング中", 
  english = "Loading", 
  defaultMessage = "Chargement" 
}: LoadingMessageProps) => {
  const kanaSymbols = ["あ", "り", "が", "と", "う"];
  const { mode } = useDisplayMode();
  
  // Sélectionner le message selon le mode d'affichage
  const message = mode === "japonais" 
    ? japonais 
    : mode === "english" 
      ? english 
      : romanji || defaultMessage;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      {/* Cercle tourbillonnant style japonais */}
      <div className="relative w-20 h-20 mb-4">
        <motion.div 
          className="absolute inset-0 border-2 border-red-700 dark:border-red-500 rounded-full opacity-30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-2 border-2 border-red-600 dark:border-red-400 rounded-full opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-4 border-2 border-red-500 dark:border-red-300 rounded-full opacity-70"
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-red-700 dark:text-red-500 text-2xl">
            漢
          </span>
        </motion.div>
      </div>
      
      {/* Ligne de caractères kana qui apparaissent successivement */}
      <div className="flex space-x-2 items-center">
        <span className="text-slate-700 dark:text-slate-300 mr-1">
          {message}
        </span>
        <div className="flex">
          {kanaSymbols.map((symbol, index) => (
            <motion.span 
              key={index}
              className="text-red-700 dark:text-red-500 text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1.5
              }}
            >
              {symbol}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
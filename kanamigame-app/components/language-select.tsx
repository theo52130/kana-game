"use client";

import { FC } from "react";
import { Select, SelectItem } from "@heroui/react";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { useDisplayMode } from "@/hooks/useDisplayMode";

export interface LanguageSelectorProps {
  className?: string;
  classNames?: {
    base?: string;
    trigger?: string;
    listbox?: string;
    listboxWrapper?: string;
  };
}

export const KanaRomanjiSwitch: FC<LanguageSelectorProps> = ({
  className,
  classNames,
}) => {
  const { mode, setMode } = useDisplayMode();
  const isSSR = useIsSSR();

  // Valeur par défaut en SSR
  const defaultValue = isSSR ? "english" : mode;

  const languageOptions = [
    { key: "japonais", label: "日本語", description: "日本語" },
    { key: "english", label: "EN", description: "English" },
    { key: "romanji", label: "FR", description: "Français" },
  ];

  return (
    <Select
      aria-label="Sélectionner la langue d'affichage"
      selectedKeys={[defaultValue]}
      onChange={(key) => {
        const selectedKey = key as any;
        setMode(selectedKey.target?.value || selectedKey as "romanji" | "english" | "japonais"); // Correction ici
      }}
      className={clsx("min-w-[120px]", className)} // Augmentation de la largeur minimale
      classNames={{
        base: clsx("transition-opacity hover:opacity-80", classNames?.base),
        trigger: clsx("h-8 min-h-0 py-0 px-2", classNames?.trigger),
        listbox: classNames?.listbox,
        listboxWrapper: classNames?.listboxWrapper,
      }}
      size="sm"
      variant="bordered"
    >
      {languageOptions.map((option) => (
        <SelectItem key={option.key} textValue={option.description}>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">{option.label}</span>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};
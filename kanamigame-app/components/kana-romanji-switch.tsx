"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";
import { useDisplayMode } from "@/hooks/useDisplayMode";

export interface KanaRomanjiSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const KanaRomanjiSwitch: FC<KanaRomanjiSwitchProps> = ({
  className,
  classNames,
}) => {
  const { mode, toggleMode } = useDisplayMode();
  const isSSR = useIsSSR();

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: mode === "kana" || isSSR,
    "aria-label": `Afficher en ${mode === "kana" || isSSR ? "romanji" : "kana"}`,
    onChange: toggleMode,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <span className="text-sm font-medium">あ</span>
        ) : (
          <span className="text-sm font-medium">A</span>
        )}
      </div>
    </Component>
  );
};
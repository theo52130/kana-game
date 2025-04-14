"use client";

import { useEffect, useState } from "react";
import { title, subtitle } from "@/components/primitives";
import { useDisplayMode } from "@/hooks/useDisplayMode";
import { Button } from "@heroui/button";
import Link from "next/link";
import { KanaDisplayText } from "@/components/kana-display-text";

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-content1 rounded-xl shadow-lg border border-default-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 border-b border-default-200">{children}</div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

export default function ApprendrePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { mode } = useDisplayMode();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Afficher un squelette pendant l'hydratation
  if (!isMounted) {
    return <div className="animate-pulse">Chargement...</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className={title({ size: "lg" })}>
          <KanaDisplayText
            kana={
              <>
                <span className="text-secondary">かな</span>を学ぶ
              </>
            }
            romanji={
              <>
                Apprendre les <span className="text-secondary">Kanas</span>
              </>
            }
            element="span"
          />
        </h1>
        <KanaDisplayText
          kana="あなたのトレーニングをカスタマイズする。"
          romanji="Personnaliser votre entrainement."
          element="p"
        />
      </div>

      <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg shadow-md p-4 flex justify-start gap-4">
          <KanaDisplayText
            kana="ひらがな"
            romanji="Hiragana"
            element="p"
            className="font-bold text-xl"
          />
          <KanaDisplayText
            kana="カタカナ"
            romanji="Katakana"
            element="p"
            className="font-bold text-xl"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Pratiquer</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              Testez vos connaissances avec nos exercices pratiques.
            </p>
            <Button as={Link} href="/#" color="secondary" fullWidth isDisabled>
              S'entraîner
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

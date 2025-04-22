"use client";

import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { useDisplayMode } from "@/hooks/useDisplayMode";
import { KanaDisplayText } from "@/components/kana-display-text";

export default function Home() {
  const { theme } = useTheme();
  const { mode } = useDisplayMode();

  return (
    <div>
      {/* Exemple de texte qui change de couleur selon le thème */}
      <div className="mt-8 p-4 bg-default-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Exemple de texte adaptatif au thème
        </h3>
        <p className="text-red-500 dark:text-blue-500 font-medium">
          Ce texte est rouge en mode clair et bleu en mode sombre!
        </p>
        <p className="text-xs mt-2 text-default-500">
          Utilisez la classe{" "}
          <code className="bg-default-200 px-1 rounded">
            text-red-500 dark:text-blue-500
          </code>{" "}
          pour créer cet effet.
        </p>
      </div>

      {/* Nouvelles exemples avec color="primary" */}
      <div className="mt-8 p-4 bg-default-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          Autres approches pour les couleurs adaptatives
        </h3>

        {/* Exemple avec Button et color="primary" */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">
            1. Utiliser les composants HeroUI avec color="primary"
          </h4>
          <Button color="primary" className="mx-2">
            Bouton primaire
          </Button>
          <Button color="secondary" className="mx-2">
            Bouton secondaire
          </Button>
          <p className="text-xs mt-2 text-default-500">
            Les composants HeroUI s'adaptent automatiquement au thème avec{" "}
            <code className="bg-default-200 px-1 rounded">color="primary"</code>
          </p>
        </div>

        {/* Exemple avec primitives */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">
            2. Utiliser les primitives avec variants de couleur
          </h4>
          <p className={subtitle({ color: "blue", fullWidth: true })}>
            Ce texte utilise subtitle avec color="blue"
          </p>
          <p className="text-xs mt-2 text-default-500">
            Utilisez{" "}
            <code className="bg-default-200 px-1 rounded">
              subtitle(&#123; color: "blue" &#125;)
            </code>
          </p>
        </div>

        {/* Exemple avec useTheme hook */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">
            3. Utiliser le hook useTheme
          </h4>
          <p
            className={`font-medium ${theme === "light" ? "text-primary" : "text-secondary"}`}
          >
            Ce texte utilise le hook useTheme pour changer de style
          </p>
          <p className="text-xs mt-2 text-default-500">
            Utilisez{" "}
            <code className="bg-default-200 px-1 rounded">{`theme === "light" ? "text-primary" : "text-secondary"`}</code>
          </p>
        </div>

        {/* Exemple avec un composant traduit */}
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">
            4. Exemple de composant traduit
          </h4>
          <div className="mt-8">
            <KanaDisplayText
              kana="かな"
              romanji="kana"
              className="text-primary"
              element="span"
            />
            <span className="text-primary">
              {" "}
              {mode === "kana" ? "を学ぶ" : "Learn"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

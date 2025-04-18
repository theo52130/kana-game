"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";
import { useDisplayMode } from "@/hooks/useDisplayMode";
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

// Typage pour les statistiques
type Statistiques = {
  utilisateurs: number;
  caracteres: number;
  niveaux: number;
  error?: string;
};

export default function Home() {
  // Ajout d'un état pour gérer l'hydratation
  const [isMounted, setIsMounted] = useState(false);
  const [stats, setStats] = useState<Statistiques | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { mode } = useDisplayMode();

  // Marquer le composant comme monté après l'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fonction pour récupérer les statistiques
  useEffect(() => {
    // Ne lance la requête qu'après montage côté client
    if (isMounted) {
      const fetchStats = async () => {
        try {
          setLoading(true);
          const response = await fetch("/api/compteur");

          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }

          const data = await response.json();
          setStats(data);
        } catch (err) {
          console.error(
            "Erreur lors de la récupération des statistiques:",
            err
          );
          setError("Impossible de charger les statistiques");
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [isMounted]);

  // Détermine quel texte afficher selon le mode
  const titleText =
    mode === "kana" ? siteConfig.mainNav.titleKana : siteConfig.mainNav.title;
  const descriptionText =
    mode === "kana"
      ? siteConfig.mainNav.descriptionKana
      : siteConfig.mainNav.description;

  // Afficher un contenu uniforme pendant l'hydratation
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Afficher uniquement le contenu statique pendant l'hydratation */}
          <div className="mb-8">
            <h1 className={title({ size: "lg" })}>
              <KanaDisplayText
                romanji="KanamiGame"
                kana="カナミゲーム"
                className="text-secondary"
                element="span"
              />
            </h1>
            <KanaDisplayText
                romanji="Un jeu interactif et amusant pour maîtriser les hiragana et katakana à votre rythme."
                kana="自分のペースでひらがなやカタカナをマスターできる、楽しいインタラクティブなゲームです。"
                className="text-secondary"
                element="p"
              />
          </div>

          {/* Version squelette des cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Commencer</h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Découvrez les bases du japonais avec nos leçons interactives.
                </p>
                <Button
                  as={Link}
                  href="/#"
                  color="secondary"
                  fullWidth
                  isDisabled
                >
                  Démarrer l'apprentissage
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Pratiquer</h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Testez vos connaissances avec nos exercices pratiques.
                </p>
                <Button
                  as={Link}
                  href="/#"
                  color="secondary"
                  fullWidth
                  isDisabled
                >
                  S'entraîner
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Achievements</h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Voir vous succès et vos récompenses débloquer.
                </p>
                <Button
                  as={Link}
                  href="/#"
                  color="secondary"
                  fullWidth
                  isDisabled
                >
                  Accéder aux succès
                </Button>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Leaderboard</h2>
              </CardHeader>
              <CardBody>
                <p className="mb-4">
                  Découvrez les classements et défiez vos amis.
                </p>
                <Button
                  as={Link}
                  href="/#"
                  color="secondary"
                  fullWidth
                  isDisabled
                >
                  Accéder aux Leaderboard
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Rendu normal après hydratation
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className={title({ size: "lg" })}>
            <span className="text-secondary">{titleText}</span>
          </h1>
          <p className={`${subtitle()}`}>{descriptionText}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Commencer</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                Découvrez les bases du japonais avec nos leçons interactives.
              </p>
              <Button
                as={Link}
                href="/#"
                color="secondary"
                fullWidth
                isDisabled
              >
                Démarrer l'apprentissage
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Pratiquer</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                Testez vos connaissances avec nos exercices pratiques.
              </p>
              <Button
                as={Link}
                href="/#"
                color="secondary"
                fullWidth
                isDisabled
              >
                S'entraîner
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Achievements</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                Voir vous succès et vos récompenses débloquer.
              </p>
              <Button
                as={Link}
                href="/#"
                color="secondary"
                fullWidth
                isDisabled
              >
                Accéder aux succès
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </CardHeader>
            <CardBody>
              <p className="mb-4">
                Découvrez les classements et défiez vos amis.
              </p>
              <Button
                as={Link}
                href="/#"
                color="secondary"
                fullWidth
                isDisabled
              >
                Accéder aux Leaderboard
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Bannière de statistiques */}
        <div className="mt-12 w-full">
          <Card className="bg-gradient-to-r from-primary-100 to-secondary-100">
            <CardHeader>
              <h2 className="text-xl font-bold">Statistiques KanamiGame</h2>
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                    <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-content2 rounded-lg">
                    <span className="text-3xl font-bold text-primary">
                      {stats?.utilisateurs || "..."}
                    </span>
                    <span className="text-sm">Utilisateurs</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-content2 rounded-lg">
                    <span className="text-3xl font-bold text-secondary">
                      {stats?.caracteres || "..."}
                    </span>
                    <span className="text-sm">Caractères disponibles</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-content2 rounded-lg">
                    <span className="text-3xl font-bold text-success">
                      {stats?.niveaux || "..."}
                    </span>
                    <span className="text-sm">Niveaux d'apprentissage</span>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";
import { useDisplayMode } from "@/hooks/useDisplayMode";
import { KanaDisplayText } from "@/components/kana-display-text";
import { KanamiLoading } from "@/components/loading";

// Modifier le composant Card pour qu'il prenne toute la hauteur disponible et ait un style japonais
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

// Améliorer le CardBody pour qu'il gère mieux la distribution de l'espace
const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 flex flex-col flex-grow">
    {children}
  </div>
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

  // État pour le chargement artificiel de débogage
  const [debugLoading, setDebugLoading] = useState(false);

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

          // Simulation de délai réseau pour voir le chargement
          await new Promise(resolve => setTimeout(resolve, 2000));

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

  // Si le composant n'est pas encore monté, afficher le chargement 
  // comme sur la page train, en plein écran
  if (!isMounted) {
    return <KanamiLoading 
      romanji="Chargement"
      japonais="ローディング中"
      english="Loading"
    />;
  }

  // Détermine quel texte afficher selon le mode
  const titleText =
    mode === "japonais"
      ? siteConfig.mainNav.titleKana
      : siteConfig.mainNav.title;
  const descriptionText =
    mode === "japonais"
      ? siteConfig.mainNav.descriptionKana
      : siteConfig.mainNav.description;

  // Fonction qui rend le contenu principal
  const renderContent = () => (
    <div className="flex flex-col items-center min-h-screen bg-slate-50 dark:bg-background bg-[url('/images/japanese-pattern.png')] bg-opacity-5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 mt-8">
          <h1 className={title({ size: "lg" })}>
            <KanaDisplayText
              romanji="KanamiGame"
              japonais="カナミゲーム"
              english="KanamiGame"
              className="text-red-700 dark:text-red-500"
              element="span"
            />
          </h1>
          <KanaDisplayText
            romanji="Un jeu interactif et amusant pour maîtriser les hiragana et katakana à votre rythme."
            japonais="自分のペースでひらがなやカタカナをマスターできる、楽しいインタラクティブなゲームです。"
            english="An interactive and fun game to master hiragana and katakana at your own pace."
            className={`${subtitle()} text-slate-800 dark:text-slate-200`}
            element="p"
          />
        </div>

        {/* Grille de cartes avec style japonais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Cartes existantes avec nouveaux styles */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-red-800 dark:text-red-500">
                <KanaDisplayText
                  romanji="Commencer"
                  japonais="始める"
                  english="Start"
                  element="span"
                />
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col h-full">
                <KanaDisplayText
                  romanji="Découvrez les bases du japonais avec nos leçons interactives."
                  japonais="インタラクティブなレッスンで日本語の基礎を学びましょう。"
                  english="Discover the basics of Japanese with our interactive lessons."
                  element="p"
                  className="flex-grow text-slate-700 dark:text-slate-300"
                />
                <Button
                  as={Link}
                  href="/#"
                  className="mt-4 bg-red-700 hover:bg-red-800 text-white w-full"
                  isDisabled
                >
                  <KanaDisplayText
                    romanji="Démarrer l'apprentissage"
                    japonais="学習を始める"
                    english="Start learning"
                  />
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-red-800 dark:text-red-500">
                <KanaDisplayText
                  romanji="Pratiquer"
                  japonais="練習する"
                  english="Practice"
                  element="span"
                />
              </h2>
            </CardHeader>
            <CardBody>
              <KanaDisplayText
                romanji="Testez vos connaissances avec nos exercices pratiques."
                japonais="練習問題で知識をテストしましょう。"
                english="Test your knowledge with our practical exercises."
                element="p"
                className="mb-auto text-slate-700 dark:text-slate-300"
              />
              <Button
                as={Link}
                href="/train"
                className="mt-4 bg-red-700 hover:bg-red-800 text-white w-full"
              >
                <KanaDisplayText
                  romanji="S'entraîner"
                  japonais="トレーニング"
                  english="Train"
                />
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-red-800 dark:text-red-500">
                <KanaDisplayText
                  romanji="Achievements"
                  japonais="実績"
                  english="Achievements"
                  element="span"
                />
              </h2>
            </CardHeader>
            <CardBody>
              <KanaDisplayText
                romanji="Voir vos succès et vos récompenses débloquées."
                japonais="あなたの成果と獲得した報酬を確認しましょう。"
                english="See your achievements and unlocked rewards."
                element="p"
                className="mb-auto text-slate-700 dark:text-slate-300"
              />
              <Button
                as={Link}
                href="/#"
                className="mt-4 bg-red-700 hover:bg-red-800 text-white w-full"
                isDisabled
              >
                <KanaDisplayText
                  romanji="Accéder aux succès"
                  japonais="実績を見る"
                  english="Access achievements"
                />
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-red-800 dark:text-red-500">
                <KanaDisplayText
                  romanji="Leaderboard"
                  japonais="ランキング"
                  english="Leaderboard"
                  element="span"
                />
              </h2>
            </CardHeader>
            <CardBody>
              <KanaDisplayText
                romanji="Découvrez les classements et défiez vos amis."
                japonais="ランキングを確認して友達と競い合いましょう。"
                english="Discover the rankings and challenge your friends."
                element="p"
                className="mb-auto text-slate-700 dark:text-slate-300"
              />
              <Button
                as={Link}
                href="/#"
                className="mt-4 bg-red-700 hover:bg-red-800 text-white w-full"
                isDisabled
              >
                <KanaDisplayText
                  romanji="Accéder au Leaderboard"
                  japonais="ランキングを見る"
                  english="Access Leaderboard"
                />
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Bannière de statistiques avec style japonais */}
        <div className="mt-12 w-full mb-12">
          <Card className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-950/30 dark:to-amber-950/30 border-red-900/20 dark:border-red-500/20">
            <CardHeader>
              <h2 className="text-xl font-bold text-red-800 dark:text-red-500">
                <KanaDisplayText
                  romanji="Statistiques KanamiGame"
                  japonais="カナミゲームの統計"
                  english="KanamiGame Statistics"
                  element="span"
                />
              </h2>
            </CardHeader>
            <CardBody>
              {(loading || debugLoading) ? (
                <KanamiLoading
                  romanji="Chargement des statistiques" 
                  japonais="統計を読み込み中" 
                  english="Loading statistics" 
                />
              ) : error ? (
                <p className="text-red-700 dark:text-red-400">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-white dark:bg-zinc-800 rounded-lg border border-red-100 dark:border-red-900">
                    <span className="text-3xl font-bold text-red-700 dark:text-red-500">
                      {stats?.utilisateurs || "..."}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      <KanaDisplayText
                        romanji="Utilisateurs"
                        japonais="ユーザー"
                        english="Users"
                      />
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white dark:bg-zinc-800 rounded-lg border border-red-100 dark:border-red-900">
                    <span className="text-3xl font-bold text-amber-600 dark:text-amber-500">
                      {stats?.caracteres || "..."}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      <KanaDisplayText
                        romanji="Caractères disponibles"
                        japonais="利用可能な文字"
                        english="Available Characters"
                      />
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white dark:bg-zinc-800 rounded-lg border border-red-100 dark:border-red-900">
                    <span className="text-3xl font-bold text-red-800 dark:text-red-500">
                      {stats?.niveaux || "..."}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      <KanaDisplayText
                        romanji="Niveaux d'apprentissage"
                        japonais="学習レベル"
                        english="Learning Levels"
                      />
                    </span>
                  </div>
                </div>
              )}

              {/* Bouton de débogage - visible uniquement en développement */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 pt-4 border-t border-red-900/10 dark:border-red-500/10">
                  <Button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    onPress={() => setDebugLoading(!debugLoading)}
                  >
                    {debugLoading ? "Arrêter le chargement artificiel" : "Tester le chargement"}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );

  // Une seule instruction return qui utilise la fonction
  return renderContent();
}

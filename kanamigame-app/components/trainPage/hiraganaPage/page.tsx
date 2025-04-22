import React, { useState, useEffect } from "react";
import { KanaDisplayText } from "@/components/kana-display-text";
import { Button } from "@heroui/button";
import Link from "next/link";
import { KanamiLoading } from "@/components/loading";

// Fonctions utilitaires pour identifier les types de caractères
const isHiragana = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code >= 0x3040 && code <= 0x309f;
};

const isKatakana = (char: string): boolean => {
  const code = char.charCodeAt(0);
  return code >= 0x30a0 && code <= 0x30ff;
};

// Ajoutez ces fonctions utilitaires en haut du fichier, après les imports
const CACHE_KEY_GROUPS = "kanami_hiragana_groups"; // ou "kanami_katakana_groups" pour katakana
const CACHE_KEY_KANAS = "kanami_hiragana_kanas_"; // ou "kanami_katakana_kanas_" pour katakana
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes

// Fonctions pour la gestion du cache
const saveToCache = (key: string, data: any) => {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
};

const getFromCache = (key: string) => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;
  
  const { data, timestamp } = JSON.parse(cachedData);
  // Vérifier si le cache a expiré
  if (Date.now() - timestamp > CACHE_EXPIRY) {
    localStorage.removeItem(key);
    return null;
  }
  
  return data;
};

// Fonction pour effacer le cache
const clearCache = () => {
  // Supprimer tous les éléments du cache liés aux kanas
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('kanami_')) {
      localStorage.removeItem(key);
    }
  });
  // Recharger la page
  window.location.reload();
};

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
      backgroundImage:
        "radial-gradient(circle at 50% 0%, rgba(255, 0, 0, 0.03), transparent 70%)",
    }}
  >
    {/* Élément décoratif de style japonais */}
    <div className="absolute top-0 right-0 w-16 h-16 opacity-10 rounded-bl-3xl bg-red-700" />
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 border-b border-red-900/10 dark:border-red-500/10">
    {children}
  </div>
);

const CardBody = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 flex flex-col flex-grow">{children}</div>
);

// Types pour les données de la BDD
type KanaGroup = {
  group_id: number;
  name: string;
  description: string;
  display_order: number;
  is_hiragana: boolean;
};

type Kana = {
  kana_id: number;
  character: string;
  romaji: string;
  group_id: number;
  display_order: number;
  variants?: KanaVariant[];
};

type KanaVariant = {
  variant_id: number;
  base_kana_id: number;
  character: string;
  romaji: string;
  variant_type: string;
};

// Composant pour afficher les kanas d'un groupe
const KanaTable = ({
  kanas,
  columns = 5,
}: {
  kanas: Kana[];
  columns?: number;
}) => {
  return (
    <div
      className={`grid grid-cols-${columns} md:grid-cols-${columns} gap-2 mt-4`}
    >
      {kanas.map((kana) => (
        <div
          key={kana.kana_id}
          className="flex flex-col items-center justify-center p-2 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <span className="text-2xl font-semibold text-red-800 dark:text-red-500 pointer-events-none">
            {kana.character}
          </span>
          <span className="text-xs mt-1 text-slate-700 dark:text-slate-400 pointer-events-none">
            {kana.romaji}
          </span>
        </div>
      ))}
    </div>
  );
};

// Composant pour afficher les variantes
const VariantTable = ({
  variants,
  title,
}: {
  variants: KanaVariant[];
  title: string;
}) => {
  return variants.length > 0 ? (
    <div className="mt-4">
      <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">
        {title}
      </h4>
      <div className="grid grid-cols-5 gap-2">
        {variants.map((variant) => (
          <div
            key={variant.variant_id}
            className="flex flex-col items-center justify-center p-2 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <span className="text-2xl font-semibold text-red-800 dark:text-red-500 pointer-events-none">
              {variant.character}
            </span>
            <span className="text-xs mt-1 text-slate-700 dark:text-slate-400 pointer-events-none">
              {variant.romaji}
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

// Composant principal
const HiraganaPageTrain = () => {
  const [groups, setGroups] = useState<KanaGroup[]>([]);
  const [kanasByGroup, setKanasByGroup] = useState<{
    [groupId: number]: Kana[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allBasicKanas, setAllBasicKanas] = useState<Kana[]>([]);
  const [variants, setVariants] = useState<{
    dakuten: KanaVariant[];
    handakuten: KanaVariant[];
    yoon: KanaVariant[];
    dakutenYoon: KanaVariant[];
    handakutenYoon: KanaVariant[];
    foreign: KanaVariant[];
    foreignCombo: KanaVariant[];
  }>({
    dakuten: [],
    handakuten: [],
    yoon: [],
    dakutenYoon: [],
    handakutenYoon: [],
    foreign: [],
    foreignCombo: [],
  });

  // Chargement des groupes de kanas
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Vérifier si les groupes sont dans le cache
        const cachedGroups = getFromCache(CACHE_KEY_GROUPS);
        
        if (cachedGroups) {
          console.log("Utilisation des groupes en cache");
          setGroups(cachedGroups);
          
          // Charger les kanas pour chaque groupe (également depuis le cache si possible)
          await Promise.all(cachedGroups.map(loadKanasForGroup));
        } else {
          // Si pas en cache, faire l'appel API
          const response = await fetch("/api/kana-groups");
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des groupes");
          }
          const data = await response.json();
          
          // Filtrer uniquement les groupes hiragana (ou katakana pour l'autre composant)
          const hiraganaGroups = data.filter(
            (group: KanaGroup) => group.is_hiragana
          );
          
          // Sauvegarder dans le cache et mettre à jour l'état
          saveToCache(CACHE_KEY_GROUPS, hiraganaGroups);
          setGroups(hiraganaGroups);
          
          // Charger les kanas pour chaque groupe
          await Promise.all(hiraganaGroups.map(loadKanasForGroup));
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Impossible de charger les groupes de kanas");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Organisation des kanas après chargement
  useEffect(() => {
    if (Object.keys(kanasByGroup).length === 0) return;

    // Regrouper tous les kanas de base (uniquement hiragana)
    const basicKanas: Kana[] = [];

    // Collecter toutes les variantes (uniquement hiragana)
    const allVariants = {
      dakuten: [] as KanaVariant[],
      handakuten: [] as KanaVariant[],
      yoon: [] as KanaVariant[],
      dakutenYoon: [] as KanaVariant[],
      handakutenYoon: [] as KanaVariant[],
      foreign: [] as KanaVariant[],
      foreignCombo: [] as KanaVariant[],
    };

    // Parcourir tous les groupes et organiser les kanas
    Object.values(kanasByGroup).forEach((groupKanas) => {
      // Ajouter les kanas de base (uniquement hiragana)
      groupKanas.forEach((kana) => {
        // Vérifier que c'est bien un hiragana
        if (
          isHiragana(kana.character) &&
          !["small", "°", "·", "″", "-"].some((keyword) =>
            kana.romaji.includes(keyword)
          )
        ) {
          basicKanas.push(kana);
        }

        // Classer les variantes (uniquement hiragana)
        if (kana.variants && kana.variants.length > 0) {
          kana.variants.forEach((variant) => {
            // Ne prendre que les variantes en hiragana
            if (!isHiragana(variant.character)) return;

            if (variant.variant_type === "dakuten") {
              allVariants.dakuten.push(variant);
            } else if (variant.variant_type === "handakuten") {
              allVariants.handakuten.push(variant);
            } else if (variant.variant_type === "yoon") {
              allVariants.yoon.push(variant);
            } else if (variant.variant_type === "dakuten-yoon") {
              allVariants.dakutenYoon.push(variant);
            } else if (variant.variant_type === "handakuten-yoon") {
              allVariants.handakutenYoon.push(variant);
            } else if (variant.variant_type === "foreign") {
              allVariants.foreign.push(variant);
            } else if (variant.variant_type === "foreign-combo") {
              allVariants.foreignCombo.push(variant);
            }
          });
        }
      });
    });

    // Log des statistiques de filtrage pour débogage
    console.log("Caractères hiragana trouvés:", basicKanas.length);
    console.log(
      "Caractères katakana filtrés:",
      Object.values(kanasByGroup)
        .flatMap((group) => group)
        .filter((kana) => isKatakana(kana.character)).length
    );

    // Trier les kanas de base par ordre d'affichage
    basicKanas.sort((a, b) => {
      // D'abord trier par groupe, puis par ordre d'affichage
      if (a.group_id !== b.group_id) {
        return a.group_id - b.group_id;
      }
      return a.display_order - b.display_order;
    });

    // Mettre à jour l'état
    setAllBasicKanas(basicKanas);
    setVariants(allVariants);
  }, [kanasByGroup]);

  // Fonction pour charger les kanas d'un groupe spécifique
  const loadKanasForGroup = async (group: KanaGroup) => {
    try {
      const cacheKey = CACHE_KEY_KANAS + group.group_id;
      
      // Vérifier si les kanas sont dans le cache
      const cachedKanas = getFromCache(cacheKey);
      
      if (cachedKanas) {
        console.log(`Utilisation des kanas en cache pour le groupe ${group.name}`);
        setKanasByGroup(prev => ({
          ...prev,
          [group.group_id]: cachedKanas
        }));
      } else {
        // Si pas en cache, faire l'appel API
        const response = await fetch(`/api/kanas/${group.group_id}`);
        if (!response.ok) {
          throw new Error(
            `Erreur lors du chargement des kanas pour le groupe ${group.name}`
          );
        }
        const kanas = await response.json();
        
        // Sauvegarder dans le cache et mettre à jour l'état
        saveToCache(cacheKey, kanas);
        setKanasByGroup(prev => ({
          ...prev,
          [group.group_id]: kanas
        }));
      }
    } catch (err) {
      console.error(`Erreur de chargement pour le groupe ${group.name}:`, err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <KanamiLoading
          romanji="Chargement des hiragana"
          japonais="ひらがなを読み込み中"
          english="Loading hiragana"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardBody>
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Card>
            <CardHeader>
              <KanaDisplayText
                romanji="Pratiquer les Hiragana"
                japonais="ひらがなを練習する"
                english="Practice Hiragana"
                element="h2"
                className="text-lg font-semibold mb-2 text-red-800 dark:text-red-500"
              />
            </CardHeader>
            <CardBody>
              <KanaDisplayText
                romanji="Testez vos connaissances avec nos exercices pratiques."
                japonais="知識をテストする"
                english="Test your knowledge with our practical exercises."
                element="p"
                className="mb-4 text-slate-700 dark:text-slate-300"
              />
              <Button
                as={Link}
                href="/#"
                className="mt-4 bg-red-700 hover:bg-red-800 text-white w-full"
                isDisabled
              >
                <KanaDisplayText
                  romanji="Pratiquer"
                  japonais="練習する"
                  english="Practice"
                  element="span"
                />
              </Button>
              {process.env.NODE_ENV === 'development' && (
                <Button 
                  onPress={clearCache}
                  className="mt-4 bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Rafraîchir les données
                </Button>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Carte regroupant tous les hiragana de base */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <KanaDisplayText
                romanji="Hiragana de base"
                japonais="基本のひらがな"
                english="Basic Hiragana"
                element="h3"
                className="text-lg font-semibold text-red-800 dark:text-red-500"
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Les 46 caractères hiragana de base
              </p>
            </CardHeader>
            <CardBody>
              <KanaTable kanas={allBasicKanas} />
            </CardBody>
          </Card>
        </div>

        {/* Section pour les variantes */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <KanaDisplayText
                romanji="Variantes de Hiragana"
                japonais="ひらがなのバリエーション"
                english="Hiragana Variants"
                element="h3"
                className="text-lg font-semibold text-red-800 dark:text-red-500"
              />
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dakuten */}
                <VariantTable
                  variants={variants.dakuten}
                  title="Dakuten (濁点)"
                />

                {/* Handakuten */}
                <VariantTable
                  variants={variants.handakuten}
                  title="Handakuten (半濁点)"
                />
              </div>

              {/* Combinaisons avec petits kana (yoon) */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-500 mb-4">
                  <KanaDisplayText
                    romanji="Combinaisons avec petits kana"
                    japonais="拗音 (ようおん)"
                    english="Combinations with Small Kana (Yōon)"
                  />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Yoon de base */}
                  <VariantTable variants={variants.yoon} title="Yōon de base" />

                  {/* Dakuten + Yoon */}
                  <VariantTable
                    variants={variants.dakutenYoon}
                    title="Dakuten + Yōon"
                  />

                  {/* Handakuten + Yoon */}
                  <VariantTable
                    variants={variants.handakutenYoon}
                    title="Handakuten + Yōon"
                  />
                </div>
              </div>

              {/* Sons étrangers */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-500 mb-4">
                  <KanaDisplayText
                    romanji="Sons étrangers"
                    japonais="外来音 (がいらいおん)"
                    english="Foreign Sounds"
                  />
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sons étrangers de base */}
                  <VariantTable
                    variants={variants.foreign}
                    title="Sons étrangers simples"
                  />

                  {/* Combinaisons pour sons étrangers */}
                  <VariantTable
                    variants={variants.foreignCombo}
                    title="Combinaisons pour sons étrangers"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HiraganaPageTrain;

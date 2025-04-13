"use client";

import { useState, useEffect } from "react";

interface Statistiques {
  utilisateurs: number;
  caracteres: number;
  niveaux: number;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<Statistiques>({
    utilisateurs: 0,
    caracteres: 0,
    niveaux: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Récupération des statistiques au chargement de la page
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/compteur');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error("Erreur lors de la récupération des statistiques");
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Fonction pour basculer l'état de connexion
  const toggleLoginState = () => {
    setIsLoggedIn(prevState => !prevState);
  };

  // Fonction pour formater les nombres (ex: 1000+ pour plus de clarté)
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}000+`;
    }
    return num.toString();
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-50 to-indigo-100 p-3 md:p-8">
      {/* Conteneur principal pour tout le contenu sauf le footer */}
      <div className="flex flex-col items-center w-full flex-1 justify-between">
        {/* Partie supérieure contenant l'en-tête, le titre et les cartes */}
        <div className="w-full flex flex-col items-center">
          {/* En-tête avec logo et bouton de connexion */}
          <div className="w-full flex justify-between items-center mb-6 md:mb-8 px-2 md:px-4">
            <div className="text-xl md:text-2xl font-bold text-indigo-600">
              KanaGame
            </div>
            <div className="flex items-center space-x-2">
              {/* Bouton temporaire pour basculer l'état de connexion */}
              <button 
                onClick={toggleLoginState} 
                className="p-1.5 md:p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all border border-gray-300"
                title={isLoggedIn ? "Se déconnecter" : "Se connecter"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  {isLoggedIn ? (
                    // Icône moins pour se déconnecter
                    <path 
                      fillRule="evenodd" 
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" 
                      clipRule="evenodd" 
                    />
                  ) : (
                    // Icône plus pour se connecter
                    <path 
                      fillRule="evenodd" 
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                      clipRule="evenodd" 
                    />
                  )}
                </svg>
              </button>
              
              <button className="px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base rounded-full bg-white text-indigo-600 font-semibold shadow-md hover:shadow-lg transition-all border border-indigo-200">
                {isLoggedIn ? "Mon Compte" : "Se connecter"}
              </button>
            </div>
          </div>

          {/* Titre principal et description */}
          <div className="text-center mb-8 md:mb-12 mt-4 md:mt-8 px-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-800">
              Apprenez les kanas{" "}
              <span className="text-green-500">facilement</span>
            </h1>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Un jeu interactif et amusant pour maîtriser les hiragana et
              katakana à votre rythme
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            {/* Cartes de navigation principales */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${!isLoggedIn ? 'sm:max-w-2xl md:max-w-2xl' : 'md:grid-cols-3'} gap-4 md:gap-6 w-full max-w-4xl px-2 md:px-0`}>
              {/* Carte Entraînement */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-green-500 flex flex-col">
                <div className="flex items-center mb-2 md:mb-3">
                  <div className="rounded-full bg-green-100 p-2 md:p-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-7 md:w-7 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold ml-3 text-gray-800">
                    Entraînement
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Pratiquez avec des exercices interactifs.
                </p>
              </div>

              {/* Carte Cours */}
              {isLoggedIn ? (
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500 flex flex-col">
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="rounded-full bg-blue-100 p-2 md:p-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-7 md:w-7 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold ml-3 text-gray-800">
                      Cours
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    Découvrez les kanas avec des leçons structurées.
                  </p>
                </div>
              ) : null}

              {/* Carte Classements */}
              {isLoggedIn ? (
              <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-purple-500 flex flex-col ${!isLoggedIn ? '' : 'sm:col-span-2 md:col-span-1'}`}>
                <div className="flex items-center mb-2 md:mb-3">
                  <div className="rounded-full bg-purple-100 p-2 md:p-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-7 md:w-7 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold ml-3 text-gray-800">
                    Classements
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Comparez vos progrès avec ceux des autres joueurs.
                </p>
              </div>
              ) : 
              <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-purple-500 flex flex-col ${!isLoggedIn ? '' : 'sm:col-span-2 md:col-span-1'}`}>
                <div className="flex items-center mb-2 md:mb-3">
                  <div className="rounded-full bg-purple-100 p-2 md:p-3 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-7 md:w-7 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold ml-3 text-gray-800">
                    Classements
                  </h2>
                </div>
                <p className="text-sm text-gray-600">
                  Visioner les progrès des joueurs,
                </p>
                <p className="text-sm text-gray-600">
                  Aller vous tenter de les battres ?
                </p>
              </div>
              }

            </div>
          </div>
        </div>

        {/* Bannière avec statistiques - maintenant au milieu */}
        <div className="bg-indigo-600 text-white rounded-lg md:rounded-xl shadow-lg w-full max-w-4xl p-4 md:p-6 mx-2 md:mx-0 my-12 md:my-16">
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <p className="text-xl md:text-3xl font-bold">...</p>
                </div>
              ) : (
                <p className="text-xl md:text-3xl font-bold">{formatNumber(stats.utilisateurs)}</p>
              )}
              <p className="text-xs md:text-sm">Utilisateurs</p>
            </div>
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <p className="text-xl md:text-3xl font-bold">...</p>
                </div>
              ) : (
                <p className="text-xl md:text-3xl font-bold">{stats.caracteres}</p>
              )}
              <p className="text-xs md:text-sm">Caractères</p>
            </div>
            <div>
              {isLoading ? (
                <div className="animate-pulse">
                  <p className="text-xl md:text-3xl font-bold">...</p>
                </div>
              ) : (
                <p className="text-xl md:text-3xl font-bold">{stats.niveaux}+</p>
              )}
              <p className="text-xs md:text-sm">Niveaux</p>
            </div>
          </div>
        </div>
      </div>

      {/* Petit pied de page - toujours en bas de page */}
      <div className="w-full py-4 text-xs md:text-sm text-gray-500 text-center px-2">
        © 2025 KanaGame - Apprenez les kanas de manière ludique - Tous droits réservés Theo.SLV
      </div>
    </main>
  );
}

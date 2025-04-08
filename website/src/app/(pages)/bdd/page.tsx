"use client";

import { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// Interface mise à jour pour correspondre à la réponse API actuelle
interface DBConnectionStatus {
  success: boolean;
  message: string;
  timestamp?: Date;
  stats?: {
    users: number;
    kanas: number;
    groups: number;
    variants: number;
    totalCharacters: number;
  };
  sampleGroups?: Array<{
    group_id: number;
    name: string;
    is_hiragana: boolean;
    _count: {
      kanas: number;
    };
  }>;
  dbInfo?: {
    url: string;
  };
  error?: string;
  suggestion?: string;
}

interface TableInfo {
  table_name: string;
  row_count: number;
}

interface TableSchema {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

interface TableData {
  [key: string]: unknown;
}

export default function DBStatusPage() {
  const [connectionStatus, setConnectionStatus] = useState<DBConnectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableSchema, setTableSchema] = useState<TableSchema[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"data" | "schema">("data");

  // Vérifier l'état de la connexion BDD
  useEffect(() => {
    const fetchDBStatus = async () => {
      try {
        const response = await fetch('/api/bdd-test');
        const data = await response.json();
        setConnectionStatus(data);

        if (data.success) {
          toast.success("Connexion à la base de données réussie");
        } else {
          toast.error("Échec de connexion à la base de données");
        }
      } catch (error) {
        setConnectionStatus({
          success: false,
          message: "Erreur lors de la communication avec l'API",
          error: String(error)
        });
        toast.error("Erreur lors de la communication avec l'API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDBStatus();
  }, []);

  // Récupérer la liste des tables via Prisma - adaptation pour l'API Prisma
  useEffect(() => {
    if (connectionStatus?.success) {
      const fetchTables = async () => {
        try {
          const response = await fetch('/api/bdd/tables');
          const data = await response.json();
          
          if (data.tables) {
            setTables(data.tables);
          } else {
            // Si l'API n'est pas encore mise à jour pour Prisma, utiliser les statistiques disponibles
            const prismaInfo = connectionStatus.stats;
            if (prismaInfo) {
              const mockTables = [
                { table_name: 'users', row_count: prismaInfo.users },
                { table_name: 'kanas', row_count: prismaInfo.kanas },
                { table_name: 'kana_groups', row_count: prismaInfo.groups },
                { table_name: 'kana_variants', row_count: prismaInfo.variants }
              ];
              setTables(mockTables);
            }
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des tables:", error);
          toast.error("Erreur lors de la récupération des tables");
          
          // Générer des données de secours à partir des statistiques
          const prismaInfo = connectionStatus.stats;
          if (prismaInfo) {
            const mockTables = [
              { table_name: 'users', row_count: prismaInfo.users },
              { table_name: 'kanas', row_count: prismaInfo.kanas },
              { table_name: 'kana_groups', row_count: prismaInfo.groups },
              { table_name: 'kana_variants', row_count: prismaInfo.variants }
            ];
            setTables(mockTables);
          }
        }
      };

      fetchTables();
    }
  }, [connectionStatus]);

  // Charger les données d'une table sélectionnée via Prisma
  const loadTableData = async (tableName: string) => {
    setSelectedTable(tableName);
    setDataLoading(true);

    try {
      // Récupérer le schéma de la table
      const schemaResponse = await fetch(`/api/bdd/schema?table=${tableName}`);
      const schemaData = await schemaResponse.json();
      
      if (schemaData.columns) {
        setTableSchema(schemaData.columns);
      } else {
        // Données de secours pour le schéma si l'API n'est pas encore mise à jour
        setTableSchema([
          { column_name: "id", data_type: "int", is_nullable: "NO" },
          { column_name: "name", data_type: "varchar", is_nullable: "NO" },
          { column_name: "created_at", data_type: "timestamp", is_nullable: "YES" }
        ]);
        toast("API de schéma pas encore implémentée avec Prisma", { icon: '⚠️' });
      }

      // Récupérer les données de la table
      const dataResponse = await fetch(`/api/bdd/data?table=${tableName}`);
      const responseData = await dataResponse.json();
      
      if (responseData.rows) {
        setTableData(responseData.rows);
      } else {
        // Données de secours si l'API n'est pas encore mise à jour
        setTableData([{ message: "Récupération des données non implémentée" }]);
        toast("API de données pas encore implémentée avec Prisma", { icon: '⚠️' });
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données de table:", error);
      toast.error("Erreur lors du chargement des données de table");
      setTableData([{ erreur: "Impossible de charger les données" }]);
    } finally {
      setDataLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Vérification de la connexion à la base de données...</span>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6">État de la base de données</h1>

      {/* Statut de la connexion - adapté pour la réponse de l'API Prisma */}
      {connectionStatus && (
        <div className={`border rounded-md p-4 mb-6 ${connectionStatus.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <h3 className={`font-semibold text-lg ${connectionStatus.success ? "text-green-700" : "text-red-700"}`}>
            {connectionStatus.success ? "✅ Connexion réussie" : "❌ Échec de connexion"}
          </h3>
          <div className="mt-2">
            <p>{connectionStatus.message}</p>
            {connectionStatus.error && <p className="text-red-600 mt-1">{connectionStatus.error}</p>}
            {connectionStatus.suggestion && <p className="text-amber-600 mt-1">{connectionStatus.suggestion}</p>}
            {connectionStatus.timestamp && <p className="text-sm mt-1">Horodatage: {new Date(connectionStatus.timestamp).toLocaleString()}</p>}
            
            {/* Informations Prisma */}
            {connectionStatus.success && connectionStatus.stats && (
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium mb-2">Statistiques de la base de données:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Utilisateurs: {connectionStatus.stats.users}</li>
                  <li>Kanas: {connectionStatus.stats.kanas}</li>
                  <li>Groupes: {connectionStatus.stats.groups}</li>
                  <li>Variantes: {connectionStatus.stats.variants}</li>
                  <li>Total caractères: {connectionStatus.stats.totalCharacters}</li>
                </ul>
              </div>
            )}
            
            {/* URL de connexion */}
            {connectionStatus.dbInfo && (
              <div className="mt-2 text-sm">
                <p>Connexion: {connectionStatus.dbInfo.url}</p>
              </div>
            )}
            
            {/* Échantillon de groupes */}
            {connectionStatus.success && connectionStatus.sampleGroups && connectionStatus.sampleGroups.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Échantillon de groupes:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {connectionStatus.sampleGroups.map(group => (
                    <div key={group.group_id} className="bg-gray-50 p-2 rounded-md">
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm">{group.is_hiragana ? "Hiragana" : "Katakana"} • {group._count.kanas} kanas</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Liste des tables et leur contenu */}
      {connectionStatus?.success && (
        <div className="space-y-6">
          <div className="border rounded-md shadow-sm">
            <div className="border-b p-4 bg-gray-50">
              <h2 className="font-semibold text-xl">Tables disponibles</h2>
            </div>
            <div className="p-4">
              {tables.length === 0 ? (
                <p>Aucune table trouvée dans la base de données.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {tables.map((table) => (
                    <button
                      key={table.table_name}
                      onClick={() => loadTableData(table.table_name)}
                      className={`p-3 rounded-md text-left ${
                        selectedTable === table.table_name
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <p className="font-medium">{table.table_name}</p>
                      <p className="text-sm opacity-90">
                        {table.row_count} {table.row_count > 1 ? "enregistrements" : "enregistrement"}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Affichage des données de la table sélectionnée */}
          {selectedTable && (
            <div className="border rounded-md shadow-sm">
              <div className="border-b p-4 bg-gray-50">
                <h2 className="font-semibold text-xl">Table: {selectedTable}</h2>
              </div>
              <div className="p-4">
                {dataLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500 mr-2" />
                    <span>Chargement des données...</span>
                  </div>
                ) : (
                  <div>
                    <div className="border-b mb-4">
                      <div className="flex">
                        <button 
                          onClick={() => setActiveTab("data")}
                          className={`px-4 py-2 ${activeTab === "data" ? "border-b-2 border-blue-500 font-medium" : ""}`}
                        >
                          Données
                        </button>
                        <button 
                          onClick={() => setActiveTab("schema")}
                          className={`px-4 py-2 ${activeTab === "schema" ? "border-b-2 border-blue-500 font-medium" : ""}`}
                        >
                          Structure
                        </button>
                      </div>
                    </div>

                    {activeTab === "data" && (
                      <div className="overflow-x-auto">
                        {tableData.length === 0 ? (
                          <p className="py-4">Cette table ne contient aucune donnée.</p>
                        ) : (
                          <table className="min-w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b">
                                {Object.keys(tableData[0]).map((column) => (
                                  <th key={column} className="text-left p-2 font-medium">{column}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                  {Object.values(row).map((value, i) => (
                                    <td key={i} className="p-2">
                                      {value === null
                                        ? <span className="text-gray-400 italic">NULL</span>
                                        : String(value)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}

                    {activeTab === "schema" && (
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left p-2 font-medium">Colonne</th>
                            <th className="text-left p-2 font-medium">Type de données</th>
                            <th className="text-left p-2 font-medium">Nullable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableSchema.map((column) => (
                            <tr key={column.column_name} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{column.column_name}</td>
                              <td className="p-2">{column.data_type}</td>
                              <td className="p-2">{column.is_nullable === "YES" ? "Oui" : "Non"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
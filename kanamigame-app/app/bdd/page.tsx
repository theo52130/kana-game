"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Spinner, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tabs, Tab, Pagination, Divider, Tooltip } from "@heroui/react";
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { ServerIcon as DatabaseIcon } from "@heroicons/react/24/solid";

// Types pour les données
interface TableInfo {
  table_name: string;
  row_count: number;
  error?: string;
}

interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
}

interface DBStatus {
  success: boolean;
  message: string;
  timestamp: string;
  stats: {
    users: number;
    kanas: number;
    groups: number;
    variants: number;
    totalCharacters: number;
  };
}

export default function BDDPage() {
  // États pour stocker les données
  const [connectionStatus, setConnectionStatus] = useState<DBStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableSchema, setTableSchema] = useState<ColumnInfo[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tables");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Récupérer le statut de connexion et la liste des tables au chargement
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        // Test de connexion
        const statusRes = await fetch("/api/bdd-test");
        const statusData = await statusRes.json();
        setConnectionStatus(statusData);

        // Liste des tables
        const tablesRes = await fetch("/api/bdd/tables");
        const tablesData = await tablesRes.json();
        if (tablesData.tables) {
          setTables(tablesData.tables);
          // Sélectionner la première table par défaut
          if (tablesData.tables.length > 0) {
            setSelectedTable(tablesData.tables[0].table_name);
          }
        }
      } catch (err) {
        setError("Erreur lors de la récupération des données initiales");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Récupérer le schéma et les données lorsqu'une table est sélectionnée
  useEffect(() => {
    const fetchTableData = async () => {
      if (!selectedTable) return;

      try {
        setIsLoading(true);
        
        // Récupérer le schéma
        const schemaRes = await fetch(`/api/bdd/schema?table=${selectedTable}`);
        const schemaData = await schemaRes.json();
        if (schemaData.columns) {
          setTableSchema(schemaData.columns);
        }

        // Récupérer les données
        const dataRes = await fetch(`/api/bdd/data?table=${selectedTable}`);
        const dataData = await dataRes.json();
        if (dataData.rows) {
          setTableData(dataData.rows);
        }

        setActiveTab("schema");
      } catch (err) {
        setError(`Erreur lors de la récupération des données pour la table ${selectedTable}`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedTable) {
      fetchTableData();
    }
  }, [selectedTable]);

  // Pagination
  const pages = Math.ceil(tableData.length / rowsPerPage);
  const items = tableData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Administration de la Base de Données</h1>

      {/* État de la connexion */}
      <Card className="mb-8">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DatabaseIcon className="w-6 h-6" />
            <h2 className="text-xl font-semibold">État de la Connexion</h2>
          </div>
          {connectionStatus && (
            <Chip 
              size="md"
              color={connectionStatus.success ? "success" : "danger"}
              startContent={connectionStatus.success ? <CheckCircleIcon className="w-4 h-4" /> : <XCircleIcon className="w-4 h-4" />}
            >
              {connectionStatus.success ? "Connecté" : "Déconnecté"}
            </Chip>
          )}
        </CardHeader>
        <CardBody>
          {isLoading && !connectionStatus ? (
            <div className="flex justify-center p-4">
              <Spinner size="md" />
            </div>
          ) : connectionStatus ? (
            <div className="space-y-2">
              <p><strong>Message:</strong> {connectionStatus.message}</p>
              <p><strong>Dernière vérification:</strong> {new Date(connectionStatus.timestamp).toLocaleString()}</p>
              
              {connectionStatus.stats && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                  <div className="bg-default-100 p-4 rounded-md text-center">
                    <p className="text-sm text-default-600">Utilisateurs</p>
                    <p className="text-2xl font-bold">{connectionStatus.stats.users}</p>
                  </div>
                  <div className="bg-default-100 p-4 rounded-md text-center">
                    <p className="text-sm text-default-600">Kanas</p>
                    <p className="text-2xl font-bold">{connectionStatus.stats.kanas}</p>
                  </div>
                  <div className="bg-default-100 p-4 rounded-md text-center">
                    <p className="text-sm text-default-600">Groupes</p>
                    <p className="text-2xl font-bold">{connectionStatus.stats.groups}</p>
                  </div>
                  <div className="bg-default-100 p-4 rounded-md text-center">
                    <p className="text-sm text-default-600">Variantes</p>
                    <p className="text-2xl font-bold">{connectionStatus.stats.variants}</p>
                  </div>
                  <div className="bg-primary-100 p-4 rounded-md text-center">
                    <p className="text-sm text-primary-600">Total Caractères</p>
                    <p className="text-2xl font-bold text-primary">{connectionStatus.stats.totalCharacters}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-danger-100 text-danger rounded-md">
              {error || "Impossible de vérifier l'état de la connexion."}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Liste des tables et sélection */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Tables de la Base de Données</h2>
        </CardHeader>
        <CardBody>
          {isLoading && tables.length === 0 ? (
            <div className="flex justify-center p-4">
              <Spinner size="md" />
            </div>
          ) : tables.length > 0 ? (
            <Table aria-label="Liste des tables de la base de données">
              <TableHeader>
                <TableColumn>NOM DE LA TABLE</TableColumn>
                <TableColumn>NOMBRE D'ENREGISTREMENTS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {tables.map((table) => (
                  <TableRow key={table.table_name} className={selectedTable === table.table_name ? "bg-primary-50" : ""}>
                    <TableCell>{table.table_name}</TableCell>
                    <TableCell>
                      {table.error ? (
                        <Chip color="danger" size="sm">{table.error}</Chip>
                      ) : (
                        <Chip color="default" size="sm">{table.row_count}</Chip>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        color={selectedTable === table.table_name ? "primary" : "default"}
                        onPress={() => setSelectedTable(table.table_name)}
                      >
                        Consulter
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-4 bg-warning-100 text-warning rounded-md">
              Aucune table disponible ou erreur lors du chargement.
            </div>
          )}
        </CardBody>
      </Card>

      {/* Détails de la table sélectionnée */}
      {selectedTable && (
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Table: {selectedTable}</h2>
              <Chip size="sm" color="primary">
                {tableData.length} enregistrements
              </Chip>
            </div>
            <Tabs 
              selectedKey={activeTab} 
              onSelectionChange={(key: React.Key) => setActiveTab(key as string)}
            >
              <Tab key="schema" title="Schéma de la Table" />
              <Tab key="data" title="Données" />
            </Tabs>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <Spinner size="md" />
              </div>
            ) : activeTab === "schema" ? (
              <Table aria-label={`Schéma de la table ${selectedTable}`}>
                <TableHeader>
                  <TableColumn>COLONNE</TableColumn>
                  <TableColumn>TYPE</TableColumn>
                  <TableColumn>NULLABLE</TableColumn>
                </TableHeader>
                <TableBody>
                  {tableSchema.map((column) => (
                    <TableRow key={column.column_name}>
                      <TableCell>{column.column_name}</TableCell>
                      <TableCell>{column.data_type}</TableCell>
                      <TableCell>
                        <Chip 
                          size="sm" 
                          color={column.is_nullable === "YES" ? "default" : "primary"}
                        >
                          {column.is_nullable === "YES" ? "Nullable" : "Non Nullable"}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table aria-label={`Données de la table ${selectedTable}`}>
                    <TableHeader>
                      {tableSchema.map((column) => (
                        <TableColumn key={column.column_name}>{column.column_name}</TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {items.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {tableSchema.map((column) => (
                            <TableCell key={column.column_name}>
                              {renderTableCellContent(row[column.column_name])}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-center mt-4">
                  <Pagination
                    total={pages}
                    page={page}
                    onChange={setPage}
                  />
                </div>
              </>
            )}
          </CardBody>
        </Card>
      )}

      {/* Affichage des erreurs */}
      {error && (
        <div className="mt-4 p-4 bg-danger-100 text-danger rounded-md flex items-center gap-2">
          <XCircleIcon className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
}

// Fonction pour afficher correctement le contenu des cellules
function renderTableCellContent(value: any): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-default-400 italic">null</span>;
  }
  
  if (typeof value === 'boolean') {
    return value ? 
      <Chip color="success" size="sm">Vrai</Chip> : 
      <Chip color="danger" size="sm">Faux</Chip>;
  }
  
  if (value instanceof Date) {
    return value.toLocaleString();
  }
  
  if (typeof value === 'object') {
    return (
      <Tooltip content={JSON.stringify(value, null, 2)}>
        <Button size="sm" variant="ghost">
          <InformationCircleIcon className="w-4 h-4" />
          Objet
        </Button>
      </Tooltip>
    );
  }
  
  // Pour les chaînes longues
  if (typeof value === 'string' && value.length > 50) {
    return (
      <Tooltip content={value}>
        <span>{value.substring(0, 50)}...</span>
      </Tooltip>
    );
  }
  
  return value.toString();
}
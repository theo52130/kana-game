# Creer backup
docker exec postgres-dev pg_dump -U kanagame_user_db -d kanagame_db > backup_kanagame.sql

# Réinitialiser la base de données
docker exec -i postgres-dev psql -U kanagame_user_db -d kanagame_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Importer les données depuis le fichier de sauvegarde
cat backup_kanagame.sql | docker exec -i postgres-dev psql -U kanagame_user_db -d kanagame_db

# Pour n'exporter que la structure (sans les données)
docker exec postgres-dev pg_dump -U kanagame_user_db -d kanagame_db --schema-only > schema_kanagame.sql

# Pour n'exporter que les données
docker exec postgres-dev pg_dump -U kanagame_user_db -d kanagame_db --data-only > data_kanagame.sql

# Pour exporter uniquement certaines tables
docker exec postgres-dev pg_dump -U kanagame_user_db -d kanagame_db -t kanas -t kana_groups > kanas_export.sql
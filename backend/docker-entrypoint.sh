#!/bin/sh
set -e

echo "Base de datos asumida como disponible (depends_on + healthcheck)."

echo "Aplicando migraciones de Prisma..."
npx prisma migrate deploy

if [ "$RUN_SEED" = "true" ]; then
  echo "Ejecutando seed de la base de datos..."
  npx prisma db seed || true
fi

echo "Iniciando servidor MuniSalud..."
exec node dist/server.js

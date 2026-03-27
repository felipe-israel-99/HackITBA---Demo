#!/bin/bash
# Reset completo para volver al estado base del demo
# Uso: ./scripts/reset-demo.sh

set -e

echo "=== Reseteando Git ==="
git reset --hard demo-base

echo "=== Reseteando Supabase ==="
# Borrar columnas agregadas por los prompts del demo (si existen)
SUPABASE_ACCESS_TOKEN=sbp_0917c39bcb298812963790ef5020ddcf54d2284a npx supabase db execute --project-ref ynprmtmbviktkssfwysc \
  "ALTER TABLE public.todos DROP COLUMN IF EXISTS priority;
   ALTER TABLE public.todos DROP COLUMN IF EXISTS due_date;
   DELETE FROM supabase_migrations.schema_migrations
     WHERE name LIKE '%add_priority%' OR name LIKE '%add_due_date%';"

echo "=== Listo! Estado base restaurado ==="
echo "Corré 'npm run dev' y probá el prompt de nuevo"

# Todo App - Setup

## 1. Crear proyecto en Supabase

1. Ir a https://supabase.com/dashboard y crear un nuevo proyecto
2. Copiar la **Project URL** y **anon key** de Settings > API
3. Crear `.env.local`:

```bash
cp .env.local.example .env.local
# Editar con los valores reales
```

## 2. Inicializar Supabase CLI y aplicar migración

```bash
npx supabase init
npx supabase link --project-ref <tu-project-ref>
npx supabase db push
```

## 3. Habilitar auth por email en Supabase

En el dashboard: Authentication > Providers > Email > Enable "Confirm email" (desactivar para testing rápido)

## 4. Correr en local

```bash
npm run dev
```

## 5. Deploy a Vercel

```bash
npx vercel --yes
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel --prod
```

---
name: vercel-deploy
description: Deploy the todo app to Vercel, manage env vars, and troubleshoot deployment issues
user_invocable: true
---

# Deploy a Vercel

## Deploy rapido a produccion

```bash
npx vercel --prod
```

## Primer deploy (si no esta linkeado)

```bash
npx vercel --yes          # linkea el proyecto y hace preview deploy
npx vercel --prod         # promueve a produccion
```

## Env vars

Las variables necesarias son:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Para agregar:
```bash
echo "<valor>" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "<valor>" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

Para listar:
```bash
npx vercel env ls
```

## Info del proyecto
- **URL produccion**: https://hackitba-nine.vercel.app
- **Vercel project**: felipes-projects-7ee1b425/hackitba

## Troubleshooting

### Build falla por env vars
Si el build falla con "supabaseUrl is required", verificar que las env vars estan configuradas en Vercel.

### Deploy no refleja cambios
Vercel cachea builds. Forzar rebuild:
```bash
npx vercel --prod --force
```

## Post-deploy
Despues de deployar, verificar que la app funciona con el skill `qa-playwright` apuntando a la URL de Vercel.

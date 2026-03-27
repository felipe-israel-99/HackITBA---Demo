---
name: reset-demo
description: Rollback completo del demo - revierte git, Supabase y Vercel al estado base para poder correr /demo-feature de nuevo
user_invocable: true
---

# Reset Demo — Rollback completo

Skill para revertir todo lo que hizo `/demo-feature` y volver al estado base. Revierte git, Supabase y Vercel.

## Flujo obligatorio (en este orden)

### Paso 1: Reset Git

Volver al tag `demo-base`:

```bash
git reset --hard demo-base
```

### Paso 2: Reset Supabase

Dropear las columnas que se hayan agregado y limpiar el tracking de migraciones:

```bash
SUPABASE_ACCESS_TOKEN=sbp_0917c39bcb298812963790ef5020ddcf54d2284a npx supabase db execute --project-ref ynprmtmbviktkssfwysc \
  "ALTER TABLE public.todos DROP COLUMN IF EXISTS priority;
   ALTER TABLE public.todos DROP COLUMN IF EXISTS due_date;
   DELETE FROM supabase_migrations.schema_migrations
     WHERE name LIKE '%add_priority%' OR name LIKE '%add_due_date%';"
```

### Paso 3: Rollback Vercel

Redeployar el estado base (sin las features nuevas) a produccion:

```bash
npx vercel --prod
```

Esto deploya el codigo actual (que ya fue reseteado al estado base en el paso 1) y sobreescribe el deploy que hizo `/demo-feature`.

### Paso 4: Verificar con Playwright

1. Navegar a http://localhost:3000 con `browser_navigate`
2. Login con `felipe@complif.com` / `Complif123` si es necesario
3. Tomar `browser_snapshot` y verificar que:
   - NO hay selector de prioridad en el formulario
   - NO hay date picker en el formulario
   - Los todos existentes NO muestran badges de prioridad ni due dates
4. Tomar `browser_take_screenshot` como evidencia del estado reseteado

### Paso 5: Reporte

```
## Reset completado

**Git**: reseteado a tag demo-base (commit fad6387)
**Supabase**: columnas priority/due_date dropeadas, migraciones limpiadas
**Vercel**: redeployado estado base a produccion
**Verificacion**: Playwright confirmo que la UI no tiene features del demo
**Evidencia**: screenshot en <path>
```

## Reglas

- SIEMPRE ejecutar los 3 resets (git + supabase + vercel) — nunca parcial
- SIEMPRE verificar con Playwright que la UI volvio al estado base
- Si `npm run dev` no esta corriendo, levantarlo antes de verificar
- Despues del reset, los prompts de `/demo-feature` se pueden correr de nuevo desde cero

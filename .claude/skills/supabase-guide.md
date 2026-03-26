---
name: supabase-guide
description: Explain how Supabase is used in this project - auth, database, RLS, migrations, and CLI
user_invocable: true
---

# Supabase en este proyecto

## Como se usa

### Auth
Supabase Auth maneja login y signup con email/password. El flujo:
1. `LoginForm.tsx` llama `getSupabase().auth.signUp()` o `.signInWithPassword()`
2. `page.tsx` escucha cambios con `onAuthStateChange` y renderiza segun el estado
3. Sign out con `getSupabase().auth.signOut()`

No se usa confirmacion por email (desactivado en el dashboard para simplificar el demo).

### Base de datos
Una sola tabla `todos` en Postgres:

```sql
create table public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  is_complete boolean default false not null,
  created_at timestamptz default now() not null
);
```

### Row Level Security (RLS)
Cada operacion (select, insert, update, delete) tiene una policy que verifica `auth.uid() = user_id`. Esto garantiza que un usuario nunca puede ver o modificar todos de otro usuario.

### Cliente
`src/lib/supabase.ts` exporta `getSupabase()` — un lazy singleton que crea el cliente solo cuando se llama por primera vez. Esto evita errores durante el build de Next.js (SSR).

Todos los componentes lo usan asi:
```typescript
import { getSupabase } from "@/lib/supabase";
const { data } = await getSupabase().from("todos").select("*");
```

## Supabase CLI

### Migraciones
Las migraciones estan en `supabase/migrations/`. Para crear una nueva:

```bash
npx supabase migration new <nombre>
```

Esto crea un archivo SQL vacio. Escribir el ALTER TABLE / CREATE TABLE y luego:

```bash
SUPABASE_ACCESS_TOKEN=<token> npx supabase db push
```

### Credenciales
- **Project ref**: ynprmtmbviktkssfwysc
- **Project URL**: https://ynprmtmbviktkssfwysc.supabase.co
- El access token se necesita para operaciones CLI (link, db push, etc.)

### Comandos utiles
```bash
npx supabase link --project-ref <ref>     # linkear proyecto
npx supabase db push                       # aplicar migraciones
npx supabase migration new <name>          # crear migracion
npx supabase db reset                      # resetear DB local
```

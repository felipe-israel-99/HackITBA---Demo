# Todo App - HackITBA Demo

Todo list app con Next.js 16 + Supabase + Tailwind CSS 4, pensada para demostrar cómo agregar features en vivo con **Claude Code** usando Supabase CLI, Vercel CLI y Playwright MCP.

## Tech Stack

| Tecnologia | Version | Uso |
|---|---|---|
| Next.js | 16.2 | Framework (App Router) |
| React | 19 | UI |
| Supabase | 2.x | Auth + Base de datos (Postgres) |
| Tailwind CSS | 4 | Estilos |
| TypeScript | 5 | Tipado |

## Que ya esta armado

### Auth
- Login y signup con email/password via Supabase Auth
- Manejo de sesion con `onAuthStateChange`
- Redirect automatico segun estado de auth

### CRUD de Todos
- Crear todos con titulo
- Marcar como completado / desmarcar
- Eliminar todos
- Listado ordenado por fecha de creacion (mas recientes primero)

### UI
- Layout responsive centrado (max 2xl)
- Header con email del usuario y boton de sign out
- Formulario de agregar todo con input + boton
- Cada todo muestra checkbox animado, titulo y boton de borrar (visible on hover)
- Spinner de carga

### Filtros
- All / Active / Completed
- Contador de items pendientes

### Base de datos
- Tabla `todos` con RLS (Row Level Security)
- Cada usuario solo ve/edita/borra sus propios todos
- Esquema:

```sql
todos
├── id          uuid (PK, auto-generated)
├── user_id     uuid (FK -> auth.users)
├── title       text
├── is_complete boolean (default: false)
└── created_at  timestamptz (default: now())
```

### Estructura del proyecto

```
src/
├── app/
│   ├── globals.css          # Tailwind + theme config
│   ├── layout.tsx           # Root layout con font Geist
│   └── page.tsx             # Entry point (auth check)
├── components/
│   ├── LoginForm.tsx        # Form de login/signup
│   ├── TodoApp.tsx          # App principal (header + filtros + lista)
│   ├── TodoItem.tsx         # Item individual (toggle + delete)
│   └── AddTodo.tsx          # Form para agregar todo
└── lib/
    ├── supabase.ts          # Cliente Supabase (lazy singleton)
    └── types.ts             # Interface Todo
supabase/
└── migrations/
    └── 20240101000000_create_todos.sql
```

## Que falta (features para el demo en vivo)

### Feature 1: Prioridades (high / medium / low)

**Lo que no tiene:**
- No hay columna `priority` en la base de datos
- No hay forma de elegir prioridad al crear un todo
- No hay indicador visual de prioridad en los items

**Lo que necesita:**
- Migracion Supabase: nueva columna `priority` (text, default 'medium')
- Selector de prioridad en `AddTodo.tsx` (3 botones con colores)
- Badge de color en `TodoItem.tsx` (rojo=high, amarillo=medium, verde=low)
- Actualizar `types.ts`

**Herramientas que usa:**
- Supabase CLI (migracion + push)
- Playwright MCP (verificacion visual)

**Prompt para Claude Code:**

```
/demo-feature

Agregá prioridades a los todos:
1. Crear migración de Supabase (add_priority) con columna `priority` (text, default 'medium', check in ('low','medium','high'))
2. Aplicar la migración
3. Actualizar el type Todo
4. Agregar un selector de prioridad en AddTodo (3 botones: Low=verde, Medium=amarillo, High=rojo)
5. Mostrar un badge de color en cada TodoItem según su prioridad

Criterio de validación: crear un todo con prioridad "high" y verificar que en el snapshot de Playwright aparece un badge o elemento con texto "high" asociado al todo creado.
```

---

### Feature 2: Due dates con alerta de vencido

**Lo que no tiene:**
- No hay columna `due_date` en la base de datos
- No hay date picker al crear un todo
- No hay indicador de todos vencidos

**Lo que necesita:**
- Migracion Supabase: nueva columna `due_date` (date, nullable)
- Date picker en `AddTodo.tsx`
- En `TodoItem.tsx`: mostrar fecha formateada y badge "Overdue" si `due_date < hoy`
- Actualizar `types.ts`

**Herramientas que usa:**
- Supabase CLI (migracion + push)
- Playwright MCP (verificacion visual)

**Prompt para Claude Code:**

```
/demo-feature

Agregá due dates a los todos:
1. Crear migración de Supabase (add_due_date) con columna `due_date` (date, nullable)
2. Aplicar la migración
3. Actualizar el type Todo
4. Agregar un date picker opcional en AddTodo
5. En TodoItem, mostrar la fecha y si está vencido (due_date < hoy) mostrar badge "Overdue" en rojo

Criterio de validación: crear un todo con due date de ayer y verificar que en el snapshot de Playwright aparece el texto "Overdue" asociado al todo creado.
```

---

### Notas para el demo en vivo

- Antes del demo: tener `npm run dev` corriendo y estar logueado en la app
- Tener Supabase linkeado (`npx supabase link` ya hecho)
- **Feature 1 es el mas visual** (badges de colores) - ideal para demostrar primero
- Feature 2 es buen segundo ejemplo si hay tiempo
- El skill `/demo-feature` se encarga de: implementar → testear con Playwright (con screenshots de evidencia) → deployar solo si el test pasa
- Cada prompt se ejecuta en ~2-3 minutos con Claude Code

## Setup

### Prerequisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Vercel](https://vercel.com) (para deploy)
- Supabase CLI (`npm install -g supabase`)

### 1. Configurar Supabase

```bash
# Crear proyecto en https://supabase.com/dashboard
# Copiar Project URL y anon key de Settings > API

cp .env.local.example .env.local
# Editar .env.local con los valores reales
```

### 2. Inicializar Supabase y aplicar migracion

```bash
npx supabase init
npx supabase link --project-ref <tu-project-ref>
npx supabase db push
```

### 3. Configurar auth

En el dashboard de Supabase: **Authentication > Providers > Email**
- Para testing rapido: desactivar "Confirm email"

### 4. Correr en local

```bash
npm run dev
```

Abrir http://localhost:3000

### 5. Deploy a Vercel

```bash
npx vercel --yes
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel --prod
```

## Scripts

| Comando | Descripcion |
|---|---|
| `npm run dev` | Dev server en localhost:3000 |
| `npm run build` | Build de produccion |
| `npm run start` | Serve del build |
| `npm run lint` | ESLint |

---
name: project-overview
description: Explain what this project is about, its architecture, features, and how it works
user_invocable: true
---

# Project Overview

Cuando el usuario pregunte de que trata el proyecto o como funciona, explicar lo siguiente:

## Que es
Una todo list app construida para el demo de **HackITBA**, que muestra como usar **Claude Code** para agregar features en vivo a una app real.

## Stack
- **Next.js 16** con App Router y Turbopack
- **Supabase** para auth (email/password) y base de datos Postgres con Row Level Security
- **Tailwind CSS 4** para estilos
- **TypeScript** para tipado
- **Vercel** para deploy
- **Playwright MCP** para testing visual

## Arquitectura
La app es client-side rendered. `page.tsx` chequea el estado de auth y renderiza `LoginForm` o `TodoApp`.

El cliente de Supabase es un lazy singleton (`getSupabase()` en `src/lib/supabase.ts`) para evitar errores durante SSR/build.

La tabla `todos` tiene RLS habilitado — cada usuario solo ve sus propios datos.

## Features actuales
- Auth: login/signup con email y password
- CRUD: crear, completar, borrar todos
- Filtros: all / active / completed
- UI responsive con Tailwind

## Features pendientes (para el demo)
1. **Prioridades** (high/medium/low con badges de color)
2. **Due dates** con alerta de "Overdue"

Cada feature se agrega con un solo prompt de Claude Code que:
- Crea migracion de Supabase
- Aplica la migracion
- Actualiza tipos y componentes
- Verifica con Playwright

## Para mas detalle
- `README.md` — documentacion completa
- `DEMO_PROMPTS.md` — prompts listos para el demo
- `SETUP.md` — instrucciones de setup

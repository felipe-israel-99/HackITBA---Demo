---
name: demo-feature
description: Add a new feature to the todo app, validate it with Playwright (with screenshot evidence), and deploy to Vercel only if tests pass
user_invocable: true
---

# Demo Feature — Build, Test, Deploy

Skill para agregar una feature nueva a la todo app con validacion automatica y deploy condicional.

## Flujo obligatorio

### Fase 1: Implementar la feature

1. Crear la migracion de Supabase: `npx supabase migration new <nombre>`
2. Escribir el SQL en el archivo de migracion generado
3. Aplicar la migracion: `SUPABASE_ACCESS_TOKEN=sbp_0917c39bcb298812963790ef5020ddcf54d2284a npx supabase db push`
4. Actualizar el type `Todo` en `src/lib/types.ts`
5. Actualizar los componentes necesarios (`AddTodo.tsx`, `TodoItem.tsx`, `TodoApp.tsx`)

### Fase 2: Validar con Playwright (OBLIGATORIO antes de deploy)

El usuario debe incluir en su prompt un **criterio de validacion** — algo concreto que Playwright pueda verificar en la UI. Ejemplos:
- "Verificar que aparece un badge rojo cuando la prioridad es high"
- "Verificar que aparece el texto 'Overdue' cuando la fecha es anterior a hoy"

Pasos de validacion:

1. **Screenshot ANTES** — tomar screenshot con `browser_take_screenshot` como evidencia del estado previo
2. **Navegar** a http://localhost:3000 con `browser_navigate`
3. **Login** si es necesario con email `felipe@complif.com` password `Complif123`
4. **Ejecutar el test case**:
   - Usar `browser_fill_form` y `browser_click` para interactuar con la app
   - Crear un todo que active la condicion del criterio de validacion
5. **Tomar snapshot** con `browser_snapshot` para capturar el estado de la UI
6. **Evaluar el criterio**: buscar en el snapshot el elemento esperado (badge, texto, color, borde, etc.)
7. **Screenshot DESPUES** — tomar screenshot con `browser_take_screenshot` como evidencia del resultado
8. **Veredicto**: declarar explicitamente si el test **PASO** o **FALLO**, citando que se encontro (o no) en el snapshot

### Fase 3: Deploy condicional

- **Si el test PASO** → ejecutar `npx vercel --prod` para deployar a produccion
- **Si el test FALLO** → NO deployar. Reportar que fallo, intentar fixear, y volver a la Fase 2

## Formato de reporte

Al finalizar, reportar:

```
## Resultado del demo

**Feature**: <nombre de la feature>
**Test**: <criterio de validacion>
**Resultado**: PASO / FALLO
**Evidencia**: screenshots tomados en <paths>
**Deploy**: Si (URL) / No (motivo)
```

## Reglas

- NUNCA deployar sin haber validado con Playwright primero
- SIEMPRE tomar screenshots como evidencia (antes y despues)
- SIEMPRE declarar explicitamente PASO o FALLO antes de decidir si deployar
- Si el test falla, intentar arreglar el codigo y re-testear (maximo 3 intentos)
- Despues del deploy, verificar la URL de produccion con Playwright tambien

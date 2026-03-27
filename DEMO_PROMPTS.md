# Demo Prompts - Features para agregar en vivo

Cada prompt usa el skill `/demo-feature` que implementa, testea con Playwright, y solo deploya si el test pasa.

---

## Feature 1: Prioridades (high/medium/low)

### Prompt:
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

## Feature 2: Due dates con alerta de vencido

### Prompt:
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

## Notas para el presentador

- Antes del demo: tener `npm run dev` corriendo y estar logueado en la app
- Tener Supabase linkeado (`npx supabase link` ya hecho)
- **Feature 1 es el mas visual** (badges de colores) - ideal para demostrar primero
- Feature 2 es buen segundo ejemplo si hay tiempo
- El skill `/demo-feature` se encarga de: implementar → testear con Playwright (con screenshots) → deployar solo si pasa
- Cada prompt debería ejecutarse en ~2-3 minutos con Claude Code

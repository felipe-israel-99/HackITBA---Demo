# Demo Prompts - Features para agregar en vivo

## Feature 1: Prioridades (high/medium/low)

### Prompt:
```
Agregá prioridades a los todos. Necesito:
1. Crear una migración de Supabase con `npx supabase migration new add_priority` que agregue una columna `priority` (text, default 'medium', check in ('low','medium','high')) a la tabla todos
2. Aplicar la migración con `npx supabase db push`
3. Actualizar el type Todo para incluir priority
4. Agregar un selector de prioridad al formulario de AddTodo (3 botones: low=verde, medium=amarillo, high=rojo)
5. Mostrar un badge de color en cada TodoItem según su prioridad
6. Abrir el browser con Playwright, navegar a http://localhost:3000, hacer login, crear un todo con prioridad high, y verificar que se muestra el badge rojo
```

---

## Feature 2: Due dates con alerta de vencido

### Prompt:
```
Agregá due dates a los todos. Necesito:
1. Crear una migración de Supabase con `npx supabase migration new add_due_date` que agregue una columna `due_date` (date, nullable) a la tabla todos
2. Aplicar la migración con `npx supabase db push`
3. Actualizar el type Todo para incluir due_date
4. Agregar un date picker opcional al formulario AddTodo
5. En TodoItem, mostrar la fecha formateada y si está vencido (due_date < hoy) mostrar el todo con borde rojo y un badge "Overdue"
6. Abrir el browser con Playwright, navegar a http://localhost:3000, hacer login, crear un todo con due date de ayer, y verificar que aparece el badge "Overdue"
```

---

## Notas para el presentador

- Antes del demo: tener `npm run dev` corriendo y estar logueado en la app
- Tener las credenciales de Supabase linkeadas (`npx supabase link` ya hecho)
- El Feature 1 es el más visual e impactante (badges de colores)
- El Feature 2 es bueno como segundo ejemplo si hay tiempo
- Cada prompt debería ejecutarse en ~2-3 minutos con Claude Code

---
name: qa-playwright
description: Run QA testing on the todo app using Playwright MCP to interact with the browser
user_invocable: true
---

# QA con Playwright

Usa Playwright MCP para hacer QA de la todo app.

## Steps

1. **Navegar** a la app con `browser_navigate` (http://localhost:3000 o la URL de Vercel)
2. **Tomar snapshot** con `browser_snapshot` para ver el estado actual de la UI
3. **Verificar auth**: si no hay sesion, hacer login con `browser_fill_form` + `browser_click` usando las credenciales: email `felipe@complif.com` password `Complif123`
4. **Probar CRUD**:
   - Crear un todo: llenar el input "What needs to be done?" y clickear "Add"
   - Verificar que aparece en la lista con `browser_snapshot`
   - Marcar como completado: clickear el checkbox del todo
   - Verificar que muestra line-through y el contador baja
   - Eliminar: clickear el boton de borrar (icono trash)
   - Verificar que desaparecio de la lista
5. **Probar filtros**: clickear "active", "completed", "all" y verificar que filtran correctamente
6. **Verificar responsive**: usar `browser_resize` para probar en mobile (375x667)
7. **Reportar resultados**: listar que paso y que fallo

## Notas
- Los elementos interactivos se identifican por su `ref` en el snapshot
- El boton de delete solo es visible on hover (opacity-0 → group-hover:opacity-100)
- Si hay features nuevas (priority, due dates), verificar que se muestran correctamente

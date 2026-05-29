# Workflow para Trabajar con IA

## Filosofia de Trabajo
- Priorizar cambios minimos, modulares y seguros.
- Explicar diagnostico antes de escribir codigo.
- No reescribir proyectos completos sin necesidad.
- Evitar dependencias innecesarias.
- Mantener consistencia de estilos.
- Preguntar si hay ambiguedad antes de implementar.

## Protocolo de Propuesta
Antes de generar o modificar codigo en una tarea nueva, responder con:
1. **Diagnostico:** breve estado actual.
2. **Faltante:** que falta implementar.
3. **Impacto:** lista de archivos a tocar.
4. **Plan:** cambios minimos propuestos.

Si el usuario confirma o pide avanzar, ejecutar el plan.

## Regla de Salida
Al terminar un hito:
- Actualizar `ai/context.md` si cambia el estado del proyecto.
- Crear un checkpoint en `ai/checkpoints/`.
- Mantener notas breves y utiles.

## Gestion Autonoma de Tareas
Las tareas viven en `ai/task/`.

1. **Seleccion:** si no se asigna una tarea especifica, usar el primer archivo `TODO-[nombre].md`.
2. **Inicio:** al comenzar, renombrar o crear como `DOING-[nombre].md`.
3. **Ejecucion:** marcar con `[x]` criterios cumplidos.
4. **Bloqueos:** si depende del usuario o de un error externo, documentar el motivo.
5. **Cierre:** al cumplir los criterios, renombrar a `DONE-[nombre].md`.

Actúa como un desarrollador experto en Angular y TypeScript. Tenemos un proyecto llamado "stg-app-mis-r22" y necesito realizar una migración de componentes UI y refactorización en una vista específica.

**CONTEXTO Y RUTAS:**
*   **Componente a modificar (Origen):** `src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v4` (Aquí actualmente se usa el componente legacy `<table-ajax>`).
*   **Componente destino (Nueva Tabla):** `src/app/core/screen/components/stg-table2` (Esta es la nueva tabla estandarizada que debemos implementar).

**TAREAS A REALIZAR:**

1. **Migración de la Tabla (`table-ajax` a `stg-table2`):**
   - Reemplaza el uso de la tabla antigua por la nueva `<stg-table2>`.
   - Mantén intactas todas las funcionalidades actuales de la tabla (columnas, renderizado de datos, eventos).
   
2. **Revisión de Paginación y Detalle:**
   - Asegúrate de que la paginación de la nueva tabla esté correctamente configurada y conectada con la lógica del componente `.ts`.
   - Mantén y adapta la funcionalidad del "detalle" (row detail / expansión de fila) para que funcione nativamente con la estructura de `stg-table2`.

3. **Unificación de Filtros (UI):**
   - Refactoriza el HTML de los filtros. Si actualmente están separados en diferentes cards (`<mat-card>` o divs similares), unifícalos todos dentro de un solo Card para limpiar la vista.

4. **Rediseño del filtro "Fecha Cierre":**
   - Cambia el diseño visual del filtro "Fecha Cierre". 
   - Objetivo: Menos texto y usar un ícono representativo. 
   - Referencia visual esperada: Debe verse igual al filtro de fecha que se encuentra en la ruta de la aplicación: `/app/reportes/repositorio/actividad-mensual/cartera/agro-mix-m`. Revisa los componentes estándar de nuestro proyecto (como `stg-finput` o datepickers) para lograr este diseño minimalista.

**INSTRUCCIONES DE ENTREGA:**
- Analiza el código actual de `report-cra-v4.component.html` y `report-cra-v4.component.ts`.
- Genera el código actualizado para ambos archivos.
- Asegúrate de mantener la tipización estricta en TypeScript y respetar las importaciones del core del proyecto.
- Explica brevemente los cambios realizados en los inputs/outputs de la nueva tabla respecto a la anterior.

A continuación, te proporciono el código actual de `report-cra-v4` para que comiences la migración:
[Pega aquí el código HTML actual de report-cra-v4]
[Pega aquí el código TS actual de report-cra-v4]
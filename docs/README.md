# Documentación de Strategos R22

Esta carpeta usa lectura progresiva. `stg` significa **Strategos**; no identifica un ambiente de staging. `AGENTS.md` contiene las reglas siempre aplicables; este archivo decide qué documento adicional necesita cada tarea.

## Índice

| Documento | Propósito | Leer cuando |
|---|---|---|
| [Mapa del proyecto](./guides/project-map.md) | Bootstrap, capas, dominios y orientación. | Primera lectura sobre R22. |
| [Navegación y sesión](./guides/navigation-and-session.md) | Routing, menú, OIDC, guards y usuario alternativo. | Cambios de login, permisos o rutas. |
| [Acceso remoto](./guides/remote-access.md) | Selección de helper, creación de Ant y consumo seguro. | Cambios de acciones o servicios remotos. |
| [Reportes](./guides/reports-overview.md) | Arquitectura moderna/legacy y decisiones de integración. | Mantenimiento de reportes. |
| [Crear reporte](./runbooks/create-report.md) | Runbook, bloqueo por contrato y Definition of Done. | Crear o automatizar reportes. |
| [Validar cambio](./runbooks/validate-change.md) | Controles, comandos y bloqueos conocidos. | Todo cambio funcional. |
| [Versiones de reportes](./reference/report-versions.md) | Registro de commits por reporte. | Consultar una versión funcional conocida. |

## Router por tarea

| Tarea | Obligatorio después de `AGENTS.md` | Condicional |
|---|---|---|
| Orientarse | `guides/project-map.md` | `reference/domain-inventory.md` |
| Login, routing, menú o permisos | `guides/navigation-and-session.md` | `reference/domain-inventory.md` |
| Crear/modificar Ant | `guides/remote-access.md` | `reference/winder-wire-protocol.md`, `reference/ant-catalog.md` |
| Mantener reporte | `guides/reports-overview.md` | `reference/reporting-legacy.md`, `reference/ui-contracts.md`, caso concreto |
| Crear reporte | `runbooks/create-report.md` | `recipes/report-ui.md` |
| Cambiar tabla/picker/dialog | `reference/ui-contracts.md` | `recipes/report-ui.md`, casos |
| Interpretar una captura o recurso local | `reference/integrations-and-operation.md` | Archivo bajo `references/`, si existe |
| Cambiar transporte Winder | `reference/winder-wire-protocol.md` | `reference/known-risks.md` |
| Validar cambio | `runbooks/validate-change.md` | `reference/integrations-and-operation.md` si aplica |

## Rutas rápidas

### Incorporación al proyecto

1. [Mapa del proyecto](./guides/project-map.md).
2. [Navegación y sesión](./guides/navigation-and-session.md) si aplica.
3. La guía del dominio que se vaya a modificar.

### Mantenimiento de reportes

1. [Reportes](./guides/reports-overview.md).
2. [Crear reporte](./runbooks/create-report.md) si es un reporte nuevo.
3. [Recetas UI](./recipes/report-ui.md) solo para tabla, jerarquía, picker o drilldown.
4. [Acceso remoto](./guides/remote-access.md) si cambia una acción o servicio remoto.

## Criterios documentales

- El código R22 es la fuente primaria. R26 aporta contexto histórico, pero no prueba el comportamiento actual de R22.
- El backend actual no se modifica desde este proyecto. Nombres de acción, aliases, parámetros, casing, rutas y formas de respuesta son contratos.
- Las guías no reproducen credenciales, tokens ni datos personales, aunque el código histórico contenga configuración versionada.
- Las referencias `archivo:línea` son ayudas del estado auditado; la ruta y el símbolo citado son la referencia estable.
- Cada documento comienza con `Propósito`, `Leer cuando`, `No es necesario para`, `Prerrequisitos` y `Canónico para`.
- La información exhaustiva vive bajo `reference/` y no es lectura obligatoria salvo que el router la indique.

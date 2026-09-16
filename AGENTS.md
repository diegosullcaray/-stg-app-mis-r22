# Reglas de trabajo en Strategos R22

Estas reglas complementan las instrucciones del workspace y aplican a todo `stg-app-mis-r22/`.

## Contexto

- `stg` significa **Strategos**; no significa staging.
- R22 es una aplicación Angular 14 en mantenimiento activo conectada al backend existente.
- El backend no puede modificarse como parte de tareas frontend ordinarias.
- R22 es histórico, pero los cambios nuevos deben ser completos, verificables y mantenibles dentro de sus contratos actuales.
- No trasladar automáticamente soluciones de R26 o CAT: comparten origen, pero difieren en Angular, Material, Winder, shell, tablas, pickers y estilos.

## Documentación progresiva

- El router documental es [`docs/README.md`](docs/README.md). Después de leer estas reglas, selecciona la ruta de lectura correspondiente a la tarea.
- Mapa del proyecto: [`docs/guides/project-map.md`](docs/guides/project-map.md).
- Acceso remoto: [`docs/guides/remote-access.md`](docs/guides/remote-access.md).
- Reportes: [`docs/guides/reports-overview.md`](docs/guides/reports-overview.md).
- Runbook para reportes nuevos: [`docs/runbooks/create-report.md`](docs/runbooks/create-report.md).
- Validación: [`docs/runbooks/validate-change.md`](docs/runbooks/validate-change.md).

No cargues referencias exhaustivas si el router no las indica. Actualiza el documento canónico cuando cambien contratos, rutas, arquitectura, componentes compartidos u operación.

## Contratos backend

- Tratar como exactos `actionRoute`, alias de respuesta, payload, casing, tipo, nulabilidad, unidad, formato de fecha, puerto lógico y `appId`.
- No normalizar nombres como `codrel`/`cod_rel`, `tipcod`/`tip_cod` o `Fecha`/`fec` sin evidencia específica del contrato.
- No inventar acciones, conexiones, jerarquías, códigos de reporte, aliases, campos ni metadatos.
- No descomentar o agregar `Authorization`, cambiar GET/POST, alterar `Winder-Params` ni modificar el cifrado sin una tarea de protocolo aprobada.
- No modificar el backend para compensar un problema del frontend.
- No introducir ni duplicar secretos, tokens, credenciales, datos personales o dumps reales en código nuevo, documentación, pruebas o logs.

## Reportes

- Implementar reportes nuevos bajo `src/app/modules/reportes/repositorio/`; usar `organizacion/` solo para composición de rutas.
- Preferir `ModRepService.getRegularTableResult` únicamente cuando backend confirme `table.regular`, `cod_rep` y `body.resultado`.
- Crear un Ant específico solo cuando exista un contrato de dominio confirmado que no corresponda a `table.regular`.
- Usar `stg-table2`, jerarquías, pickers y dialogs según los contratos documentados; no copiar módulos completos como CMG o Agro Mix.
- No extender el motor legacy para un reporte nuevo salvo requisito explícito de compatibilidad.
- Filtrar `onClickCell` por una clave accionable antes de abrir un drilldown.
- Cerrar loaders en éxito y error; representar carga, vacío, error y datos como estados distintos.
- Mantener números sin formato hasta la presentación y no concatenar datos backend en HTML.
- Validar escritorio y móvil. Para detalles complejos, considerar el patrón dialog en escritorio y ruta en móvil ya usado por R22.
- La automatización debe detenerse y preguntar cuando falte cualquier dato marcado como obligatorio en `docs/runbooks/create-report.md`.
- `references/` contiene recursos locales de consulta para agentes; solo se conserva su `.gitkeep`, no se versiona ni se copia su contenido a `src/assets/`.

## Convenciones técnicas

- Mantener compatibilidad con Angular 14, TypeScript 4.6 y RxJS 6.
- Usar `NgModule`, imports de operadores desde `rxjs/operators` y patrones existentes; no introducir APIs standalone o exclusivas de versiones posteriores.
- Usar nombres de archivo e imports con casing exacto. Linux distingue mayúsculas y minúsculas aunque Windows no lo haga.
- Mantener cambios pequeños. No consolidar generaciones de tablas, reportes o módulos como efecto lateral.
- Tipar contratos nuevos en el borde del dominio sin intentar tipar o reestructurar toda la aplicación.
- No crear adapters, stores, engines o componentes compartidos preventivos sin dos consumidores reales o un contrato transversal confirmado.
- En R22 se prioriza mantenimiento pragmático: aceptar riesgos heredados y aislarlos en el consumidor cuando una refactorización compartida no sea parte del alcance aprobado.
- Los datos simulados específicos de una pantalla deben permanecer en ese consumidor; no acoplar fixtures de dominio a servicios compartidos.
- Respetar cambios concurrentes y no revertir archivos ajenos.

## Validación

- Usar por defecto controles livianos y proporcionales al cambio: `npx tsc -p tsconfig.app.json --noEmit`, verificaciones focalizadas del contrato y `git diff --check`.
- No ejecutar Karma (`ng test`), lint ni `npm run build` salvo solicitud explícita del responsable o necesidad concreta que no pueda cubrirse con un control más liviano.
- Nunca ejecutar en paralelo build, Karma, lint u otros procesos de compilación Angular. R22 consume memoria elevada y dos compilaciones concurrentes pueden agotar la máquina compartida.
- Cuando se autorice un control pesado, ejecutar un solo comando a la vez y esperar su finalización antes de iniciar otro.
- No desactivar validaciones, budgets o tipos para ocultar errores.
- Si una prueba heredada está obsoleta o una herramienta no está disponible, registrar el comando y el fallo; no declarar éxito total.
- Revisar el diff final y confirmar que solo contiene el alcance previsto.
- No hacer commit, push, release ni despliegue sin solicitud explícita.

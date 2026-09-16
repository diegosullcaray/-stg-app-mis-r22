# Referencia: riesgos conocidos R22

**Propósito:** consolidar riesgos técnicos y operativos con una recomendación acotada para cada uno.
**Leer cuando:** se estime un cambio de dominio, protocolo, navegación, UI o integración externa.
**No es necesario para:** leer una pantalla sin modificar código ni contratos.
**Prerrequisitos:** [`docs/guides/project-map.md`](../guides/project-map.md), [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md) y [`docs/reference/ui-contracts.md`](ui-contracts.md).
**Canónico para:** riesgos observados en R22 y mitigaciones incrementales; no autoriza refactorizaciones amplias.

## Método

Estos riesgos provienen de código ejecutable, rutas y configuraciones observadas. La recomendación busca el cambio mínimo, reversible y verificable. No se incluyen secretos, tokens, correos, datos personales ni valores de conexión.

## Prioridad alta

### Winder conserva multipart

`WinderService` es mutable y `prepare` limpia `strands`, pero no `formData`; una llamada JSON posterior a una subida puede volver a `v1/pf` ([`src/app/core/data/remote/winder/winder.service.ts:15-25`](../../src/app/core/data/remote/winder/winder.service.ts#L15-L25), [`:71-82`](../../src/app/core/data/remote/winder/winder.service.ts#L71-L82)).

**Recomendación:** antes de corregir, añadir una prueba de secuencia archivo/POST con `HttpTestingController`; el cambio local candidato es limpiar `formData` al inicio de `prepare`.

### Payload en header

`Winder-Params` viaja sin cifrar y puede contener payload funcional; headers grandes pueden superar límites de proxy/servidor ([`src/app/core/data/remote/winder/winder.service.ts:43-63`](../../src/app/core/data/remote/winder/winder.service.ts#L43-L63)).

**Recomendación:** no registrar el header; limitar datos al contrato existente y probar tamaños representativos antes de cambiar serialización.

### HTML confiado en tablas

`stg-table2` usa `bypassSecurityTrustHtml` y `DynamicFormatPipe`; `table-multiheader` usa `innerHTML` en cabeceras/anotaciones ([`src/app/core/screen/components/stg-table2/stg-table2.component.ts:148-150`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L148-L150), [`src/app/core/screen/pipes/dynamic-format-pipe.ts:68-70`](../../src/app/core/screen/pipes/dynamic-format-pipe.ts#L68-L70), [`src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.html:16-38`](../../src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.html#L16-L38)).

**Recomendación:** al tocar una tabla, usar lista cerrada de formatos y escapar/sanitizar antes de marcar HTML seguro; no ampliar el bypass global.

### Contratos dinámicos

Acciones, aliases y payloads son strings y `any`; `IWinderResponse` solo tipa envelope y `code` externo como string, mientras resultados internos comparan números ([`src/app/core/data/remote/winder/winder.interface.ts:11-16`](../../src/app/core/data/remote/winder/winder.interface.ts#L11-L16)).

**Recomendación:** tipar el borde del dominio modificado y validar la forma concreta; no crear un modelo global especulativo ni renombrar aliases.

## Prioridad media

### Autorización no garantizada por frontend

La instalación de `Authorization` está comentada en Winder/login; `AuthGuard` puede aceptar una respuesta OIDC persistida y no es frontera de seguridad ([`src/app/core/data/remote/winder/winder.service.ts:64-68`](../../src/app/core/data/remote/winder/winder.service.ts#L64-L68), [`src/app/system/admin/guards/route-guard.guard.ts:20`](../../src/app/system/admin/guards/route-guard.guard.ts#L20)).

**Recomendación:** no descomentar ni cambiar autenticación como efecto lateral; validar autorización backend y tratar cualquier cambio de auth como iniciativa separada.

### Rutas hermanas `cartera`

Hay muchas ramas con el mismo prefijo. El router funciona mientras los hijos discriminen, pero una ruta vacía, comodín o duplicada puede capturar otra URL ([`src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts:11-108`](../../src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts#L11-L108)).

**Recomendación:** comprobar URL completa desde menú real, agregar al agrupador existente y probar todas las ramas; no consolidar sin aprobación.

### Menú remoto frágil

`Rep01Component` supone que existe `A_MOD_RCOM`; `RepSidenavComponent` construye el árbol solo en `ngOnInit` y navega directamente al `act_sec` remoto ([`src/app/modules/reportes/rep01.component.ts:32-35`](../../src/app/modules/reportes/rep01.component.ts#L32-L35), [`src/app/modules/reportes/components/rep-sidenav/rep-sidenav.component.ts:20-48`](../../src/app/modules/reportes/components/rep-sidenav/rep-sidenav.component.ts#L20-L48)).

**Recomendación:** validar menú incompleto y login alterno en pruebas del shell; no inventar una traducción de rutas sin evidencia backend.

### Jerarquía con supuestos implícitos

`hier-rem-selector` usa raíces y primer nivel, carga durante init y no presenta error; emite selección invertida ([`src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.ts:37-101`](../../src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.ts#L37-L101)).

**Recomendación:** representar vacío/error en el componente consumidor y documentar que `evt[0]` es la selección profunda.

En mantenimiento de una pantalla aislada se puede conservar este comportamiento y aceptar sus riesgos, siempre que el consumidor cancele sus solicitudes, limpie la tabla al cambiar filtros y no se modifique el contrato del selector para resolver una necesidad local.

### Suscripciones manuales

`stg-table2` no conserva/cancela la suscripción de `optionsObserver` y no implementa `OnDestroy` ([`src/app/core/screen/components/stg-table2/stg-table2.component.ts:120-127`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L120-L127)). El repositorio tiene otros patrones manuales.

**Recomendación:** en el componente tocado usar finalización o `takeUntil`; no hacer una limpieza masiva sin alcance y pruebas.

La misma regla aplica al loader: no convertir su referencia única en un coordinador global como efecto lateral de un reporte. Aislar la bandera y el cierre en el consumidor reduce el riesgo para los demás módulos.

### Ordenamiento y sticky incompletos

La tabla prepara `MatSort`, pero markup activo es HTML y headers de sort están comentados; la llamada a sticky de columnas también está comentada ([`src/app/core/screen/components/stg-table2/stg-table2.component.html:41-48`](../../src/app/core/screen/components/stg-table2/stg-table2.component.html#L41-L48), [`src/app/core/screen/components/stg-table2/stg-table2.component.ts:39-48`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L39-L48)).

**Recomendación:** no prometer sort/sticky solo porque exista el input; verificar interacción real en desktop y móvil antes de corregir.

## Integraciones y datos

### Configuración sensible en bundle

Servicios y environments contienen configuración necesaria para ejecutar en el navegador; el cifrado cliente es ofuscación, no secreto ([`src/app/core/shared/cypher.service.ts:24-33`](../../src/app/core/shared/cypher.service.ts#L24-L33), [`src/environments/environment.ts:4-28`](../../src/environments/environment.ts#L4-L28)).

**Recomendación:** nunca copiar valores a documentación, fixtures, logs o issues; revisar diffs antes de compartir y coordinar cualquier rotación.

### Storage global y limpieza amplia

Signin y storage legacy pueden ejecutar `localStorage.clear()`, afectando otras funciones del mismo origen ([`src/app/system/session/views/signin/signin.component.ts:39`](../../src/app/system/session/views/signin/signin.component.ts#L39), [`src/app/modules/reportes/legacy/support/services/storage.service.ts:23`](../../src/app/modules/reportes/legacy/support/services/storage.service.ts#L23)).

**Recomendación:** claves namespaced y eliminación selectiva en código nuevo; no añadir más `clear()`.

### Google Maps, Leaflet y Power BI

Google Maps depende de cómo el despliegue cargue la API; Leaflet requiere teselas de red; Power BI requiere token embed solicitado al backend ([`src/app/modules/shared/shared-cmc.module.ts:20`](../../src/app/modules/shared/shared-cmc.module.ts#L20), [`src/app/modules/reportes-e/powerbi/powerbi.component.ts:65-71`](../../src/app/modules/reportes-e/powerbi/powerbi.component.ts#L65-L71)).

**Recomendación:** probar cada integración desde el origen objetivo y mostrar estado de error; no añadir tokens estáticos ni acoplar la pantalla a la respuesta de un proveedor externo.

### Tracking depende de IP externa

Con flags activos, el tracking consulta un proveedor de IP y registra navegación en backend ([`src/app/system/admin/services/route-tracker.service.ts:10-25`](../../src/app/system/admin/services/route-tracker.service.ts#L10-L25)).

**Recomendación:** probar fallo de red sin bloquear la lógica funcional; no agregar datos personales a tracking o logs.

### Contexto capturado en constructor

Algunos Ants leen perfil/código/email una sola vez; un cambio de usuario alterno puede dejar contexto anterior ([`src/app/modules/presupuesto/compartido/servicios/mod-budget.service.ts:23-26`](../../src/app/modules/presupuesto/compartido/servicios/mod-budget.service.ts#L23-L26)).

**Recomendación:** probar login alterno con el servicio afectado y leer usuario vigente cuando el contrato lo permita; no cambiar alcance DI sin verificar instancias.

## Calidad y operación

### Tests heredados

Hay scripts de test, e2e y lint, pero pruebas raíz esperan markup/propiedades del scaffold anterior ([`src/app/app.component.spec.ts:23`](../../src/app/app.component.spec.ts#L23), [`e2e/src/app.e2e-spec.ts:11`](../../e2e/src/app.e2e-spec.ts#L11)).

**Recomendación:** ejecutar build primero, luego pruebas del área y smoke autenticado; registrar fallos heredados, no desactivar validaciones.

### Descarga mal tipada

El helper de recurso declara `IWinderResponse`, aunque runtime entrega `Blob` ([`src/app/core/data/remote/ant/ant-service.class.ts:30-57`](../../src/app/core/data/remote/ant/ant-service.class.ts#L30-L57)).

**Recomendación:** corregir la cadena Winder-Ant con overload/contrato `Observable<Blob>` cuando se toque descarga; no cambiar solo la anotación de un wrapper.

### Upload sin `dbFiles`

`StgFInputService.upload()` presupone que existe `dbFiles` y puede fallar antes del backend ([`src/app/core/screen/components/stg-finput/stg-finput.service.ts:58-61`](../../src/app/core/screen/components/stg-finput/stg-finput.service.ts#L58-L61)).

**Recomendación:** validar vacío antes de invocar upload y cubrirlo con prueba focalizada.

## Orden recomendado

1. Proteger primero wire protocol, multipart y datos sensibles.
2. Añadir tipos/validaciones solo en el dominio tocado.
3. Verificar ruta completa, menú y responsive.
4. Ejecutar build, pruebas focalizadas, lint disponible y smoke real.
5. Consultar [`docs/reference/domain-inventory.md`](domain-inventory.md), [`docs/reference/report-case-studies.md`](report-case-studies.md) y [`docs/runbooks/create-report.md`](../runbooks/create-report.md) antes de ampliar alcance.

## Evidencia de decisión

Cuando una recomendación implique cambiar código, conservar una prueba del contrato antes y después:

- Winder: método, sufijo de ruta, header, claves del strand, body `w` y response type.
- Reporting: action, alias, `cod_rep`, forma de headers/rows y renderer.
- UI: inputs, evento emitido, estados vacío/error y viewport.
- Routing: URL completa, módulo lazy, menú remoto y guard aplicable.
- Integración externa: carga, fallo de red y ausencia de credencial estática.

Comparar marcadores y formas, nunca credenciales o datos reales. La guía de creación de reportes contiene las comprobaciones operativas; este archivo solo consolida riesgos.

## Riesgos de mantenimiento legacy

CRA/CRS desplaza errores de configuración a runtime porque `ReportT` no valida búsquedas de mapas; `table-multiheader` combina formato, acciones y presentación; módulos duplicados pueden tener nombres engañosos ([`src/app/modules/reportes/legacy/support/services/report.ts:95-98`](../../src/app/modules/reportes/legacy/support/services/report.ts#L95-L98), [`src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.ts:83-109`](../../src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.ts#L83-L109)).

**Recomendación:** no ampliar el motor legacy para un reporte nuevo; si una URL existente debe preservarse, tocar únicamente mapa, plantilla o renderer implicado y probar sus consumidores.

## Riesgos de datos funcionales

CMG usa índices fijos, Agro Mix combina `meta1` con datos actuales e Incentivos3 selecciona acciones según clase de usuario ([`src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts:467-556`](../../src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts#L467-L556), [`src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts:877-894`](../../src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts#L877-L894), [`src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts:19-54`](../../src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts#L19-L54)).

**Recomendación:** conservar nombres y unidades del dominio, validar null/vacío y tipar transformaciones locales; no normalizar campos parecidos por intuición.

## Límites de alcance

No resolver estos riesgos mediante:

- refactorización general de Winder;
- migración completa de CRA/CRS;
- activación unilateral de Authorization;
- nuevo adapter global de respuestas;
- limpieza masiva de suscripciones o storage;
- ambiente alternativo no solicitado;
- desactivación de validaciones, tipos o budgets.

Cada cambio debe ser pequeño, reversible y acompañado por build. Si el riesgo requiere alterar backend, autenticación o rutas públicas, detenerse y tratarlo como iniciativa independiente.

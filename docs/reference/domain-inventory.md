# Referencia: inventario de dominios R22

**Propósito:** ubicar dominios, rutas, integraciones y fachadas remotas alcanzables desde la SPA.
**Leer cuando:** se cambie una ruta, se busque el dueño de una acción o se evalúe una integración.
**No es necesario para:** un cambio aislado de presentación sin navegación ni backend.
**Prerrequisitos:** [`docs/guides/project-map.md`](../guides/project-map.md), [`docs/reference/ant-catalog.md`](ant-catalog.md) y [`docs/reference/known-risks.md`](known-risks.md).
**Canónico para:** mapa de dominios/rutas/integraciones observado en el frontend R22.

## Arquitectura de entrada

La SPA tiene `/session/signin`, `/login` y `/app`; `/app` está protegido por `AuthGuard` y carga dominios lazy ([`src/app/app-routing.module.ts:12-54`](../../src/app/app-routing.module.ts#L12-L54)). El menú visible procede del backend: `list_sec` entrega una lista, `NavigationService` la ordena y enlaza por `cod_sec`/`cod_par`, y `Rep01Component` filtra `A_MOD_RCOM` ([`src/app/system/admin/services/navigation.service.ts:76-167`](../../src/app/system/admin/services/navigation.service.ts#L76-L167), [`src/app/modules/reportes/rep01.component.ts:32-35`](../../src/app/modules/reportes/rep01.component.ts#L32-L35)). Tener código de ruta no implica visibilidad ni autorización.

## Rutas de dominio

| Ruta | Capacidad | Estado y evidencia |
|---|---|---|
| `/app/desktop` | inicio/shortcuts | shell autenticado |
| `/app/reportes` | reportes modernos y legacy | lazy; `Rep01RoutingModule` ([`src/app/modules/reportes/rep01-routing.module.ts:6-40`](../../src/app/modules/reportes/rep01-routing.module.ts#L6-L40)) |
| `/app/consulta-fen` | consulta de riesgo territorial CENEPRED | módulo lazy top-level; usa `table.regular` mediante `ModRepService` |
| `/app/incentivos3`, `/app/incentivos4`, `/app/incentivos-a` | incentivos y calculadoras | tres variantes activas ([`src/app/app-routing.module.ts:61-65`](../../src/app/app-routing.module.ts#L61-L65)) |
| `/app/corresponsales` | transacciones/prospectos | lazy |
| `/app/presupuesto` | líneas y seguimiento | lazy, `RouteGuard` |
| `/app/actividades` | destino de crédito/registros | lazy, `RouteGuard` |
| `/app/kaypacha`, `/app/Kaypacha_`, `/app/Kaypacha__` | tres generaciones Kaypacha | casing/sufijos vigentes ([`src/app/app-routing.module.ts:100`](../../src/app/app-routing.module.ts#L100)) |
| `/app/administracion` | usuarios/configuración | lazy |
| `/app/dashboards` | reportes integrados/Power BI | lazy |
| `/app/ranking-k` | ranking | lazy |
| `/app/esg` | metas/usuarios/resúmenes ESG | lazy |
| `/app/analista` | dashboard/listas/detalle | lazy |
| `/app/sistematica` | resumen/desembolsos | lazy |
| `/app/prospecto` | prospecto corresponsal | lazy, fuera de analista |
| `/app/reasignacion-cart-cap` | reasignación | lazy |
| `/app/imparables` | `DummyComponent` | placeholder, no dominio funcional |

Evidencia consolidada de rutas: [`app-routing.module.ts:51-156`](../../src/app/app-routing.module.ts#L51-L156). `incentivos/`, `incentivos2/` y `cliente/` contienen código pero no todos tienen entrada raíz activa; no confundir presencia física con alcanzabilidad.

## Consulta FEN

`/app/consulta-fen` usa `ModRepService.getRegularTableResult` con código `CON_AGRO_FEN`. La búsqueda por UBIGEO envía `{ col: 0, val }` y la búsqueda por distrito `{ col: 3, val }`; `val` permanece como texto y UBIGEO conserva ceros iniciales. El alias es `body.resultado`, con `headers` vacío y `data` como arreglo de filas con `cod_ubi`, `des_dep`, `des_prov`, `des_dist`, `exp_mas`, `exp_inu`, `exp_seq` y `exp_pre`.

Las cabeceras y estilos de `stg-table2` son locales porque backend no entrega configuración visual. Ambas búsquedas completan los cards automáticamente solo cuando reciben una fila; con varias filas esperan una selección explícita en la matriz. Temporalmente la pantalla muestra `12 set. 2026` como fecha fija y la recomendación comercial aprobada cuando `exp_pre` es `Alto` o `Muy Alto`; ambas reglas deben sustituirse cuando backend defina metadata equivalente.

## Reportes

La forma moderna general es `/app/reportes/repositorio/{actividad-diaria|actividad-mensual}/{grupo}/{reporte}`; hay excepciones directas como `reporte-demo`, `ingresosApp` y `reprogramApp` ([`src/app/modules/reportes/organizacion/actividad-mensual/rep01-actividad-mensual-routing.module.ts:9-20`](../../src/app/modules/reportes/organizacion/actividad-mensual/rep01-actividad-mensual-routing.module.ts#L9-L20)). Cuenta de Resultados agrega el grupo mensual `rentabilidad` y la ruta `cuenta-resultados` ([`src/app/modules/reportes/organizacion/actividad-mensual/rep01-actividad-mensual-routing.module.ts:31-38`](../../src/app/modules/reportes/organizacion/actividad-mensual/rep01-actividad-mensual-routing.module.ts#L31-L38)).

La organización repite el prefijo `cartera` en varias ramas diarias/mensuales y el repositorio físico se reutiliza ([`src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts:11-108`](../../src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts#L11-L108), [`src/app/modules/reportes/organizacion/actividad-mensual/rep01-actividad-mensual-routing.module.ts:21-37`](../../src/app/modules/reportes/organizacion/actividad-mensual/rep01-actividad-mensual-routing.module.ts#L21-L37)). Legacy se expone en `leg/com`, `leg/prd`, `leg/sis` y `leg/vista-agr` ([`src/app/modules/reportes/rep01-routing.module.ts:15-30`](../../src/app/modules/reportes/rep01-routing.module.ts#L15-L30)).

Dominios visibles dentro de Reportes incluyen cartera, Agro Mix, CMG, desembolsos, monitores, rankings, seguros, tableros, usabilidad, agenda y reportes tabulares; la carpeta física no siempre coincide con la taxonomía de la ruta ([`src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts:11-123`](../../src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts#L11-L123)).

## Integraciones remotas

| Integración | Uso | Punto frontend |
|---|---|---|
| gateway Ant/Winder | session, admin y backends de dominio | `RESTPacket`, `WinderService`, Ants ([`src/app/core/data/remote/rest/rest-packet.class.ts:1-6`](../../src/app/core/data/remote/rest/rest-packet.class.ts#L1-L6)) |
| Google OIDC | identidad inicial | `SigninComponent`/`AuthService` |
| Power BI | reportes embebidos | solicita token al backend, no hay token estático ([`src/app/modules/reportes-e/powerbi/powerbi.component.ts:65-71`](../../src/app/modules/reportes-e/powerbi/powerbi.component.ts#L65-L71)) |
| Google Maps | resumen geográfico | `SharedCMCModule`/cliente ([`src/app/modules/shared/shared-cmc.module.ts:20`](../../src/app/modules/shared/shared-cmc.module.ts#L20)) |
| Leaflet/teselas | mapa de detalle Agro Mix | módulo `agro-mix-d` y estilos globales ([`src/app/modules/reportes/repositorio/agro-mix-d/agro-mix-d.module.ts:10`](../../src/app/modules/reportes/repositorio/agro-mix-d/agro-mix-d.module.ts#L10)) |
| proveedor de IP | tracking de navegación | `RouteTrackerService` cuando flags lo activan ([`src/app/system/admin/services/route-tracker.service.ts:10-25`](../../src/app/system/admin/services/route-tracker.service.ts#L10-L25)) |
| storage navegador | sesión, menú, perfil y estado | `LocalStoreService`/legacy storage |

Todo el tráfico Ant comparte la raíz configurable, pero las conexiones lógicas varían por servicio. Otras integraciones usan sus propios destinos ([`rest-packet.class.ts:3-6`](../../src/app/core/data/remote/rest/rest-packet.class.ts#L3-L6)).

## Dominio y fachada principal

| Dominio | Fachada/Ant | Lectura o mutación observada |
|---|---|---|
| Reportes | `ModRepService` | reportes legacy, `table.regular`, jerarquías |
| Incentivos | `ModIncentivos3Service` y variantes | resultados, calculadora, detalle, tasas, productividad |
| Corresponsales | `ModCorresponsalService` | lista y transacción POST |
| Actividades | `ModActividadesService` | destino y registro |
| Presupuesto | `ModBudgetService` | resultados, responsables, cartera, depósitos, seguros |
| Kaypacha | `ModKaypachaService` | dashboard, colaboradores, ranking |
| Analista | `ModSecService` | dashboard, listas, becas y categorización |
| Integrados | `ModReportesEService` | lista, usuarios y token Power BI |
| ESG | `ModFrameworkEsgService` | resúmenes, metas y usuarios |
| Sistemática | `ModSistematicaService` | tarjetas y desembolsos |
| Administración | `ModAdminService` | usuarios/configuración |
| Reasignación | `ModReportesEService` | listar, configurar, agregar/editar/eliminar |

Los contratos completos de acciones están en [`docs/reference/ant-catalog.md`](ant-catalog.md); no duplicar aquí sus payloads.

## Reglas de navegación e integración

1. Verificar la URL completa desde un menú real, no solo el nombre de carpeta.
2. Mantener casing y sufijos históricos.
3. No asumir que agregar una ruta la hace visible: debe coincidir con `act_sec` del menú backend.
4. No tratar guards como frontera de seguridad; el backend debe autorizar cada operación ([`src/app/system/admin/guards/route-guard.guard.ts:20`](../../src/app/system/admin/guards/route-guard.guard.ts#L20)).
5. Probar integraciones externas en el origen real: mapas, teselas, Power BI y proveedor de IP pueden fallar independientemente del backend Ant.
6. Para un cambio de reporte, consultar [`docs/reference/reporting-legacy.md`](reporting-legacy.md) y [`docs/reference/report-case-studies.md`](report-case-studies.md).

## Capas compartidas

`SharedCWCModule` contiene primitives STG de bajo nivel; `SharedCMCModule` agrega semántica MIS como jerarquías, pickers, forms en dialog y resumen de cliente ([`src/app/core/screen/components/shared-cwc.module.ts:64-81`](../../src/app/core/screen/components/shared-cwc.module.ts#L64-L81), [`src/app/modules/shared/shared-cmc.module.ts:7-41`](../../src/app/modules/shared/shared-cmc.module.ts#L7-L41)). CWC puede ser consumido por sistema y dominios; CMC conoce conceptos de negocio y no debe moverse a `core` sin contrato transversal.

El estado no usa NgRx: servicios singleton, `BehaviorSubject`, estado local y storage reparten menú, usuario, layout y pantallas ([`src/app/system/admin/services/navigation.service.ts:56-167`](../../src/app/system/admin/services/navigation.service.ts#L56-L167), [`src/app/system/admin/services/user.service.ts:17-56`](../../src/app/system/admin/services/user.service.ts#L17-L56)). Al cambiar provider o módulo, verificar si se crean instancias nuevas.

## Integraciones externas: límites

El backend remoto no está implementado en este repositorio. El navegador contiene únicamente el cliente y sus destinos configurables ([`src/app/core/data/remote/rest/rest-packet.class.ts:1-6`](../../src/app/core/data/remote/rest/rest-packet.class.ts#L1-L6)). Por ello:

- el contrato backend debe verificarse con una llamada existente;
- no inventar una URL alternativa ni un ambiente intermedio;
- no copiar credenciales de environments;
- no asumir que la disponibilidad de una librería implica disponibilidad de su API externa;
- distinguir token embed de Power BI de token de sesión MIS.

## Navegación y autorización

`NavigationService` acumula rutas y shortcuts; el escritorio navega internamente para tipo `1` y abre pestaña externa para tipo `2` ([`src/app/system/admin/services/navigation.service.ts:98-167`](../../src/app/system/admin/services/navigation.service.ts#L98-L167), [`src/app/system/admin/views/desktop/desktop.component.ts:42`](../../src/app/system/admin/views/desktop/desktop.component.ts#L42)). `RouteGuard` solo está activo en algunos dominios, mientras `canActivateChild`/`canLoad` están comentados ([`src/app/app-routing.module.ts:40-94`](../../src/app/app-routing.module.ts#L40-L94)).

Una nueva ruta debe considerar los tres niveles: existencia Angular, destino `act_sec` del menú y autorización del backend. La ruta por sí sola no concede acceso.

## Búsqueda rápida por responsabilidad

| Si necesitas... | Mira primero... |
|---|---|
| una acción remota | [`docs/reference/ant-catalog.md`](ant-catalog.md) |
| serialización HTTP | [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md) |
| una tabla o picker | [`docs/reference/ui-contracts.md`](ui-contracts.md) |
| un reporte legacy | [`docs/reference/reporting-legacy.md`](reporting-legacy.md) |
| comparar CMG/Agro Mix/Incentivos3 | [`docs/reference/report-case-studies.md`](report-case-studies.md) |
| evaluar impacto | [`docs/reference/known-risks.md`](known-risks.md) |
| crear un reporte | [`docs/runbooks/create-report.md`](../runbooks/create-report.md) |

El mapa evita inventarios preventivos: documenta el dominio que se va a tocar y confirma sus consumidores reales antes de crear una abstracción compartida.

## Criterio de alcanzabilidad

Un módulo se considera alcanzable solo si existe una entrada de routing activa y un consumidor/proveedor ejecutable. Un archivo presente, un import comentado o una ruta comentada no bastan. Este criterio explica por qué `incentivos2` se documenta como código interno no alcanzable y por qué algunas variantes de Reportes requieren confirmar menú remoto.

Al cambiar un dominio, revisar en conjunto `app-routing.module.ts`, el routing del módulo, `NavigationService`, providers y consumidores. Guardar la referencia de línea de cada capa en el documento del cambio, sin incluir respuestas reales ni credenciales.

## Integraciones por riesgo

Las integraciones Ant son contratos internos con backend real; las de Google, Power BI, mapas e IP dependen además de recursos externos y configuración de despliegue. Tratar un fallo de proveedor externo por separado de un error de serialización Winder.

La ruta `/app/dashboards/power-bi` obtiene su token embed del backend; el cliente no debe almacenar uno estático. El resumen de cliente y Agro Mix requieren APIs cartográficas disponibles en runtime. Tracking debe tolerar fallo del proveedor de IP sin bloquear una pantalla de negocio.

El documento [`docs/reference/known-risks.md`](known-risks.md) contiene recomendaciones para cada caso; esta sección solo ubica los límites de integración.

## Fuente de verdad

Las rutas se verifican en routing, las acciones en Ants y los consumidores en componentes/servicios. Cuando una de esas fuentes discrepa con un documento anterior, conservar la evidencia de código vigente y actualizar la referencia en una tarea documental separada.

Este criterio evita tratar archivos huérfanos o módulos comentados como funcionalidades disponibles.

El inventario no sustituye una prueba de navegación autenticada.

Las integraciones externas requieren configuración del despliegue.

El código local no implementa esos servicios remotos.

El alcance de este inventario es frontend R22.

No describe procedimientos backend.

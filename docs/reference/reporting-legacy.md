# Referencia: reporting legacy

**Propósito:** describir el ensamblaje CRA/CRS, `ReportT`, mapas, servicios y `table-multiheader` sin repetir recetas de operación.
**Leer cuando:** se mantenga una ruta `leg/*`, una plantilla histórica o se interprete una respuesta `reportData`/`regularData`.
**No es necesario para:** un reporte nuevo que use exclusivamente `table.regular` y componentes modernos.
**Prerrequisitos:** [`docs/guides/reports-overview.md`](../guides/reports-overview.md) y [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md).
**Canónico para:** contratos declarativos legacy y sus puntos de acoplamiento con el reporting moderno.

## Lugar del legacy

Reportes es un shell único con rutas modernas y legacy. `Rep01RoutingModule` carga RDA/RMA, control de cargas, usabilidad y vista agrupada como hijos del mismo shell ([`src/app/modules/reportes/rep01-routing.module.ts:6-40`](../../src/app/modules/reportes/rep01-routing.module.ts#L6-L40)). La separación física no representa dos aplicaciones: el servicio moderno importa `ReportType` de legacy y algunas plantillas mezclan fachadas ([`src/app/modules/reportes/compartido/servicios/mod-rep.service.ts:9-14`](../../src/app/modules/reportes/compartido/servicios/mod-rep.service.ts#L9-L14)).

## Ensamblaje de una ruta

Una ruta legacy asocia una plantilla CRA o CRS, `data.report`, una entrada de `cra-map.ts` o `crs-map.ts`, acciones construidas como `module + id`, y renderizadores/filtros. Consulte [`reports-overview.md`](../guides/reports-overview.md) para el encaje actual.

### CRA

CRA representa principalmente administración y tiene muchas variantes `ReportCraV*`. Por ejemplo, `cmg-cart` selecciona `ReportCraV1p1Component` y el identificador `rda/administracion/cartera/cmg_cartera`; el mapa define jerarquía, filtro, sufijo `_01`, tema, fecha y contenido ([`src/app/modules/reportes/legacy/comercial/rda/administracion/rda-administracion-routing.module.ts:162-167`](../../src/app/modules/reportes/legacy/comercial/rda/administracion/rda-administracion-routing.module.ts#L162-L167), [`src/app/modules/reportes/legacy/comercial/rda/administracion/cra-map.ts:860-879`](../../src/app/modules/reportes/legacy/comercial/rda/administracion/cra-map.ts#L860-L879)).

### CRS

CRS representa principalmente sectorista. `cartera` selecciona `ReportCrsV1Component` y el mapa define tablas `_01` y `_02` ([`src/app/modules/reportes/legacy/comercial/rda/sectorista/rda-sectorista-routing.module.ts:25-30`](../../src/app/modules/reportes/legacy/comercial/rda/sectorista/rda-sectorista-routing.module.ts#L25-L30), [`src/app/modules/reportes/legacy/comercial/rda/sectorista/crs-map.ts:52-72`](../../src/app/modules/reportes/legacy/comercial/rda/sectorista/crs-map.ts#L52-L72)). RMA tiene otro `cra-map.ts`; “CRA” no designa un único archivo ([`src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v3/report-cra-v3.component.ts:7-8`](../../src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v3/report-cra-v3.component.ts#L7-L8)).

## `ReportT`

`ReportT` normaliza una entrada de mapa en `module`, `jerar`, `filter`, `reportType`, `table[]` y `graphic[]`. `reportType` tiene `reportData` como valor predeterminado ([`src/app/modules/reportes/legacy/support/services/report.ts:4-31`](../../src/app/modules/reportes/legacy/support/services/report.ts#L4-L31), [`src/app/modules/reportes/legacy/support/services/report.ts:34-66`](../../src/app/modules/reportes/legacy/support/services/report.ts#L34-L66)).

El nombre remoto se concatena literalmente (`module + id`) y no se valida que el mapa haya encontrado una entrada ([`src/app/modules/reportes/legacy/support/services/report.ts:95-98`](../../src/app/modules/reportes/legacy/support/services/report.ts#L95-L98)). Un error de mapa suele aparecer en runtime, no al construir la ruta.

### Flujo CRA representativo

`ReportCraV1p1Component`:

1. lee `route.data.report`;
2. busca el mapa y crea `ReportT`;
3. convierte filtros en `SelectService`;
4. resuelve jerarquía con `ModRepService` moderno;
5. combina filtro y jerarquía;
6. solicita tablas/gráficos;
7. transforma a `TableMHService`/`GraphicService`.

La secuencia está implementada en [`src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component.ts:47-58`](../../src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component.ts#L47-L58), [`:65-99`](../../src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component.ts#L65-L99) y [`:108-120`](../../src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component.ts#L108-L120).

CRS v1 sustituye el selector jerárquico por autocompletado de asesor, pero conserva combinación de filtros, nivel y tabla ([`src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v1/report-crs-v1.component.html:1-4`](../../src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v1/report-crs-v1.component.html#L1-L4), [`src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v1/report-crs-v1.component.ts:58-66`](../../src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v1/report-crs-v1.component.ts#L58-L66)). CRS v6 ya usa `stg-table`, `table.regular` y picker de asesor ([`src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v6/report-crs-v6.component.html:34-51`](../../src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v6/report-crs-v6.component.html#L34-L51), [`src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v6/report-crs-v6.component.ts:214-279`](../../src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v6/report-crs-v6.component.ts#L214-L279)).

## Mapas y acciones

`ComercialService` es una fachada de intención:

| Método | Contrato |
|---|---|
| `getMixData` | acción determinada por `ReportType` |
| `getReportData` | `reportData`, marcado depreciado |
| `getRegularData` | `regularData` |
| `getGraphicData` | `graphicData` |
| `postRegularUpdate` | actualización legacy separada |

Evidencia: [`src/app/modules/reportes/legacy/comercial/comercial.service.ts:25-48`](../../src/app/modules/reportes/legacy/comercial/comercial.service.ts#L25-L48). El Ant legacy añade `hierarchy2`, con identidad de usuario y nivel opcional ([`src/app/modules/reportes/legacy/support/data/ant-mod-rep.service.ts:47-58`](../../src/app/modules/reportes/legacy/support/data/ant-mod-rep.service.ts#L47-L58)). Coexiste con `base_hier`/`level_hier` administrativo; no son nombres intercambiables.

| Acción | Alias | Forma consumida |
|---|---|---|
| `reportData` | `result` | `headers`, `body`, opcional `additional` |
| `regularData` | `result` | forma tabular histórica |
| `graphicData` | `result` | elementos con `series`, `categories`, nombres y unidad |
| `table.regular` | `resultado` | generalmente `data` y `headers`; a veces `meta1` |

`ModRepService.getData` crea `Strand(tipoRep, "result")` y agrega `cod_rep` ([`mod-rep.service.ts:53-64`](../../src/app/modules/reportes/compartido/servicios/mod-rep.service.ts#L53-L64)). `getRegularTableResult` crea `table.regular` con alias `resultado` ([`mod-rep.service.ts:66-72`](../../src/app/modules/reportes/compartido/servicios/mod-rep.service.ts#L66-L72)). No afirmar que los nombres implican tecnologías backend distintas ni que todos los headers son JSON.

## `table-multiheader`

`TableMHService` traduce configuración y cabeceras remotas. Toma `content`, `theme`, `width`, `params`, `style` y `filter_input`; aplana niveles, crea filas de cabecera, define columnas y conserva `additional` ([`src/app/modules/reportes/legacy/support/services/table.service.ts:100-143`](../../src/app/modules/reportes/legacy/support/services/table.service.ts#L100-L143), [`src/app/modules/reportes/legacy/support/services/table.service.ts:159-195`](../../src/app/modules/reportes/legacy/support/services/table.service.ts#L159-L195)).

`TableMultiheaderComponent` recibe un `config_table`, maneja carga/error, filtro local y paginador, y emite `refresh` en edición/acciones ([`src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.ts:16-36`](../../src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.ts#L16-L36), [`:83-109`](../../src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.ts#L83-L109)). La plantilla soporta `rowspan`, `colspan`, sticky y formatos `traffic-light`, `button`, `checkbox`, `radio`, `variation`, `ratio` y `localNumber` ([`src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.html:20-103`](../../src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.html#L20-L103)).

### Riesgos específicos

- Objetos dinámicos sin interfaces efectivas.
- `innerHTML` para cabeceras/anotaciones, con superficie XSS si el contenido no es confiable ([`src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.html:16-38`](../../src/app/modules/reportes/legacy/support/components/table/table-multiheader/table-multiheader.component.html#L16-L38)).
- Suscripciones y variantes repetidas dentro de plantillas.
- Temas numerados con semántica poco expresiva ([`src/app/modules/reportes/legacy/support/common/theme.module.ts:2-49`](../../src/app/modules/reportes/legacy/support/common/theme.module.ts#L2-L49)).
- Lógica de formato, presentación y acciones mezclada en la tabla.

## Regla de mantenimiento

Preservar `module`, `id`, `ReportType`, alias y forma de tablas mientras haya URLs activas. Para una ruta nueva, preferir el repositorio moderno y `table.regular` solo cuando el backend confirme ese contrato; no extender CRA/CRS ni crear un tercer adapter por conveniencia. Los riesgos consolidados están en [`docs/reference/known-risks.md`](known-risks.md), y el inventario de rutas en [`docs/reference/domain-inventory.md`](domain-inventory.md).

## Jerarquía y filtros

El legacy conserva dos mecanismos de jerarquía. `ModRepService` legacy ofrece `hierarchy2` con `jerar` textual y parámetros opcionales; el componente histórico `select-group` envía la secuencia y vuelve a consultar por nivel ([`src/app/modules/reportes/legacy/support/data/ant-mod-rep.service.ts:47-58`](../../src/app/modules/reportes/legacy/support/data/ant-mod-rep.service.ts#L47-L58), [`src/app/modules/reportes/legacy/support/components/select/select-group/select-group.component.ts:46-99`](../../src/app/modules/reportes/legacy/support/components/select/select-group/select-group.component.ts#L46-L99)).

Las plantillas CRA migradas traducen `jerar` mediante `getHierarchyConfig` y usan la jerarquía administrativa. Por tanto, el campo histórico y `base_hier`/`level_hier` coexisten; no sustituir uno por otro sin revisar todos los mapas.

Los filtros de mapa se convierten en `SelectService`; la selección de filtros y nivel se combina antes de pedir cada tabla o gráfico. Un filtro visible puede ser local aunque los datos finales provengan de reporting.

## Respuestas tabulares y gráficas

Una plantilla tabular lee `result.headers`, `result.body` y `result.additional` ([`src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component.ts:127-148`](../../src/app/modules/reportes/legacy/support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component.ts#L127-L148)). Una plantilla gráfica recorre `body.result` y entrega elementos a `GraphicService` ([`src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v2/report-crs-v2.component.ts:39-63`](../../src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v2/report-crs-v2.component.ts#L39-L63)).

`regularData` sigue activo en repositorio; Precosechas consume `body.result.body` ([`src/app/modules/reportes/repositorio/precosechas/rep01-precosechas.component.ts:85-100`](../../src/app/modules/reportes/repositorio/precosechas/rep01-precosechas.component.ts#L85-L100)). No asumir que un reporte que visualmente parece moderno tenga respuesta `table.regular`.

## Reglas para coexistencia

- Mantener la URL y el `data.report` cuando una plantilla siga siendo alcanzable.
- Verificar el mapa correcto: RDA, RMA y support pueden contener nombres parecidos.
- No copiar un mapa CRA para corregir una diferencia de CRS sin confirmar acción y parámetros.
- No cambiar `ReportType` por un string equivalente sin revisar importaciones cruzadas.
- No remover `table-multiheader` de una plantilla que dependa de `additional`, temas o formatos históricos.
- Para reportes nuevos, consultar primero [`docs/runbooks/create-report.md`](../runbooks/create-report.md) y preferir repositorio moderno.

## Señales de mantenimiento

La presencia de rutas comentadas, módulos con nombres heredados o `agro-mix-d` sin `loadChildren` activo no prueba que sean flujos disponibles ([`src/app/modules/reportes/organizacion/actividad-diaria/cero-cuotas/rep01-cero-cuotas-routing.module.ts:8-11`](../../src/app/modules/reportes/organizacion/actividad-diaria/cero-cuotas/rep01-cero-cuotas-routing.module.ts#L8-L11)). Antes de retirar código, contrastar router, menú remoto y consumidores.

La duplicación entre `ComercialService` y `ModRepService` moderno es deuda conocida. La recomendación acotada es neutralizar `ReportType` solo en una tarea separada, después de validar consumidores legacy; no crear un tercer adaptador.

## Tabla de decisión para diagnóstico

| Síntoma | Revisar primero |
|---|---|
| mapa no encontrado | `data.report`, `module + id` y archivo CRA/CRS |
| tabla vacía | alias `result`, `headers`, `body` y filtros combinados |
| gráfico sin series | `graphicData`, `body.result` y `GraphicService` |
| jerarquía incorrecta | `jerar`, `hierarchy2` frente a `base_hier`/`level_hier` |
| cabecera deformada | niveles del mapa y `TableMHService` |
| edición no refresca | `refresh`, `additional` y handler de `table-multiheader` |
| URL no abre | menú `act_sec`, rama `leg/*` y router padre |

No solucionar estos síntomas cambiando el alias global. El primer paso es capturar la respuesta sin datos personales y compararla con el consumidor concreto.

## Fuentes de evidencia

El routing de administración y sectorista demuestra qué plantilla se selecciona; los mapas muestran parámetros; `ReportT` normaliza; `ComercialService` delega; `ModRepService` serializa; los renderers consumen. Cada capa tiene responsabilidad distinta ([`src/app/modules/reportes/legacy/comercial/rda/administracion/rda-administracion-routing.module.ts:162-167`](../../src/app/modules/reportes/legacy/comercial/rda/administracion/rda-administracion-routing.module.ts#L162-L167), [`src/app/modules/reportes/legacy/support/services/report.ts:4-31`](../../src/app/modules/reportes/legacy/support/services/report.ts#L4-L31), [`src/app/modules/reportes/legacy/comercial/comercial.service.ts:29-48`](../../src/app/modules/reportes/legacy/comercial/comercial.service.ts#L29-L48)).

La guía moderna de creación está en [`docs/runbooks/create-report.md`](../runbooks/create-report.md); esta referencia evita duplicar sus pasos y conserva solo el contrato histórico.

## Dependencias que no deben confundirse

`ComercialService` no es el backend: es una fachada que selecciona métodos del Ant legacy. `ReportT` no obtiene datos: normaliza el mapa. `TableMHService` no define la ruta: transforma headers y contenido. `table-multiheader` no valida el contrato remoto: renderiza la configuración recibida.

Esta separación ayuda a localizar fallos sin cambiar capas incorrectas. Si falta una tabla, revisar primero respuesta y alias; si la tabla tiene cabeceras incorrectas, revisar mapa y `TableMHService`; si la URL no existe, revisar routing y menú.

Para una descripción transversal de Winder/Ant, usar [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md) y [`docs/reference/ant-catalog.md`](ant-catalog.md).

La evidencia de UI transversal y sus límites está en [`docs/reference/ui-contracts.md`](ui-contracts.md).

El catálogo de Ant contiene el inventario de `ModRepService` y `ComercialService` relacionados con estas rutas.

Las diferencias entre generaciones son contractuales, no solo visuales.

La ruta sigue siendo parte del contrato.

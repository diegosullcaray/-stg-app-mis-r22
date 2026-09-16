**Propósito:** Resumir la arquitectura, rutas y contratos de presentación del módulo Reportes de R22.
**Leer cuando:** Se incorpore, diagnostique o migre un reporte bajo `/app/reportes`.
**No es necesario para:** Cambios de un dominio que no use Reportes ni para modificar el backend reporting.
**Prerrequisitos:** Contrato de menú, ruta, jerarquía, datos, headers y drilldown confirmado por producto/backend.
**Canónico para:** Elegir ubicación, motor de reporte, componentes compartidos y estrategia de un reporte nuevo.

# Reportes en R22

## Shell y menú

`/app/reportes` cuelga de `AdminLayoutComponent` y carga `Rep01Module`. `Rep01Component` conserva cabecera, sidenav y un `router-outlet`; sus hijos incluyen rutas modernas y legacy. En escritorio el sidenav inicia abierto y mide `300px`; en móvil inicia cerrado, ocupa todo el ancho y se cierra al seleccionar.

El menú no es una constante frontend:

1. Login solicita `list_sec` y toma `body.menu_response`.
2. `NavigationService` ordena y arma el árbol mediante `cod_sec`, `cod_par`, `order_sec`, `desc_sec` y `act_sec`.
3. Reportes selecciona la raíz `A_MOD_RCOM`.
4. El sidenav navega directamente a `act_sec`.

Una ruta implementada pero ausente del menú no se muestra; una ruta remota sin módulo compatible falla al navegar. El frontend no debe simular permisos ni inventar URLs.

Referencias: [`../reference/ui-contracts.md`](../reference/ui-contracts.md), [`../reference/report-case-studies.md`](../reference/report-case-studies.md) y [`../runbooks/create-report.md`](../runbooks/create-report.md).

## Organización, repositorio, legacy y compartido

- **`organizacion/`:** taxonomía y lazy loading de `actividad-diaria` y `actividad-mensual`. La URL `repositorio` carga este árbol, aunque el código concreto vive en otro directorio.
- **`repositorio/`:** implementación moderna concreta: componentes, utilidades, tablas, dashboards, diálogos y servicios locales.
- **`compartido/`:** principalmente `ModRepService`, que ofrece jerarquía y operaciones históricas (`reportData`, `regularData`, `graphicData`) y `table.regular`. La UI común real está en `core/screen` y `modules/shared`.
- **`legacy/`:** RDA/RMA, mapas CRA/CRS, `ReportT`, plantillas, filtros, tablas y servicios históricos. Sigue bajo el shell común, no en un layout separado.

La separación física no implica independencia: el servicio moderno importa `ReportType` desde legacy y algunas plantillas legacy usan el servicio moderno. No extender el motor legacy para un reporte nuevo salvo compatibilidad explícita.

## Rutas y fan-out de `cartera`

La forma habitual es:

```text
/app/reportes/repositorio/{actividad-diaria|actividad-mensual}/{grupo}/{reporte}
```

Hay varias ramas hermanas con `path: 'cartera'` en diario y mensual. El siguiente segmento distingue los reportes y el router puede probar ramas hasta encontrar un hijo compatible. Esto describe un fan-out funcional, **no una colisión automática de URLs completas**. Sigue siendo frágil: una ruta vacía, comodín o hijo repetido puede capturar otra rama.

Para un reporte nuevo, agregar el hijo al agrupador existente confirmado; no crear otra entrada `cartera` por copia. Si el grupo no existe, crear y registrar uno solo después de confirmar la URL `act_sec` y revisar todas las ramas.

## Contratos de datos

Todos pasan por Strand, pero la respuesta efectiva depende de la acción y del reporte.

| Contrato | Alias | Forma resumida | Uso |
|---|---|---|---|
| `reportData` | `result` | `result.headers`, `result.body`, a veces `additional` | Predeterminado de `ReportT`; legacy |
| `regularData` | `result` | Forma tabular histórica | Reportes legacy y migraciones parciales |
| `graphicData` | `result` | gráficos con series/categorías | `GraphicService`/Highcharts legacy |
| `table.regular` | `resultado` | normalmente `data` y `headers`, a veces `meta1` | Moderno e híbrido |

### `table.regular`

`ModRepService.getRegularTableResult(codRep, params)` añade `cod_rep` al objeto recibido y llama `table.regular` con alias `resultado`. Usarlo solo si backend confirma acción, `cod_rep`, alias y forma concreta. Entregar un objeto nuevo por llamada porque el método lo muta.

`headers` puede ser un arreglo o JSON serializado; `data` puede ser objetos o arreglos contractuales. No asumir esquema universal, equivalencias de nombres (`codrel`/`cod_rel`, `tipcod`/`tip_cod`) ni unidades. Mantener números como números hasta la presentación.

#### Cuenta de Resultados

`TAB_CUE_RES_01` usa `table.regular`, alias `resultado` y payload `{ fecha, tip_cod, cod_rel }`. La primera solicitud usa `fecha: 'NOW'`; las siguientes usan una fecha recibida estrictamente como `YYYY-MM-DD`, convertida a `YYYYMMDD` exclusivamente para el backend. La pantalla consume las filas de `resultado.data` y el JSON serializado de `resultado.headers`, cuya forma confirmada es `{ preliminar: 0 | 1, fechas: string[] }`. Las fechas llegan como inicios de mes `YYYY-MM-01`, son la única fuente del selector mensual y se conservan como valores canónicos del selector. Cada fila incluye `style`, `cuenta_codigo`, `cuenta_nombre`, `orden` y once métricas: período del año anterior, período anterior, período actual, variación del período, dos acumulados, variación acumulada absoluta y porcentual, dos trimestres y total anual.

Las cabeceras visuales permanecen locales. `preliminar: 1` agrega `PRELIM.` al nombre del mes de `periodo_actual`; con `0` muestra solo el mes. Las métricas trimestrales permanecen en las filas backend, pero no se incluyen en las cabeceras visibles. La primera consulta usa `NOW` para obtener los metadatos y usa sus datos inmediatamente, seleccionando la primera fecha retornada sin repetir la consulta. Al cambiar el período, solo se recarga el reporte; la jerarquía seleccionada se conserva.

Los códigos `style` observados son `1` para detalle, `2` para cuenta principal y `3` para subtotal o resultado. Los indicadores de tráfico solo se muestran en estilos `2` y `3`; `CR018`, `CR035` y `CR068` representan costes y usan polaridad favorable inversa. `variacion_acumulado_pct` llega como fracción y se formatea como porcentaje únicamente en presentación.

Los códigos de referencia para análisis del reporte son `CR012` (Ingresos financieros), `CR021` (Margen de intereses), `CR067` (Margen neto) y `CR077` (Resultados de explotación). La vista actual no los presenta como tarjetas KPI para evitar ocupar espacio; la tabla continúa siendo la fuente de detalle. Las variaciones usan flechas y clases de texto opt-in, con colores pastel en las filas de resultado.

### Legacy

Una ruta suele combinar componente CRA/CRS, `data.report`, entrada de `cra-map`/`crs-map`, `ReportT`, filtros y acciones construidas como `module + id`. `ReportT` determina jerarquía, filtros, `reportType`, tablas y gráficos. `ComercialService` delega en `reportData`, `regularData` o `graphicData`; `table-multiheader` transforma cabeceras multinivel y filas para la plantilla.

Legacy soporta `rowspan`/`colspan`, columnas sticky y formatos declarativos, pero tiene objetos dinámicos, HTML confiado y lógica de presentación mezclada. No usarlo como base por defecto para una pantalla nueva.

## `stg-table2`

Recibe `dataSource`, `headers`, `options` y opcionalmente `optionsObserver`. `headers` es un árbol: cada hoja requiere `label` y `key`; los agrupadores usan `subs`. La tabla calcula `colspan`/`rowspan`, aplana hojas y ofrece formatos como `integer`, `integerTraffic`, `decimal`, `percent`, `trafficlight`, `link`, `chip`, `icon`, `pbs` y `truncate`. `integerTraffic` es opt-in para valores enteros o decimales mostrados sin decimales junto a un icono; no convertir `integer` globalmente ni concatenar HTML en las filas.

Emite:

- `onSelectRow`, solo si la selección está habilitada.
- `onClickCell`, siempre con `{ value, key, row }`; no toda celda es accionable.

La tabla no ofrece paginación integrada universal ni ordenamiento visible confiable. El consumidor debe controlar carga, error, vacío y datos, y destruir la tabla si cambia a error/vacío para no conservar headers obsoletos. Validar headers externos contra una lista cerrada de formatos y no insertar HTML construido con valores backend.

## Jerarquía, pickers y drilldown

### Jerarquía

La jerarquía moderna combina `base_hier(email, cod_jer)` para raíces y `level_hier(cod_jer, lvl_jer, tip_cod, cod_rels, params?)` para niveles. `hier-rem-selector` carga niveles bajo demanda, selecciona inicialmente y emite una cadena invertida: el elemento `selection[0]` es el más profundo. En móvil usa un diálogo.

La jerarquía legacy usa `hierarchy2` y `select-group`; ambas generaciones coexisten. Validar raíces, niveles vacíos y errores antes de confiar en el selector compartido.

### Pickers

- `SecPickerDialog2Service`: asesor/sectorista dentro de `tip_cod` y `cod_rel`, con `list_pick_01`, búsqueda y paginación.
- `TblPickerDialogService`: tabla seleccionable genérica; requiere headers, opciones, fuente limpiada y suscripción cerrada.

No asumir columnas, claves de búsqueda o endpoints. No abrir dos pickers simultáneos sobre la misma instancia mutable.

### Drilldown

Patrones observados:

1. Misma vista: cambia nivel/estado y recarga; breadcrumb local.
2. `MatDialog`: detalle efímero con datos de la fila.
3. Diálogo dirigido por ruta: wrapper y rutas hijas para subnavegación.

Filtrar `onClickCell` por un conjunto cerrado de claves accionables antes de abrir detalle. Un drilldown nuevo debe tener identificador estable, request y respuesta confirmados. Para detalle complejo, preferir dialog en escritorio y ruta en móvil; si la ruta debe recargarse, reconstruir estado desde un identificador no personal.

## Relación con Incentivos3

`Incentivos3` es un módulo hermano bajo `/app/incentivos3`, con shell y rutas propias. Usa `ModIncentivos3Service`, acciones `incentivos3.*`/`incentivos4.*`, `stg-table2`, jerarquía administrativa y pickers. No usa `ModRepService` ni `reportData`, `regularData` o `table.regular`.

El reporte `/app/reportes/.../incentivos/segui-incentivos-sec` es otro flujo: permanece en Reportes, usa `ModRepService`, jerarquía 10 y `regularData`. Imports residuales de Incentivos3 dentro de algunos detalles no prueban integración.

## Decisión para un reporte nuevo

1. Congelar nombre, slug, periodicidad, grupo, URL `act_sec`, menú, jerarquía, parámetros, fecha, respuesta, headers, paginación, pickers y drilldown. Si falta un dato obligatorio, detenerse.
2. Crear bajo `src/app/modules/reportes/repositorio/<slug>/` con módulo, routing, componente, estilos y spec.
3. Usar `ModRepService.getRegularTableResult` solo para `table.regular` confirmado con `cod_rep` y `body.resultado`.
4. Crear un Ant específico solo para una acción de dominio confirmada, otra conexión, respuesta no regular o varias operaciones cohesionadas; registrarlo en el módulo lazy.
5. Añadir el hijo al agrupador de organización existente. No duplicar `cartera` ni mover rutas activas.
6. Implementar estados distintos de carga, vacío, error y datos; cerrar loaders con éxito y error.
7. Añadir jerarquía, picker y drilldown únicamente con contratos concretos. Usar `stg-table2` con headers y formatos validados.
8. Probar menú, URL directa, filtros, jerarquía, respuesta vacía/error, detalle, escritorio y móvil; ejecutar typecheck y build.

Para el procedimiento detallado, consultar [`../runbooks/create-report.md`](../runbooks/create-report.md), [`../reference/reporting-legacy.md`](../reference/reporting-legacy.md), [`../reference/ui-contracts.md`](../reference/ui-contracts.md) y [`../reference/report-case-studies.md`](../reference/report-case-studies.md). Para wire protocol y catálogo Ant, consultar [`../reference/winder-wire-protocol.md`](../reference/winder-wire-protocol.md) y [`../reference/ant-catalog.md`](../reference/ant-catalog.md).

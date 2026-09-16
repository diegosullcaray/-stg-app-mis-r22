# Referencia: contratos UI transversales

**Propósito:** documentar los contratos observados de `stg-table2`, `hier-rem-selector`, pickers, diálogos y loaders.
**Leer cuando:** se construya una pantalla de datos, jerarquía, selección modal o estado de carga.
**No es necesario para:** modificar únicamente servicios Ant o rutas sin UI.
**Prerrequisitos:** Angular 14/Material 14 y [`docs/guides/reports-overview.md`](../guides/reports-overview.md).
**Canónico para:** inputs, eventos, formas de respuesta y límites de los componentes compartidos.

## `stg-table2`

### Entradas y eventos

| API | Tipo observado | Contrato |
|---|---|---|
| `options` | `any` | sobreescribe defaults |
| `dataSource` | `any[]` | filas y fuente Material |
| `headers` | `any[]` | árbol de columnas |
| `optionsObserver` | `Subject<any>` | actualizaciones incrementales |
| `enableSort` | `number` | convención `0/1` |
| `onSelectRow` | fila | solo con `body.selection.enabled` |
| `onClickCell` | `{value,key,row}` | se emite para cada clic |

Evidencia: [`src/app/core/screen/components/stg-table2/stg-table2.component.ts:17-35`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L17-L35), [`:120-127`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L120-L127), [`:164-183`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L164-L183).

Cada header puede tener `label`, `key`, `subs`, `style`, `cellStyle`, `cellStyleFn` y `format`. El componente recorre el árbol, calcula `colspan`/`rowspan` y aplana hojas para el cuerpo ([`src/app/core/screen/components/stg-table2/stg-table2.component.ts:388-461`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L388-L461), [`src/app/core/screen/components/stg-table2/stg-table2.component.html:4-15`](../../src/app/core/screen/components/stg-table2/stg-table2.component.html#L4-L15)). Defaults: cuadrícula, cabecera sticky, cuatro skeletons y hover/selección desactivados ([`src/app/core/screen/components/stg-table2/stg-table2.util.ts:1-49`](../../src/app/core/screen/components/stg-table2/stg-table2.util.ts#L1-L49)).

La selección usa `SelectionModel` exclusivo. Con `body.selection.allowDeselect: true` conserva el toggle histórico; un consumidor puede enviar `false` de forma opt-in para mantener seleccionada la fila cuando se repite el clic. `onSelectRow` continúa emitiendo la fila y no cambia su payload.

### Formatos

Las hojas llegan a `DynamicFormatPipe`. Tipos observados: `custom`, `link`, `time`, `chip`, `icon`, `integer`, `integerTraffic`, `decimal`, `percent`, `trafficlight`, `pbs` y `truncate` ([`src/app/core/screen/pipes/dynamic-format-pipe.ts:51-70`](../../src/app/core/screen/pipes/dynamic-format-pipe.ts#L51-L70), [`:73-121`](../../src/app/core/screen/pipes/dynamic-format-pipe.ts#L73-L121), [`:125-250`](../../src/app/core/screen/pipes/dynamic-format-pipe.ts#L125-L250)).

`chip` admite `params.format: 'text'` de forma opt-in para etiquetas textuales. El valor se escapa antes de construir el HTML confiable; `contStyleFn` y `textStyleFn` siguen siendo funciones locales controladas por el consumidor. Los formatos numéricos existentes (`integer`, `decimal`, `percent` y `pen`) conservan su comportamiento.

`integerTraffic` es un formato opt-in para enteros que necesitan mostrar el valor junto a un icono `lens`. Usa `params.trafficFn(value)` para decidir `green`, `red` u `orange`, mantiene el dato original como número y no multiplica por 100. Cuenta de Resultados lo usa en sus columnas `vs`; no extender `integer` globalmente solo para habilitar semáforos.

`integer` e `integerTraffic` aceptan entradas numéricas decimales y redondean únicamente la representación visual a cero posiciones. No mutar, truncar ni convertir el valor fuente antes de entregarlo al pipe; el semáforo y los estilos pueden evaluar el decimal original.

`integerTraffic` admite `params.indicator: 'arrow'`, `params.colorValue: true` y `params.softColors` como opciones opt-in. El modo arrow muestra `▲`/`▼` y el valor absoluto, coloreando indicador y valor cuando se solicita; `softColors` usa tonos pastel para filas oscuras. Sin esos parámetros conserva el indicador `lens` existente y sus clases de icono de 19 px.

### Preset light opt-in

`src/app/core/screen/base/stg-table2-presets.ts` expone `stgLightTable2Config` y `createStgLightTable2Config(overrides)`. Es un override parcial para `stg-table2`: aclara la cabecera, usa bordes inferiores, habilita un hover suave y compacta la tabla. El consumidor debe usar la factory antes de agregar funciones locales; no mutar la constante ni modificar `stgDefaultTable2Config`. Los reportes que no envían este preset conservan sus estilos actuales.

## `stg-window-bar-m`

Además de `items`, `title`, `showTitle`, `icon`, `placeholder`, `disabled`, `ngModel` y `selectionChange`, acepta opcionalmente `subtitle`, `dropdownChipText` y `config`. `dropdownChipText` es texto visual controlado por el consumidor y se renderiza entre título y dropdown. `config` usa `StgWindowBarMConfig` de `src/app/core/screen/base/stg-window-bar-m.config.ts` para estilos de header, título, subtítulo, chip, trigger, menú y opciones, además de visibilidad de iconos y responsive opt-in. Sin configuración, el componente conserva sus defaults actuales y el contrato `{ val, label }`.

`responsive: 'stack-md'` apila la barra hasta 959 px y `stack-sm` hasta 599 px. La configuración es visual; no cambia el ControlValueAccessor ni emite eventos cuando el consumidor asigna programáticamente el valor inicial.

El consumidor debe filtrar `onClickCell` por una lista cerrada de keys accionables; la tabla no interpreta metadata de acción y emite clics de celdas no accionables ([`src/app/modules/reportes/repositorio/usabilidad_comercial/usa_come.component.ts:139-151`](../../src/app/modules/reportes/repositorio/usabilidad_comercial/usa_come.component.ts#L139-L151)). No hay paginación integrada; se agrega local o remotamente según pantalla.

## Jerarquía remota

`ModSysAdminService` expone `base_hier(email, cod_jer)` para raíces y `level_hier(cod_jer, lvl_jer, tip_cod, cod_rels, params?)` para el siguiente nivel ([`src/app/core/data/remote/instances/mod-sys-admin.service.ts:24-43`](../../src/app/core/data/remote/instances/mod-sys-admin.service.ts#L24-L43)).

`hier-rem-selector` recibe:

```ts
{
  roots,
  cod_hier,
  max_lvl,
  dlg_tlt,
  params_hier?: { key, val }
}
```

Inicializa con raíces, carga niveles de forma perezosa, selecciona automáticamente el primer elemento y emite la cadena invertida; `evt[0]` es la selección más profunda ([`src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.ts:37-101`](../../src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.ts#L37-L101)). En escritorio muestra selects consecutivos; en móvil resume la última selección y abre esos selects en diálogo ([`src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.html:1-50`](../../src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.html#L1-L50)).

El componente presupone raíces/niveles no vacíos, no muestra error y dispara carga durante inicialización. Recomendación: representar vacío/error en el consumidor y distinguir selección automática de interacción sin alterar el payload backend.

## Pickers de asesor

`SecPickerDialogComponent` está depreciado a favor del picker genérico, pero Reportes CRS v6 lo usa con `tip_cod`/`cod_rel` ([`src/app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component.ts:11-18`](../../src/app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component.ts#L11-L18), [`src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v6/report-crs-v6.component.ts:255-279`](../../src/app/modules/reportes/legacy/support/components/template/crs/report-crs-v6/report-crs-v6.component.ts#L255-L279)). Consulta `list_pick_01`, filtra localmente por nombre, pagina de diez en diez y devuelve la fila seleccionada ([`src/app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component.ts:53-115`](../../src/app/modules/shared/components/sec-picker-dialog/sec-picker-dialog.component.ts#L53-L115)).

`SecPickerDialog2Service` adapta la misma acción a `TblPickerDialogService` y publica la selección por `ReplaySubject` ([`src/app/modules/shared/services/sec-picker-dialog2.service.ts:70-119`](../../src/app/modules/shared/services/sec-picker-dialog2.service.ts#L70-L119)). No mezclar la fila devuelta con el array invertido del selector jerárquico.

## Diálogos y drilldown

Se observan tres patrones:

1. **Dialog de selección:** abre Material, devuelve una fila y el padre continúa el flujo; ejemplo picker de asesor.
2. **Dialog de detalle:** recibe datos, muestra tabla/paginación y puede cambiar a mapa; Agro Mix extrae `HLATITU`/`HLONGIT` y usa Leaflet ([`src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.ts:117-158`](../../src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.ts#L117-L158)).
3. **Drilldown en la misma vista:** `onClickCell` cambia nivel/estado, vuelve a solicitar y mantiene breadcrumb local; Agro Mix lo implementa en [`src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts:317-342`](../../src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts#L317-L342) y [`:849-865`](../../src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts#L849-L865).

El estado de drilldown no queda en URL ni sobrevive recarga. Para una nueva acción, validar key antes de abrir detalle y considerar ruta móvil cuando el dialog sea complejo.

## Dialogs/loaders

`SharedCWCModule` exporta loaders, alertas y confirmaciones; `SharedCMCModule` agrega selectores, dialogs y loader vacío ([`src/app/core/screen/components/shared-cwc.module.ts:64-81`](../../src/app/core/screen/components/shared-cwc.module.ts#L64-L81), [`src/app/modules/shared/shared-cmc.module.ts:7-41`](../../src/app/modules/shared/shared-cmc.module.ts#L7-L41)). Los servicios `StgAppLoaderService` y `StgAppConfirmService` se proveen en root y abren dialogs Material ([`src/app/core/screen/components/stg-app-loader/stg-app-loader.service.ts:13`](../../src/app/core/screen/components/stg-app-loader/stg-app-loader.service.ts#L13), [`src/app/core/screen/components/stg-app-confirm/stg-app-confirm.service.ts:14`](../../src/app/core/screen/components/stg-app-confirm/stg-app-confirm.service.ts#L14)).

Contrato de uso: separar estados cargando, vacío, error y datos; cerrar el loader en `next` y `error`; no registrar payload ni identidad en el mensaje. Winder no normaliza errores, por lo que el consumidor es responsable del cierre ([`src/app/core/data/remote/rest/rest.service.ts:12-27`](../../src/app/core/data/remote/rest/rest.service.ts#L12-L27)).

`StgAppLoaderService` conserva una sola referencia mutable (`dialogRef`): llamar `open()` dos veces antes de `close()` puede dejar el primer diálogo sin referencia. No cambiar esta semántica global como efecto lateral de un reporte. El consumidor puede asumir el riesgo histórico, controlar una bandera local para evitar aperturas duplicadas y cerrar después de preparar el modelo que habilita la tabla. Al destruirse, debe cancelar sus solicitudes y cerrar el loader que abrió.

## Límites de seguridad y calidad

- Inputs, headers y formatos de tabla son `any`.
- Un formato desconocido intenta invocar un método inexistente ([`src/app/core/screen/pipes/dynamic-format-pipe.ts:51-57`](../../src/app/core/screen/pipes/dynamic-format-pipe.ts#L51-L57)).
- `stg-table2` prepara `MatSort`, pero el markup activo es HTML y los headers de sort están comentados ([`src/app/core/screen/components/stg-table2/stg-table2.component.html:41-48`](../../src/app/core/screen/components/stg-table2/stg-table2.component.html#L41-L48)).
- Sticky de columnas tiene llamada comentada ([`src/app/core/screen/components/stg-table2/stg-table2.component.ts:39-48`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L39-L48)).
- La suscripción de `optionsObserver` no se cierra y no hay `OnDestroy` ([`src/app/core/screen/components/stg-table2/stg-table2.component.ts:120-127`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L120-L127)).
- Cabeceras y formatos pueden usar `bypassSecurityTrustHtml`; aplicar lista cerrada y escape antes de confiar en HTML ([`src/app/core/screen/components/stg-table2/stg-table2.component.ts:148-150`](../../src/app/core/screen/components/stg-table2/stg-table2.component.ts#L148-L150)).

Para riesgos consolidados, ver [`docs/reference/known-risks.md`](known-risks.md); para respuestas de reportes, [`docs/reference/reporting-legacy.md`](reporting-legacy.md).

## Matriz de selección de componente

| Necesidad | Componente/patrón | Decisión observada |
|---|---|---|
| columnas multinivel recibidas | `stg-table2` | headers como árbol; el consumidor prepara datos |
| tabla legacy con rowspan/colspan | `table-multiheader` | configuración de mapa y `TableMHService` |
| jerarquía remota | `hier-rem-selector` | raíces y niveles bajo demanda |
| asesor con búsqueda | picker de asesor | `list_pick_01`, filtro/paginación local |
| detalle corto | Material dialog | devuelve selección o muestra datos |
| detalle con mapa | dialog + Leaflet | transforma coordenadas específicas |
| drilldown contextual | tabla + breadcrumb | estado local, no URL |
| loader de pantalla | `StgAppLoaderService` | abrir/cerrar por estado de request |

No existe sustitución automática entre `stg-table`, `stg-table2`, `stg-table3` y `stg-table4`; sus inputs y utilidades difieren ([`src/app/core/screen/components/shared-cwc.module.ts:37-81`](../../src/app/core/screen/components/shared-cwc.module.ts#L37-L81)). Elegir por contrato observado, no por número mayor.

## Responsive

El selector jerárquico tiene markup distinto en móvil y escritorio: en móvil compacta la selección y usa diálogo; los selects siguen siendo los mismos ([`src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.html:1-50`](../../src/app/modules/shared/components/hier-rem-selector/hier-rem-selector.component.html#L1-L50)). El shell cambia de comportamiento en `959px` ([`src/app/system/admin/services/layout.service.ts:43-95`](../../src/app/system/admin/services/layout.service.ts#L43-L95)).

Para una tabla con muchas columnas, comprobar overflow, cabecera sticky y diálogo en viewport estrecho. No afirmar que sort, sticky o paginación funcionan solo por existir opciones; las limitaciones actuales están en la implementación.

## Contrato de estados

Una pantalla que consume Ant debe distinguir al menos:

1. inicial: no se ha enviado consulta;
2. cargando: request en curso y loader visible si corresponde;
3. vacío: respuesta válida sin filas;
4. datos: respuesta válida con filas;
5. error: error HTTP o error funcional dentro del envelope.

El servicio remoto no transforma errores y puede entregar HTTP 2xx con `errors`; cerrar loaders y decidir el estado corresponde al consumidor ([`src/app/core/data/remote/rest/rest.service.ts:12-27`](../../src/app/core/data/remote/rest/rest.service.ts#L12-L27)). En diálogos, devolver el resultado solo después de validar la fila o selección.

## Interacción segura

`onClickCell` es un evento amplio. Mantener un conjunto cerrado de keys accionables, comprobar la fila y evitar concatenar valores backend en HTML. Para headers o formatos enriquecidos, escapar contenido o usar una lista explícita antes de confiar en HTML. Estas decisiones reducen el riesgo sin alterar la forma de respuesta remota.

Para un caso real, consultar CMG/Agro Mix en [`docs/reference/report-case-studies.md`](report-case-studies.md) y el inventario de integraciones en [`docs/reference/domain-inventory.md`](domain-inventory.md).

## Verificación de un componente compartido

Antes de reutilizar un componente:

1. leer inputs y outputs en TypeScript;
2. inspeccionar el template efectivo, no solo nombres de Material;
3. identificar defaults y mutaciones de opciones;
4. probar vacío, error, selección automática y selección manual;
5. comprobar desktop y viewport menor o igual a `959px`;
6. verificar destrucción de suscripciones;
7. confirmar que el consumidor filtre eventos amplios.

El contrato compartido no elimina la necesidad de tipar la respuesta del dominio. En particular, `stg-table2` puede renderizar cualquier objeto que llegue a `dataSource`, pero solo ciertas keys y formatos tienen semántica estable.

## Regla de cambio mínimo

Si un consumidor necesita una columna, filtro o acción, preferir configuración local y un tipo local del dominio. No alterar defaults globales de `stg-table2`, no agregar metadata que la tabla no interpreta y no convertir un evento genérico en contrato implícito. Una segunda pantalla con la misma forma real puede justificar extracción posterior.

La extracción no debe ocultar diferencias entre respuestas legacy y modernas; documentar primero el contrato del consumidor.

Los contratos de respuesta y transporte se mantienen fuera de esta referencia en [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md).

No usar esta referencia para inferir campos backend no citados.

Validar siempre el template activo.

Validar también el viewport móvil.

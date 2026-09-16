Propósito: Implementar la UI de un reporte R22 usando los componentes y límites comprobados, sin inventar contratos.
Leer cuando: El contrato de datos ya está aprobado y se construyen tabla, filtros, pickers, paginación o detalle.
No es necesario para: Cambios exclusivos de integración backend, menú o tooling que no cambien la UI.
Prerrequisitos: Angular 14.2, TypeScript 4.6, RxJS 6.6, módulos compartidos confirmados y viewports acordados.
Canónico para: `stg-table2`, estados visuales, jerarquía, pickers, paginación, búsqueda, loader y responsive.

# Receta de UI de reportes

## `stg-table2`

Cada header hoja necesita `label` y `key`; un agrupador usa `label` y `subs`. La tabla calcula `colspan`/`rowspan` y aplana hojas. `style`, `cellStyle`, `cellStyleFn` y `format` son soportados. `sticky` está presente históricamente, pero no debe prometer columnas sticky: la llamada correspondiente está desactivada.

Formatos comprobados por `DynamicFormatPipe`: `integer`, `integerTraffic`, `decimal`, `percent`, `pbs`, `time`, `truncate`, `link`, `icon`, `chip`, `trafficlight` y `custom`. La aplicación usa `en-US`; `percent` recibe un ratio y multiplica por 100; `pbs` multiplica por 10.000; `integerTraffic` acepta un número entero o decimal, lo redondea a cero posiciones solo al presentarlo y añade `lens` según `trafficFn`. Mantener números como `number` y no parsear strings ya formateados.

```ts
const headers = [
  { label: 'Unidad', key: 'des_rel', style: { 'min-width': '180px' } },
  {
    label: 'Saldo', key: 'saldo', cellStyle: { 'text-align': 'right' },
    format: { type: 'decimal', params: { max_decimals: 2 } }
  },
  {
    label: 'Cumplimiento', key: 'cumplimiento',
    format: { type: 'percent', params: { max_decimals: 1 } }
  }
];
```

Si headers vienen del backend, validar arreglo, labels, keys únicas, hojas presentes en las filas y `format.type` contra una lista cerrada antes de renderizar. No concatenar contenido backend en HTML: `stg-table2` y algunos formatos usan `innerHTML`/HTML confiado.

### Estados

No dejar la instancia previa cuando cambia el filtro. Destruir la tabla en carga nueva, error o vacío evita headers obsoletos:

```html
<p *ngIf="loading" role="status">Cargando reporte...</p>
<p *ngIf="!loading && errorMessage" role="alert">{{ errorMessage }}</p>
<p *ngIf="!loading && !errorMessage && rows.length === 0">No se encontraron resultados.</p>
<stg-table2 *ngIf="!loading && !errorMessage && rows.length > 0"
  [dataSource]="rows" [headers]="headers" [options]="tableOptions"
  (onClickCell)="onCellClick($event)"></stg-table2>
```

El skeleton por defecto muestra cuatro filas, pero aparece cuando el origen está vacío. Si se usa `optionsObserver`, actualizarlo mediante `Subject`; cambiar solo `[options]` después de `ngOnInit` no reconfigura todo. `onClickCell` emite todas las celdas: filtrar por `key` y validar la fila antes de abrir detalle.

### Panel de reporte

La composición visual base de un reporte R22 es un `stg-window` con `stg-window-bar` y un `stg-panel` vertical. Ubicar filtros de período antes de la jerarquía y reservar el espacio flexible para la tabla. Reutilizar esta composición no implica copiar la lógica residual del reporte de referencia: no copiar manipulación directa del DOM, índices físicos de columnas, reintentos con `setTimeout` ni CSS global.

## Jerarquía y fecha

Usar `hier-rem-selector` mediante `SharedCMCModule` con `roots`, `cod_hier`, `max_lvl`, `dlg_tlt` y `params_hier` confirmados. La emisión viene invertida: `event[0]` es el nivel más profundo. No copiar `9/6`, no asumir terminalidad por un número mágico y no leer `roots[0]` o niveles sin validar. El componente compartido no propaga bien errores/arrays vacíos; si esos estados son válidos, cubrirlos en el padre o corregir el componente compartido dentro de un cambio explícito.

```ts
selectHierarchy(selection: any[]): void {
  const selected = selection && selection[0];
  if (!selected) { return; }
  this.tipCod = selected.tip_cod;
  this.codRel = selected.cod_rel;
  this.loadData();
}
```

La fecha operativa proviene de `profile.curr_fec`, no del reloj del navegador. Confirmar si el backend espera valor crudo o formato como `YYYY-MM-DD`.

Para períodos mensuales, reutilizar `stg-window-bar-m` desde `SharedCWCModule`. Recibe `items` con `{ val, label }`, conserva el objeto completo mediante `ngModel` y emite el período elegido por `selectionChange`. Los reportes mensuales existentes cargan este catálogo con `RS_FECH` o `RS_FECH02`; no generar una lista local ni inferir el formato de `val` sin contrato.

Para una variante visual nueva, usar `config` con `StgWindowBarMConfig` y un preset opt-in, sin sobrescribir los estilos por defecto de los demás consumidores. El preset `stgLightTable2Config` se encuentra en `core/screen/base/stg-table2-presets.ts`; resolverlo con `createStgLightTable2Config` antes de combinar funciones locales de filas o celdas.

## Pickers: cancelación y replay

`SecPickerDialog2Service` es para asesor/sectorista con `tip_cod` y `cod_rel`; el servicio publica por `ReplaySubject`. Cancelar la suscripción previa y resetear el replay antes de abrir evita seleccionar inmediatamente la fila anterior:

```ts
openAdvisorPicker(): void {
  this.advisorSelectionSub?.unsubscribe();
  this.secPicker.selectedSec$.next(null);
  this.advisorSelectionSub = this.secPicker.selectedSec$.pipe(
    filter(selected => !!selected), take(1), takeUntil(this.destroy$)
  ).subscribe(selected => {
    this.selectedAdvisor = selected;
    this.loadData();
  });
  this.secPicker.tip_cod = this.tipCod;
  this.secPicker.cod_rel = this.codRel;
  this.secPicker.showDialog(true);
}
```

Importar `Subject`/`Subscription` desde `rxjs` y `filter`, `take`, `takeUntil` desde `rxjs/operators`. `showDialog(true)` permite cancelar; no usar `false` si un error podría dejar al usuario bloqueado. En `ngOnDestroy`, cancelar, emitir `destroy$` y completarlo.

Para `TblPickerDialogService`, definir headers, fusionar opciones de tabla y dialog, habilitar `allowNullSelection: true`, vaciar `dataSource$`, suscribirse a `afterCloseEvent$` con `take(1)` y publicar filas después de abrir. Las claves configuradas para búsqueda deben ser strings no nulos: el componente llama directamente a `toLowerCase()`. No abrir dos instancias compartidas en paralelo.

## Búsqueda y paginación

La utilidad R22 pagina localmente arreglos ya cargados y muta cada fila con una clave reservada. No inventar protocolo de servidor (`page`, `size`, `total`); solicitarlo como contrato si el volumen no cabe en memoria.

```ts
search(value: string): void {
  const term = (value || '').trim().toLowerCase();
  this.filteredRows = term
    ? this.originalRows.filter(row =>
        [row.description, row.unit].some(field =>
          String(field == null ? '' : field).toLowerCase().includes(term)))
    : [...this.originalRows];
  this.preparePagination(); // total filtrado y página 1
}

private preparePagination(): void {
  this.totalRows = this.filteredRows.length;
  this.showPaginator = this.totalRows > this.pageSize;
  if (!this.showPaginator) {
    this.visibleRows = [...this.filteredRows];
    return;
  }
  prepareDataForPagination(this.pageSize, this.filteredRows, 'page');
  this.paginator && this.paginator.toFirstPage();
  this.changePage(1);
}
```

Conservar `originalRows`, tratar nulos/números como texto solo para búsqueda, mostrar total filtrado, ocultar paginador con cero resultados y reiniciar a página 1 en cada búsqueda/filtro. No sobrescribir una clave de negocio.

## Loader y requests RxJS 6

Usar `finalize` para cerrar loader y estado de carga en éxito, error o transformación inválida. Usar `catchError` para limpiar datos y mostrar un mensaje seguro. Para filtros que pueden cambiar durante la request, usar `switchMap` o deshabilitar filtros hasta finalizar; una suscripción por separado permite respuestas viejas.

```ts
import { EMPTY } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

loadData(): void {
  if (this.tipCod == null || this.codRel == null) { return; }
  this.loading = true;
  this.errorMessage = '';
  this.rows = [];
  this.loader.open();
  this.antRep.getRegularTableResult('CODIGO_CONFIRMADO', {
    tip_cod: this.tipCod, cod_rel: this.codRel, fec: this.currentDate
  }).pipe(
    map(response => {
      const result = response.body && response.body.resultado;
      if (!result || !Array.isArray(result.data)) {
        throw new Error('Invalid regular table response');
      }
      return { rows: result.data, headers: this.parseHeaders(result.headers) };
    }),
    catchError(() => {
      this.rows = [];
      this.headers = [];
      this.errorMessage = 'No se pudo cargar el reporte. Intente nuevamente.';
      return EMPTY;
    }),
    finalize(() => { this.loading = false; this.loader.close(); })
  ).subscribe(result => { this.rows = result.rows; this.headers = result.headers; });
}
```

El nombre y payload son ilustrativos de forma, no valores reutilizables: sustituirlos solo por el contrato confirmado. Para requests independientes obligatorias, `forkJoin` + `catchError` + `finalize` es compatible con RxJS 6; no usarlo si una respuesta es opcional sin definir estado parcial.

`StgAppLoaderService` mantiene una sola referencia de diálogo y no es reentrante ni ref-counted. En mantenimiento local se puede aceptar el patrón histórico de abrir al iniciar y cerrar desde callbacks, pero el consumidor debe evitar aperturas duplicadas, limpiar la tabla antes de recargar y cerrar también ante error y destrucción. La secuencia general es: abrir loader, solicitar datos, preparar filas/headers, habilitar la UI dependiente y cerrar loader.

## Drilldown y responsive

Antes de implementar confirmar celda/fila accionable, identificador estable, rutas hijas, tamaño del dialog y comportamiento de atrás.

- **Transitorio:** dialog o ruta con estado singleton/`skipLocationChange`; no promete URL directa ni recuperación al refresh.
- **Recuperable:** usar `detalle/:id` y reconstruir desde el identificador contractual; no poner una fila completa ni datos personales en la URL.
- **Desktop-dialog/móvil-route:** en móvil `router.navigate(['./detalle', id], { relativeTo })`; en escritorio abrir `DetalleDialogComponent` con `StgWindowConfig`. Compartir lógica mediante una base solo si existen ambos consumidores.
- **Dialog dirigido por ruta:** usar wrapper `routed-detalle` únicamente si el detalle tiene navegación interna; mantener las rutas hijas equivalentes en móvil y escritorio.

El shell ya usa `LayoutService.isMobile`; no crear otra detección por ancho. Mantener un único propietario del scroll, tabla ancha dentro de `overflow-x: auto`, filtros en wrap/columna, targets táctiles y pruebas de teclado. Los headers sticky solo son confiables dentro del contenedor que desplaza y no como sticky de columna.

Referencias: [Crear reporte](../runbooks/create-report.md), [contratos UI](../reference/ui-contracts.md), [casos de reportes](../reference/report-case-studies.md) y [Reportes](../guides/reports-overview.md).

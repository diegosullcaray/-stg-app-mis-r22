**Propósito:** Mapa breve y canónico para orientarse en la SPA R22 sin recorrer todo el repositorio.
**Leer cuando:** Se vaya a localizar un dominio, una pantalla, un servicio remoto o el punto de arranque de la aplicación.
**No es necesario para:** Cambios aislados de estilos o lectura detallada del protocolo Ant/Winder.
**Prerrequisitos:** Conocer Angular 14, `NgModule`, Router, RxJS 6 y la diferencia entre `core`, `system` y `modules`.
**Canónico para:** Capas, bootstrap, ubicación de dominios, componentes transversales y flujo de datos resumido de R22.

# Mapa del proyecto

R22 (`stg` significa Strategos, no staging) es una SPA Angular 14 conectada al backend existente. El navegador contiene la aplicación; los servicios remotos no están implementados en este repositorio. El inventario ampliado está en [`../reference/domain-inventory.md`](../reference/domain-inventory.md).

## Cómo orientarse

1. Empieza por la URL y busca su entrada en `src/app/app-routing.module.ts`.
2. Sigue `loadChildren` hasta el módulo del dominio y su routing interno.
3. Localiza el componente de pantalla; después su servicio o fachada y el `Mod*Service` que habla con backend.
4. Comprueba el menú backend, `actionRoute`, `responseName`, payload, `appId` y puerto lógico antes de cambiar un contrato.
5. Distingue código presente de ruta alcanzable: una carpeta no implica que el módulo esté cargado por el router raíz.
6. Para el inventario funcional no exhaustivo, consulta [../reference/domain-inventory.md](../reference/domain-inventory.md).

## Bootstrap y composición

```text
src/index.html
  -> src/main.ts
  -> AppModule
  -> AppComponent
  -> router-outlet raíz
```

- `src/index.html` fija `<base href="/">`; el router usa History API, no hash.
- `src/main.ts` arranca dinámicamente `AppModule` y decide producción con `environment.production`.
- `src/app/app.module.ts` registra plataforma, HTTP, animaciones, locale `es-PE`, `SystemModule` y `AppRoutingModule`.
- `src/app/app.component.*` aloja el outlet raíz, inicializa tema/iconos y textos globales de Highcharts.
- La entrada global de estilos de build es `src/assets/styles/app.scss`; `src/styles.scss` no es la entrada principal del build.

## Capas

### `src/app/core`

Convención de infraestructura y primitivas, no un `CoreModule` formal.

- `core/data/local`: almacenamiento del navegador (`LocalStoreService`).
- `core/data/remote/rest`: URL raíz y transporte HTTP de bajo nivel.
- `core/data/remote/winder`: serialización de `Strand` y selección de endpoints `v1/g`, `v1/p` o `v1/pf`.
- `core/data/remote/ant`: helpers para servicios de dominio, lecturas, mutaciones, recursos y archivos.
- `core/data/remote/instances`: instancias transversales como login y administración del sistema.
- `core/screen`: componentes STG, formularios, tablas, pipes, directivas, iconos y utilidades visuales.
- `core/shared`: token, cifrado, utilidades y depuración.

### `src/app/system`

Capacidades transversales de sesión y shell autenticado.

- `system/session`: signin, callback `/login`, OAuth/OIDC, login MIS y guard de callback.
- `system/admin`: layout, header, navegación, usuario, tracking, guardas e interceptores.
- `system/system.module.ts` y `system/system-components.ts`: composición de estos servicios y componentes.

### `src/app/modules`

Pantallas y servicios por capacidad funcional. Los módulos consumen `core`, `system` y `modules/shared`; `core` no debe depender de dominios.

- `modules/shared`: componentes MIS reutilizables, como selectores jerárquicos, pickers y resumen de cliente.
- Cada dominio suele agrupar routing, módulo Angular, vistas, componentes compartidos y un servicio `Mod*Service`.
- Reportes mantiene organización de rutas y un repositorio físico amplio; la carpeta no siempre coincide con la URL.

## Componentes compartidos

- `SharedCWCModule` (`core/screen/components/shared-cwc.module.ts`) exporta primitives STG: ventanas, toolbar, menú, tablas, listas, paginación, formularios, inputs, botones, loaders y feedback.
- Las tablas numeradas (`stg-table`, `stg-table2`, etc.) tienen contratos distintos; no son sustituciones automáticas.
- `SharedCMCModule` (`modules/shared/shared-cmc.module.ts`) compone CWC con semántica MIS y servicios de negocio.
- Antes de reutilizar un componente, inspecciona sus `@Input`, `@Output`, módulo que lo exporta y consumidor existente.

## Dominios y rutas principales

El router raíz agrupa capacidades bajo `/app`; sus módulos funcionales se cargan bajo demanda. Existen variantes históricas y rutas con casing significativo. No mantener aquí un catálogo exhaustivo: usar [../reference/domain-inventory.md](../reference/domain-inventory.md).

Las áreas activas incluyen reportes, Consulta FEN, incentivos, corresponsales, presupuesto, actividades, Kaypacha, administración, dashboards/BI, ranking, ESG, analista, sistemática, prospecto y reasignación de cartera/captaciones. Consulta FEN es un dominio lazy top-level y no pertenece al shell de Reportes. `/app/desktop` es el inicio del shell. `/app/imparables` apunta a un placeholder y no representa un dominio funcional.

## Flujo de datos

```text
componente
  -> servicio/fachada del dominio
  -> Mod<Domain>Service (AntService)
  -> Strand(actionRoute, responseName, payload[, file])
  -> WinderService
  -> RESTPacket / HttpClient
  -> gateway de environment y backend lógico
  -> response.body.<responseName>
  -> transformación y estado del componente
```

- Los nombres de acción, respuesta, campos, `appId`, puerto y tipo de request son contrato; no se normalizan por conveniencia.
- La aplicación no usa NgRx: el estado vive en servicios singleton, `BehaviorSubject`/`Observable`, componentes y storage.
- La jerarquía MIS suele venir de administración, combinarse con filtros y alimentar después al servicio del dominio.
- Power BI obtiene su token embed desde backend; no hay token estático documentado aquí.

## Controles al cambiar código

- Mantener la separación de capas y el patrón Angular 14/TypeScript 4.6/RxJS 6.
- Si se cambia una URL, revisar router, menú backend, guard y destino de `state`.
- Si se cambia una llamada remota, revisar el `Strand` y el consumidor de `response.body`.
- Verificar build y pruebas aplicables; para el procedimiento operativo, consultar [../runbooks/validate-change.md](../runbooks/validate-change.md).
- Para conectividad local y backend real, consultar [../guides/remote-access.md](../guides/remote-access.md).

## Decisiones generales de mantenimiento

R22 es una aplicación histórica en mantenimiento activo. Cuando una pantalla nueva necesita un comportamiento conocido con riesgos acotados, preferir un cambio local y explícito antes que refactorizar un componente compartido para alcanzar una solución ideal. Aceptar un riesgo heredado es válido si el alcance lo declara, la pantalla conserva estados visibles y el cambio no altera consumidores existentes.

Las referencias visuales sirven para maquetar y preparar datos simulados, pero no sustituyen contratos backend. Los datos de prueba específicos de una pantalla permanecen en su componente o dominio; no se agregan fixtures de un reporte a servicios compartidos.

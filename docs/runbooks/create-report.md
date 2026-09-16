Propósito: Crear un reporte nuevo de mantenimiento en R22 sin inventar contratos ni duplicar la composición de rutas.
Leer cuando: Se planifique, implemente o automatice un reporte bajo `src/app/modules/reportes/repositorio/`.
No es necesario para: Corregir estilos aislados o cambiar un reporte existente sin modificar contrato, routing o menú.
Prerrequisitos: Contrato backend aprobado, URL `act_sec` confirmada, grupo de organización identificado y viewport objetivo acordado.
Canónico para: Secuencia de creación, decisión de integración, archivos y Definition of Done de reportes R22.

# Crear un reporte

## Regla de bloqueo

No crear código hasta congelar el contrato backend. El frontend se adapta a nombres, casing, tipos, nulabilidad, unidades y formato confirmados; no normaliza variantes ni convierte arreglos por intuición.

El contrato debe registrar:

| Dato obligatorio | Confirmar antes de implementar |
|---|---|
| Identidad | nombre visible, `slug` kebab-case, periodicidad y grupo |
| Menú/ruta | `act_sec` completo, padre, `cod_sec`, `cod_par`, orden, descripción y permiso |
| Integración | acción/strand, alias de respuesta, `appId` y aplicación Ant; nunca documentar credenciales |
| Request | `cod_rep` si aplica, parámetros exactos, fecha, nulabilidad, unidades y serialización |
| Response | ruta del alias (`body.resultado` o la confirmada), forma de `data`, `headers`, metadatos y terminalidad |
| UI | jerarquía, picker, búsqueda, paginación, drilldown, estados vacío/error y viewports |

Si falta una celda, la automatización debe detenerse y preguntar. Una respuesta verbal parcial o una maqueta no sustituye el contrato.

Referencias: [Acceso remoto](../guides/remote-access.md), [Reportes](../guides/reports-overview.md) y [UI de reportes](../recipes/report-ui.md).

## `table.regular` o Ant específico

| Contrato confirmado | Decisión |
|---|---|
| Acción `table.regular`, `cod_rep`, alias `resultado` y forma `resultado.data`/`headers` confirmados | Inyectar `ModRepService` y llamar `getRegularTableResult` con un objeto nuevo por solicitud. |
| Acción no regular, aplicación Ant distinta, alias o serialización especial | Crear `<slug>-ant.service.ts` como `@Injectable()` que extienda `AntService`; escoger GET/POST/archivo según el contrato. |
| Varias operaciones tipadas del mismo dominio | Servicio Ant específico con métodos explícitos para resumen, detalle o catálogo. |
| Acción, instancia, puerto, `appId`, alias o forma desconocidos | Bloquear; solicitar confirmación. No copiar valores de otro reporte. |

`getRegularTableResult` muta el objeto recibido al agregar `cod_rep`; no pasar un objeto de estado compartido. `ModRepService` ya es provisto por el módulo raíz de Reportes (`rep01.module.ts`), por lo que el lazy module no debe volver a proveerlo. No usar el motor legacy solo por parecido de pantalla.

## Estructura y routing

Crear como mínimo:

```text
src/app/modules/reportes/repositorio/<slug>/
├── <slug>-routing.module.ts
├── <slug>.component.html
├── <slug>.component.scss
├── <slug>.component.spec.ts
├── <slug>.component.ts
└── <slug>.module.ts
```

Agregar `.util.ts`, `compartido/servicios/` o `detalle/` solo si existe un consumidor real o el contrato lo exige. `SharedCWCModule` cubre la base; agregar `SharedCMCModule` solo para jerarquía/pickers. No copiar imports legacy sin uso.

El routing del repositorio resuelve `path: ''` al componente:

```ts
const routes: Routes = [{
  path: '',
  component: ReporteXComponent,
  data: { title: 'Título confirmado' }
}];
```

La URL moderna esperada es:

```text
/app/reportes/repositorio/<periodicidad>/<grupo-ruta>/<slug>
```

Antes de editar routing, buscar el agrupador de `<grupo-ruta>` en el routing de periodicidad. Si ya existe, agregar únicamente el hijo `<slug>` a ese módulo. No crear otro wrapper, otra ruta padre `cartera` ni otra entrada de periodicidad. Crear y registrar un agrupador solo si el grupo es realmente nuevo, inequívoco y aprobado. Una ruta vacía, comodín o hijo repetido puede capturar otra rama.

Referencias: [Reportes](../guides/reports-overview.md) y [UI de reportes](../recipes/report-ui.md).

## Menú backend

El frontend no mantiene una lista local. En login, `LoginService` solicita `list_sec`; `NavigationService` transforma `cod_sec`/`cod_par`, ordena por `order_sec`, muestra `desc_sec` y navega directamente al `act_sec` recibido. Backend debe crear la sección bajo el padre correcto, con permisos y URL exacta.

Secuencia operativa:

1. Confirmar contrato y calcular la URL completa.
2. Confirmar que `act_sec` coincide carácter por carácter con la ruta lazy.
3. Crear módulo, componente, spec y routing del repositorio.
4. Añadir el hijo al agrupador existente, o registrar un agrupador nuevo una sola vez.
5. Implementar fecha operativa desde `profile.curr_fec`, con el formato confirmado.
6. Implementar jerarquía y una carga feliz con validación de response.
7. Abrir el loader antes de iniciar la carga, preparar filas y headers, renderizar los componentes dependientes y cerrar el loader al terminar o fallar; distinguir carga, vacío, error y datos.
8. Configurar `stg-table2`, formatos, búsqueda y paginación solo con contratos confirmados.
9. Añadir picker y drilldown solo con endpoint, columnas, identificador y estrategia responsive confirmados.
10. Solicitar a backend alta/ajuste de menú, permisos y orden.
11. Cerrar e iniciar sesión para recargar el menú; probar menú, URL directa y refresh.
12. Ejecutar validación y revisar que el diff solo incluya el alcance.

## Archivos automatizables

Con todos los parámetros confirmados, una automatización puede crear determinísticamente los seis archivos mínimos del repositorio, un `.util.ts` para headers/opciones estáticas y un Ant específico solo con contrato confirmado. Puede editar el routing del agrupador para un único hijo. Puede crear `detalle/*` únicamente cuando el drilldown y su estrategia estén decididos.

Debe bloquearse ante rutas duplicadas, edición concurrente incompatible, contrato incompleto, datos reales, secretos o cualquier necesidad de inventar adapters, modelos, stores, gráficos o compatibilidad legacy.

## Contratos no adivinables

Nunca inferir: `cod_rep`, acción, alias, conexión, puerto, `appId`, secretos, casing, nombres de campos, unidades, ratio de porcentaje, fecha/zona horaria, índices de arreglos, headers, jerarquía, niveles terminales, endpoint de picker, búsqueda, paginación servidor, celda navegable, identificador de detalle, estado al refrescar, `act_sec`, permisos, orden ni textos de error/vacío.

No concatenar valores backend en HTML: `stg-table2` y `DynamicFormatPipe` usan HTML confiado en algunos formatos. Preferir valores escalares, formatos de lista cerrada y estilos controlados.

## Definition of Done

- Contrato backend y tabla de parámetros aprobados, sin secretos.
- Integración elegida por la matriz y payload/alias validados.
- Ruta directa, lazy loading y menú backend coinciden; no hay wrapper duplicado.
- Estados de carga, vacío, error y datos son distinguibles; el loader cierra también en error.
- `stg-table2`, jerarquía, picker, paginación y detalle respetan sus contratos y cancelación.
- Fecha operativa, números y porcentajes no sufren transformaciones implícitas.
- Spec cubre payload, guardas, response inválida, error, filtros, paginación y drilldown aplicable.
- Typecheck/build ejecutados; pruebas o lint bloqueados quedan registrados con su error real.
- Se probaron menú, URL, refresh, filtros, error, vacío, escritorio, móvil, teclado y seguridad de logs.
- El diff contiene únicamente archivos del cambio solicitado.

## Decisiones de mantenimiento aceptadas

- Reutilizar un componente compartido con limitaciones conocidas es válido cuando corregirlo transversalmente excede el alcance; documentar el riesgo en el consumidor y no cambiar su contrato.
- El loader histórico no es reentrante ni cuenta solicitudes. Una pantalla debe evitar aperturas duplicadas y cerrar su loader en éxito, error y destrucción.
- La jerarquía compartida puede emitir durante su inicialización y `selection[0]` representa el nivel más profundo. Un reporte puede aceptar este comportamiento histórico cuando la tarea no incluye rediseñar el selector.
- La tabla y los filtros que dependen de datos no deben renderizarse antes de completar la carga inicial, aunque otros reportes antiguos lo hagan.

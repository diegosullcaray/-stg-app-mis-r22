# Referencia: casos de reportes

**Propósito:** conservar las trazas representativas de CMG Cartera, Agro Mix e Incentivos3.
**Leer cuando:** se compare un dashboard moderno con legacy o se diseñe un reporte con drilldown, jerarquía o varias respuestas.
**No es necesario para:** una pantalla sin reporting ni selección jerárquica.
**Prerrequisitos:** [`docs/guides/reports-overview.md`](../guides/reports-overview.md), [`docs/reference/reporting-legacy.md`](reporting-legacy.md) y [`docs/reference/ui-contracts.md`](ui-contracts.md).
**Canónico para:** hechos, diferencias y riesgos de estos tres flujos; no es una plantilla para copiar.

## Cómo leer los casos

Los casos muestran contratos reales que no deben generalizarse. Cada uno mantiene su ruta, acción, alias, parámetros y transformación. Las variantes moderna/legacy coexistentes son evidencia de compatibilidad que debe preservarse mientras sus URLs existan.

## CMG Cartera

### Tres entradas

CMG existe como plantilla legacy, dashboard diario y dashboard mensual. El wrapper diario carga `repositorio/cmg-cartera`; el mensual carga `repositorio/cmg-cartera-m` ([`src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts:73-76`](../../src/app/modules/reportes/organizacion/actividad-diaria/rep01-actividad-diaria-routing.module.ts#L73-L76), [`src/app/modules/reportes/organizacion/actividad-diaria/cmg_cartera/rep01-cmg-cartera-routing.module.ts:8-11`](../../src/app/modules/reportes/organizacion/actividad-diaria/cmg_cartera/rep01-cmg-cartera-routing.module.ts#L8-L11), [`src/app/modules/reportes/organizacion/actividad-mensual/cmg-cartera-m/rep01-cmg-cartera-m-routing.module.ts:8-11`](../../src/app/modules/reportes/organizacion/actividad-mensual/cmg-cartera-m/rep01-cmg-cartera-m-routing.module.ts#L8-L11)).

La versión legacy se arma con plantilla CRA, `table-multiheader`, mapa, `ComercialService` y contrato histórico `reportData`/`regularData`. La diaria moderna usa `CMG_CARTERA_01` y `_02` con `stg-table2`; la mensual agrega `RS_FECH` para fecha disponible ([`src/app/modules/reportes/repositorio/cmg-cartera-m/cmg-cartera-m.component.ts:481-563`](../../src/app/modules/reportes/repositorio/cmg-cartera-m/cmg-cartera-m.component.ts#L481-L563)).

### Contratos y transformación

La diaria solicita `CMG_CARTERA_01` con `codrel`, `Fecha`, `tipcod`, `met`, `prod`, y `CMG_CARTERA_02` con `tipcod`, `cod_rel`, `tipmet`, `prod`, `fec` ([`src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts:450-466`](../../src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts#L450-L466)). No normalizar `codrel`/`cod_rel`, `Fecha`/`fec` ni `tipcod`/`tipmet`: son contratos distintos observados.

`CMG_CARTERA_01` se trata como matriz indexada: KPIs salen de posiciones fijas como `[18][6]` y `[16][6]`; los semáforos se reconstruyen desde claves numéricas ([`src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts:467-556`](../../src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts#L467-L556)). Las cabeceras llegan como JSON, se filtran por `cellStyle.display` y pasan a `stg-table2` ([`src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts:558-564`](../../src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts#L558-L564), [`src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.html:153-158`](../../src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.html#L153-L158)).

`CMG_CARTERA_02` aporta operaciones, metas, desembolsos y tasa mínima; el componente calcula tarjetas, diferencias y animaciones ([`src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts:567-632`](../../src/app/modules/reportes/repositorio/cmg-cartera/cmg-cartera.component.ts#L567-L632)). La mensual repite `_01`/`_02` después de reemplazar `curr_fec` por la fecha seleccionada ([`src/app/modules/reportes/repositorio/cmg-cartera-m/cmg-cartera-m.component.ts:556-663`](../../src/app/modules/reportes/repositorio/cmg-cartera-m/cmg-cartera-m.component.ts#L556-L663)).

### Riesgo y recomendación

El acceso por índices mágicos y la duplicación diaria/mensual son el riesgo principal. Recomendación: preservar los contratos y extraer únicamente transformaciones puras verificables de respuesta, KPI y headers si se tocan ambos flujos; no crear un motor genérico ni cambiar nombres de parámetros.

## Agro Mix / Cultivos

### Ruta y respuesta

La rama diaria carga `repositorio/agro-mix`, y una rama mensual reutiliza el mismo repositorio físico ([`src/app/modules/reportes/organizacion/actividad-diaria/agro-mix/rep01-agro-mix-routing.module.ts:8-11`](../../src/app/modules/reportes/organizacion/actividad-diaria/agro-mix/rep01-agro-mix-routing.module.ts#L8-L11), [`src/app/modules/reportes/organizacion/actividad-mensual/agro-mix/rep01-agro-mix-m-routing.module.ts:8-11`](../../src/app/modules/reportes/organizacion/actividad-mensual/agro-mix/rep01-agro-mix-m-routing.module.ts#L8-L11)).

El componente consume `table.regular` mediante `ModRepService`, usa `data` para filas/KPIs, `headers` como árbol de `stg-table2` y `meta1` como valores del mes anterior ([`src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts:877-894`](../../src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts#L877-L894)). `headers` puede ser una cadena JSON; el parseo pertenece al consumidor, no a una regla global.

### Drilldown y mapa

El clic de tabla cambia nivel/estado y mantiene breadcrumb local ([`src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts:317-342`](../../src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts#L317-L342), [`:849-865`](../../src/app/modules/reportes/repositorio/agro-mix/agro-mix.component.ts#L849-L865)). El detalle abre un diálogo con paginación/filtro local; al clicar una fila extrae `HLATITU`/`HLONGIT`, cambia de tabla a Leaflet y crea un marcador ([`src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.html:58-83`](../../src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.html#L58-L83), [`src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.ts:117-158`](../../src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.ts#L117-L158)).

El componente recibe clics para todas las celdas; una implementación nueva debe filtrar por key antes de abrir detalle. El breadcrumb no se serializa en URL, por lo que recargar pierde el contexto.

### Riesgo y recomendación

`meta1` es un contrato específico y el mapa depende de campos de coordenadas exactos. Mantener nombres y parseo local; tipar solo la respuesta de Agro Mix cuando se modifique; no convertir este flujo en un adapter transversal sin segundo consumidor confirmado.

## Incentivos3

### Relación con Reportes

Incentivos3 es un módulo hermano bajo `/app/incentivos3`, cargado directamente desde `AppRoutingModule`. Tiene shell y rutas propias: `''`, `calculadora`, `detalle` y `detalle-2` ([`src/app/app-routing.module.ts:61-65`](../../src/app/app-routing.module.ts#L61-L65), [`src/app/modules/incentivos3/incentivos3-routing.module.ts:9-32`](../../src/app/modules/incentivos3/incentivos3-routing.module.ts#L9-L32)). No forma parte del motor `Reportes` aunque comparte tabla y vocabulario de negocio.

`ModIncentivos3Service` usa acciones `incentivos3.*` e `incentivos4.*`; no usa `ModRepService`, `reportData`, `regularData` ni `table.regular` ([`src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts:7-54`](../../src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts#L7-L54)).

### Acciones y consumidores

La clase expone GET con alias `resultado`: `incentivos3.lista3`; las variantes `incentivos4.resultados5`/`resultados4` y `incentivos4.calculadora5`/`calculadora4`; además `incentivos3.detalle_var3`, `tasas3`, `productividad3`, `bancarizados3` e `incentivos4.retencion4` ([`src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts:19-54`](../../src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts#L19-L54)). La clase de usuario decide algunas variantes.

Consumidores directos: `Incentivos3Service` en carga de principal, avances y detalle; utilidades `super-plus` nombran métodos dinámicamente ([`src/app/modules/incentivos3/compartido/servicios/incentivos3.service.ts:280-570`](../../src/app/modules/incentivos3/compartido/servicios/incentivos3.service.ts#L280-L570), [`src/app/modules/incentivos3/super-plus/super-plus.util.ts:17-82`](../../src/app/modules/incentivos3/super-plus/super-plus.util.ts#L17-L82)). La tabla utiliza `stg-table2` ([`src/app/modules/incentivos3/tabla/tabla.component.html:1-13`](../../src/app/modules/incentivos3/tabla/tabla.component.html#L1-L13)).

### Riesgo y recomendación

El nombre “Incentivos” induce a confundir este módulo con `Reportes`, `incentivos`, `incentivos2` o `incentivos-a`. Mantener su fachada y acciones separadas; antes de reutilizar código verificar ruta, provider y alias. Importaciones residuales desde Incentivos3 dentro de Usabilidad Comercial no prueban dependencia ejecutable ([`src/app/modules/reportes/repositorio/usabilidad_comercial/detalle/detalle-base.component.ts:7-50`](../../src/app/modules/reportes/repositorio/usabilidad_comercial/detalle/detalle-base.component.ts#L7-L50)).

## Comparación

| Aspecto | CMG | Agro Mix | Incentivos3 |
|---|---|---|---|
| Entrada | diario, mensual y legacy | diario y mensual reutilizado | módulo hermano |
| Respuesta | `_01`/`_02`, matrices | `data`/`headers`/`meta1` | `resultado` según acción |
| UI | tarjetas + `stg-table2` | tabla + drilldown + Leaflet | pantallas + `stg-table2` |
| Servicio | `ModRepService` moderno/legacy | `ModRepService` moderno | `ModIncentivos3Service` |
| Riesgo | índices y duplicación | campos/metadata específicos | confusión de dominio |

Para contratos UI, ver [`docs/reference/ui-contracts.md`](ui-contracts.md); para acciones completas, [`docs/reference/ant-catalog.md`](ant-catalog.md).

## Checklist comparativo

Antes de trasladar una idea de un caso a otro, verificar:

1. ruta completa y módulo cargado;
2. fachada Ant exacta y provider;
3. `actionRoute` y alias de respuesta;
4. nombres de parámetros, incluyendo casing;
5. forma de `headers`, `data`, `body`, `additional` o `meta1`;
6. estado de jerarquía y fecha;
7. key accionable antes de drilldown;
8. comportamiento de diálogo en móvil;
9. cierre de loader en éxito y error.

Los tres casos usan datos dinámicos y estado local, pero no tienen un contrato transversal demostrado. Extraer un helper solo después de encontrar dos consumidores con la misma forma real y pruebas equivalentes.

## Qué no copiar

- Los índices de `CMG_CARTERA_01`: solo son válidos para esa matriz y su versión de respuesta.
- `meta1` de Agro Mix: no es un campo universal de `table.regular`.
- Las coordenadas `HLATITU`/`HLONGIT`: pertenecen a la tabla de detalle y deben validarse antes de mapear.
- Las variantes `incentivos4.*`: dependen de la clase de usuario y no son sustitutas de `reportData`.
- El uso de `stg-table2`: sus formatos/eventos no garantizan la misma configuración entre módulos.

## Observaciones de integración

CMG demuestra coexistencia de contratos legacy y modernos. Agro Mix demuestra que una respuesta puede combinar filas actuales, metadata histórica y visualización geográfica. Incentivos3 demuestra que una capacidad con nombre similar puede vivir fuera de Reportes y tener su propio Ant. En conjunto, la recomendación es preservar límites de dominio y documentar la forma local antes de generalizar.

El inventario de rutas está en [`docs/reference/domain-inventory.md`](domain-inventory.md), la mecánica de tablas y pickers en [`docs/reference/ui-contracts.md`](ui-contracts.md) y los riesgos concretos en [`docs/reference/known-risks.md`](known-risks.md).

## Alcance de las conclusiones

Estos casos no demuestran que todos los reportes compartan sus respuestas. Demuestran lo contrario: dentro del mismo shell coexisten matrices indexadas, metadata adicional, acciones propias y servicios diferentes. La evidencia útil es la traza de cada consumidor, no el parecido visual de sus tablas.

Al documentar otro caso, conservar la misma estructura: ruta, servicio, acción/alias, transformación, UI, estado y riesgo. Omitir payloads sensibles y enlazar al catálogo Ant en lugar de repetir las 26 clases.

## Estado de sesión y alcance

Los tres casos se ejecutan dentro del shell autenticado, pero no comparten necesariamente el mismo provider ni el mismo servicio. Reportes se carga bajo `Rep01Component`; Incentivos3 se carga bajo su propio shell. Un cambio de usuario alterno puede afectar acciones que capturan perfil en constructor, por lo que debe probarse con el consumidor real y no solo con la vista.

## Validación visual mínima

Para CMG, revisar tarjetas, cabeceras y semáforos; para Agro Mix, revisar tabla, diálogo, paginación y mapa; para Incentivos3, revisar selección de clase de usuario, calculadora y tabla. Hacerlo en escritorio y viewport móvil, diferenciando cargando, vacío, error y datos. Los detalles de la infraestructura de loader están en [`docs/reference/ui-contracts.md`](ui-contracts.md).

## Recomendación de documentación

Registrar nuevos casos solo cuando aporten una forma de respuesta, una integración o un patrón de UI que no esté cubierto por las referencias generales. Mantener el documento breve en decisiones y evidencia, y enlazar las guías operativas en lugar de duplicarlas.

CMG y Agro Mix pertenecen al inventario de Reportes; Incentivos3 pertenece al inventario de Incentivos. La clasificación de rutas canónicas está en [`docs/reference/domain-inventory.md`](domain-inventory.md).

La recomendación transversal es conservar límites y evidencia de cada caso antes de extraer código compartido.

Las referencias de línea permiten volver al consumidor y validar el comportamiento sin copiar datos reales.

Los ejemplos no son fixtures.

No deben convertirse en datos de prueba.

## Relación con otras referencias

La forma de transporte pertenece a Winder, la forma de tabla a UI y la ruta al inventario de dominios.

Por eso este documento enlaza esos contratos en vez de copiarlos.

La recomendación de riesgo se mantiene en la referencia consolidada.

Consultar [`docs/reference/known-risks.md`](known-risks.md) antes de modificar una transformación.

Consultar [`docs/reference/domain-inventory.md`](domain-inventory.md) antes de modificar routing.

Mantener esta separación al documentar nuevos casos.

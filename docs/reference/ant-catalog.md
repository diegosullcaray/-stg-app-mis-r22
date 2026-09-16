# Referencia: catálogo Ant R22

**Propósito:** registrar las 26 clases que extienden `AntService`, sus acciones, estado y consumidores observados.
**Leer cuando:** se busque una acción existente, se evalúe una duplicación o se modifique un servicio remoto.
**No es necesario para:** cambios de estilos o componentes sin acceso remoto.
**Prerrequisitos:** [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md) y [`docs/guides/remote-access.md`](../guides/remote-access.md).
**Canónico para:** inventario de clases Ant R22, acciones explícitas, alias y alcanzabilidad.

## Criterio

`activo` significa que existe consumidor ejecutable; `mock` significa que el Ant entrega datos locales; `interno/no alcanzable` significa que tiene consumidores dentro de un módulo sin ruta raíz activa; `no usado` significa que no hay provisión, inyección ni llamada ejecutable. `GET` y `POST` indican el helper usado, no una recomendación de cambiar el verbo.

## Conexiones session/admin/app

1. **`ModSysLoginService`** (`session`). Acciones: GET `login` -> `login_response`, POST `meta` sin alias. Consumidor: `LoginService` en login normal y alterno; la respuesta de `meta` no se inspecciona. **Estado: activo.** [`src/app/core/data/remote/instances/mod-sys-login.service.ts:11-40`](../../src/app/core/data/remote/instances/mod-sys-login.service.ts#L11-L40), [`src/app/system/session/views/login/login.service.ts:31-60`](../../src/app/system/session/views/login/login.service.ts#L31-L60)
2. **`ModSysAdminService`** (`admin`). Acciones GET `list_sec` -> `menu_response`, `base_hier` -> `base_hierarchy`, `level_hier` -> `level_hierarchy`, `list_pick_01` -> `list_res`; POST `reg_track_info` -> `res`. Consumidores: login/menú, jerarquías, pickers de asesor y tracking. **Estado: activo.** [`src/app/core/data/remote/instances/mod-sys-admin.service.ts:10-56`](../../src/app/core/data/remote/instances/mod-sys-admin.service.ts#L10-L56), [`src/app/system/session/views/login/login.service.ts:52-55`](../../src/app/system/session/views/login/login.service.ts#L52-L55)
3. **`ModAdminService`** (`admin`). GET `admin.list_users` y `admin.cfg` -> `resultado`. Consumidor: `UsuariosComponent`. **Estado: activo.** [`src/app/modules/administracion/compartido/servicios/mod-admin.service.ts:10-33`](../../src/app/modules/administracion/compartido/servicios/mod-admin.service.ts#L10-L33), [`src/app/modules/administracion/usuarios/usuarios.component.ts:67-75`](../../src/app/modules/administracion/usuarios/usuarios.component.ts#L67-L75)
4. **`ModAppService`** (`app`). GET `incentivos.calculadora` -> `calculadora` y `incentivos.resumen` -> `resumen`. Consumidores: calculadora/resumen de incentivos y `ReportCrsV6`. **Estado: activo.** [`src/app/core/data/remote/instances/mod-app-service.ts:8-27`](../../src/app/core/data/remote/instances/mod-app-service.ts#L8-L27), [`src/app/modules/incentivos/calculadora/calc-incentivos.component.ts:138`](../../src/app/modules/incentivos/calculadora/calc-incentivos.component.ts#L138)
5. **`StgFInputService`** (`app`). Multipart POST `file.save1` -> `body.result`; GET blob `file.get1`. Consumidores: `StgFinputComponent`, administración y prospecto. **Estado: activo.** [`src/app/core/screen/components/stg-finput/stg-finput.service.ts:10-94`](../../src/app/core/screen/components/stg-finput/stg-finput.service.ts#L10-L94), [`src/app/core/screen/components/stg-finput/stg-finput.component.ts:55-70`](../../src/app/core/screen/components/stg-finput/stg-finput.component.ts#L55-L70)
6. **`ClientSummaryAntService`** (`app`). `getSummary` usa `timer` y `cloneObject`; no crea strand y entrega envelope local con `body.resultado`. Consumidor: `ClientSummaryService`. **Estado: mock.** [`src/app/modules/shared/components/client-summary/client-summary-ant.service.ts:12-35`](../../src/app/modules/shared/components/client-summary/client-summary-ant.service.ts#L12-L35)
7. **`ModKaypachaService`** (`app`). GET `kaypacha.dashboard`, `kaypacha.colaboradores`, `kaypacha.colaboradoresData_`, `kaypacha.colaboradoresData`, `kaypacha.listRanking`, `kaypacha.DetalleRanking` -> `resultado`. Consumidores: Kaypacha, ranking y reasignación. `getColaboradoresdData_` no tiene llamada encontrada. **Estado: activo.** [`src/app/modules/kaypacha/compartido/servicio/mod-kaypacha.service.ts:11-64`](../../src/app/modules/kaypacha/compartido/servicio/mod-kaypacha.service.ts#L11-L64), [`src/app/modules/ranking-k/principal/principal.component.ts:43`](../../src/app/modules/ranking-k/principal/principal.component.ts#L43)
8. **`ModIncentivosAService`** (`app`). GET `incentivos2.lista2`, `incentivos2.resultados2`, `incentivos2.calculadora2`, `incentivos2.bancarizados2`, `incentivos2.cobertura2`, `incentivos2.detalle2` -> `resultado`. Consumidores: principal, picker, calculadora, cobertura y composición. **Estado: activo.** [`src/app/modules/incentivos-a/compartido/servicios/mod-incentivos-a.service.ts:9-56`](../../src/app/modules/incentivos-a/compartido/servicios/mod-incentivos-a.service.ts#L9-L56), [`src/app/modules/incentivos-a/principal/principal.component.ts:62`](../../src/app/modules/incentivos-a/principal/principal.component.ts#L62)
9. **`ModReportesEService`** (`app`, reportes-e). GET `reportes2.lista`, `reportes2.pbi_rtoken`, `reportes2.usuarios` -> `resultado`; POST `reportes2.guardar` -> `body.result`. Consumidores: principal, Power BI y usuarios. **Estado: activo.** [`src/app/modules/reportes-e/compartido/servicios/mod-reportes-e.service.ts:11-41`](../../src/app/modules/reportes-e/compartido/servicios/mod-reportes-e.service.ts#L11-L41), [`src/app/modules/reportes-e/powerbi/powerbi.component.ts:70-71`](../../src/app/modules/reportes-e/powerbi/powerbi.component.ts#L70-L71)
10. **`ModFrameworkEsgService`** (`app`). GET `esg.res_por`, `esg.res_cat`, `esg.cfg_mod`, `esg.get_users` -> `resultado`; POST `esg.act_met`, `esg.post_users` -> `body.result`. Consumidores: principal, edición y usuarios. **Estado: activo.** [`src/app/modules/framework-esg/compartido/servicios/mod-framework-esg.service.ts:11-50`](../../src/app/modules/framework-esg/compartido/servicios/mod-framework-esg.service.ts#L11-L50)
11. **`ModReportesEService`** (`app`, reasignación). GET `ReasignacionCartCap.get_list_marca`, `ReasignacionCartCap.pm_cfg_mod` -> `resultado`; POST `ReasignacionCartCap.update_pm`, `ReasignacionCartCap.add_pm`, `ReasignacionCartCap.delete_pm` -> `body.result`. Consumidores: principal, edición y alta. **Estado: activo.** [`src/app/modules/reasignacion-cart-cap/compartido/servicios/mod-reportes-e.service.ts:12-64`](../../src/app/modules/reasignacion-cart-cap/compartido/servicios/mod-reportes-e.service.ts#L12-L64)
12. **`ModIncentivos2Service`** (`app`). GET `incentivos2.resultados`, `incentivos2.calculadora`, `incentivos2.bancarizados` -> `resultado`. Consumidores internos en principal, calculadora y clientes, pero el módulo no tiene carga activa en router. **Estado: interno/no alcanzable.** [`src/app/modules/incentivos2/compartido/servicio/mod-incentivos2.service.ts:11-54`](../../src/app/modules/incentivos2/compartido/servicio/mod-incentivos2.service.ts#L11-L54), [`src/app/app-routing.module.ts:56-60`](../../src/app/app-routing.module.ts#L56-L60)
13. **`ModCorresponsalService`** (`app`). GET `corresponsal.get_list_pro` -> `resultado`; POST `corresponsal.post_transac` -> `body.result`; `getBaseHierarchy` delega en admin. Consumidores: transacción, popup y actividades. **Estado: activo.** [`src/app/modules/corresponsales/servicio/mod-corresponsal.service.ts:11-50`](../../src/app/modules/corresponsales/servicio/mod-corresponsal.service.ts#L11-L50)
14. **`ModIncentivos3Service`** (`app`). GET `incentivos3.lista3`; `incentivos4.resultados5|incentivos4.resultados4`; `incentivos4.calculadora5|incentivos4.calculadora4`; `incentivos3.detalle_var3`, `incentivos3.tasas3`, `incentivos3.productividad3`, `incentivos3.bancarizados3`; `incentivos4.retencion4`; todos -> `resultado`. Consumidores: `Incentivos3Service` y utilidades dinámicas. **Estado: activo.** [`src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts:8-54`](../../src/app/modules/incentivos3/compartido/servicios/mod-incentivos3.service.ts#L8-L54), [`src/app/modules/incentivos3/compartido/servicios/incentivos3.service.ts:280-570`](../../src/app/modules/incentivos3/compartido/servicios/incentivos3.service.ts#L280-L570)
15. **`ModReportesEService`** (`app`, ranking-k). Duplica `reportes2.lista`, `pbi_rtoken`, `usuarios` y `guardar`; GET -> `resultado`, POST -> `result`. No tiene provider ni llamadas activas. **Estado: no usado.** [`src/app/modules/ranking-k/compartido/servicios/mod-reportes-e.service.ts:11-41`](../../src/app/modules/ranking-k/compartido/servicios/mod-reportes-e.service.ts#L11-L41), [`src/app/modules/ranking-k/ranking-k.module.ts:13,22-31`](../../src/app/modules/ranking-k/ranking-k.module.ts#L13-L31)
16. **`ModActividadesService`** (`app`). GET `actividades.get_dest_cre` -> `resultado`; POST `actividades.post_dest_cre` -> `body.result`; jerarquía delegada en admin. Consumidores: destino de crédito y popup. **Estado: activo.** [`src/app/modules/actividades/servicios/mod-actividades.service.ts:11-50`](../../src/app/modules/actividades/servicios/mod-actividades.service.ts#L11-L50)
17. **`ModBudgetService`** (`app`). GET `presupuesto.get_reg_res`, `presupuesto.get_log_ver` -> `resultado`; GET `presupuesto.get_car_cre`, `presupuesto.get_dep_red`, `presupuesto.get_dep_bp`, `presupuesto.get_seg_com`, `presupuesto.get_seg_ope` -> `resumen`; POST con el prefijo `presupuesto.` y los mismos sufijos -> `body.result`. Consumidores: responsables, verificación y `PreLineaSimpleComponent` dinámico. **Estado: activo.** [`src/app/modules/presupuesto/compartido/servicios/mod-budget.service.ts:11-115`](../../src/app/modules/presupuesto/compartido/servicios/mod-budget.service.ts#L11-L115)

## Conexiones sis/rep2

18. **`ModSistematicaService`** (`sis`). GET `resumen.cards`, `desembolsos.tablas` -> `resultado`; jerarquía delegada en admin. Consumidores: principal y diálogo de desembolsos. **Estado: activo.** [`src/app/modules/sistematica/compartido/servicios/mod-sistematica.service.ts:11-41`](../../src/app/modules/sistematica/compartido/servicios/mod-sistematica.service.ts#L11-L41)
19. **`MonRanCampAntService`** (`rep2`). GET `mon_ran_camp.resultados`, `mon_ran_camp.detalle` -> `resultado`. Consumidores: servicio principal y detalle; fixtures están presentes pero mocks comentados. **Estado: activo.** [`src/app/modules/reportes/repositorio/mon-ran-camp/compartido/servicios/mon-ran-camp-ant.service.ts:11-46`](../../src/app/modules/reportes/repositorio/mon-ran-camp/compartido/servicios/mon-ran-camp-ant.service.ts#L11-L46)
20. **`MonImrAntService`** (`rep2`). GET `mon_imr.resultados`, `mon_imr.detalle` -> `resultado`. Consumidores: servicio MonImr y lista de clientes; mocks comentados. **Estado: activo.** [`src/app/modules/reportes/repositorio/mon-imr/compartido/servicios/mon-imr-ant.service.ts:11-46`](../../src/app/modules/reportes/repositorio/mon-imr/compartido/servicios/mon-imr-ant.service.ts#L11-L46)
21. **`MonSalidasAntService`** (`rep2`). GET `mon_sali_ret.resultados`, `mon_sali_ret.detalle` -> `resultado`. Consumidores: servicio MonSalidas y lista de clientes; mocks comentados. **Estado: activo.** [`src/app/modules/reportes/repositorio/mon-salidas/compartido/servicios/mon-salidas-ant.service.ts:11-46`](../../src/app/modules/reportes/repositorio/mon-salidas/compartido/servicios/mon-salidas-ant.service.ts#L11-L46)

## Conexiones legacy

22. **`ModSecService` legacy de reportes** (`secciones`). GET `sec_list2`, `sec_list3` -> `result_sectorista`; `regularUpdate`, `selectSingle` -> `result`. Consumidores: autocompletes y `ComercialService`. `regularInsetReport` está comentado y no se encontró llamada a `getSelectSingleBody`. **Estado: activo.** [`src/app/modules/reportes/legacy/support/data/ant-mod-sec.service.ts:9-65`](../../src/app/modules/reportes/legacy/support/data/ant-mod-sec.service.ts#L9-L65)
23. **`ModProspectoCorService`** (`secciones`). GET `corresponsal.get_list_pro`, `corresponsal.cfg_mod` -> `resultado`; POST `corresponsal.act_corr`, `corresponsal.add_asesor` -> `body.result`. Consumidores: principal, edición y alta de prospecto. **Estado: activo.** [`src/app/modules/analista/prospecto/compartido/servicios/mod-prospecto-cor.service.ts:13-44`](../../src/app/modules/analista/prospecto/compartido/servicios/mod-prospecto-cor.service.ts#L13-L44)
24. **`ModSecService` de analista** (`secciones`). GET `dashboard.resumen`, `dashboard.historico`, `dashboard.cliente`, `listas.prio_leads`, `listas.pro_becas`, `categorizacion.detalle` -> `resultado`; POST `listas.post_becas` -> `body.result`. Consumidores: dashboard, detalle, listas y categorización. **Estado: activo.** [`src/app/modules/analista/compartido/servicios/mod-sec.service.ts:10-57`](../../src/app/modules/analista/compartido/servicios/mod-sec.service.ts#L10-L57)
25. **`ModRepService` legacy** (`reporting`). GET `hierarchy2` -> `result`; acción dinámica `regularData`, `graphicData` o `reportData` -> `result`. `storedFile01` está comentado. Consumidor inmediato: `ComercialService`, usado por plantillas y selectores legacy. **Estado: activo.** [`src/app/modules/reportes/legacy/support/data/ant-mod-rep.service.ts:23-70`](../../src/app/modules/reportes/legacy/support/data/ant-mod-rep.service.ts#L23-L70), [`src/app/modules/reportes/legacy/comercial/comercial.service.ts:25-47`](../../src/app/modules/reportes/legacy/comercial/comercial.service.ts#L25-L47)
26. **`ModRepService` compartido** (`reporting`). GET dinámica `regularData`, `graphicData` o `reportData` -> `result`; GET `table.regular` -> `resultado`; jerarquía base delegada en admin. Consumidores: plantillas y repositorio, como CRS v6, Precosechas y Cuenta de Resultados. **Estado: activo.** [`src/app/modules/reportes/compartido/servicios/mod-rep.service.ts:14-76`](../../src/app/modules/reportes/compartido/servicios/mod-rep.service.ts#L14-L76)

## Resumen de uso

La auditoría clasifica 23 clases con backend en flujos alcanzables, una con consumidores internos pero sin ruta activa, una mock y una no usada. La similitud de nombres no implica identidad: hay tres `ModReportesEService`, dos `ModSecService` y dos `ModRepService` en rutas distintas.

Antes de crear otro Ant, verificar consumidor, provider, conexión, alias, verbo y payload. Para reporting, usar [`docs/reference/reporting-legacy.md`](reporting-legacy.md); para rutas y dominios, [`docs/reference/domain-inventory.md`](domain-inventory.md). No añadir un adapter por duplicación sin dos consumidores reales y contrato transversal confirmado.

## Lectura por estado

Las clases activas no tienen necesariamente el mismo alcance DI. La mayoría se provee en el módulo funcional; `WinderService` se registra en `SystemModule`, mientras módulos legacy pueden volver a proveerlo y crear instancias aisladas ([`src/app/system/system.module.ts:29-47`](../../src/app/system/system.module.ts#L29-L47), [`src/app/modules/reportes/legacy/comercial/comercial.module.ts:12`](../../src/app/modules/reportes/legacy/comercial/comercial.module.ts#L12), [`src/app/modules/reportes/legacy/control-cargas/control-cargas.module.ts:22`](../../src/app/modules/reportes/legacy/control-cargas/control-cargas.module.ts#L22)).

Una clase con `@Injectable()` no queda disponible por sí sola si no usa `providedIn` o aparece en `providers`. Antes de eliminar una clase “no usada”, buscar imports, providers e inyecciones por ruta completa; nombres repetidos en dominios distintos son habituales.

## Alias y verbo

| Familia | Convención de lectura | Convención de escritura |
|---|---|---|
| session/admin | alias explícito como `login_response`, `menu_response`, `base_hierarchy` | `body.result` o alias específico |
| servicios de dominio modernos | generalmente `resultado` | generalmente `body.result` |
| reporting legacy | `result` para `reportData`, `regularData`, `graphicData` | acciones legacy separadas |
| reporting moderno | `resultado` para `table.regular` | depende de acción concreta |
| recurso | blob directo | multipart con `winder-file` |

Esta tabla es una ayuda de búsqueda, no una regla para nuevas acciones. El consumidor y la acción concreta son la evidencia canónica; el protocolo general está en [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md).

## Consumidores destacados

- Login consume `ModSysLoginService` y `ModSysAdminService` para sesión y menú.
- `hier-rem-selector` y pickers consumen acciones administrativas de jerarquía/listado.
- Reportes mantiene dos `ModRepService`, uno legacy y uno compartido moderno.
- Incentivos3 tiene su propia fachada, aunque comparte `stg-table2`.
- Monitores `rep2` tienen Ants especializados con acciones de resultados y detalle.
- `StgFInputService` es el caso de recurso y multipart, con caveat de estado persistente.

No deducir un consumidor porque una clase aparezca en el árbol: `ModIncentivos2Service` tiene consumidores internos pero su módulo está comentado en el router, y el Ant de ranking-k no tiene provider ni llamadas activas.

## Validación antes de editar

1. Confirmar que la clase sea la variante correcta por ruta completa.
2. Confirmar provider y alcance del inyector.
3. Buscar todos los métodos públicos y consumidores ejecutables.
4. Capturar método HTTP, URL, alias y payload sin registrar valores sensibles.
5. Añadir prueba de shape HTTP si se altera Winder/Ant.
6. Ejecutar build y controles focalizados; no borrar duplicados como efecto lateral.

La referencia de casos explica consumidores concretos de Reportes: [`docs/reference/report-case-studies.md`](report-case-studies.md). Los riesgos de estado, autorización y tipos están consolidados en [`docs/reference/known-risks.md`](known-risks.md).

## Inventario compacto por conexión

| Conexión lógica | Clases | Uso dominante |
|---|---|---|
| `session` | `ModSysLoginService` | login y metadata |
| `admin` | `ModSysAdminService`, `ModAdminService` | menú, jerarquía, pickers, tracking y usuarios |
| `app` | `ModAppService`, `StgFInputService`, `ClientSummaryAntService`, `ModKaypachaService`, `ModIncentivosAService`, tres `ModReportesEService`, `ModFrameworkEsgService`, `ModIncentivos2Service`, `ModCorresponsalService`, `ModIncentivos3Service`, `ModActividadesService`, `ModBudgetService` | dominios generales, archivos, BI, incentivos, presupuesto |
| `sis` | `ModSistematicaService` | tarjetas y desembolsos |
| `rep2` | `MonRanCampAntService`, `MonImrAntService`, `MonSalidasAntService` | monitores |
| `secciones` | `ModSecService` legacy, `ModProspectoCorService`, `ModSecService` analista | reporting legacy, prospectos y analista |
| `reporting` | dos `ModRepService` | reportes históricos y modernos |

Los nombres de conexión son referencias lógicas del cliente, no autorización ni URL. Los puertos y valores sensibles no se reproducen aquí; deben tomarse de configuración aprobada al implementar una acción.

## Consumidores que requieren atención

`LoginService` depende de aliases de sesión/admin; cambiar `login_response` o `menu_response` rompe el arranque. `hier-rem-selector` depende de `base_hierarchy`/`level_hierarchy` y de la inversión de su evento. Reportes CRS v6 depende de `list_res` y de parámetros de picker. `StgFinputComponent` depende de blob directo y `body.result` en upload. Estos son contratos de integración, no simples nombres internos.

Los métodos dinámicos de presupuesto e Incentivos3 hacen más importante buscar strings de método en utilidades, además de buscar llamadas directas. Una búsqueda por clase solamente puede subestimar consumidores.

## Resultado de auditoría

La clasificación final es: 23 activos con backend en rutas alcanzables, 1 con consumidores internos sin ruta activa, 1 mock y 1 no usado. Este conteo describe el estado observado, no una garantía de que el backend siga disponible. Si el router o menú cambia, repetir la búsqueda de alcanzabilidad.

Para la forma HTTP, consultar [`docs/reference/winder-wire-protocol.md`](winder-wire-protocol.md); para impacto por dominio, [`docs/reference/domain-inventory.md`](domain-inventory.md).

## Distinciones importantes

`ClientSummaryAntService` aparece en el catálogo por herencia conceptual y DI, pero no representa tráfico backend: devuelve un fixture diferido. `ModIncentivos2Service` sí contiene acciones, pero su ruta raíz está comentada. `ModReportesEService` aparece tres veces con la misma familia de nombres y tres consumidores diferentes. Estas diferencias justifican conservar estado y ruta junto con cada entrada.

No hay evidencia en R22 de que las 26 clases deban consolidarse. Algunas solo comparten el helper base; otras tienen conexiones, aliases, respuesta y ciclo de vida diferentes. La opción segura es modificar la clase concreta y sus consumidores, probar el shape de request y dejar la consolidación fuera del cambio funcional.

## Campos que deben permanecer exactos

- `actionRoute`, incluido casing;
- alias de respuesta (`resultado`, `result` u otro);
- nombre y tipo de cada payload;
- verbo y modalidad de transporte;
- dependencia de usuario/perfil capturada;
- provider y alcance DI;
- tratamiento de errores y loaders.

La lista no reemplaza el contrato backend. Sirve para evitar que una búsqueda por nombre corto o una refactorización de imports oculte una diferencia real.

Las acciones completas y sus consumidores deben leerse junto con las líneas de código citadas en cada entrada. Este catálogo no inventa acciones ausentes ni convierte acciones comentadas en funcionales.

Si una acción parece duplicada, comparar primero conexión, alias, payload y consumidores; el nombre de método no es suficiente para concluir equivalencia.

El estado del catálogo es una fotografía de R22 y debe volver a auditarse después de cambios de routing o providers.

No se incluyen valores de conexión ni respuestas reales.

La ausencia de una llamada encontrada no elimina una acción de una clase que tenga otras acciones activas.

Los métodos comentados se señalan como tales.

El conteo incluye clases mock y no usadas para evitar inventario incompleto.

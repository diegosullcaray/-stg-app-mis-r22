**Propósito:** Registrar integraciones externas, environments, assets, estilos y controles operativos de R22.
**Leer cuando:** Se cambie build, despliegue, login externo, mapas, BI, tracking o estilos globales.
**No es necesario para:** Cambios aislados de un reporte que no usen integraciones externas ni configuración.
**Prerrequisitos:** [`docs/guides/project-map.md`](../guides/project-map.md) y [`docs/runbooks/validate-change.md`](../runbooks/validate-change.md).
**Canónico para:** Operación externa y particularidades del build de R22.

# Integraciones y operación

## Environments

R22 tiene configuración de desarrollo y producción separada por reemplazo de Angular. `environment.ts` declara `production: false`, callback local, backend Ant, flags de desarrollo y usuario alternativo; `environment.prod.ts` declara los valores de producción. No copiar sus valores sensibles a documentación, logs o fixtures (`src/environments/environment.ts:4-28`, `src/environments/environment.prod.ts:1-12`, `angular.json:65-72`).

`stg` es la nomenclatura histórica de Strategos, no una garantía de ambiente staging. El desarrollo habitual usa el backend real configurado y requiere conectividad, CORS, callback Google válido y login alternativo autorizado.

## Build y pruebas

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npm run build -- --configuration production
```

El build copia `src/assets`, genera `dist/stg-app-mis-r22` y usa `src/assets/styles/app.scss` más Leaflet. `npm test` y `npm run lint` son controles históricos con problemas de configuración conocidos; consultar el runbook de validación antes de interpretarlos como controles verdes (`angular.json:44-142`, `package.json:4-10`).

No desactivar budgets, tipos o validaciones para ocultar errores. Revisar siempre el diff y no conservar artefactos generados como cambios funcionales.

## Estilos y assets

- Estilos globales productivos: `src/assets/styles/app.scss` y sus imports.
- `src/styles.scss` está asociado al target de pruebas y no representa el build principal.
- Assets productivos: `src/assets`, incluidos imágenes corporativas, iconos SVG, mapas y publicidad.
- `references/` contiene capturas, bocetos y otros recursos locales de referencia para agentes. La carpeta se conserva mediante `references/.gitkeep`, pero su contenido se ignora y no se copia al build ni a `src/assets/`.
- `index.html` carga fuentes e iconos desde CDNs externos; una política CSP o una caída del CDN puede alterar la apariencia.
- El shell cambia a modo móvil en `959px`; probar tablas, diálogos, filtros y gráficos en escritorio y móvil.

No agregar enlaces remotos desde un reporte nuevo sin aprobación. Preferir assets ya empaquetados y estilos encapsulados del componente.

## Highcharts y Chart.js

Highcharts se configura globalmente desde `AppComponent` y se usa en reportes legacy, Kaypacha, incentivos y otros dominios (`src/app/app.component.ts:19-39`). Chart.js/ng2-charts se usa en módulos que lo declaran explícitamente, como Asesor. No asumir que una librería disponible en `node_modules` está disponible para todos los módulos: debe estar en `package.json` y ser importada por el módulo consumidor.

## Leaflet y mapas

Leaflet se incluye globalmente en el build y Agro Mix usa teselas/markers externos (`angular.json:53-56`, `src/app/modules/reportes/repositorio/agro-mix/detalle/detalle-dialog.component.ts:30-39`). Probar disponibilidad de red, CSP, coordenadas inválidas y destrucción del diálogo. No insertar nombres u otros datos backend sin escapar dentro de HTML de markers.

`SharedCMCModule` importa Google Maps Angular. La API JavaScript puede depender del despliegue; verificar el origen real antes de asumir que un mapa local funcionará (`src/app/modules/shared/shared-cmc.module.ts:20`, `src/index.html:117`).

## Power BI

Reportes-E obtiene un token embed desde el backend y configura `powerbi-report`; no debe copiarse un token estático a código o documentación (`src/app/modules/reportes-e/powerbi/powerbi.component.ts:65-75`). Probar token expirado, reporte vacío, resize y cierre de la vista.

## Tracking e IP externa

`RouteTrackerService` consulta un proveedor externo de IP y registra navegación cuando `environment.production || environment.devTracing` es verdadero. Excluye login y desktop, y envía la ruta y datos de usuario al backend (`src/app/system/admin/services/route-tracker.service.ts:25-48`).

El tracking no debe bloquear la funcionalidad principal por una dependencia externa. No compartir logs que contengan IP, usuario, ruta, token o payload.

## Checklist operativo

- [ ] El callback y el origen servido coinciden con la configuración OAuth aprobada.
- [ ] El backend real, CORS y recursos externos son accesibles desde el entorno de prueba.
- [ ] Se ejecutaron typecheck y build; los controles bloqueados tienen error registrado.
- [ ] El build usa la cadena de estilos correcta.
- [ ] Se probaron mapas, BI, fuentes y tracking solo si el alcance los usa.
- [ ] No se conservaron secretos, tokens, claims, IPs ni payloads en documentación o logs.

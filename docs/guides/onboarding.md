**Propósito:** Facilitar la incorporación a Strategos R22 con evidencia del repositorio.
**Leer cuando:** Se prepare el entorno o se necesite una visión conjunta de estructura, configuración e integraciones.
**No es necesario para:** Resolver contratos backend específicos o rediseñar la aplicación.
**Prerrequisitos:** Leer [AGENTS.md](../../AGENTS.md); conocer Angular con NgModule y RxJS.
**Canónico para:** Incorporación, árbol de archivos, alcance de IA e historial disponible.

# Incorporación a Strategos R22

Revisión estática del 16 de septiembre de 2026 sobre `de9a91c`. R22 es una SPA Angular 14 conectada a servicios externos; no contiene su backend. Esta revisión no autentica usuarios ni prueba servicios remotos. No se reproducen valores sensibles de configuración.

## Árbol comentado

```text
/
├── AGENTS.md                     Reglas de mantenimiento y contratos
├── README.md                     Entrada para desarrolladores
├── docs/
│   ├── guides/                   Arquitectura, sesión, acceso remoto y reportes
│   ├── runbooks/                 Crear reportes y validar cambios
│   ├── recipes/                  Composición UI de reportes
│   └── reference/                Catálogos, contratos y riesgos detallados
├── src/
│   ├── index.html                Documento host y recursos externos
│   ├── main.ts                   Bootstrap de AppModule
│   ├── polyfills.ts / test.ts     Compatibilidad y bootstrap de Karma
│   ├── environments/             Configuración compilada dev/prod
│   ├── assets/                   Imágenes, iconos, mapas y estilos globales
│   └── app/
│       ├── app.module.ts         Composición raíz y proveedores HTTP
│       ├── app-routing.module.ts Sesión, shell y carga lazy de dominios
│       ├── core/
│       │   ├── data/             Storage, REST, Ant, Strand y Winder
│       │   ├── screen/           Tablas, formularios, loaders y utilidades UI
│       │   └── shared/           Cifrado, token y utilidades
│       ├── system/               Sesión OIDC y shell administrativo
│       └── modules/
│           ├── shared/           Componentes MIS reutilizables
│           ├── reportes/
│           │   ├── organizacion/ Composición de rutas
│           │   ├── repositorio/  Implementaciones modernas
│           │   ├── compartido/   Servicio remoto de reportes
│           │   └── legacy/       Motor CRA/CRS y plantillas históricas
│           ├── consulta-fen/     Consulta territorial independiente
│           ├── reportes-e/       Dashboards y Power BI
│           └── ...               Incentivos, Kaypacha y otros dominios
├── e2e/                          Pruebas históricas Protractor
├── references/                   Consulta local; solo .gitkeep se conserva
├── .vscode/                      Configuración del editor
├── angular.json                  Targets, assets, estilos y reemplazos
├── package.json / package-lock.json  Scripts, dependencias y resolución npm
├── tsconfig*.json                Compilación app/pruebas; baseUrl en src
├── karma.conf.js / tslint.json   Controles históricos
├── .browserslistrc               Objetivos de navegador
└── .editorconfig / .gitignore    Formato y exclusiones
```

`dist/`, `node_modules/` y `.angular/` son salidas/dependencias locales ignoradas. No se identificaron archivos versionados de Docker, CI, `.env`, `.nvmrc` o `.node-version`. Puede existir infraestructura operativa fuera del repositorio.

## Arquitectura y recorridos

El arranque sigue `index.html → main.ts → AppModule → AppComponent → router-outlet`. [AppModule](../../src/app/app.module.ts) instala SystemModule, HTTP, interceptores y locale `es-PE`; su constructor inicia tracking. [El router raíz](../../src/app/app-routing.module.ts) lleva a `/session/signin`, recibe el callback en `/login` y protege el shell `/app` con AuthGuard.

El login combina Google OIDC con el servicio MIS de sesión. Después obtiene el menú del backend: NavigationService transforma sus secciones y rutas; el escritorio presenta shortcuts. Agregar una ruta Angular no la agrega al menú ni concede permisos. Los límites de guards se detallan en [Navegación y sesión](navigation-and-session.md).

La lectura de negocio sigue `componente → servicio de dominio/Mod*Service → AntService → Strand → WinderService → RESTPacket/HttpClient → backend`. El consumidor lee el alias acordado dentro de `body`. No intercambiar acciones, aliases, tipos o puertos por analogía. [Acceso remoto](remote-access.md) explica helpers y errores.

El estado reside en componentes, servicios, observables/BehaviorSubject y storage; no se identificó NgRx en las dependencias. SharedCWCModule exporta primitivas STG y SharedCMCModule agrega semántica MIS. Las generaciones de tablas tienen contratos diferentes. La descripción canónica de capas está en [Mapa del proyecto](project-map.md).

Los dominios incluyen administración, actividades, presupuesto, corresponsales, analista/prospecto, sistemática, reasignación, ESG, ranking, incentivos y Kaypacha. Coexisten generaciones de incentivos y Kaypacha; una carpeta no demuestra una ruta activa. Consulta el [inventario de dominios](../reference/domain-inventory.md) antes de reutilizar una variante.

En Reportes, `organizacion/` compone URLs y `repositorio/` contiene pantallas; `legacy/` conserva CRA/CRS y ReportT. Moderno y legacy aún comparten dependencias. Como recorrido acotado, [Consulta FEN](../../src/app/modules/consulta-fen/consulta-fen.component.ts) permite seguir filtro, servicio de reportes, estados y tabla; sus reglas no son universales. Para implementar, usa [Reportes](reports-overview.md) y el [runbook de creación](../runbooks/create-report.md).

## Configuración: nombres y propósito

La configuración se compila desde [environment.ts](../../src/environments/environment.ts). La configuración production de [angular.json](../../angular.json) lo reemplaza por [environment.prod.ts](../../src/environments/environment.prod.ts). No se encontró un cargador `.env` ni inyección de variables del sistema operativo en los scripts npm. Cambiar una variable del shell no sustituye automáticamente estas propiedades.

| Propiedad | Propósito y consumidor observado |
|---|---|
| `production` | Modo Angular; ramas de storage, identidad, tracking y publicidad |
| `requestConfigRootURL` | Raíz del gateway usada por RESTPacket |
| `redirectUri` | Callback OIDC utilizado por gmail.config.ts |
| `rootPage` | Destino de retorno de autenticación y guards |
| `rootDomain` | Destino empleado por el diálogo de fin de sesión |
| `homePage` | Inicio posterior al login y navegación interna |
| `ipProvider` | Recurso externo consultado por ClientService para obtener IP |
| `devTracing` | Habilita tracking en desarrollo; producción lo activa por su propia condición |
| `devAd` | Habilita el diálogo de publicidad en desarrollo |
| `devUser` | Identidad efectiva de desarrollo en UserService; dato sensible |
| `structure`, `cypherSecret` | Declarados en desarrollo; sin consumidores environment.* encontrados. No asumir efecto activo ni paridad con producción |

La configuración OIDC en [gmail.config.ts](../../src/app/system/session/authentication/gmail.config.ts) declara `issuer`, `redirectUri`, `clientId`, `scope` y `strictDiscoveryDocumentValidation`. Los Ant declaran `port`, `appId` y `secret`; el cifrado también tiene configuración histórica en código. No sustituir ni copiar esos valores como parte del onboarding. La configuración enviada al navegador no es un almacén seguro de secretos.

## Preparar y ejecutar localmente

1. Trabaja desde la raíz y revisa `git status --short` para preservar cambios existentes.
2. Acuerda con mantenimiento la versión de Node/npm. package.json no fija engines ni packageManager y no hay runtime reproducible declarado. Esta revisión encontró Node 24.18.0/npm 12.0.1, pero no validó su compatibilidad con el proyecto Angular 14.
3. Con el runtime acordado y acceso al registro npm, instala desde el lockfile mediante `npm ci`. Si falla, conserva el error; no borres el lockfile ni introduzcas flags de resolución automáticamente.
4. Confirma por el canal autorizado callback/origen local, conectividad, CORS y acceso de desarrollo. Se consume backend real; no se incluye un backend o mock general para iniciar aparte.
5. Ejecuta `npm start` y abre `http://localhost:4200/`. Compilar la SPA no acredita disponibilidad de login, menú y datos.
6. Prueba el recorrido asignado y su URL directa en escritorio y móvil. El servidor de despliegue debe resolver URLs profundas hacia index.html porque el router no usa hash.

Los comandos se ejecutan desde cualquier checkout, no desde una ruta absoluta de otra máquina. No se realizó instalación ni arranque en esta revisión documental: node_modules no estaba presente.

## Dependencias e integraciones

Versiones declaradas, no una certificación de compatibilidad del conjunto; ver [package.json](../../package.json) y el lockfile.

| Grupo | Piezas y función |
|---|---|
| Aplicación | Angular/CLI 14.2, TypeScript 4.6, RxJS 6.6 y rxjs-compat; módulos clásicos |
| UI | Material/CDK 14, Flex Layout 14 beta, scrollbar, paginación y Swiper |
| Identidad | angular-oauth2-oidc 10; proveedor Google y sesión MIS separada |
| Transporte y storage | HttpClient, Ant/Winder, crypto-js y sha.js; backend externo |
| Analítica visual | Highcharts 9, Chart.js 4/ng2-charts 4; presentación de datos |
| BI | powerbi-client-angular; token de embedding obtenido desde backend |
| Geografía | Leaflet/ngx-leaflet, Google Maps y proj4; recursos externos y permisos según uso |
| Utilidades | Moment, lodash, file-saver, UUID y validadores RxWeb |
| Controles históricos | Jasmine/Karma, Protractor y TSLint |

El build carga `src/assets/styles/app.scss` y CSS de Leaflet; las pruebas usan otra entrada de estilos. Fuentes, mapas, BI, OIDC y proveedor de IP añaden dependencias de red. [Integraciones y operación](../reference/integrations-and-operation.md) mantiene los detalles.

## Inteligencia artificial: alcance comprobado

No se identificó un subsistema de IA ejecutable en este frontend. Se revisaron rutas, dependencias, nombres de archivos y referencias en TypeScript/HTML/JSON a proveedores de modelos, LLM, prompts, embeddings, RAG e inferencia. Las coincidencias amplias de llama fueron palabras como «llamadas», no un motor Llama.

| Posible pieza | Resultado de la revisión |
|---|---|
| Cliente de modelos o chat | No se identificó SDK, servicio ni ruta dedicada |
| Prompts, agentes u orquestación | No se identificó implementación; AGENTS.md regula trabajo sobre el repositorio |
| RAG o embeddings de IA | No se identificaron almacenamiento, dependencias ni flujo |
| Entrenamiento o inferencia local | No se identificaron modelos ni librerías dedicadas |
| Power BI | Embedding de reportes; no demuestra embeddings vectoriales ni IA |
| Recomendaciones de Consulta FEN | Mensaje y clasificación por reglas locales en consulta-fen.util.ts; no prueban generación por modelos |
| IA detrás del backend o enlaces externos | No verificable desde este checkout; requiere evidencia del servicio propietario |

No hay una segmentación de IA confirmada que describir como arquitectura existente. Nombres como «analista» o «recomendación» no permiten inferir modelos. Si aparece una integración, documentar consumidor, contrato, servidor responsable, datos transmitidos y configuración con evidencia, sin añadir credenciales al cliente.

## Historial y convenciones

`git log --all` solo expone `de9a91c` («inicio», 2026-09-16); el repositorio no se reporta shallow. No permite reconstruir migraciones, convenciones de mensajes ni áreas activas por frecuencia. La coexistencia de generaciones es evidencia estructural, no cronología comprobada.

El [registro de versiones de reportes](../reference/report-versions.md) menciona otro commit que no está disponible como objeto en esta copia. Es una referencia documental no verificada; no garantiza que se pueda restaurar esa versión aquí.

Las convenciones comprobables son NgModule, dominios lazy, servicios Mod*Service, operadores desde rxjs/operators, imports absolutos desde src y casing significativo. AGENTS.md exige cambios pequeños, sin migraciones preventivas ni cambios backend y sin commit/push/despliegue implícitos.

## Validación y riesgos pendientes

Para código, el control liviano es `npx tsc -p tsconfig.app.json --noEmit`, con comprobaciones focalizadas y `git diff --check`. TypeScript no sustituye plantillas Angular ni smoke funcional. Para documentación, revisar rutas, formato, diff y ausencia de datos sensibles; no es necesario compilar. Build, Karma y lint requieren solicitud explícita o necesidad concreta no cubierta por controles livianos y nunca se ejecutan concurrentemente. Ver [Validar cambio](../runbooks/validate-change.md).

- No se verificaron instalación, compilación, login, backend, mapas o BI durante esta revisión.
- tsconfig.spec.json solicita googlemaps mientras la dependencia declarada es @types/google.maps; lint apunta a un builder histórico. Las pruebas de plantilla inicial en app.component.spec.ts y e2e no acreditan cobertura funcional.
- El cliente conserva riesgos de autenticación/storage, cifrado y transporte mutable; consultar [riesgos conocidos](../reference/known-risks.md). Backend debe autorizar independientemente de guards y menú.
- Variantes legacy, contratos dinámicos y estilos distintos entre app/pruebas exigen validar en el consumidor real.
- .gitignore excluye expresamente archivos de fondeo-estable; comprobar qué archivos están rastreados antes de asumir que una edición se entregará.
- Runtime del equipo, despliegue externo e implementación backend de posibles capacidades de IA quedan por confirmar.

## Ruta de lectura y primera tarea

1. [Reglas](../../AGENTS.md) → esta guía → [Mapa del proyecto](project-map.md).
2. [Navegación y sesión](navigation-and-session.md): seguir una URL hasta módulo y componente; comprobar menú y guard.
3. [Acceso remoto](remote-access.md): seguir una lectura hasta Ant, acción y alias sin registrar payloads reales.
4. Elegir guía del dominio desde el [router documental](../README.md); para reportes, leer [Reportes](reports-overview.md) antes del runbook de creación.
5. Leer referencias exhaustivas solo cuando el contrato o componente lo requiera.
6. Aplicar [Validar cambio](../runbooks/validate-change.md), revisar diff y registrar controles pendientes sin declarar éxito no comprobado.

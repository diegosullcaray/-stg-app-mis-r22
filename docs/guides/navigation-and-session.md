**Propósito:** Describir el contrato observable de routing, shell, menú backend y sesión de R22.
**Leer cuando:** Se modifique una ruta, un guard, el menú, el login, el usuario activo o el acceso a un dominio.
**No es necesario para:** Cambios de una vista que no afecten navegación, sesión, autorización cliente ni contratos remotos.
**Prerrequisitos:** Leer [project-map.md](./project-map.md) y conocer Angular Router, `angular-oauth2-oidc` y los servicios `session`/`admin` del backend.
**Canónico para:** Flujo real de navegación y sesión, sus límites y las comprobaciones necesarias antes de cambiarlo.

# Navegación y sesión

## Routing raíz

`src/app/app-routing.module.ts` define tres áreas:

- `''` redirige a `session/signin`.
- El layout público carga `SessionModule` de forma lazy bajo `/session`.
- `/login` muestra `LoginComponent` y usa `LoginGuard`.
- `/app` redirige a `/app/desktop`; el área autenticada usa `AdminLayoutComponent` y `AuthGuard`.

Los dominios bajo `/app` usan `loadChildren` en su mayoría. Los módulos pueden volver a dividirse con lazy loading en sus propios routing modules. No hay ruta comodín `**` ni página 404 en el router raíz. El servidor debe devolver `index.html` para URLs profundas. El inventario funcional está en [../reference/domain-inventory.md](../reference/domain-inventory.md).

Al añadir o mover una ruta, comprobar la URL completa, el casing y el módulo lazy real. En particular, existen ramas hermanas con prefijos repetidos en reportes; no asumir que el nombre de carpeta describe por sí solo una URL alcanzable.

## Shell autenticado

`AdminLayoutComponent` contiene:

- `app-header-top` para la navegación superior.
- `app-sidebar-top` en modo móvil.
- un `router-outlet` para el contenido de cada dominio.
- panel lateral de notificaciones y overlay responsive.

`LayoutService` cambia el estado móvil en el breakpoint observado de `959px`. El shell presenta configuración visual y navegación; no decide por sí solo la autorización backend.

## Menú entregado por backend

Después del login MIS, `ModSysAdminService.getMenuItems` solicita el menú al servicio lógico `admin`. `NavigationService.initMenu` transforma la respuesta:

1. Ordena raíces e hijos por `order_sec`.
2. Mapea `desc_sec`, `act_sec`, iconos, códigos y relaciones `cod_par` a `IMenuItem`/`IChildItem`.
3. Acumula `act_sec` en `routesArray`.
4. Convierte tipos de shortcut `1` y `2` en accesos internos o externos.
5. Publica menú y shortcuts mediante `BehaviorSubject` y los guarda en storage.

El escritorio consume shortcuts: tipo `1` navega dentro de Angular y tipo `2` abre una pestaña externa. El menú backend debe coincidir exactamente con la ruta Angular que pretende mostrar.

Agregar una ruta al frontend no la hace visible ni autorizada. Cambiar un `state`, acción de menú o relación padre/hijo requiere coordinar el contrato backend. La lista de rutas es un control de navegación cliente, no una frontera de seguridad.

## Sesión: flujo observado

```text
/session/signin
  -> initImplicitFlow() de Google OIDC
  -> retorno con fragmento a /login
  -> persistencia y decodificación local del id_token
  -> discovery document + tryLogin()
  -> LoginService.onLogin()
  -> backend session: perfil, alternos, token y SID
  -> backend admin: menú
  -> NavigationService.initMenu()
  -> /app/desktop
```

El flujo usa OAuth/OIDC implícito mediante `angular-oauth2-oidc`, con Google como issuer y scopes configurados en `gmail.config.ts`. `AuthService` procesa el fragmento y decodifica manualmente el cuerpo del `id_token` antes de completar discovery y `tryLogin`.

**Límite importante:** el `catch` de `runInitialLoginSequence()` marca la carga como terminada y resuelve la promesa. `LoginComponent` puede continuar hacia `LoginService.onLogin()` tras ese resultado. Por ello, el frontend actual no demuestra ni garantiza por sí solo que la validación OIDC haya terminado con éxito antes del login MIS. La validación de identidad, sesión y autorización corresponde al backend y al proveedor configurado; esta guía no promete una validación que el código no realiza.

`LoginService` instala perfil y alternos; para el usuario original instala además token y SID, solicita menú y navega a `environment.homePage`. `TokenService.observeToken()` vigila el token MIS después del login original.

## Guards y límites

- `LoginGuard` permite `/login` cuando existe la bandera de callback establecida antes de redirigir a Google.
- `AuthGuard` protege el contenedor `/app`. Si existe una respuesta OIDC en storage, actualmente permite acceso directamente; de lo contrario espera `isAuthenticated` y `isDoneLoading`.
- La comprobación de caducidad del token MIS dentro de `AuthGuard` está comentada. `TokenService` sí observa el token y puede abrir el diálogo de fin de sesión.
- `RouteGuard` compara `state.url` con `NavigationService.routesArray` y vuelve a `environment.homePage` si no coincide.
- En el router raíz, `RouteGuard` está activo explícitamente para `presupuesto` y `actividades`; `canLoad` y `canActivateChild` están comentados.
- Un guard del navegador mejora UX y navegación, pero no sustituye la autorización del backend para cada lectura o mutación.
- No asumir que el interceptor adjunta siempre un header `Authorization`: la parte correspondiente está comentada en `TokenInterceptor`.

## Usuario alternativo y límites

En configuración no productiva, `UserService` sustituye la identidad efectiva por el usuario de desarrollo configurado. Ese valor ya existe en configuración; no copiarlo a documentación, logs ni ejemplos.

El login alternativo recibe uno de los perfiles retornados por backend, ejecuta `alt_login`, instala temporalmente su perfil y menú, y marca `isAlt`. `onOriLogin()` restaura los datos originales guardados en storage. El alternativo no equivale a una nueva identidad OIDC ni a una elevación de permisos: backend debe resolver sesión y autorización para ese perfil.

La persistencia usa claves centralizadas y `LocalStoreService`; en producción aplica cifrado del lado cliente, que no debe tratarse como secreto frente a quien controla el navegador. Evitar `localStorage.clear()` y no guardar nuevos datos sensibles sin necesidad.

## Checklist de cambio

- Verificar ruta Angular, `loadChildren`, `state` del menú y guard aplicable.
- Probar login original, callback, logout, expiración observada y retorno al inicio cuando corresponda.
- Si aplica usuario alternativo, probar cambio y restauración sin mezclar sus datos con los originales.
- Confirmar que backend valida sesión y autorización; no confiar solo en storage o guards.
- No modificar el protocolo OIDC, el token, `Winder-Params` o el contrato `session/admin` como efecto lateral.
- Ejecutar la validación definida en [../runbooks/validate-change.md](../runbooks/validate-change.md) y revisar acceso al backend real según [../guides/remote-access.md](../guides/remote-access.md).

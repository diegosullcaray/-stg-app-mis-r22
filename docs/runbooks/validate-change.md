Propósito: Verificar un cambio de reporte R22 y reportar con precisión controles verdes y bloqueados.
Leer cuando: Se termine una modificación funcional o documental relacionada con Reportes.
No es necesario para: Cambios que no afectan este proyecto o consultas sin ejecución de código.
Prerrequisitos: Dependencias instaladas, ChromeHeadless disponible si se ejecutan pruebas y acceso local al backend real para smoke.
Canónico para: Comandos de typecheck/build/test/lint, revisión de diff, smoke y seguridad operacional.

# Validar un cambio

Ejecutar desde la raíz del repositorio que contiene `package.json`. No modificar configuración, budgets o tipos para hacer pasar un control. Las reglas de [AGENTS.md](../../AGENTS.md) prevalecen.

## Controles aplicables

Por defecto, para cambios funcionales:

```bash
npx tsc -p tsconfig.app.json --noEmit
git diff --check
```

Completar con comprobaciones focalizadas del contrato y smoke según el alcance. Para cambios exclusivamente documentales, revisar enlaces y diff; no es necesario instalar dependencias o compilar.

No ejecutar Karma, lint ni build salvo solicitud explícita del responsable o necesidad concreta que no pueda cubrirse con un control liviano. No ejecutar compilaciones Angular en paralelo. Cuando corresponda un control pesado, ejecutar uno y esperar su finalización:

```bash
npm run build
npm run build -- --configuration production
npm test -- --watch=false --browsers=ChromeHeadless
npm run lint
```

## Controles conocidos bloqueados

El script lint apunta al builder histórico TSLint de Angular CLI, no incluido por Angular 14. El target de pruebas usa `tsconfig.spec.json`, que solicita `googlemaps`, mientras el proyecto declara `@types/google.maps`. Son riesgos de configuración conocidos, no resultados de una ejecución nueva.

Si se autoriza ejecutar esos controles, registrar el comando y su resultado exacto. No declarar éxito de un control omitido ni desactivar validaciones para ocultar errores. Si faltan dependencias o herramientas, indicar esa limitación.

## Revisión del diff

```bash
git status --short
git diff --check
git diff
git diff --cached
```

Revisar además los archivos no rastreados que pertenezcan al cambio. Confirmar que no aparecen credenciales, tokens, cookies, correos, datos personales, payloads reales, respuestas backend ni logs de sesión. No revertir cambios ajenos: separar el alcance y documentar cualquier archivo inesperado.

Para un reporte nuevo, comprobar específicamente:

- Solo se creó el repositorio y el routing necesario; no hay wrapper o padre duplicado.
- `act_sec` y la URL directa son idénticos.
- `table.regular` usa `ModRepService` solo con `cod_rep`/`resultado` confirmados; un Ant específico no expone configuración sensible.
- Los nombres y casing del payload no fueron “corregidos” por analogía.
- El loader termina en éxito, respuesta inválida y error.
- No se insertaron valores backend como HTML ni secretos en mensajes.

## Smoke con backend real

Realizarlo contra la configuración local autorizada de R22 y login alternativo/dev. No registrar ni copiar headers, tokens, cookies, `Winder-Params`, configuración Ant, respuestas completas o datos personales.

1. Iniciar la aplicación con el comando del proyecto:

   ```bash
   npm start
   ```

2. Autenticar con el mecanismo local autorizado.
3. Confirmar que el menú recibido contiene la sección y que `act_sec` lleva a la URL final.
4. Probar URL pegada directamente y refresh.
5. Verificar jerarquía completa, sin raíces y con nivel vacío/error si el contrato los permite.
6. Verificar filtros obligatorios: no debe existir request incompleto ni respuesta antigua sobrescribiendo la última selección.
7. Verificar datos, respuesta vacía, error de red/backend y reintento; el loader debe cerrar siempre.
8. Verificar búsqueda, primera página, total filtrado y selección/cancelación de picker.
9. Verificar drilldown en escritorio y móvil, atrás, cierre y refresh según sea transitorio o recuperable.
10. Comprobar teclado, textos largos, tabla ancha, viewport móvil y que no se expongan datos sensibles en URL, pantalla o consola.

El smoke no sustituye tests unitarios. Si backend no está disponible, declarar el smoke no ejecutado y conservar únicamente evidencia de compilación.

## Referencias

- [Crear un reporte](./create-report.md): contrato, routing, secuencia y DoD.
- [UI de reportes](../recipes/report-ui.md): tabla, estados, pickers, paginación y drilldown.
- [Reportes](../guides/reports-overview.md): menú, contratos y riesgos.
- [Acceso remoto](../guides/remote-access.md): transporte y datos que no deben registrarse.

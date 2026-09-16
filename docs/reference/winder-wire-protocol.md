# Referencia: protocolo Winder

**Propósito:** fijar el contrato de serialización y transporte que R22 usa entre Ant, Winder y el gateway remoto.
**Leer cuando:** se agregue o diagnostique una llamada Ant, una subida, una descarga o una respuesta.
**No es necesario para:** diseñar una pantalla sin acceso remoto ni operar el login local.
**Prerrequisitos:** conocer Angular/RxJS y leer [`docs/guides/remote-access.md`](../guides/remote-access.md) para el uso operativo.
**Canónico para:** forma del `Strand`, header `Winder-Params`, sobre `w`, modalidades `v1/g`, `v1/p` y `v1/pf`, y caveats de R22.

## Alcance

Esta referencia resume el protocolo observado en el código R22. Las rutas, acciones, aliases y payloads pertenecen al backend existente y no se deben inferir ni renombrar. Las referencias de código son relativas a la raíz del repositorio y se verificaron contra el estado actual.

## Objetos

`Strand` es la unidad serializable de trabajo. Tiene `actionRoute`, `name`, `payload`, `formData` y `withFormData` ([`src/app/core/data/remote/winder/strand.class.ts:1-13`](../../src/app/core/data/remote/winder/strand.class.ts#L1-L13)).

| Campo | Envío y significado |
|---|---|
| `actionRoute` | acción lógica exacta; casing, puntos y guiones bajos son significativos |
| `name` | alias para buscar el resultado en `body`; si es `undefined`, JSON lo omite |
| `payload` | objeto de parámetros; `pushToPayload` sobrescribe y `addToPayload` mezcla |
| `formData` | estado local del archivo; se excluye del JSON del header |
| `withFormData` | indicador serializado de que existe archivo |

`setFile(file, id)` crea `FormData`, añade la parte `winder-file` y agrega `_req_file_name_` y `_req_file_id_` al payload ([`src/app/core/data/remote/winder/strand.class.ts:19-25`](../../src/app/core/data/remote/winder/strand.class.ts#L19-L25)). El `id` también se usa como nombre multipart; no se debe sustituir por un nombre inventado.

Aunque varias propiedades son `private` en TypeScript, son propiedades propias en runtime y `JSON.stringify` las serializa ([`src/app/core/data/remote/winder/strand.class.ts:31-39`](../../src/app/core/data/remote/winder/strand.class.ts#L31-L39)). Winder acepta `Strand | Strand[]`; los helpers simples construyen uno y no se encontró un consumidor R22 activo que envíe un arreglo ([`src/app/core/data/remote/ant/ant-service.class.ts:17-28`](../../src/app/core/data/remote/ant/ant-service.class.ts#L17-L28)).

## Serialización

`WinderService.prepare(connection, request)` muta una instancia compartida: limpia `strands`, agrega uno o varios strands, crea `config`, serializa los strands omitiendo `formData`, fija opciones y devuelve `this` ([`src/app/core/data/remote/winder/winder.service.ts:14-63`](../../src/app/core/data/remote/winder/winder.service.ts#L14-L63)).

El header tiene esta forma conceptual, sin valores de conexión reales:

```json
[
  {
    "actionRoute": "domain.action",
    "name": "resultado",
    "payload": { "entity_id": "<ID>" },
    "withFormData": false
  }
]
```

`Winder-Params` contiene el JSON sin cifrar de los strands. Puede contener datos funcionales y no debe registrarse indiscriminadamente ([`src/app/core/data/remote/winder/winder.service.ts:43-63`](../../src/app/core/data/remote/winder/winder.service.ts#L43-L63)).

La configuración del sobre contiene `key`, `port`, `id` y `responseType`. Se cifra mediante `CypherService`; el cifrado del cliente no convierte una credencial compilada en un secreto frente al usuario del navegador ([`src/app/core/data/remote/winder/winder.service.ts:37-41`](../../src/app/core/data/remote/winder/winder.service.ts#L37-L48), [`src/app/core/data/remote/winder/winder.service.ts:119-122`](../../src/app/core/data/remote/winder/winder.service.ts#L119-L122)). La raíz HTTP procede de `environment.requestConfigRootURL` ([`src/app/core/data/remote/rest/rest-packet.class.ts:1-6`](../../src/app/core/data/remote/rest/rest-packet.class.ts#L1-L6)).

## Modalidades

### GET JSON

- Ruta: `v1/g` ([`src/app/core/data/remote/winder/winder.service.ts:95-101`](../../src/app/core/data/remote/winder/winder.service.ts#L95-L101)).
- Query: `w=<configuración cifrada>`.
- Header: `Winder-Params` con el arreglo serializado.
- Body HTTP: ninguno.
- Resultado nominal: `IWinderResponse`; el consumidor obtiene `body[strand.name]`.

`getResponseString` y `getSimpleResponseString` aplican `first()` a la lectura ([`src/app/core/data/remote/ant/ant-service.class.ts:17-28`](../../src/app/core/data/remote/ant/ant-service.class.ts#L17-L28), [`src/app/core/data/remote/ant/ant-service.class.ts:30-45`](../../src/app/core/data/remote/ant/ant-service.class.ts#L30-L45)).

### POST JSON

- Ruta: `v1/p` cuando `formData` es falsy ([`src/app/core/data/remote/winder/winder.service.ts:71-84`](../../src/app/core/data/remote/winder/winder.service.ts#L71-L84)).
- Header: el action y payload permanecen en `Winder-Params`.
- Body: `{"w":"<configuración cifrada>"}`, construido por `RESTService` ([`src/app/core/data/remote/rest/rest.service.ts:18-27`](../../src/app/core/data/remote/rest/rest.service.ts#L18-L27)).
- Alias: los helpers POST simples no asignan `name`; la práctica histórica consume `body.result`.

R22 no fija aquí manualmente `Content-Type`; no se debe agregar sin comprobar la solicitud resultante y la tolerancia del backend.

### POST multipart

- `setFile` crea el formulario y sus metadatos ([`src/app/core/data/remote/winder/strand.class.ts:19-25`](../../src/app/core/data/remote/winder/strand.class.ts#L19-L25)).
- Ruta: `v1/pf` ([`src/app/core/data/remote/winder/winder.service.ts:74-79`](../../src/app/core/data/remote/winder/winder.service.ts#L74-L79)).
- Partes: `winder-file` con el binario y `w` con la configuración cifrada.
- `_req_file_name_` y `_req_file_id_` viajan en el payload del header.
- `HttpClient` genera el boundary; no se debe fijar manualmente.

Winder conserva un único `FormData`; con varios strands que contienen archivo, el último reemplaza al anterior ([`src/app/core/data/remote/winder/winder.service.ts:112-117`](../../src/app/core/data/remote/winder/winder.service.ts#L112-L117)).

### GET recurso/blob

`getSimpleResponseResource` fija `responseType: 'resource'`; Winder lo traduce a `blob` y conserva `v1/g` ([`src/app/core/data/remote/ant/ant-service.class.ts:30-32`](../../src/app/core/data/remote/ant/ant-service.class.ts#L30-L57), [`src/app/core/data/remote/winder/winder.service.ts:55-57`](../../src/app/core/data/remote/winder/winder.service.ts#L55-L57)). El runtime entrega un `Blob`, aunque la firma heredada diga `IWinderResponse`; `StgFinputComponent` lo pasa directamente a `saveAs` ([`src/app/core/screen/components/stg-finput/stg-finput.component.ts:55-58`](../../src/app/core/screen/components/stg-finput/stg-finput.component.ts#L55-L58)).

## Respuestas

El envelope nominal es:

```ts
interface IWinderResponse {
  code: string;
  headers: any;
  body: any;
  errors?: any;
}
```

La interfaz está en [`src/app/core/data/remote/winder/winder.interface.ts:11-16`](../../src/app/core/data/remote/winder/winder.interface.ts#L11-L16). No confundir envelope y resultado del strand: el primero contiene `body`; el segundo suele ser `body.<name>` o `body.result` si el POST no tiene alias.

Formas observadas:

| Flujo | Lectura |
|---|---|
| login | `body.login_response` ([`src/app/system/session/views/login/login.service.ts:48-51`](../../src/app/system/session/views/login/login.service.ts#L48-L51)) |
| menú | `body.menu_response` ([`src/app/system/session/views/login/login.service.ts:52-55`](../../src/app/system/session/views/login/login.service.ts#L52-L55)) |
| lectura moderna | con frecuencia `body.resultado` ([`src/app/modules/analista/principal/principal.component.ts:86-98`](../../src/app/modules/analista/principal/principal.component.ts#L86-L98)) |
| mutación | con frecuencia `body.result.code` ([`src/app/modules/analista/listas/becas/becas.component.ts:109-111`](../../src/app/modules/analista/listas/becas/becas.component.ts#L109-L111)) |
| blob | binario directo, sin envelope |

Los errores HTTP llegan por `error`; no existe normalización central ni `catchError` en REST/Winder/Ant ([`src/app/core/data/remote/rest/rest.service.ts:12-27`](../../src/app/core/data/remote/rest/rest.service.ts#L12-L27)). Un HTTP 2xx puede contener error funcional en `errors`, `code` o el resultado interno. Cada consumidor debe validar la forma concreta y cerrar loaders tanto en éxito como en error.

## Caveats y límites

1. `WinderService` es mutable y `prepare` retorna la misma instancia. Preparar y enviar deben ocurrir en la misma expresión mediante un helper Ant; no conservar un Winder preparado ([`src/app/core/data/remote/winder/winder.service.ts:15-34`](../../src/app/core/data/remote/winder/winder.service.ts#L15-L34)).
2. `prepare` limpia `strands` pero no `formData`; después de una subida, un POST posterior puede volver a `v1/pf` ([`src/app/core/data/remote/winder/winder.service.ts:23-25`](../../src/app/core/data/remote/winder/winder.service.ts#L23-L25)). Recomendación: añadir prueba archivo/POST antes de corregirlo localmente.
3. `Authorization` está comentado en Winder y login; no asumir que una request Ant lo lleva ([`src/app/core/data/remote/winder/winder.service.ts:64-68`](../../src/app/core/data/remote/winder/winder.service.ts#L64-L68)).
4. `metaHeaders` no tiene efecto y `delete`/`update` son TODO ([`src/app/core/data/remote/winder/winder.service.ts:87-93`](../../src/app/core/data/remote/winder/winder.service.ts#L87-L93)).
5. Payload y conexión viajan de forma observable al cliente; no documentar secretos, tokens, correos ni dumps.
6. `computeURL` concatena query params sin `encodeURIComponent` ([`src/app/core/data/remote/rest/rest-packet.class.ts:56-71`](../../src/app/core/data/remote/rest/rest-packet.class.ts#L56-L71)).

Para creación de Ant, use [`docs/reference/ant-catalog.md`](ant-catalog.md), [`docs/reference/known-risks.md`](known-risks.md) y la guía [`docs/guides/remote-access.md`](../guides/remote-access.md). Esta referencia no reemplaza esa guía operativa.

## Checklist de lectura de una request

Al inspeccionar una llamada existente, conservar esta secuencia:

1. localizar el método público del Ant y su `actionRoute`;
2. verificar si el helper asigna `name` o usa la convención POST sin alias;
3. comparar cada clave del payload, incluida su capitalización;
4. confirmar si la acción es GET JSON, POST JSON, multipart o blob;
5. observar la URL `v1/g`, `v1/p` o `v1/pf` en la solicitud real;
6. leer el envelope y luego la propiedad efectiva dentro de `body`;
7. comprobar el canal `error` y el cierre del loader.

El helper no hace validación de esquema: una llamada puede completar con HTTP 2xx y aun así producir una forma funcional inesperada. La interfaz `IWinderResponse` solo asegura los campos externos ([`src/app/core/data/remote/winder/winder.interface.ts:11-16`](../../src/app/core/data/remote/winder/winder.interface.ts#L11-L16)).

## Formas de helper Ant

| Helper | Uso | Caveat |
|---|---|---|
| `getResponseString` | uno o varios strands GET JSON | devuelve envelope y aplica `first()` |
| `getResponseResource` | uno o varios strands GET blob | firma heredada no refleja `Blob` |
| `postResponseString` | uno o varios strands POST | retorno `any`, normalmente sin alias |
| `getSimpleResponseString` | un GET con payload y alias opcional | usa `response` por defecto |
| `getSimpleResponseStringNP` | un GET sin parámetros | usa alias `response` si no se pasa |
| `getSimpleResponseResource` | un GET de recurso | el runtime es `Blob` |
| `postSimpleResponseString` | un POST JSON | normalmente consume `body.result` |
| `postFileSimpleResponseString` | POST multipart con payload y archivo | depende de `formData` mutable |
| `postFileSimpleResponseStringNP` | POST multipart solo archivo | conserva metadatos del `Strand` |

Las firmas se encuentran en [`src/app/core/data/remote/ant/ant-service.class.ts:17-80`](../../src/app/core/data/remote/ant/ant-service.class.ts#L17-L80). Los helpers simples no son una capa de normalización: solo construyen el strand y delegan en Winder.

## Qué no forma parte del contrato actual

`winder-bearer.interface.ts` conserva interfaces anteriores con token, metadata y opciones que no usa el Winder activo ([`src/app/core/data/remote/winder/winder-bearer.interface.ts:4-52`](../../src/app/core/data/remote/winder/winder-bearer.interface.ts#L4-L52)). `metaHeaders` está declarado pero no se lee ([`src/app/core/data/remote/winder/winder.interface.ts:18-29`](../../src/app/core/data/remote/winder/winder.interface.ts#L18-L29)). Los bloques comentados `IWinderBody` y `IWinderRequestOptionsConfig` tampoco describen el envío actual ([`src/app/core/data/remote/winder/winder.interface.ts:3-9`](../../src/app/core/data/remote/winder/winder.interface.ts#L3-L9)).

No usar una interfaz antigua para diseñar una acción nueva, no mover el payload al body HTTP por estética y no sustituir una mutación histórica GET por POST sin contrato backend. La guía de riesgos mantiene el contexto de estas decisiones: [`docs/reference/known-risks.md`](known-risks.md).

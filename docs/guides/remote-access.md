**Propósito:** Explicar el contrato operativo vigente para llamar al backend desde R22 mediante Ant, Strand y Winder.
**Leer cuando:** Se agregue o modifique una operación remota, un servicio Ant o su registro Angular.
**No es necesario para:** Cambiar el backend, rediseñar Winder o investigar una interfaz de reportes sin llamadas nuevas.
**Prerrequisitos:** Conocer la acción, verbo, conexión autorizada, payload y forma de respuesta confirmados por backend.
**Canónico para:** Selección de helper, construcción de solicitudes y registro DI en R22.

# Acceso remoto en R22

## Modelo Ant/Strand/Winder

El consumidor llama un método de dominio del **Ant**. El Ant construye uno o más **Strand** y los entrega a **Winder**. Winder empaqueta la conexión, serializa los strands y elige el transporte HTTP. El consumidor finalmente lee el `Observable` y la clave de resultado acordada.

- **Ant:** subclase de `AntService`; fija `port`, `appId` y `secret` de una conexión existente y expone métodos de negocio.
- **Strand:** unidad de trabajo con `actionRoute`, `name`, `payload` y, si aplica, archivo multipart.
- **Winder:** mantiene estado mutable, construye `Winder-Params`, cifra la configuración de conexión y llama `v1/g`, `v1/p` o `v1/pf`.
- **Envelope:** una respuesta JSON nominal tiene `code`, `headers`, `body` y opcionalmente `errors`.
- **Resultado:** normalmente está en `body[Strand.name]`; los POST simples de R22 suelen devolver `body.result`.

La privacidad TypeScript de `Strand` no oculta sus propiedades en ejecución. `Winder-Params` contiene el JSON sin cifrar de los strands, por lo que no debe registrarse en logs.

Fuentes: [`winder-wire-protocol.md`](../reference/winder-wire-protocol.md) y [`ant-catalog.md`](../reference/ant-catalog.md).

## Elegir helper

Primero confirmar el contrato real; el nombre de la acción no basta para inferir el verbo ni el alias.

| Necesidad | Helper | Resultado esperado |
|---|---|---|
| GET JSON con strands explícitos | `getResponseString` | `IWinderResponse`; el consumidor lee el alias de cada strand |
| GET JSON simple | `getSimpleResponseString` | Crea un strand y usa el alias indicado, o `response` |
| GET sin parámetros | `getSimpleResponseStringNP` | Usa alias indicado, o `response` |
| GET descarga | `getResponseResource` o `getSimpleResponseResource` | En runtime es `Blob`, aunque la firma histórica declara `IWinderResponse` |
| POST JSON | `postResponseString` o `postSimpleResponseString` | Usualmente `body.result`; no añadir `name` sin contrato |
| POST multipart | `postFileSimpleResponseString` | `v1/pf`, `FormData` y metadatos de archivo del `Strand` |
| POST multipart solo archivo | `postFileSimpleResponseStringNP` | No agrega parámetros funcionales |

Los helpers de bajo nivel aceptan `Strand | Strand[]`; los helpers simples crean un solo strand. No usar batching para archivos: Winder solo conserva el último `FormData`.

### Registro DI

```ts
@Injectable()
export class DomainAntService extends AntService {
  constructor(winderService: WinderService) {
    super({
      port: EXISTING_BACKEND_PORT,
      appId: 'existing-backend-app-id',
      secret: '<CONNECTION_SECRET_FROM_APPROVED_CONFIG>'
    }, winderService);
  }
}
```

Registrar el Ant en `providers` del módulo funcional que contiene sus consumidores. `@Injectable()` por sí solo no lo hace disponible. `WinderService` ya se provee desde `SystemModule`; no duplicarlo salvo que se requiera explícitamente un inyector aislado. Mantener un único proveedor por alcance para evitar instancias con perfil o estado capturado diferente.

No deducir una conexión, puerto, `appId`, `actionRoute` o credencial. Obtener el triple exacto por el mecanismo aprobado y no reproducirlo en documentación, pruebas, capturas, mensajes ni logs.

## Contrato de uso

### GET JSON

```ts
getEntity(entityId: string): Observable<IWinderResponse> {
  return this.getSimpleResponseString(
    'domain.get_entity',
    { entity_id: entityId },
    'resultado'
  );
}
```

El transporte es `GET .../v1/g?w=<CONFIG_CIFRADA>` con `Winder-Params` y sin body HTTP. Leer `response.body.resultado` solo si ese alias fue confirmado. Los nombres y el casing del payload son parte del contrato.

### POST JSON

```ts
saveEntity(payload: DomainWritePayload): Observable<IWinderResponse> {
  return this.postSimpleResponseString('domain.save_entity', {
    entity_json: JSON.stringify(payload)
  });
}
```

El transporte es `POST .../v1/p` con `{"w":"<CONFIG_CIFRADA>"}` y los parámetros en `Winder-Params`. Conservar `JSON.stringify` cuando backend espera una cadena JSON. No cambiar GET por POST ni fijar `Content-Type` sin comprobar el contrato existente.

### Resource o archivo

- Descarga: `getSimpleResponseResource`; el resultado real es un `Blob`, no `blob.body`.
- Subida: `Strand.setFile` crea el campo multipart `winder-file` y agrega `_req_file_name_` y `_req_file_id_` al payload; Winder usa `v1/pf`.
- No fijar manualmente el boundary de `FormData`.
- La firma histórica de descarga es débil; no prometer `Observable<Blob>` sin ajustar y verificar toda la cadena.

No conservar un Winder preparado para enviarlo después: usar el helper que prepara y envía en la misma expresión. Una subida puede contaminar el siguiente POST por `formData` no reiniciado; verificar la solicitud si se mezclan ambos flujos.

## Errores y consumo

Hay dos niveles de fallo:

1. **Transporte:** red o HTTP; llega por el callback `error` de `Observable`. R22 no normaliza ni reintenta en Winder/Ant.
2. **Funcional:** puede aparecer en HTTP 2xx dentro de `errors`, `code` o el resultado interno.

El consumidor debe validar la forma acordada, no asumir que `code` siempre es numérico, y cerrar loaders tanto en éxito como en error. No mostrar ni registrar payloads, headers, tokens, configuración cifrada, credenciales o datos personales.

No asumir que Winder adjunta `Authorization`: la lógica actual está comentada. Activarla sería un cambio de autenticación separado.

## Cuándo consultar referencias

- Consultar [`winder-wire-protocol.md`](../reference/winder-wire-protocol.md) antes de alterar verbo, ruta, body, headers, multipart o respuesta.
- Consultar [`ant-catalog.md`](../reference/ant-catalog.md) para localizar el Ant, conexión lógica y consumidores existentes antes de crear otro.
- Consultar [`known-risks.md`](../reference/known-risks.md) para caveats de R22 y [`winder-wire-protocol.md`](../reference/winder-wire-protocol.md) para ejemplos auditados.

Si falta cualquier dato del contrato, detener la implementación y solicitarlo. No crear mocks, adapters temporales ni valores de conexión inventados.

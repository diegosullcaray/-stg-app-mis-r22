# Consulta FEN · fecha de actualización dinámica y datos con `Nan`

Pendientes que ejecuta una persona. El análisis completo y los scripts están en el repositorio DICCIONARIO:
`DICCIONARIO/modificaciones/0004-consulta-fen-fecha-actualizacion/` (`01` a `06`).

## 1. Ya hecho en este repositorio (sin commit)

| Cambio | Archivo |
|---|---|
| Se quitó la fecha escrita a mano `FEN_MATRIX_DATE` (`12 set. 2026`) | `src/app/modules/consulta-fen/consulta-fen.util.ts` |
| `fenFormatDate` y campo opcional `fec_act` | `consulta-fen.util.ts` |
| El sello "Matriz actualizada" sale de `fec_act` de la primera fila; sin dato, queda oculto | `consulta-fen.component.ts` |

Falta: `git add` y `git commit` de estos dos archivos, y `git push`. Hay otros cambios sin commit en el repositorio
(`admin-layout.*`, `src/assets/images/fc/wallpapers-2026/`) que no son de esta tarea.

## 2. Base de datos (lo ejecuta quien tenga permiso)

Orden: cada script está en la carpeta `0004` de DICCIONARIO.

- [ ] Confirmar que la fecha de la carga vigente de la matriz es `2026-09-12` (si no, editar el `UPDATE` de `03`).
- [ ] `04-verificacion.sql`, paso 1 (antes de crear nada).
- [ ] `03-REXPAGRO01_NEW.create.sql`: agrega `HFECACT` a `storage.com_act.HARE001` y crea `com.REXPAGRO01_NEW`.
- [ ] `04-verificacion.sql`, pasos 2 a 4: una sola fecha en la tabla, el SP nuevo devuelve `fec_act`, firma `col`, `val`.
- [ ] `06-activacion.sql`: apunta `CON_AGRO_FEN` al SP nuevo. Revisar el `SELECT` y hacer `COMMIT`; comprobar `@@TRANCOUNT = 0`.
- [ ] Reiniciar Ant si guarda el catálogo en memoria.
- [ ] Volver atrás si algo falla: `05-rollback.sql`.

## 3. Proceso de carga del CENEPRED

- [ ] Hacer que cada carga nueva de `HARE001` llene `HFECACT` con la fecha de la matriz. Si no lo hace, la columna queda
  `NULL` y el sello desaparece de la pantalla.

## 4. Datos con `Nan` en sequía

Dos distritos tienen `Nan` en `HEXPSEQ`; la pantalla ya los muestra tal cual (chip gris), pero el dato es incorrecto.

| HCODUBI | Distrito |
|---|---|
| `120307` | SANGANI (JUNIN, CHANCHAMAYO) |
| `160405` | SANTA ROSA DE LORETO (LORETO, MARISCAL RAMON CASTILLA) |

- [ ] Conseguir el nivel real de sequía en CENEPRED y corregirlo:
  ```sql
  UPDATE storage.com_act.HARE001
  SET HEXPSEQ = '<Muy Alto|Alto|Medio|Bajo|Muy Bajo>'
  WHERE HCODUBI IN ('120307','160405') AND HEXPSEQ = 'Nan';
  ```
- [ ] Revisar que las eñes de los nombres (`NEPEÑA`, `OCOÑA`) estén bien en la tabla; el CSV es latin-1.

## 5. Probar en pantalla

- [ ] Abrir Consulta FEN: debe verse "Matriz actualizada: 12 set. 2026" (la fecha de `HFECACT`, no una constante).
- [ ] Buscar por distrito, departamento y ubigeo; con una búsqueda sin resultados la fecha anterior se conserva.
- [ ] Revisar escritorio y móvil.

## 6. Fuera de alcance, pero pendiente de avisar

- [ ] `@val` se concatena en el SQL dinámico de `REXPAGRO01` (inyección SQL). Avisar al dueño del SP.
- [ ] `MIS-angular-front` usa un validador más estricto para esta misma pantalla y rechaza `Nan`; si se usa, hay que ajustarlo.

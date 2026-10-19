# Consulta FEN · backup, carga de datos nuevos y actualización del SP

Guía para quien tenga permiso en SQL Server. Reemplaza el contenido de `storage.com_act.HARE001` con la matriz nueva
sin perder la anterior, y deja el SP devolviendo la fecha de actualización (`fec_act`).

> Todo lo de abajo ESCRIBE en la base. No lo ejecuta ninguna herramienta del repositorio. Hacerlo en una ventana de bajo uso:
> durante el reemplazo la pantalla puede mostrar la tabla vacía.
> Los tipos de columna de `HARE001` no están documentados; las consultas se apoyan en la propia tabla y no los asumen.

## Orden

1. Backup → 2. Agregar `HFECACT` → 3. Cargar el CSV en una tabla temporal → 4. Validar → 5. Reemplazar → 6. Actualizar el SP → 7. Verificar.

## 1. Backup

```sql
USE storage;
GO
-- Copia completa de la tabla actual (estructura y datos). Cambiar la fecha del nombre por la de hoy.
SELECT * INTO com_act.HARE001_BKP_20261019 FROM com_act.HARE001;

-- Debe dar el mismo número en las dos.
SELECT (SELECT COUNT(*) FROM com_act.HARE001)            AS original,
       (SELECT COUNT(*) FROM com_act.HARE001_BKP_20261019) AS respaldo;
GO
```

Si además quieres un respaldo fuera de la base: `BACKUP DATABASE storage TO DISK = '<ruta>' WITH COPY_ONLY;`
(la ruta es del servidor y la fija quien administre la base).

## 2. Agregar la columna `HFECACT`

Es el paso de `DICCIONARIO/modificaciones/0004-consulta-fen-fecha-actualizacion/03-REXPAGRO01_NEW.create.sql`
(primera parte). Si ya lo ejecutaste, salta al paso 3.

```sql
IF COL_LENGTH(N'com_act.HARE001', N'HFECACT') IS NULL
    ALTER TABLE com_act.HARE001 ADD HFECACT date NULL;
GO
```

## 3. Cargar el CSV en una tabla temporal

El archivo es `CENEPRED_MODELO_AGRO_<MES>_RIESGO_PREDOMINANTE_latin1.csv`: separador `;`, codificación latin-1, con
encabezado `HCODUBI;HDESDEP;HDESPROV;HDESDIS;HEXPMAS;HEXPINU;HEXPSEQ;HEXPPRE`. Primero a una tabla de paso, **no** directo a `HARE001`.

```sql
USE storage;
GO
CREATE TABLE com_act.HARE001_CARGA (
    HCODUBI  varchar(10),  HDESDEP  varchar(100), HDESPROV varchar(100), HDESDIS varchar(100),
    HEXPMAS  varchar(20),  HEXPINU  varchar(20),  HEXPSEQ  varchar(20),  HEXPPRE varchar(20)
);
GO
-- Opción A: el archivo está en una ruta que el SERVIDOR de SQL puede leer.
BULK INSERT com_act.HARE001_CARGA
FROM 'C:\ruta\en\el\servidor\CENEPRED_MODELO_AGRO_<MES>_RIESGO_PREDOMINANTE_latin1.csv'
WITH (FIRSTROW = 2, FIELDTERMINATOR = ';', ROWTERMINATOR = '0x0d0a', CODEPAGE = '1252');
-- Opción B: desde SSMS, clic derecho en la base > Tasks > Import Flat File, hacia com_act.HARE001_CARGA
--           (delimitador ';', codificación 1252). Sirve si el archivo está en tu equipo.
GO
SELECT COUNT(*) AS filas_cargadas FROM com_act.HARE001_CARGA;   -- el CSV de septiembre tenía 1 893
GO
```

## 4. Validar antes de reemplazar

El front acepta cualquier texto en los niveles, pero un valor mal escrito se ve mal en pantalla. Revisa que todo esté en orden:

```sql
-- 4a. Niveles fuera de lista (p. ej. 'Nan', vacíos, mayúsculas distintas). Lo ideal: 0 filas.
SELECT * FROM com_act.HARE001_CARGA
WHERE HEXPMAS NOT IN ('Muy Alto','Alto','Medio','Bajo','Muy Bajo')
   OR HEXPINU NOT IN ('Muy Alto','Alto','Medio','Bajo','Muy Bajo')
   OR HEXPSEQ NOT IN ('Muy Alto','Alto','Medio','Bajo','Muy Bajo')
   OR HEXPPRE NOT IN ('Muy Alto','Alto','Medio','Bajo','Muy Bajo')
   OR HEXPMAS IS NULL OR HEXPINU IS NULL OR HEXPSEQ IS NULL OR HEXPPRE IS NULL;

-- 4b. Ubigeos que no tienen 6 dígitos o están repetidos. Lo ideal: 0 filas.
SELECT HCODUBI, COUNT(*) AS veces FROM com_act.HARE001_CARGA
GROUP BY HCODUBI HAVING LEN(HCODUBI) <> 6 OR COUNT(*) > 1;

-- 4c. Nombres vacíos o con caracteres rotos (las eñes salen como '?' o '�' si la codificación fue la equivocada).
SELECT * FROM com_act.HARE001_CARGA
WHERE NULLIF(LTRIM(RTRIM(HDESDEP)),'') IS NULL OR NULLIF(LTRIM(RTRIM(HDESPROV)),'') IS NULL OR NULLIF(LTRIM(RTRIM(HDESDIS)),'') IS NULL
   OR HDESDIS LIKE '%?%' OR HDESDIS LIKE '%' + NCHAR(65533) + '%';

-- 4d. Comparación con la matriz anterior: cuántos ubigeos aparecen o desaparecen.
SELECT 'solo en la nueva' AS caso, COUNT(*) AS n FROM com_act.HARE001_CARGA c WHERE NOT EXISTS (SELECT 1 FROM com_act.HARE001_BKP_20261019 b WHERE b.HCODUBI = c.HCODUBI)
UNION ALL
SELECT 'solo en la anterior', COUNT(*) FROM com_act.HARE001_BKP_20261019 b WHERE NOT EXISTS (SELECT 1 FROM com_act.HARE001_CARGA c WHERE c.HCODUBI = b.HCODUBI);
```

Corrige en `HARE001_CARGA` lo que salga en 4a a 4c antes de seguir. Para los `Nan` en sequía no inventes un nivel:
consigue el dato en CENEPRED (ver `task.md`, sección 4).

## 5. Reemplazar la tabla (en una transacción)

Define la fecha de la matriz nueva en `@fecha` (la de publicación del CENEPRED, no la de hoy).

```sql
DECLARE @fecha date = '2026-10-19';   -- CAMBIAR

BEGIN TRANSACTION;

DELETE FROM com_act.HARE001;

INSERT INTO com_act.HARE001 (HCODUBI, HDESDEP, HDESPROV, HDESDIS, HEXPMAS, HEXPINU, HEXPSEQ, HEXPPRE, HFECACT)
SELECT LTRIM(RTRIM(HCODUBI)), LTRIM(RTRIM(HDESDEP)), LTRIM(RTRIM(HDESPROV)), LTRIM(RTRIM(HDESDIS)),
       LTRIM(RTRIM(HEXPMAS)), LTRIM(RTRIM(HEXPINU)), LTRIM(RTRIM(HEXPSEQ)), LTRIM(RTRIM(HEXPPRE)), @fecha
FROM com_act.HARE001_CARGA;

-- Debe coincidir con filas_cargadas del paso 3 y con una sola fecha.
SELECT COUNT(*) AS filas, MIN(HFECACT) AS desde, MAX(HFECACT) AS hasta FROM com_act.HARE001;

-- Si está bien:   COMMIT TRANSACTION;
-- Si no:          ROLLBACK TRANSACTION;
SELECT @@TRANCOUNT AS trancount;   -- debe quedar en 0 tras el COMMIT o el ROLLBACK
```

Si `HARE001` tiene otras columnas que no están en el INSERT (índices, auditoría), revísalas antes: el `INSERT` las dejaría `NULL`.

## 6. Actualizar el SP

La fecha ya está en la tabla, así que **el SP se actualiza una sola vez**; las cargas siguientes no lo tocan.
Ejecuta, de `DICCIONARIO/modificaciones/0004-consulta-fen-fecha-actualizacion/`:

1. `03-REXPAGRO01_NEW.create.sql`, la segunda parte: crea `com.REXPAGRO01_NEW`. **Salta su `UPDATE ... SET HFECACT = '20260912'`**
   si ya cargaste datos nuevos con su fecha en el paso 5.
2. `04-verificacion.sql`, pasos 3 y 4.
3. `06-activacion.sql`: apunta `CON_AGRO_FEN` al SP nuevo. Revisa el `SELECT` y haz `COMMIT`.
4. Reinicia Ant si guarda el catálogo en memoria.

## 7. Verificar

```sql
EXEC mod_rep.com.REXPAGRO01_NEW 3, 'SANGANI';   -- 2 resultsets; el segundo trae fec_act
```

En la pantalla de Consulta FEN debe aparecer "Matriz actualizada: <fecha de @fecha>".

## Volver atrás

```sql
-- Datos: restaurar la matriz anterior.
BEGIN TRANSACTION;
DELETE FROM storage.com_act.HARE001;
INSERT INTO storage.com_act.HARE001 SELECT * FROM storage.com_act.HARE001_BKP_20261019;
-- COMMIT TRANSACTION;   o   ROLLBACK TRANSACTION;

-- SP: DICCIONARIO/modificaciones/0004-consulta-fen-fecha-actualizacion/05-rollback.sql
```

Si el respaldo se hizo antes del paso 2, no tiene `HFECACT`: el `INSERT ... SELECT *` falla por el número de columnas.
En ese caso lista las columnas a mano (las 8 originales) y deja `HFECACT` en `NULL`.

## Limpieza

Cuando todo esté validado en producción, borra lo de paso: `DROP TABLE storage.com_act.HARE001_CARGA;`.
Conserva el respaldo `HARE001_BKP_<fecha>` hasta que la matriz nueva lleve un tiempo en uso.

## Cada vez que llegue una matriz nueva

Pasos 1, 3, 4 y 5 (con su `@fecha`). El paso 2 y el SP no se repiten.

/**
 * stg-table3.util.ts
 * 
 * Este archivo contiene:
 * 1. La interfaz IStgTable3Header, que define la configuración de cada cabecera.
 * 2. El tipo StgTable3GridType para definir los posibles valores de funcionalidad del grid.
 * 3. La interfaz IStgTable3Grid para el objeto grid (con type y style).
 * 4. La clase StgTable3Options, que contiene los valores por defecto para la configuración
 *    de la tabla. Se puede instanciar y luego personalizar según se requiera.
 */

/* =========================
   INTERFAZ DE CABECERAS
   ========================= */

/**
 * Representa la configuración de cada cabecera de la tabla.
 * - key?: Propiedad del objeto de datos que se mostrará en la celda (opcional).
 * - label: Texto que se muestra en la cabecera.
 * - style?: Objeto de estilos en línea (por ejemplo: { width: '120px', color: '#333' }).
 * - subs?: Array de cabeceras hijas (sub-columnas), permitiendo encabezados anidados.
 */
export interface IStgTable3Header {
  key?: string;
  label: string;
  style?: { [cssProperty: string]: string };
  subs?: IStgTable3Header[];
}

/* =========================
   TIPO PARA EL GRID
   ========================= */

/**
 * Tipos posibles para el grid (funcionalidad de bordes de la tabla).
 * - full: bordes en todas las celdas.
 * - headers: bordes en la cabecera y contorno general.
 * - bottom: solo bordes inferiores.
 * - none: sin bordes.
 */
export type StgTable3GridType = 'full' | 'headers' | 'bottom' | 'none';

/**
 * Interfaz para el objeto grid, que contiene:
 * - type: del tipo StgTable3GridType.
 * - style: objeto de estilos que se aplicarán a los bordes.
 */
export interface IStgTable3Grid {
  type: StgTable3GridType;
  style?: { [cssProperty: string]: string };
}

/* =========================
   CLASE CON VALORES POR DEFECTO
   ========================= */

/**
 * Clase StgTable3Options que contiene los valores por defecto para la configuración
 * de la tabla. Se puede instanciar y luego personalizar según se requiera.
 */
export class StgTable3Options {
  grid?: IStgTable3Grid;
  style?: { [cssProperty: string]: string };
  header?: {
    style?: { [cssProperty: string]: string };
    cellStyle?: { [cssProperty: string]: string };
    sticky?: boolean;
  };
  body?: {
    style?: { [cssProperty: string]: string };
    rowStyle?: { [cssProperty: string]: string };
    cellStyle?: { [cssProperty: string]: string };
    hover?: {
      enabled?: boolean;
      style?: { [cssProperty: string]: string };
    };
    selection?: {
      enabled?: boolean;
      style?: { [cssProperty: string]: string };
    };
  };

  constructor() {
    this.grid = { type: 'bottom', style: {} };
    this.style = {};

    this.header = {
      style: {},
      cellStyle: {},
      sticky: false // Por defecto, los headers no son sticky
    };

    this.body = {
      style: {},
      rowStyle: {
        height: '25px'
      },
      cellStyle: {
        padding: '3px 5px'
      },
      hover: {
        enabled: false,
        style: { background: '#bbdefb' }
      },
      selection: {
        enabled: false,
        style: { background: '#2196f3', color: 'white' }
      }
    };
  }
}

// Adaptación local de cabeceras legacy para CRA V4.
// No modifica valores backend: la alineación se infiere por clave y título.

export interface LegacyColumn {
  columnDef: string;
  header: string;
  cols?: number;
  isdata?: boolean | number | string;
  format?: {
    type?: string;
    mode?: string;
    unit?: string;
  };
}

export interface LegacyHeaderRow {
  columns: LegacyColumn[];
}

export interface Table2Header {
  label: string;
  key?: string;
  subs?: Table2Header[];
  style?: { [property: string]: string };
  cellStyle?: { [property: string]: string };
  format?: {
    type: string;
    params?: { max_decimals?: number; fix_decimals?: boolean };
  };
}

export interface RegularResult {
  headers?: LegacyHeaderRow[];
  body?: any[];
  additional?: { Total?: number };
}

export function toTable2Headers(rows: LegacyHeaderRow[], data: any[]): Table2Header[] {
  const headers: Table2Header[] = [];
  const registeredKeys = new Set<string>();
  const dataKeys = new Set<string>();

  data.forEach(item => {
    if (item && typeof item === 'object') {
      Object.keys(item).forEach(key => dataKeys.add(key));
    }
  });

  rows.forEach(row => {
    (row.columns || []).forEach(column => {
      const key = column.columnDef;
      if (!key || !dataKeys.has(key) || registeredKeys.has(key)) {
        return;
      }
      registeredKeys.add(key);
      headers.push({
        label: column.header || key,
        key,
        style: {
            'text-align': 'center',
            'vertical-align': 'middle',
            'min-width': '0',
            'width': columnWidth(key),
            'white-space': 'normal',
            'padding': '4px'
        
        },
        cellStyle: {
          'text-align': columnAlignment(column),
          'vertical-align': 'middle'
        },
        format: toTable2Format(column.format)
      });
    });
  });

  // Si la metadata no cruza con las filas, se usan sus claves exactas como
  // respaldo. Así la tabla nunca queda sin columnas aunque falte `isdata`.
  if (!headers.length) {
    dataKeys.forEach(key => headers.push({
      label: key,
      key,
      style: {
        'text-align': 'center',
        'vertical-align': 'middle'
      },
      cellStyle: {
        'text-align': columnAlignment({ columnDef: key, header: key }),
        'vertical-align': 'middle'
      }
    }));
  }

  return headers;
}

// La alineación depende de la semántica de la columna, no del tipo del dato.
// No convierte valores: cuentas/códigos conservan sus ceros y las fechas su formato.
export function columnAlignment(column: LegacyColumn): 'left' | 'right' {
  const normalize = (value: string) => (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const key = normalize(column.columnDef);
  const label = normalize(column.header);

  // Identificadores y nombres son texto aunque parezcan números.
  if (/^(cta|ope|cod)$/.test(key) || key.startsWith('cod_') ||
    /^(cta|cuenta|operacion|codigo|cod)\b/.test(label)) {
    return 'left';
  }

  const semanticName = `${key} ${label}`.replace(/_/g, ' ');
  const numericOrDate = /\b(fecha|fec|dia|dias|saldo|saldos|monto|montos|mont|mon|importe|importes|moneda|monedas|num|numero|cantidad|condonaciones)\b/;
  if (numericOrDate.test(semanticName)) {
    return 'right';
  }

  // Metadata complementaria: funciona también si el valor llega como string.
  const formatType = normalize(column.format && column.format.type || '');
  return ['number', 'integer', 'decimal', 'percent', 'currency', 'money', 'date']
    .includes(formatType) ? 'right' : 'left';
}

export function toTable2Format(format?: LegacyColumn['format']): Table2Header['format'] | undefined {
  if (!format || format.type === 'string' || format.type === 'date') {
    return undefined;
  }
  if (format.type === 'traffic-light') {
    return { type: 'trafficlight' };
  }
  if (format.type === 'percent') {
    return { type: 'percent', params: decimalParams(format.mode) };
  }
  if (format.type === 'number') {
    const params = decimalParams(format.mode);
    return params.max_decimals === 0
      ? { type: 'integer' }
      : { type: 'decimal', params };
  }
  return undefined;
}

export function decimalParams(mode?: string): { max_decimals: number; fix_decimals: boolean } {
  const match = mode ? mode.match(/\.(\d+)-(\d+)/) : null;
  const min = match ? Number(match[1]) : 0;
  const max = match ? Number(match[2]) : 2;
  return { max_decimals: max, fix_decimals: min === max };
}
function columnWidth(key: string): string {
  const shortColumns = [
    'moneda', 'reg_ges', 'cuot_zero', 'cuot_one',
    'HPREC3M', 'HPREC6M', 'HINDCART', 'HINDREPR',
    'HINDEXCP', 'HNUMCOND', 'dia_act', 'num_ges',
    'dia_ven_prom'
  ];

  return shortColumns.includes(key) ? '65px' : 'auto';
}
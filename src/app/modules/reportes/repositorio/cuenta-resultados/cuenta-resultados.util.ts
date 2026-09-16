import { createStgLightTable2Config } from 'app/core/screen/base/stg-table2-presets';

const numberFormat = { type: 'integer' };
const expenseAccountCodes = [
    'CR018', 'CR019', 'CR020', 'CR026', 'CR035', 'CR036', 'CR049',
    'CR062', 'CR068', 'CR069', 'CR074', 'CR075', 'CR076'
];

export interface CuentaResultadoRow {
    style: 1 | 2 | 3;
    cuenta_codigo: string;
    cuenta_nombre: string;
    orden: number;
    periodo_anio_anterior: number;
    periodo_anterior: number;
    periodo_actual: number;
    variacion_periodo_anterior: number;
    acumulado_anio_anterior: number;
    acumulado_actual: number;
    variacion_acumulado: number;
    variacion_acumulado_pct: number;
}

export const tableOptions = createStgLightTable2Config({
    style: {
        'font-size': '11px',
        'min-width': '1230px',
        'font-variant-numeric': 'tabular-nums'
    },
    grid: {
        mode: 'bottom',
        border: '1px solid #e3eaf0'
    },
    header: {
        style: {
            'background': '#f8fbfd',
            'color': '#40566a',
            'font-weight': '800',
            'text-align': 'center',
            'font-size': '9px',
            'line-height': '1',
            'letter-spacing': '.07em',
            'text-transform': 'uppercase',
            'padding': '6px'
        },
        cellStyle: {
            'min-width': '82px',
            'height': '20px',
            'padding': '5px 6px'
        }
    },
    body: {
        loading: { enabled: false },
        hover: { enabled: false },
        cellStyle: {
            'height': '20px',
            'padding': '6px 8px'
        },
        rowStyleFn: (row: CuentaResultadoRow) => {
            if (row && row.style === 3) {
                return {
                    'background': '#0b5f9d',
                    'color': '#ffffff',
                    'font-weight': '800'
                };
            }
            if (row && row.style === 2) {
                return {
                    'background': '#f5f9fc',
                    'color': '#07395f',
                    'font-weight': '800'
                };
            }
            return { 'color': '#40566a', 'font-weight': '600' };
        }
    }
});

function leaf(label: string, key: string, minWidth = '92px', separator = false): any {
    return {
        label,
        key,
        format: numberFormat,
        style: {
            'background': '#ffffff',
            'color': '#40566a',
            'font-weight': '800',
            'font-size': '10px',
            'line-height': '1.1',
            'padding': '5px 6px'
        },
        cellStyle: {
            'min-width': minWidth,
            'text-align': 'right',
            ...(separator ? { 'border-left': '1px solid #d6e0e8' } : {})
        }
    };
}

function accountCellStyle(params: any): any {
    const row = params && params.rowData;
    return {
        'position': 'sticky',
        'left': '0',
        'z-index': row && row.style === 3 ? '4' : '3',
        'background': row && row.style === 3 ? '#0b5f9d' : row && row.style === 2 ? '#f5f9fc' : '#ffffff',
        'color': row && row.style === 3 ? '#ffffff' : '#40566a',
        'font-weight': row && row.style > 1 ? '800' : '600',
        'padding-left': row && row.style === 1 ? '28px' : '12px',
        'text-align': 'left'
    };
}

function trafficColor(value: number, row: CuentaResultadoRow): string {
    const isExpense = row && expenseAccountCodes.indexOf(row.cuenta_codigo) !== -1;
    return (isExpense ? value <= 0 : value >= 0) ? 'green' : 'red';
}

function comparisonFormat(type: 'integer' | 'percent'): any {
    return {
        type: 'custom',
        params: {
            typeFn: (_value: number, row: CuentaResultadoRow) => ({
                type: type === 'percent' ? 'percent' : 'integerTraffic',
                params: {
                    trafficFn: (value: number) => trafficColor(value, row),
                    indicator: 'arrow',
                    colorValue: true,
                    softColors: row && row.style === 3
                }
            })
        }
    };
}

function comparisonLeaf(label: string, key: string, type: 'integer' | 'percent' = 'integer'): any {
    return {
        label,
        key,
        format: comparisonFormat(type),
        style: {
            'background': '#ffffff',
            'color': '#40566a',
            'font-weight': '800',
            'font-size': '10px',
            'line-height': '1.1',
            'padding': '5px 6px'
        },
        cellStyle: {
            'min-width': '98px',
            'text-align': 'right'
        }
    };
}

export function createTableHeaders(period: { val: string; label: string }, preliminary: boolean): any[] {
    const selected = new Date(period.val + 'T00:00:00');
    const previous = new Date(selected.getFullYear(), selected.getMonth() - 1, 1);
    const selectedYear = selected.getFullYear();
    const previousYear = selectedYear - 1;
    const month = selected.toLocaleString('es-PE', { month: 'short' }).replace('.', '');
    const previousMonth = previous.toLocaleString('es-PE', { month: 'short' }).replace('.', '');
    const monthLabel = `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
    const previousMonthLabel = `${previousMonth.charAt(0).toUpperCase()}${previousMonth.slice(1)}`;
    const selectedShort = `${monthLabel}-${String(selectedYear).slice(-2)}`;
    const previousShort = `${previousMonthLabel}-${String(previous.getFullYear()).slice(-2)}`;

    return [
        {
            label: 'Estado de ganancias y pérdidas',
            key: 'cuenta_nombre',
            sticky: true,
            style: {
                'min-width': '280px',
                'width': '280px',
                'position': 'sticky',
                'left': '0',
                'z-index': '7',
                'background': '#ffffff',
                'box-shadow': '8px 0 10px -10px rgba(23,43,58,.35)'
            },
            cellStyle: {
                'min-width': '280px',
                'text-align': 'left',
                'position': 'sticky',
                'left': '0',
                'z-index': '3',
                'box-shadow': '8px 0 10px -10px rgba(23,43,58,.35)'
            },
            cellStyleFn: accountCellStyle
        },
        {
            label: 'Mensual',
            style: { 'background': '#f8fbfd', 'color': '#084f86' },
            subs: [
                leaf(`${monthLabel}-${String(previousYear).slice(-2)}`, 'periodo_anio_anterior'),
                leaf(`${previousMonthLabel}-${String(selectedYear).slice(-2)}`, 'periodo_anterior'),
                leaf(`${monthLabel}-${String(selectedYear).slice(-2)}${preliminary ? ' <span class="cta-preliminary-label">PRELIM.</span>' : ''}`, 'periodo_actual'),
                comparisonLeaf(`${selectedShort} vs ${previousShort}`, 'variacion_periodo_anterior')
            ]
        },
        {
            label: 'Acumulado',
            style: { 'background': '#f8fbfd', 'color': '#084f86' },
            subs: [
                leaf(`Acum. ${monthLabel}-${String(previousYear).slice(-2)}`, 'acumulado_anio_anterior', '98px', true),
                leaf(`Acum. ${monthLabel}-${String(selectedYear).slice(-2)}`, 'acumulado_actual'),
                comparisonLeaf('Var.', 'variacion_acumulado'),
                comparisonLeaf('Var. %', 'variacion_acumulado_pct', 'percent')
            ]
        }
    ];
}

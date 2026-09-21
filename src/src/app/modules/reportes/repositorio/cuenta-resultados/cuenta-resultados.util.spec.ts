import { createTableHeaders, tableOptions } from './cuenta-resultados.util';

describe('Cuenta de Resultados table configuration', () => {
    function getLeaves(): any[] {
        const headers: any[] = createTableHeaders({ val: '2026-06-01', label: 'Junio 2026' }, true);
        const leaves: any[] = [];
        const visit = (header: any) => header.subs ? header.subs.forEach(visit) : leaves.push(header);
        headers.forEach(visit);
        return leaves;
    }

    it('maps the account and eleven backend metrics to the current reference', () => {
        const headers: any[] = createTableHeaders({ val: '2026-06-01', label: 'Junio 2026' }, true);
        const leaves = getLeaves();

        expect(leaves.map(column => column.key)).toEqual([
            'cuenta_nombre',
            'periodo_anio_anterior',
            'periodo_anterior',
            'periodo_actual',
            'variacion_periodo_anterior',
            'acumulado_anio_anterior',
            'acumulado_actual',
            'variacion_acumulado',
            'variacion_acumulado_pct'
        ]);
        expect(headers[1].label).toBe('Mensual');
        expect(headers[1].subs.map(column => column.key)).toEqual([
            'periodo_anio_anterior',
            'periodo_anterior',
            'periodo_actual',
            'variacion_periodo_anterior'
        ]);
        expect(headers[2].label).toBe('Acumulado');
        expect(headers[1].subs[2].label).toContain('PRELIM.');
        const closedHeaders = createTableHeaders({ val: '2026-05-01', label: 'Mayo 2026' }, false);
        expect(closedHeaders[1].subs[2].label).toBe('May-26');
    });

    it('uses arrows on every row and reverses expense polarity', () => {
        const leaves = getLeaves();
        const comparison = leaves.find(item => item.key === 'variacion_periodo_anterior');
        const detailFormat = comparison.format.params.typeFn(-1, { style: 1, cuenta_codigo: 'CR016' });
        const incomeFormat = comparison.format.params.typeFn(-1, { style: 2, cuenta_codigo: 'CR012' });
        const expenseFormat = comparison.format.params.typeFn(-1, { style: 2, cuenta_codigo: 'CR018' });

        expect(detailFormat.type).toBe('integerTraffic');
        expect(detailFormat.params.indicator).toBe('arrow');
        expect(incomeFormat.type).toBe('integerTraffic');
        expect(incomeFormat.params.trafficFn(-1)).toBe('red');
        expect(incomeFormat.params.trafficFn(1)).toBe('green');
        expect(expenseFormat.params.trafficFn(-1)).toBe('green');
        expect(expenseFormat.params.trafficFn(1)).toBe('red');
    });

    it('formats the accumulated variation as a percentage with traffic', () => {
        const percentage = getLeaves().find(item => item.key === 'variacion_acumulado_pct');
        const format = percentage.format.params.typeFn(0.1291, { style: 3, cuenta_codigo: 'CR021' });

        expect(format.type).toBe('percent');
        expect(format.params.trafficFn(0.1291)).toBe('green');
    });

    it('uses numeric backend styles for detail, principal and result rows', () => {
        expect(tableOptions.body.rowStyleFn({ style: 1 } as any)).toEqual({ 'color': '#40566a' });
        expect(tableOptions.body.rowStyleFn({ style: 2 } as any).background).toBe('#f5f9fc');
        expect(tableOptions.body.rowStyleFn({ style: 3 } as any).background).toBe('#0b5f9d');
    });
});

import { of, throwError } from 'rxjs';
import { CuentaResultadosComponent } from './cuenta-resultados.component';

describe('CuentaResultadosComponent', () => {
    const metadata = JSON.stringify({
        preliminar: 1,
        fechas: ['2026-06-01', '2026-05-01', '2026-04-01']
    });
    const row: any = {
        style: 2,
        cuenta_codigo: 'CR012',
        cuenta_nombre: 'INGRESOS FINANCIEROS',
        orden: 1,
        periodo_anio_anterior: 1,
        periodo_anterior: 2,
        periodo_actual: 3,
        variacion_periodo_anterior: 1,
        acumulado_anio_anterior: 4,
        acumulado_actual: 5,
        variacion_acumulado: 1,
        variacion_acumulado_pct: 0.25,
    };

    function createComponent(response: any): { component: CuentaResultadosComponent; reportService: any; loader: any } {
        const reportService: any = {
            getRegularTableResult: jasmine.createSpy('getRegularTableResult').and.returnValue(response)
        };
        const loader: any = {
            open: jasmine.createSpy('open'),
            close: jasmine.createSpy('close')
        };
        const component = new CuentaResultadosComponent(reportService, {} as any, loader);
        component.selectedPeriod = { val: '2026-06-01', label: 'Junio 2026' };
        return { component, reportService, loader };
    }

    it('bootstraps with NOW and uses the first available date without a second request', () => {
        const context = createComponent(of({ body: { resultado: { headers: metadata, data: [row] } } }));
        context.component.selectedPeriod = null;

        context.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);

        expect(context.reportService.getRegularTableResult).toHaveBeenCalledTimes(1);
        expect(context.reportService.getRegularTableResult.calls.argsFor(0)[1]).toEqual({
            fecha: 'NOW',
            tip_cod: 7,
            cod_rel: '231'
        });
        expect(context.component.rows).toEqual([row]);
        expect(context.component.periods.map(period => period.val)).toEqual([
            '2026-06-01',
            '2026-05-01',
            '2026-04-01'
        ]);
        expect(context.component.periods[0].label).toBe('Junio de 2026');
        expect(context.component.dropdownChipText).toBe('Preliminar');
        expect(context.component.state).toBe('data');
        expect(context.loader.close).toHaveBeenCalled();
    });

    it('represents an empty backend result separately', () => {
        const context = createComponent(of({ body: { resultado: { headers: metadata, data: [] } } }));

        context.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);

        expect(context.component.state).toBe('empty');
        expect(context.component.rows).toEqual([]);
        expect(context.loader.close).toHaveBeenCalled();
    });

    it('reloads the report without rebuilding the hierarchy when the period changes', () => {
        const response = of({ body: { resultado: { headers: metadata, data: [row] } } });
        const context = createComponent(response);
        const hierarchy = { roots: ['existing'] };
        context.component.confHier = hierarchy;
        context.component.activeHierarchy = true;
        context.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);
        context.component.onPeriodChange({ val: '2026-05-01', label: 'Mayo 2026' });

        expect(context.reportService.getRegularTableResult).toHaveBeenCalledTimes(2);
        expect(context.reportService.getRegularTableResult.calls.mostRecent().args[1].fecha).toBe('20260501');
        expect(context.component.confHier).toBe(hierarchy);
        expect(context.component.activeHierarchy).toBe(true);
        expect(context.component.state).toBe('data');
    });

    it('normalizes a selected date before sending it to the backend', () => {
        const context = createComponent(of({ body: { resultado: { headers: metadata, data: [row] } } }));

        context.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);
        context.component.onPeriodChange({ val: '2026-05-01', label: 'Texto incorrecto' });

        expect(context.reportService.getRegularTableResult.calls.mostRecent().args[1].fecha).toBe('20260501');
        expect(context.component.selectedPeriod).toEqual({ val: '2026-05-01', label: 'Mayo de 2026' });
    });

    it('reports malformed and failed backend responses', () => {
        const malformed = createComponent(of({ body: { resultado: { headers: metadata } } }));
        malformed.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);
        expect(malformed.component.state).toBe('error');
        expect(malformed.component.errorMessage).toBe('El reporte devolvió una respuesta inválida.');

        const invalidMetadata = createComponent(of({ body: { resultado: { headers: '[]', data: [] } } }));
        invalidMetadata.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);
        expect(invalidMetadata.component.state).toBe('error');
        expect(invalidMetadata.component.errorMessage).toBe('El reporte devolvió metadatos inválidos.');

        const failed = createComponent(throwError(new Error('backend error')));
        failed.component.selectHierarchy([{ tip_cod: 7, cod_rel: '231' }]);
        expect(failed.component.state).toBe('error');
        expect(failed.component.errorMessage).toBe('No se pudo cargar el reporte.');
        expect(failed.loader.close).toHaveBeenCalled();
    });
});

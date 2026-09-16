import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { of, Subject, throwError } from 'rxjs';
import { ConsultaFenComponent } from './consulta-fen.component';
import { ConsultaFenModule } from './consulta-fen.module';
import { FEN_HIGH_RISK_MESSAGE, FenRiskRow } from './consulta-fen.util';

describe('ConsultaFenComponent', () => {
  const row: FenRiskRow = {
    cod_ubi: '040101',
    des_dep: 'DEPARTAMENTO',
    des_prov: 'PROVINCIA',
    des_dist: 'DISTRITO',
    exp_mas: 'Muy Bajo',
    exp_inu: 'Medio',
    exp_seq: 'Medio',
    exp_pre: 'Medio'
  };
  let fixture: ComponentFixture<ConsultaFenComponent>;
  let reportService: any;
  let loader: any;

  function response(data: FenRiskRow[]): any {
    return { code: 'SUCCESS', body: { resultado: { headers: '', data } } };
  }

  beforeEach(async () => {
    reportService = {
      getRegularTableResult: jasmine.createSpy('getRegularTableResult').and.returnValue(of(response([row])))
    };
    loader = {
      open: jasmine.createSpy('open'),
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      imports: [
        ConsultaFenModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ModRepService, useValue: reportService },
        { provide: StgAppLoaderService, useValue: loader }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaFenComponent);
    fixture.detectChanges();
  });

  it('renders the single selector and empty matrix without the old cards or tabs', () => {
    const component = fixture.componentInstance;
    expect(component.filterOptions).toEqual([
      { value: 0, label: 'Ubigeo' }, { value: 1, label: 'Departamento' },
      { value: 2, label: 'Provincia' }, { value: 3, label: 'Distrito' }
    ]);
    expect(component.filterType).toBe(3);
    expect(fixture.nativeElement.querySelector('mat-select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('mat-tab-group')).toBeNull();
    expect(fixture.nativeElement.querySelector('.metrics')).toBeNull();
    expect(fixture.nativeElement.querySelector('.selection-summary')).toBeNull();
    expect(fixture.nativeElement.querySelector('.matrix-placeholder')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('stg-paginator')).toBeNull();
  });

  it('all four filter types are enabled and functional', () => {
    const component = fixture.componentInstance;
    for (const type of [0, 1, 2, 3]) {
      component.filterType = type as any;
      expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBeFalse();
    }
  });

  it('filterLabel returns the label matching the current filterType', () => {
    const component = fixture.componentInstance;
    const cases: Array<[0 | 1 | 2 | 3, string]> = [
      [0, 'Ubigeo'], [1, 'Departamento'], [2, 'Provincia'], [3, 'Distrito']
    ];
    for (const [type, expected] of cases) {
      component.filterType = type;
      expect(component.filterLabel).toBe(expected);
    }
  });

  it('clears stale results and pagination when changing the filter type', () => {
    const component = fixture.componentInstance;
    component.query = 'distrito';
    component.search();
    component.filterType = 0;
    component.changeFilterType();
    fixture.detectChanges();
    expect(component.query).toBe('');
    expect(component.rows).toEqual([]);
    expect(component.pageRows).toEqual([]);
    expect(component.currentPage).toBe(1);
    expect(component.state).toBe('idle');
    expect(fixture.nativeElement.querySelector('#risk-query').getAttribute('inputmode')).toBe('numeric');
  });

  it('queries district results and shows the obs column in the table', () => {
    fixture.componentInstance.query = '  distrito  ';

    fixture.componentInstance.search();
    fixture.detectChanges();

    expect(reportService.getRegularTableResult).toHaveBeenCalledWith('CON_AGRO_FEN', {
      col: 3,
      val: 'distrito'
    });
    // rows contiene FenDisplayRow con el campo obs derivado de los KPIs
    expect(fixture.componentInstance.rows.length).toBe(1);
    expect(fixture.componentInstance.rows[0].obs).toBe('-'); // exp_pre: 'Medio' → sin alerta
    expect(fixture.nativeElement.querySelector('stg-table2')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.selection-summary')).toBeNull();
    expect(loader.open).toHaveBeenCalledWith('Consultando riesgos...');
    expect(loader.close).toHaveBeenCalled();
  });

  it('shows the CENEPRED alert in the obs column when exp_pre is high risk', () => {
    const highRiskRow: FenRiskRow = { ...row, exp_pre: 'Alto' };
    reportService.getRegularTableResult.and.returnValue(of(response([highRiskRow])));
    fixture.componentInstance.query = 'distrito';
    fixture.componentInstance.search();
    fixture.detectChanges();

    expect(fixture.componentInstance.rows[0].obs).toBe(FEN_HIGH_RISK_MESSAGE);
  });

  it('shows count label for multiple results without a selection panel', () => {
    const secondRow: FenRiskRow = { ...row, cod_ubi: '040102', des_dist: 'OTRO DISTRITO' };
    reportService.getRegularTableResult.and.returnValue(of(response([row, secondRow])));
    fixture.componentInstance.query = 'distrito';

    fixture.componentInstance.search();
    fixture.detectChanges();

    expect(fixture.componentInstance.rows.length).toBe(2);
    expect(fixture.nativeElement.querySelector('.selection-summary')).toBeNull();
    expect(fixture.nativeElement.querySelector('.matrix-count').textContent.trim()).toBe('2 registros');
  });

  it('queries UBIGEO as a string', () => {
    fixture.componentInstance.query = '040101';
    fixture.componentInstance.filterType = 0;
    fixture.componentInstance.search();

    expect(reportService.getRegularTableResult).toHaveBeenCalledWith('CON_AGRO_FEN', {
      col: 0,
      val: '040101'
    });
    expect(fixture.componentInstance.rows.length).toBe(1);
  });

  it('does not query an invalid UBIGEO', () => {
    fixture.componentInstance.query = '40101';
    fixture.componentInstance.filterType = 0;
    fixture.componentInstance.search();

    expect(reportService.getRegularTableResult).not.toHaveBeenCalled();
    expect(fixture.componentInstance.state).toBe('error');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-notice').textContent)
      .toContain('Ingresa un código ubigeo válido');
  });

  it('does not query a district shorter than two characters', () => {
    fixture.componentInstance.query = 'a';
    fixture.componentInstance.search();

    expect(reportService.getRegularTableResult).not.toHaveBeenCalled();
    expect(fixture.componentInstance.state).toBe('error');
    expect(fixture.componentInstance.errorMessage).toContain('al menos 2 caracteres');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-notice').textContent)
      .toContain('Ingresa al menos 2 caracteres');
  });

  it('handles empty and failed requests and closes the loader', () => {
    reportService.getRegularTableResult.and.returnValue(of(response([])));
    fixture.componentInstance.query = 'sin resultados';
    fixture.componentInstance.search();
    fixture.detectChanges();

    expect(fixture.componentInstance.state).toBe('empty');
    expect(fixture.nativeElement.querySelector('.empty-notice').textContent)
      .toContain('No se encontraron resultados para la búsqueda ingresada.');

    reportService.getRegularTableResult.and.returnValue(throwError(new Error('network')));
    fixture.componentInstance.search();
    expect(fixture.componentInstance.state).toBe('error');
    expect(loader.close).toHaveBeenCalled();
  });

  it('pages locally and resets the shared paginator for another equally sized result', () => {
    const rows = Array.from({ length: 23 }, (_, index) => ({
      ...row, cod_ubi: String(100000 + index)
    }));
    reportService.getRegularTableResult.and.returnValue(of(response(rows)));
    const component = fixture.componentInstance;
    component.query = 'distrito';
    component.search();
    fixture.detectChanges();
    const paginator: StgPaginatorComponent = fixture.debugElement
      .query(By.directive(StgPaginatorComponent)).componentInstance;

    expect(component.pageRows.length).toBe(10);
    expect(paginator.totalLenght).toBe(23);
    expect(paginator.pageLenght).toBe(10);
    paginator.nextPage();
    fixture.detectChanges();
    expect(component.pageRows.length).toBe(10);
    paginator.lastPage();
    fixture.detectChanges();
    expect(component.pageRows.length).toBe(3);
    expect(reportService.getRegularTableResult.calls.count()).toBe(1);

    component.search();
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    expect(component.pageRows.length).toBe(10);
    expect(paginator.currentPage).toBe(1);
    expect(paginator.disableLast).toBeFalse();
    expect(paginator.disablePrevious).toBeTrue();
  });

  it('clears the visible page while loading and hides pagination for empty or short results', () => {
    const component = fixture.componentInstance;
    component.query = 'distrito';
    reportService.getRegularTableResult.and.returnValue(of(response(
      Array.from({ length: 11 }, () => ({ ...row }))
    )));
    component.search();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('stg-paginator')).not.toBeNull();

    const pending = new Subject<any>();
    reportService.getRegularTableResult.and.returnValue(pending);
    component.search();
    fixture.detectChanges();
    expect(component.state).toBe('loading');
    expect(component.pageRows).toEqual([]);
    expect(fixture.nativeElement.querySelector('stg-paginator')).toBeNull();
    pending.next(response([]));
    pending.complete();
    fixture.detectChanges();
    expect(component.state).toBe('empty');
    expect(fixture.nativeElement.querySelector('stg-table2')).toBeNull();

    reportService.getRegularTableResult.and.returnValue(of(response([row])));
    component.search();
    fixture.detectChanges();
    expect(component.pageRows.length).toBe(1);
    expect(fixture.nativeElement.querySelector('stg-paginator')).toBeNull();
  });
});

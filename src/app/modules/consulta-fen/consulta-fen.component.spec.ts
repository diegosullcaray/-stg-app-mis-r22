import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { of, throwError } from 'rxjs';
import { ConsultaFenComponent } from './consulta-fen.component';
import { ConsultaFenModule } from './consulta-fen.module';
import { FenRiskRow } from './consulta-fen.util';

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

  it('renders the initial query with district first', () => {
    const content = fixture.nativeElement.textContent;
    const tabs = fixture.nativeElement.querySelectorAll('.mat-tab-label-content');

    expect(content).toContain('Consulta FEN - CENEPRED');
    expect(tabs[0].textContent.trim()).toBe('Por distrito');
    expect(tabs[1].textContent.trim()).toBe('Por ubigeo');
  });

  it('keeps result cards neutral and hides the matrix initially', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric');

    expect(cards.length).toBe(4);
    expect(Array.from(cards).every((card: HTMLElement) => card.classList.contains('risk--empty'))).toBeTrue();
    expect(fixture.nativeElement.querySelector('.result-head')).toBeNull();
    expect(fixture.nativeElement.querySelector('.matrix')).toBeNull();
  });

  it('queries district results and selects its only row', () => {
    fixture.componentInstance.districtQuery = '  distrito  ';

    fixture.componentInstance.searchByDistrict();
    fixture.detectChanges();

    expect(reportService.getRegularTableResult).toHaveBeenCalledWith('CON_AGRO_FEN', {
      col: 3,
      val: 'distrito'
    });
    expect(fixture.componentInstance.rows).toEqual([row]);
    expect(fixture.componentInstance.result).toBe(row);
    expect(fixture.nativeElement.querySelector('.result-head')).not.toBeNull();
    expect(Array.from(fixture.nativeElement.querySelectorAll('.metric strong'))
      .map((element: HTMLElement) => element.textContent.trim()))
      .toEqual(['Muy Bajo', 'Medio', 'Medio', 'Medio']);
    expect(fixture.nativeElement.querySelector('stg-table2')).not.toBeNull();
    expect(loader.open).toHaveBeenCalledWith('Consultando riesgos...');
    expect(loader.close).toHaveBeenCalled();
  });

  it('waits for an explicit selection when the query returns multiple rows', () => {
    const secondRow: FenRiskRow = { ...row, cod_ubi: '040102', des_dist: 'OTRO DISTRITO' };
    reportService.getRegularTableResult.and.returnValue(of(response([row, secondRow])));
    fixture.componentInstance.districtQuery = 'distrito';

    fixture.componentInstance.searchByDistrict();
    fixture.detectChanges();

    expect(fixture.componentInstance.result).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.metric strong').length).toBe(0);
    expect(fixture.nativeElement.querySelector('.matrix-count').textContent.trim()).toBe('2 registros');

    fixture.componentInstance.selectRisk(secondRow);

    expect(fixture.componentInstance.result).toBe(secondRow);
  });

  it('queries UBIGEO as a string and selects its first result', () => {
    fixture.componentInstance.ubigeoQuery = '040101';

    fixture.componentInstance.searchByUbigeo();

    expect(reportService.getRegularTableResult).toHaveBeenCalledWith('CON_AGRO_FEN', {
      col: 0,
      val: '040101'
    });
    expect(fixture.componentInstance.result).toBe(row);
  });

  it('does not query an invalid UBIGEO', () => {
    fixture.componentInstance.ubigeoQuery = '40101';

    fixture.componentInstance.searchByUbigeo();

    expect(reportService.getRegularTableResult).not.toHaveBeenCalled();
    expect(fixture.componentInstance.state).toBe('error');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-notice').textContent)
      .toContain('Ingresa un código ubigeo válido');
  });

  it('does not query a district shorter than two characters', () => {
    fixture.componentInstance.districtQuery = 'a';

    fixture.componentInstance.searchByDistrict();

    expect(reportService.getRegularTableResult).not.toHaveBeenCalled();
    expect(fixture.componentInstance.state).toBe('error');
    expect(fixture.componentInstance.errorMessage).toContain('al menos 2 caracteres');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.error-notice').textContent)
      .toContain('Ingresa al menos 2 caracteres');
  });

  it('shows the commercial alert only for high risks', () => {
    fixture.componentInstance.selectRisk({ ...row, exp_pre: 'Alto' });
    fixture.detectChanges();

    expect(fixture.componentInstance.showHighRiskAlert()).toBeTrue();
    expect(fixture.nativeElement.querySelector('.metrics').nextElementSibling.classList.contains('risk-alert')).toBeTrue();

    fixture.componentInstance.selectRisk(row);
    expect(fixture.componentInstance.showHighRiskAlert()).toBeFalse();
  });

  it('handles empty and failed requests and closes the loader', () => {
    reportService.getRegularTableResult.and.returnValue(of(response([])));
    fixture.componentInstance.districtQuery = 'sin resultados';
    fixture.componentInstance.searchByDistrict();
    fixture.detectChanges();

    expect(fixture.componentInstance.state).toBe('empty');
    expect(fixture.nativeElement.querySelector('.empty-notice').textContent)
      .toContain('No se encontraron resultados para la búsqueda ingresada.');

    reportService.getRegularTableResult.and.returnValue(throwError(new Error('network')));
    fixture.componentInstance.searchByDistrict();
    expect(fixture.componentInstance.state).toBe('error');
    expect(loader.close).toHaveBeenCalled();
  });
});

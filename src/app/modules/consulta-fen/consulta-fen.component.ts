import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, finalize, switchMap } from 'rxjs/operators';
import {
  FEN_MATRIX_DATE,
  FEN_REPORT_CODE,
  FenDisplayRow,
  fenBuildDisplayRow,
  fenTableHeaders,
  fenTableOptions,
  isFenRiskRow
} from './consulta-fen.util';

type ViewState = 'idle' | 'loading' | 'empty' | 'data' | 'error';
type FilterCol = 0 | 1 | 2 | 3;

@Component({
  selector: 'app-consulta-fen',
  templateUrl: './consulta-fen.component.html',
  styleUrls: ['./consulta-fen.component.scss']
})
export class ConsultaFenComponent implements OnInit, OnDestroy {
  readonly title = 'Consulta FEN - CENEPRED';
  readonly tableOptions = fenTableOptions;
  readonly tableHeaders = fenTableHeaders;
  readonly matrixUpdatedAt = FEN_MATRIX_DATE;

  readonly filterOptions = [
    { value: 0, label: 'Ubigeo' },
    { value: 1, label: 'Departamento' },
    { value: 2, label: 'Provincia' },
    { value: 3, label: 'Distrito' }
  ];
  filterType: FilterCol = 3;
  query = '';
  suggestions: string[] = [];
  rows: FenDisplayRow[] = [];
  pageRows: FenDisplayRow[] = [];
  readonly pageLength = 10;
  currentPage = 1;
  state: ViewState = 'idle';
  errorMessage = '';

  private reportSubscription: Subscription;
  private suggestSubscription: Subscription;
  private readonly queryInput$ = new Subject<string>();
  private loaderOpen = false;
  @ViewChild('matrixPaginator') private paginator: StgPaginatorComponent;

  constructor(private antRep: ModRepService, private loader: StgAppLoaderService) { }

  ngOnInit(): void {
    // Autocomplete de nombres: activo para Distrito, Departamento y Provincia
    this.suggestSubscription = this.queryInput$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(v => this.filterType !== 0 && v.trim().length >= 2),
      switchMap(v =>
        this.antRep.getRegularTableResult(FEN_REPORT_CODE, { col: this.filterType, val: v.trim() }).pipe(
          catchError(() => [])
        )
      )
    ).subscribe(response => {
      const data = response && response.body && response.body.resultado && response.body.resultado.data;
      const labelKey = this.filterType === 1 ? 'des_dep' : this.filterType === 2 ? 'des_prov' : 'des_dist';
      this.suggestions = Array.isArray(data)
        ? [...new Set<string>(data.filter(isFenRiskRow).map((r: any) => r[labelKey]))].slice(0, 8)
        : [];
    });
  }

  ngOnDestroy(): void {
    this.reportSubscription && this.reportSubscription.unsubscribe();
    this.suggestSubscription && this.suggestSubscription.unsubscribe();
    this.closeLoader();
  }

  get filterLabel(): string {
    const opt = this.filterOptions.find(o => o.value === this.filterType);
    return opt ? opt.label : 'Ubicación';
  }

  changeFilterType(): void {
    this.reportSubscription && this.reportSubscription.unsubscribe();
    this.query = '';
    this.suggestions = [];
    this.resetResult();
    this.state = 'idle';
  }

  onQueryInput(): void {
    if (this.filterType === 0) { this.suggestions = []; return; }
    this.queryInput$.next(this.query);
  }

  applySuggestion(value: string): void {
    this.query = value;
    this.suggestions = [];
    this.search();
  }

  search(): void {
    const value = (this.query || '').trim();
    if (this.filterType === 0 && !/^\d{6}$/.test(value)) {
      this.setValidationError('Ingresa un código ubigeo válido de 6 dígitos.');
      return;
    }
    if (this.filterType !== 0 && value.length < 2) {
      this.setValidationError(`Ingresa al menos 2 caracteres para buscar por ${this.filterLabel.toLowerCase()}.`);
      return;
    }
    this.loadRisks(this.filterType, value);
  }

  changePage(event: { page: number }): void {
    if (this.state !== 'data' || !Number.isInteger(event.page)) { return; }
    const lastPage = Math.max(1, Math.ceil(this.rows.length / this.pageLength));
    this.currentPage = Math.max(1, Math.min(event.page, lastPage));
    const start = (this.currentPage - 1) * this.pageLength;
    this.pageRows = this.rows.slice(start, start + this.pageLength);
  }

  private resetPaginator(): void {
    if (this.paginator) {
      this.paginator.toFirstPage();
      this.paginator.disableNext = this.rows.length <= this.pageLength;
      this.paginator.disableLast = this.rows.length <= this.pageLength;
    }
  }

  private loadRisks(column: FilterCol, value: string): void {
    this.reportSubscription && this.reportSubscription.unsubscribe();
    this.resetResult();
    this.state = 'loading';
    this.openLoader();

    this.reportSubscription = this.antRep.getRegularTableResult(FEN_REPORT_CODE, { col: column, val: value })
      .pipe(finalize(() => this.closeLoader()))
      .subscribe(
        response => {
          const result = response && response.body && response.body.resultado;
          const data = result && result.data;
          const hasErrors = !!(response && response.errors)
            && (!Array.isArray(response.errors) || response.errors.length > 0);
          if (hasErrors || (response && response.code && response.code !== 'SUCCESS') || !Array.isArray(data)) {
            this.setError('No se pudo interpretar la respuesta de Consulta FEN.');
            return;
          }
          if (!data.every(isFenRiskRow)) {
            this.setError('La respuesta de Consulta FEN tiene un formato inválido.');
            return;
          }
          this.rows = data.map(fenBuildDisplayRow);
          if (!this.rows.length) { this.state = 'empty'; return; }
          this.state = 'data';
          this.changePage({ page: 1 });
          this.resetPaginator();
        },
        () => this.setError('No se pudo realizar la consulta. Intenta nuevamente.')
      );
  }

  private setValidationError(message: string): void {
    this.reportSubscription && this.reportSubscription.unsubscribe();
    this.resetResult();
    this.errorMessage = message;
    this.state = 'error';
  }

  private setError(message: string): void {
    this.resetResult();
    this.errorMessage = message;
    this.state = 'error';
  }

  private resetResult(): void {
    this.rows = [];
    this.pageRows = [];
    this.currentPage = 1;
    this.errorMessage = '';
  }

  private openLoader(): void {
    if (!this.loaderOpen) { this.loaderOpen = true; this.loader.open('Consultando riesgos...'); }
  }

  private closeLoader(): void {
    if (this.loaderOpen) { this.loaderOpen = false; this.loader.close(); }
  }
}

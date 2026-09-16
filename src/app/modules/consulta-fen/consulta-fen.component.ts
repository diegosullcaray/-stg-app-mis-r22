import { Component, OnDestroy } from '@angular/core';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { ModRepService } from 'app/modules/reportes/compartido/servicios/mod-rep.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  FEN_HIGH_RISK_MESSAGE,
  FEN_MATRIX_DATE,
  FEN_REPORT_CODE,
  FenRiskRow,
  fenTableHeaders,
  fenTableOptions,
  isFenRiskRow,
  isHighRisk,
  riskClass
} from './consulta-fen.util';

type ViewState = 'idle' | 'loading' | 'empty' | 'data' | 'error';

@Component({
  selector: 'app-consulta-fen',
  templateUrl: './consulta-fen.component.html',
  styleUrls: ['./consulta-fen.component.scss']
})
export class ConsultaFenComponent implements OnDestroy {
  readonly title = 'Consulta FEN - CENEPRED';
  readonly tableOptions = fenTableOptions;
  readonly tableHeaders = fenTableHeaders;
  readonly matrixUpdatedAt = FEN_MATRIX_DATE;
  readonly highRiskMessage = FEN_HIGH_RISK_MESSAGE;

  districtQuery = '';
  ubigeoQuery = '';
  result: FenRiskRow | null = null;
  rows: FenRiskRow[] = [];
  state: ViewState = 'idle';
  errorMessage = '';

  private reportSubscription: Subscription;
  private loaderOpen = false;

  constructor(
    private antRep: ModRepService,
    private loader: StgAppLoaderService
  ) { }

  ngOnDestroy(): void {
    this.reportSubscription && this.reportSubscription.unsubscribe();
    this.closeLoader();
  }

  searchByDistrict(): void {
    const value = (this.districtQuery || '').trim();
    if (value.length < 2) {
      this.setValidationError('Ingresa al menos 2 caracteres para buscar un distrito.');
      return;
    }
    this.loadRisks(3, value);
  }

  searchByUbigeo(): void {
    const value = (this.ubigeoQuery || '').trim();
    if (!/^\d{6}$/.test(value)) {
      this.setValidationError('Ingresa un código ubigeo válido de 6 dígitos.');
      return;
    }
    this.loadRisks(0, value);
  }

  selectRisk(row: FenRiskRow): void {
    if (isFenRiskRow(row)) {
      this.result = row;
    }
  }

  showHighRiskAlert(): boolean {
    return !!this.result && isHighRisk(this.result.exp_pre);
  }

  riskClass = riskClass;

  private loadRisks(column: 0 | 3, value: string): void {
    this.reportSubscription && this.reportSubscription.unsubscribe();
    this.resetResult();
    this.state = 'loading';
    this.openLoader();

    this.reportSubscription = this.antRep.getRegularTableResult(FEN_REPORT_CODE, {
      col: column,
      val: value
    }).pipe(
      finalize(() => this.closeLoader())
    ).subscribe(
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

        this.rows = data;
        if (!this.rows.length) {
          this.state = 'empty';
          return;
        }

        this.result = this.rows.length === 1 ? this.rows[0] : null;
        this.state = 'data';
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
    this.rows = [];
    this.result = null;
    this.errorMessage = message;
    this.state = 'error';
  }

  private resetResult(): void {
    this.rows = [];
    this.result = null;
    this.errorMessage = '';
  }

  private openLoader(): void {
    if (!this.loaderOpen) {
      this.loaderOpen = true;
      this.loader.open('Consultando riesgos...');
    }
  }

  private closeLoader(): void {
    if (this.loaderOpen) {
      this.loaderOpen = false;
      this.loader.close();
    }
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
/*import { IWinderResponse, IWinderConfig } from '../../../../core/data/remote/winder/winder-bearer.interface';
import { Strand } from '../../../../core/data/remote/winder/strand.class';
import { WinderService } from '../../../../core/data/remote/winder/winder.service';*/
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { ReportT } from '../support/services/report';
import { first, takeUntil } from 'rxjs/operators';
import { TableMHService } from '../support/services/table.service';
import { theme_tb1 } from '../support/common/theme.module';
import * as moment from 'moment';

@Component({
  selector: 'app-control-cargas',
  templateUrl: './control-cargas.component.html',
  styleUrls: ['./control-cargas.component.scss']
})
export class ControlCargasComponent implements OnInit {
  report: ReportT;
  polling: any;
  config_table_sum;
  config_table_prod;

  configclasssum = {
    id: '_01',
    theme: theme_tb1()
  };

  configclassprod = {
    id: '_01',
    theme: theme_tb1()
  };

  aux = "";
  loading = false;
  today = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private cdr: ChangeDetectorRef, private cs: ComercialService) { }

  ngOnInit() {
    this.renderTableSum();
    this.renderTableProd();
    this.refreshData();
  }

  private refreshData() {
    this.polling = setInterval(() => {
      this.renderTableSum();
      this.renderTableProd();
      this.today = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    }, 30 * 1000)
  }

  private renderTableSum(): void {
    const table = this.configclasssum;
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table_sum = confT;
    const params = { ...confT.getParamsAdd() };
    console.log(params);
    this.cs.getRegularData('RS_MON_CAR_01'/*report*/, { opt: 1 })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          this.config_table_sum = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table_sum = confT;
          this.cdr.detectChanges();
        });

  }

  private renderTableProd(): void {
    const table = this.configclassprod;
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table_prod = confT;
    const params = { ...confT.getParamsAdd() };
    console.log(params);
    this.cs.getRegularData('RS_MON_CAR_01'/*report*/, { opt: 2 })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          this.config_table_prod = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table_prod = confT;
          this.cdr.detectChanges();
        });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

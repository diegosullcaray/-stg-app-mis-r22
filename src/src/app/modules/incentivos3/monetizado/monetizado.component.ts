import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalculadoraDialogComponent } from '../calculadora/calculadora-dialog.component';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { MatMenuTrigger } from '@angular/material/menu';
import { stringToDate1 } from 'app/core/shared/functions.util';

@Component({
  selector: 'app-monetizado-incentivos3',
  templateUrl: './monetizado.component.html',
  styleUrls: ['./monetizado.component.scss']
})
export class MonetizadoComponent implements OnInit {
  @ViewChild('menuTrigger') trigger: MatMenuTrigger;

  config: any;

  date_c: any;
  date: any;
  date_a: any;
  date_f: any;
  date_h: any;

  show_cm: boolean = false;

  constructor(public inc3: Incentivos3Service,
    public layout: LayoutService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.inc3.monetizado;
    this.date_c = this.config.curr_fec;
    this.date = stringToDate1(this.inc3.curr_fec);
    this.date_a = this.config.ciea_fec;
    this.date_f = this.config.fest_fec;
    this.date_h = this.config.hab_fec;
    this.date_h.push(moment(this.date_c).format("YYYYMMDD"));
    this.show_cm = this.config.show_cm;
  }

  filterDates = (d: any): boolean => {
    return this.date_h.includes(d.format("YYYYMMDD"))?true:false;
  }

  changeDate(event: any) {
    this.date = event;
    this.inc3.curr_fec = event.format("YYYYMMDD");
    this.trigger.closeMenu();
    this.inc3.changeDs();
  }

  showCalculator() {
    if (this.layout.isMobile) {
      this.router.navigate(['./calculadora'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogCalc();
    }
  }

  changeModel(){
    this.inc3.changeModel();
    this.inc3.changeDs();
  }

  private dialogCalc(): void {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '700px';
    /*dialogConfig.data = {

    };*/
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(CalculadoraDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

  getBosClass() {
    return (this.config.bos < 0) ? "m cn" : "m";
  }

  getActClass() {
    return (this.config.cod_sit == 1) ? "cp" : "cn";
  }

}


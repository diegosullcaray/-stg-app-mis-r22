import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { cloneObject } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { UsuariosDialogComponent } from '../usuarios/usuarios-dialog.component';
import { tableHeaders, tableOptions } from './principal.util';

@Component({
  selector: 'app-principal-reportes-e',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  options: any;

  dataSource: any[];

  dataSourceOri: any[];

  headers: any;

  btn1Val: boolean = false;
  btn2Val: boolean = false;

  btn1Obs$ = new BehaviorSubject(false);
  btn2Obs$ = new BehaviorSubject(false);
  inp1Obs$ = new BehaviorSubject("");

  subsFil: Subscription;

  optObs = new Subject<any>();

  flag = true;
  mod_admin:boolean;

  constructor(
    private antService: ModReportesEService,
    private antRepE: ReportesEService,
    private loader: StgAppLoaderService,
    private activatedRoute: ActivatedRoute,
    private layout:LayoutService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

    this.headers = tableHeaders;
    this.options = tableOptions;
    if (!this.antRepE.reportList) {
      this.ds();
    } else {
      this.set();
    }

  }

  showUsuarios(){
    if (this.layout.isMobile) {
      this.router.navigate(['./usuarios'], { relativeTo: this.activatedRoute,skipLocationChange: true  });
    } else {
      this.dialogUsuarios();
    }
  }

  private dialogUsuarios(): void {
    const dialogConfig = new StgWindowConfig();
    const dialogRef = this.dialog.open(UsuariosDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

  private ds() {
    this.loader.open();
    this.antService.getObjectList().subscribe(x => {
      let r = x.body.resultado;
      this.antRepE.reportList = r.list;
      this.mod_admin= r.mod_admin==1?true:false;
      this.set();
      this.loader.close();
    });
  }

  refreshList() {
    this.subsFil.unsubscribe();
    this.optObs.next({ body: { loading: { enabled: true } } });
    this.flag = true;
    this.dataSource = [];
    this.ds();
  }

  private set() {
    this.dataSourceOri = cloneObject(this.antRepE.reportList);
    this.subsFil = combineLatest([this.btn1Obs$, this.btn2Obs$, this.inp1Obs$]).subscribe(([btn1, btn2, inp1]) => {
      if (inp1 === "" && (btn1 === btn2)) {
        this.dataSource = this.dataSourceOri;
      } else {
        let tps = [];
        if (btn1 === btn2) {
          tps = [1, 2];
        } else {
          if (btn1) {
            tps.push(1);
          }
          if (btn2) {
            tps.push(2);
          }
        }
        this.dataSource = this.dataSourceOri.filter(x => x.name.toLowerCase().includes(inp1) && tps.includes(x.typ_rep));
        if (this.flag) {
          this.flag = false;
          this.optObs.next({ body: { loading: { enabled: false } } });
        }
      }
    });
  }

  actionLink(evt: any) {
    if (evt.key == 'name' && evt.row.reportType == 'PowerBIReport') {
      this.antRepE.selectedReportObs$.next(evt.row);
      this.router.navigate(['./power-bi'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
  }


  filter(evt: any) {
    let v = evt.target.value.toLowerCase();
    this.inp1Obs$.next(v);
  }

  filterCat(tip: number) {
    if (tip === 1) {
      this.btn1Val = !this.btn1Val;
      this.btn1Obs$.next(this.btn1Val)
    } else {
      this.btn2Val = !this.btn2Val;
      this.btn2Obs$.next(this.btn2Val);
    }
  }
}

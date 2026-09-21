import * as Highcharts from 'highcharts';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { UserService } from 'app/system/admin/services/user.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { AnalistaService } from '../compartido/servicios/analista.service';
import { ModSecService } from '../compartido/servicios/mod-sec.service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { DetalleDialogComponent } from '../detalle/detalle-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-principal-analista',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  showD = false;
  Highcharts: typeof Highcharts = Highcharts;

  loading: boolean = true;
  loadingG1: boolean = true;


  subsRedirect: Subscription;

  load0: BehaviorSubject<boolean>;
  load1: BehaviorSubject<boolean>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,public dialog: MatDialog,
    private user: UserService, public analista: AnalistaService, private layout: LayoutService,
    private antAdmin: ModSysAdminService, private loader: StgAppLoaderService, private antSec: ModSecService) { }

  ngOnInit(): void {
    this.load0 = new BehaviorSubject(false);
    this.load1 = new BehaviorSubject(false);

    combineLatest([this.load0, this.load1]).subscribe(([a, b]) => {
      if (a && b) {
        this.loading = false;
        this.loadingG1 = false;
        this.loader.close();
      }
    });

    let profile = this.user.get('profile');
    this.analista.tip_use = profile.tip_use;


    this.subsRedirect = this.analista.selectedSec$.subscribe(x => {
      this.analista.cod_bt = x.cod_sec;
      this.analista.nom_sec = x.des_sec;
      this.loadData();
      this.nav();
    });


    if (profile.tip_use === 1) {
      this.analista.cla_user = profile.cla_use;
      this.analista.cod_bt = profile.cod_bt;
      this.analista.nom_sec = profile.nombre;
      this.loadData();
      this.nav();
    } else {
      this.loader.open();
      this.baseHierObs().subscribe(x => {
        let br: any = x.body;
        let h = br.base_hierarchy;
        if (!isNullOrUndefined(h)) {
          let hf = h.filter((x: any) => x.flag_1 == 1 || x.flag_1 == 0)[0];
          this.analista.tip_cod = hf.tip_cod;
          this.analista.cod_rel = hf.cod_rel;
          this.analista.showSecPickerDialog(false);
        }
      });
    }

  }

  private loadData() {
    this.loading = true;
    this.antSec.getResumenDashboard(this.analista.cod_bt).subscribe((x: any) => {
      let body = x.body.resultado;
      //console.log(body)
      this.analista.prof_info = body.prof;
      this.analista.data_info = body.data;
      this.analista.tbl_01_ds = body.cli_cre;
      this.analista.hist_cods = body.h_cods;
      this.optsG2(body.data);
      this.optsG3(body.data);
      this.load0.next(true);
    });
    this.antSec.getHistoricoVariable(this.analista.cod_bt, 'sal').subscribe((x: any) => {
      let body = x.body.resultado;
      this.analista.graph1_opts.series = [
        {
          name: body.meta.s1,
          data: body.his_1
        },
        {
          name: body.meta.s2,
          data: body.his_2
        },
        {
          name: body.meta.s3,
          data: body.his_3
        }
      ];

      this.load1.next(true);
    });
  }

  changeG1(evt: any) {
    this.loader.open();
    this.loadingG1 = true;
    this.antSec.getHistoricoVariable(this.analista.cod_bt, evt.value).subscribe((x: any) => {
      let body = x.body.resultado;
      this.analista.graph1_opts.series = [
        {
          name: body.meta.s1,
          data: body.his_1
        },
        {
          name: body.meta.s2,
          data: body.his_2
        },
        {
          name: body.meta.s3,
          data: body.his_3
        }
      ];
      this.loadingG1 = false;
      this.loader.close();
    });
  }

  private optsG2(x: any) {
    this.analista.graph2_opts.xAxis.categories = [x.f3, x.f2, x.f1];
    this.analista.graph2_opts.series = [{
      name: 'Cartera Stock',
      data: [x.sal_cap_mant, x.sal_cap_ant, x.sal_cap]
    }];
  }

  private optsG3(x: any) {
    this.analista.graph3_opts.series = [{
      name: 'Cartera Stock',
      colorByPoint: true,
      data: [{
        name: '<-30>',
        y: x.da_t1,
        //sliced: true,
        //selected: true
      }, {
        name: '[-30 a 0]',
        y: x.da_t2
      }, {
        name: '[1 a 30]',
        y: x.da_t3
      }, {
        name: '[31 a 60]',
        y: x.da_t4
      }, {
        name: '[61>',
        y: x.da_t5
      }, {
        name: 'Judicial',
        y: x.da_t6
      }]
    }];
  }

  private baseHierObs() {
    return this.antAdmin.getBaseHierarchy(this.user.email, 9);
  }

  nav() {
    this.router.navigate(['./listas'], { relativeTo: this.activatedRoute });
    this.subsRedirect.unsubscribe();
  }

  actionLink(evt: any) {
    if (evt.key == 'nom') {
      /*let route = './' + evt.row.route;
      this.router.navigate([route], { relativeTo: this.activatedRoute });*/
      this.analista.selectedRow=evt.row;
      this.showDetail();
    }
  }

  private dialogDetail(): void {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width='500px';
    dialogConfig.height='380px';
    /*dialogConfig.data={
      activatedRoute:this.activatedRoute
    };*/
    const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);
    //dialogRef.componentInstance.contentTemplate = this.templateRef;
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

  moveListas() {
    this.router.navigate(['./listas'], { relativeTo: this.activatedRoute });
    this.subsRedirect.unsubscribe();
  }

  openSecPicker() {
    this.analista.showSecPickerDialog(true);
  }

  showDetail() {
    if (this.layout.isMobile) {
      this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogDetail();
      //this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
  }


}

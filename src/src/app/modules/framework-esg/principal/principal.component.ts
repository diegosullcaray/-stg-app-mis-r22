import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { UserService } from 'app/system/admin/services/user.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { FrameworkEsgService } from '../compartido/servicios/framework-esg.service';
import { ModFrameworkEsgService } from '../compartido/servicios/mod-framework-esg.service';
import { EditarDialogComponent } from '../editar/editar-dialog.component';
import { tblOpts1, tblOpts2, headOpt1, headOpt2 } from '../framework-esg.util';
import { UsuariosDialogComponent } from '../usuarios/usuarios-dialog.component';

@Component({
  selector: 'app-principal-framework-esg',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  tableOpts: any;
  headersOpts: any;
  dataSources: any;

  load0: BehaviorSubject<boolean>;
  load1: BehaviorSubject<boolean>;
  load2: BehaviorSubject<boolean>;
  load3: BehaviorSubject<boolean>;
  load4: BehaviorSubject<boolean>;
  load5: BehaviorSubject<boolean>;


  disableEditMet:boolean;
  disableDetMet:boolean;
  arrOrd:any;
  isAdmin:boolean;
  canEdit:boolean;

  constructor(
    private loader: StgAppLoaderService,
    private antService: ModFrameworkEsgService,
    private esgService: FrameworkEsgService,
    private layout: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private user:UserService
  ) { }

  ngOnInit(): void {
    this.disableEditMet=true;
    this.disableDetMet=true;

    this.isAdmin=false;

    this.tableOpts = [cloneObject(tblOpts1), cloneObject(tblOpts2), cloneObject(tblOpts2), cloneObject(tblOpts2), cloneObject(tblOpts2)];
    this.headersOpts = [cloneObject(headOpt1), cloneObject(headOpt2), cloneObject(headOpt2), cloneObject(headOpt2), cloneObject(headOpt2)];
    this.dataSources = [undefined, undefined, undefined, undefined, undefined];
    this.loader.open();
    this.load0 = new BehaviorSubject(false);
    this.load1 = new BehaviorSubject(false);
    this.load2 = new BehaviorSubject(false);
    this.load3 = new BehaviorSubject(false);
    this.load4 = new BehaviorSubject(false);
    this.load5 = new BehaviorSubject(false);

    this.arrOrd=[[1,this.load2],[3,this.load3],[2,this.load4],[4,this.load5]];

    combineLatest([this.load0, this.load1, this.load2, this.load3, this.load4, this.load5]).subscribe(([a, b, c, d, e, f]) => {
      if (a && b && c && d && e && f) {
        this.loader.close();
      }
    });

    this.antService.getConfiguracionMod().subscribe(x => {
      let r = x.body.resultado;
      this.esgService.sitCfg = JSON.parse(r.sit.cfg);
      this.esgService.attributesCfg = JSON.parse(r.attr.cfg);
      this.esgService.catsCfg = JSON.parse(r.cats.cfg);

      let prof = this.user.get('profile');
      this.isAdmin = prof.tip_use==0 || r.mod_admin.cfg?true:false;
      this.canEdit = JSON.parse(r.can_edit.cfg);
      this.load0.next(true);
    });

    this.antService.getResumenPor().subscribe(x => {
      let r = x.body.resultado;
      this.dataSources[0] = r;
      this.load1.next(true);
    });

    this.arrOrd.forEach((x:any,i:number)=>{
      this.loadCat(i+1,x[0],x[1]);
    });

    this.esgService.refreshTable$.subscribe(x=>{
      let v = this.arrOrd[x-1];
      this.loader.open();
      this.dataSources[v[0]] = [];
      this.antService.getResumenCat(x).subscribe(x => {
        let d = x.body.resultado.res;
        this.dataSources[v[0]] = d;
        this.loader.close();
      });
    });
  }

  private loadCat(cod_cat: number, idx: number, load: BehaviorSubject<boolean>) {
    this.antService.getResumenCat(cod_cat).subscribe(x => {
      let h = x.body.resultado.cab.cols;
      let d = x.body.resultado.res;
      this.mergeCols(h, this.headersOpts[idx]);
      this.dataSources[idx] = d;
      let mds = d.filter(x=>x.is_nod==0).map((x:any)=>{
        return {id:x.cod_met,name:x.des_met+' ('+x.des_med+')'};
      });
      this.esgService.metsLists[cod_cat+'']=mds;
      console.log(d)
      load.next(true);
    });
  }

  private mergeCols(cols: string, hOpts: any) {
    let ek = [];
    cols.split(',').forEach(x => {
      let k = {
        key: x,
        label: x,
      };
      ek.push(k);
      let c = {
        key: x,
        label: x,
        style: {
          'background': '#4472c4'
        },
        format:{
          type:'truncate',
          params:{
            limit:24   
          }
      }
      };
      hOpts.push(c);
    });
    this.esgService.histEditKeys = ek;
  }

  setSelectedRow(evt: any) {
    if(isNullOrUndefined(evt.is_edit) || evt.is_edit===0){
      this.disableEditMet=true;
    }else{
      this.disableEditMet=false;
    }

    if(evt.is_nod===1){
      this.disableDetMet=true;
    }else{
      this.disableDetMet=false;
    }

    this.esgService.selectedRow = evt;
  }

  private showE(){
    if (this.layout.isMobile) {
      this.router.navigate(['./editar'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogEdit();
    }
  }

  showEdit() {
    this.esgService.editMode=true;
    this.showE();
  }

  showView() {
    this.esgService.editMode=false;
    this.showE();
  }

  private dialogEdit(): void {
    const dialogConfig = new StgWindowConfig();
    const dialogRef = this.dialog.open(EditarDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

  showUse(){
    if (this.layout.isMobile) {
      this.router.navigate(['./usuarios'], { relativeTo: this.activatedRoute,skipLocationChange: true  });
    } else {
      this.dialogUse();
    }
  }

  private dialogUse(): void {
    const dialogConfig = new StgWindowConfig();
    const dialogRef = this.dialog.open(UsuariosDialogComponent, dialogConfig);
  }

}

import { Injectable } from '@angular/core';
import { composicionConfig } from '../../composicion/composicion.util';
import { tablaConfig } from '../../tabla/tabla.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { UserService } from 'app/system/admin/services/user.service';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { cloneObject, isNullOrUndefined, round, stringToDate1 } from 'app/core/shared/functions.util';
import { MatDialog } from '@angular/material/dialog';
import { SelectorJerComponent } from '../../selector-jer/selector-jer.component';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { SecPickerDialog2Service } from 'app/modules/shared/services/sec-picker-dialog2.service';
import { TblPickerDialogService } from 'app/modules/shared/components/tbl-picker-dialog/tbl-picker-dialog.service';
import { ModIncentivos3Service } from './mod-incentivos3.service';
import { dlgFromHierOpts, gruSecCfg, gruUniCfg, indCorCfg, indSecCfg, indUniCfg } from './incentivos3.util';
import { aportesConfig } from '../../aportes/aportes.util';
import { monetizadoConfig } from '../../monetizado/monetizado.util';
import { superPlusConfig } from '../../super-plus/super-plus.util';
import { avancesConfig } from '../../avances/avances.util';
import { perfilConfig } from '../../perfil/perfil.util';
import { principalConfig } from '../../principal/principal.util';
import { calculadoraConfig } from '../../calculadora/calculadora.util';
import { historicoConfig } from '../../historico/historico.util';
import { StgAlertService } from 'app/core/screen/components/stg-alert/stg-alert.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { Subscription } from 'rxjs';
import { printLog } from 'app/core/shared/debug.util';

@Injectable()
export class Incentivos3Service {
  tip_cod: number;
  cod_rel: string;
  firstLoad: boolean;
  isFromHierChoosed: boolean;
  showMe: boolean;
  lvlHier: number;
  curr_fec: string;
  private selectorHierRef: any;

  principal: any;
  perfil: any;
  perfil_back: any;
  avances: any;
  superPlus: any;
  composicion: any;
  tabla: any;
  monetizado: any;
  //historico: any;
  aportes: any;

  detalle: any;

  calculadora: any;

  subs1: Subscription;
  subs2: Subscription;

  private subsF: boolean;

  model: string;
  show_cm: boolean;
  cla_usu: number;

  usuCfg: any;

  constructor(
    private loader: StgAppLoaderService,
    private user: UserService,
    private antAdmin: ModSysAdminService,
    public mDialog: MatDialog,
    private secPicker: SecPickerDialog2Service,
    private tblPicker: TblPickerDialogService,
    private antInc3: ModIncentivos3Service,
    private alertService: StgAlertService,
    private layout: LayoutService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    let profile = this.user.get('profile');
    this.firstLoad = true;
    this.subsF = true;
    this.model = '2026';
    //let is_admin = profile.tip_use === 0;
    //let cod_bt = profile.cod_bt=='TGCAG001';
    this.show_cm = true;
    this.setDefaults();
    this.subscribe();
  }

  changeModel() {
    this.model = this.model == '2025' ? '2026' : '2025';
    this.monetizado.model = this.model;
    this.monetizado.model_des = this.model == '2025' ? 'M2025' : 'M2026';
  }

  private subscribe() {
    if (this.subsF) {
      this.subsF = false;
      this.subs1 = this.secPicker.selectedSec$.subscribe((x: any) => {
        this.setData1(x);
      });

      this.subs2 = this.tblPicker.afterCloseEvent$.subscribe((x: any) => {
        this.setData2(x);
      });
    }
  }

  clean() {
    this.firstLoad = true;
    this.secPicker.selectedSec$.next(null);
    this.tblPicker.afterCloseEvent$.next(null);
    this.subsF = true;
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
    this.setDefaults();
  }

  private setDefaults() {
    this.principal = cloneObject(principalConfig);
    this.perfil = cloneObject(perfilConfig)
    this.avances = cloneObject(avancesConfig);
    this.superPlus = cloneObject(superPlusConfig);
    this.composicion = cloneObject(composicionConfig);
    this.tabla = cloneObject(tablaConfig);
    this.monetizado = cloneObject(monetizadoConfig);

    //this.historico = cloneObject(historicoConfig);

    this.aportes = cloneObject(aportesConfig);
    this.calculadora = cloneObject(calculadoraConfig);
  }

  loadData() {
    this.subscribe();
    this.loader.open();
    let profile = this.user.get('profile');
    //console.log(profile)

    this.curr_fec = profile.curr_fec;

    this.monetizado.curr_fec = stringToDate1(profile.curr_fec);
    this.monetizado.ciea_fec = stringToDate1(profile.ciea_fec);

    this.monetizado.fest_fec = profile.fest_fec.split(',');
    this.monetizado.hab_fec = profile.hab_fec.split(',');
    //this.monetizado.user_hier = `${profile.niv}_${profile.cla_use}`
    this.monetizado.model = this.model;
    this.monetizado.model_des = this.model == '2025' ? 'M2025' : 'M2026';
    //this.monetizado.model_des = '2025-1'
    this.monetizado.show_cm = profile.niv=='SECTORISTA' && profile.cla_use==1;

    let ps = ['STAFF'];
    let ps2 = ['TERRITORIO', 'CORREDOR', 'ADMINISTRACION'];

    this.perfil.change_btn = profile.niv != 'SECTORISTA' ? true : false;

    this.showMe = ps2.includes(profile.niv) ? true : false;
    let lvlMap = {
      'STAFF': 4,
      'TERRITORIO': 3,
      'CORREDOR': 2,
      'ADMINISTRACION': 1
    };
    this.lvlHier = lvlMap[profile.niv] || 0;

    if (!ps.includes(profile.niv)) {
      this.perfil.usu.nom = profile.nombre;

      this.perfil.usu.img_url = profile.pic_url
      this.cla_usu = profile.cla_use;//grupal 2, individual 1, sin asignar 0
      
      this.perfil.usu.niv = 'CARGO';
      this.perfil.usu.des_niv = profile.cargo;
      if (profile.tip_use == 1) {//0 admin, 1 asesor, 2 otros
        this.perfil.usu.tip_cod = 1;
        this.perfil.usu.cod_rel = profile.cod_bt;
        this.perfil.usu.cla_usu = profile.cla_use;//grupal 2, individual 1, sin asignar 0
        this.setDs(1, profile.cod_bt,profile.cla_use);
      } else {
        //this.perfil.usu.niv = profile.niv;
        this.getBaseHier(false);
      }
    } else {
      //this.perfil.change_btn = true;
      this.getBaseHier(true);
    }
  }

  private notApply() {
    /*this.alertService.open(
      "Atención!",
      "Si eres asesor de negocio inclusivo grupal, te informamos que el módulo no está disponible. Gracias por tu comprensión.",
      { width: '400px' }
    ).subscribe(x => {
      if (this.firstLoad) {
        this.loader.close();
        this.router.navigateByUrl(environment.homePage);
      }
    });*/
  }

  private resetCfg(arr: any[]) {
    arr.forEach(item => {
      item.show = false;
      if (item.enab) {
        item.enab = false;
      }
    });
  }

  private updateCfg(cfgArray: any[], ids: string[], key: string) {
    const idSet = new Set(ids.map(String));
    cfgArray.forEach(obj => {
      if (idSet.has(String(obj.id))) {
        obj[key] = true;
      }
    });
  }

  //toma cfgArray y valArray, y actualiza cfgArray basado en valArray buscando el id de cada objeto de cfgArray, 
  //si el id existe en valArray, actualiza el valor de la propiedad key en el objeto de cfgArray
  private updateCfg2(cfgArray: any[], valArray: any, key: string, id_pref: string, id_suf: string) {
    cfgArray.forEach(obj => {
      const lookupKey = `${id_pref}${obj.id}${id_suf}`;
      if (lookupKey in valArray) {     // asegura que la clave existe
        obj[key] = valArray[lookupKey];
      }
    });
  }

  private sumFromIds(dataSource: any[], ids: string[], id_pref: string, id_suf: string) {
    let total = 0;
    ids.forEach(id => {
      const key = `${id_pref}${id}${id_suf}`;

      if (key in dataSource) {          // solo si la clave existe
        const val = Number(dataSource[key]);
        if (!isNaN(val)) total += val;  // suma solo números válidos
      }
    });

    return total;
  }

  private setDs(tip_cod: number, cod_rel: string,cla_usu: number) {
    if (!this.firstLoad) {
      //this.historico.loading = true;
      this.composicion.loading = true;
      this.avances.loading = true;
      this.tabla.loading = true;
      this.superPlus.loading = true;
      this.aportes.loading = true;
      this.monetizado.loading = true;
      this.monetizado.can_sim = false;
      this.principal.loading = true;
      this.tabla.loading = true;
      //this.tabla.ds1 = [];
      //this.tabla.ds2 = [];
      this.resetCfg(this.perfil.sem);
      this.resetCfg(this.avances.data);
      this.resetCfg(this.calculadora.vars);
      this.resetCfg(this.calculadora.plus);
      this.resetCfg(this.superPlus.data);

      this.loader.open();
    }
    if (![20, 7].includes(tip_cod)) {
      this.monetizado.can_sim = true;
    }
    if(tip_cod==1){
      this.usuCfg = cla_usu==1? indSecCfg: gruSecCfg;
    }else if(tip_cod==18){
      this.usuCfg = cla_usu==1? indUniCfg: gruUniCfg;
    }else{
      this.usuCfg = cla_usu==1? indCorCfg: gruUniCfg;
    }

    this.antInc3.getDataSources(this.model, cla_usu, tip_cod, cod_rel, this.curr_fec).subscribe(x => {
      this.perfil.loading = false;

      //ds1 -> ds variables regulares (ajustan traslados)
      //ds2 -> ds efectividades
      //ds3 -> ds datos de variables y dinamizadores
      //ds4 -> ds datos de monetizacion

      let ds = x.body.resultado;
      this.tabla.ds1 = ds.ds1;
      this.tabla.ds2 = ds.ds2;

      this.tabla.loading = false;

      let flag_act = ds.ds4.flag_act;
      this.updateCfg(this.perfil.sem, this.usuCfg.prof, 'show');
      this.updateCfg2(this.perfil.sem, ds.ds4, 'val', 'flag_', '');

      if (flag_act == 1) {
        this.perfil.comi.sit = '(Activado)';
        this.monetizado.des_sit = '(Activado)';
        this.calculadora.act = 1;
        this.monetizado.cod_sit = 1;
      } else if (flag_act == -1) {
        this.perfil.comi.sit = '(No Aplica)';
        this.monetizado.des_sit = '(No Aplica)';
        this.calculadora.act = 0;
        this.monetizado.cod_sit = 0;
      } else {
        this.perfil.comi.sit = '(Desactivado)';
        this.monetizado.des_sit = '(Desactivado)';
        this.calculadora.act = 0;
        this.monetizado.cod_sit = 0;
      }

      this.calculadora.cla = cla_usu;

      this.principal.loading = false;

      this.updateCfg(this.avances.data, this.usuCfg.avan_s, 'show');
      this.updateCfg(this.avances.data, this.usuCfg.avan_e, 'enab');
      this.updateCfg2(this.avances.data, ds.ds3, 'val', '', '_avan_fix');
      this.updateCfg2(this.avances.data, ds.ds3, 'per', '', '_avan_floor');
      this.avances.flex = this.usuCfg.avan_flex;

      this.avances.loading = false;

      this.updateCfg(this.superPlus.data, this.usuCfg.sup_s, 'show');
      this.updateCfg(this.superPlus.data, this.usuCfg.sup_e, 'enab');
      this.updateCfg2(this.superPlus.data, ds.ds4, 'val', 'bos_', '');


      this.superPlus.loading = false;

      let bob_total = this.sumFromIds(ds.ds4, this.usuCfg.prof, 'bob_', '');
      let bop_total = this.sumFromIds(ds.ds4, this.usuCfg.prof, 'bop_', '');
      let bos_total = this.sumFromIds(ds.ds4, this.usuCfg.cal_s, 'bos_', '');

      this.monetizado.bob = bob_total;
      this.monetizado.bop = bop_total;
      this.monetizado.bos = bos_total;
      this.monetizado.bot = bob_total + bop_total + bos_total;
      this.monetizado.loading = false;

      this.perfil.comi.val = bob_total + bop_total + bos_total;

      this.updateCfg(this.calculadora.vars, this.usuCfg.prof, 'show');
      this.updateCfg2(this.calculadora.vars, ds.ds3, 'val', '', '_real');
      this.updateCfg2(this.calculadora.vars, ds.ds3, 'met', '', '_met');
      this.updateCfg2(this.calculadora.vars, ds.ds4, 'bob', 'bob_', '');
      this.updateCfg2(this.calculadora.vars, ds.ds4, 'bop', 'bop_', '');

      this.updateCfg(this.calculadora.plus, this.usuCfg.sup_s, 'show');
      this.updateCfg(this.calculadora.plus, this.usuCfg.cal_e, 'enab');
      this.updateCfg2(this.calculadora.plus, ds.ds3, 'val', '', '_real');
      this.updateCfg2(this.calculadora.plus, ds.ds4, 'bos', 'bos_', '');

      let index = this.calculadora.vars.findIndex((obj: any) => obj.id === "efec1" && obj.show);
      
      if (index !== -1 && cla_usu==1) {
        this.calculadora.vars[index].tp1 = ds.ds3.pag1;
        this.calculadora.vars[index].tp2 = ds.ds3.pag2;
        this.calculadora.vars[index].tp3 = ds.ds3.pag3;
      }

      index = this.calculadora.plus.findIndex((obj: any) => obj.id === "tas" && obj.show);
      if(index != -1){
        this.calculadora.plus[index].val1 = ds.ds3.tas_min;
        this.calculadora.plus[index].met = ds.ds3.tas_met;
      }

      this.calculadora.mar_ren = ds.ds3.mar_ren;
      this.calculadora.bob = bob_total;
      this.calculadora.bop = bop_total;
      this.calculadora.bos = bos_total;
      this.calculadora.bob = bob_total;
      this.calculadora.bot = bob_total + bop_total + bos_total;

      if (this.firstLoad) {
        this.perfil_back = cloneObject(this.perfil);
      }

      this.firstLoad = false;

      this.loader.close();
    });
  }

  simulate(rs: any) {

    rs['tip_cod'] = this.perfil.usu.tip_cod;
    rs['cod_rel'] = this.perfil.usu.cod_rel;
    rs['mar_ren'] = this.calculadora.mar_ren;
    let cla_usu= this.perfil.usu.cla_usu;
    this.loader.open();
    printLog(rs);
    this.antInc3.calculate(this.model,cla_usu, rs, this.curr_fec).subscribe(x => {
      let ds = x.body.resultado;
      printLog(ds);
      let bob_total = this.sumFromIds(ds, this.usuCfg.prof, 'bob_', '');
      let bop_total = this.sumFromIds(ds, this.usuCfg.prof, 'bop_', '');
      let bos_total = this.sumFromIds(ds, this.usuCfg.cal_s, 'bos_', '');

      this.updateCfg2(this.calculadora.vars,ds,'bob','bob_','');
      this.updateCfg2(this.calculadora.vars,ds,'bop','bop_','');
      this.updateCfg2(this.calculadora.plus,ds,'bos','bos_','');


      this.calculadora.bob = bob_total;
      this.calculadora.bop = bop_total;
      this.calculadora.bos = bos_total;
      this.calculadora.bob = bob_total;
      this.calculadora.bot = bob_total + bop_total + bos_total;
      this.calculadora.act = ds.flag_act;
      this.loader.close();
    });
  }

  private setData1(prof: any) {
    if (isNullOrUndefined(prof)) {
      return;
    }
    if (!this.isFromHierChoosed) {
      this.perfil.loading = true;
      this.perfil.usu.nom = prof.des_sec;
      this.perfil.usu.niv = 'CARGO';
      this.perfil.usu.des_niv = prof.des_car;
      this.perfil.usu.img_url = prof.pic_url;
      this.perfil.usu.tip_cod = 1;
      this.perfil.usu.cod_rel = prof.cod_sec;
      this.perfil.usu.cla_usu = prof.cod_gru;
      this.monetizado.show_cm = prof.cod_gru==1;
      this.setDs(1, prof.cod_sec,prof.cod_gru);
    }
  }

  private setData2(prof: any) {
    if (isNullOrUndefined(prof)) {
      return;
    }
    if (this.isFromHierChoosed) {
      this.perfil.loading = true;
      this.perfil.usu.nom = prof.nom_per;
      this.perfil.usu.niv = prof.tip_rel;
      this.perfil.usu.des_niv = prof.des_rel;
      this.perfil.usu.img_url = prof.pic_url;
      this.perfil.usu.tip_cod = prof.tip_cod;
      this.perfil.usu.cod_rel = prof.cod_rel;
      this.perfil.usu.cla_usu = prof.cod_gru;
      this.monetizado.show_cm = false;
      this.setDs(prof.tip_cod, prof.cod_rel,prof.cod_gru);
    }
  }

  private setData3() {
    this.perfil.loading = true;
    this.perfil.usu.nom = 'FINANCIERA CONFIANZA';
    this.perfil.usu.niv = 'TOTAL';
    this.perfil.usu.des_niv = 'FC';
    this.perfil.usu.img_url = 'assets/images/fc/mis_wait.png';
    this.perfil.usu.tip_cod = 7;
    this.perfil.usu.cod_rel = '231';
    this.perfil.usu.cla_usu = 1;
    this.setDs(7, '231',1);
  }

  private setData4() {
    this.perfil.loading = true;
    this.perfil.usu.nom = 'FINANCIERA CONFIANZA';
    this.perfil.usu.niv = 'TOTAL';
    this.perfil.usu.des_niv = 'FC';
    this.perfil.usu.img_url = 'assets/images/fc/mis_wait.png';
    this.perfil.usu.tip_cod = 7;
    this.perfil.usu.cod_rel = '231';
    this.perfil.usu.cla_usu = 2;
    this.setDs(7, '231',2);
  }

  public showChooser() {
    //this.setDefaults();

    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '250px';
    dialogConfig.height = '400px';

    this.isFromHierChoosed = false;

    dialogConfig.disableClose = this.firstLoad;
    this.selectorHierRef = this.mDialog.open(SelectorJerComponent, dialogConfig);
    //dialogRef.afterClosed().subscribe(v => {});
  }

  closeSelectorJer() {
    this.selectorHierRef.close();
  }

  changeDs() {
    this.perfil.loading = true;
    this.setDs(this.perfil.usu.tip_cod, this.perfil.usu.cod_rel, this.perfil.usu.cla_usu);
  }

  changeDsToMe() {
    this.selectorHierRef.close();
    this.perfil.loading = true;
    this.perfil.usu.nom = this.perfil_back.usu.nom;
    this.perfil.usu.niv = this.perfil_back.usu.niv;
    this.perfil.usu.des_niv = this.perfil_back.usu.des_niv;
    this.perfil.usu.img_url = this.perfil_back.usu.img_url;
    this.perfil.usu.tip_cod = this.perfil_back.usu.tip_cod;
    this.perfil.usu.cod_rel = this.perfil_back.usu.cod_rel;
    this.perfil.usu.cla_usu = this.perfil_back.usu.cla_usu;
    this.setDs(this.tip_cod, this.cod_rel,this.cla_usu);
  }

  private getBaseHier(oc: boolean) {
    this.antAdmin.getBaseHierarchy(this.user.email, 9).subscribe(x => {
      let br: any = x.body;
      let h = br.base_hierarchy;
      if (!isNullOrUndefined(h)) {
        this.tip_cod = h[0].tip_cod;
        this.cod_rel = h[0].cod_rel;
        this.cla_usu = h[0].flag_cla;
        if (oc) {
          this.showChooser();
        } else {
          this.perfil.usu.tip_cod = h[0].tip_cod;
          this.perfil.usu.cod_rel = h[0].cod_rel;
          this.perfil.usu.cla_usu = h[0].flag_cla;
          this.setDs(h[0].tip_cod, h[0].cod_rel,h[0].flag_cla);
        }
      }
    });
  }

  openSelectAse() {
    this.showSecPickerDialog();
    this.selectorHierRef.close();
  }

  private showSecPickerDialog() {

    this.secPicker.tip_cod = this.tip_cod;
    this.secPicker.cod_rel = this.cod_rel;

    this.secPicker.showDialog(!this.firstLoad);
  }

  openSelectFromHier(tip_cod_l: number) {
    this.isFromHierChoosed = true;
    this.showFromHierPickerDialog(tip_cod_l);
    this.selectorHierRef.close();
  }

  private showFromHierPickerDialog(tip_cod_l: number) {
    this.tblPicker.setTableOptions(dlgFromHierOpts.tableOptions);
    this.tblPicker.setDialogOptions(dlgFromHierOpts.dialogOptions);
    this.tblPicker.headers = dlgFromHierOpts.headers1;
    if (!this.firstLoad) {
      this.tblPicker.setDialogOptions({
        panel: {
          modal: false
        },
        closeButton: {
          enabled: true
        }
      });
    }

    this.tblPicker.showDialog();

    this.antInc3.getFromHierList(this.tip_cod, this.cod_rel, tip_cod_l).subscribe(x => {
      this.tblPicker.dataSource$.next(x.body.resultado);
    });
  }

  openFC1() {
    this.setData3();
    this.selectorHierRef.close();
  }

  openFC2() {
    this.setData4();
    this.selectorHierRef.close();
  }

}
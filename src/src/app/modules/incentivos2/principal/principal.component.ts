import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { StgAlertService } from 'app/core/screen/components/stg-alert/stg-alert.service';
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { LayoutService } from "app/system/admin/services/layout.service";
import { UserService } from 'app/system/admin/services/user.service';
import { dataSource } from "../compartido/servicio/incentivos2.util";
import { ModIncentivos2Service } from '../compartido/servicio/mod-incentivos2.service';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';

@Component({
  selector: 'app-principal-incentivos2',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss', '../incentivos2-util.component.scss']
})
export class PrincipalComponent implements OnInit, OnDestroy {
  cardCfg: any;
  cardCfg2: any;
  moneCfg: any;
  profCfg: any;
  calcCfg: any;

  localCfg: any;

  cod_bt: string;

  private userSubs: any;

  profTyp: number;

  constructor(public layout: LayoutService,
    private user: UserService,
    private alertService: StgAlertService,
    private antInc: ModIncentivos2Service,
    private antAdmin: ModSysAdminService,
    private incentivos: Incentivos2Service,
    public dialog: MatDialog,
    public router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.changeSecSubs();
    if (!isNullOrUndefined(this.incentivos.dataSource)) {
      this.cardCfg = cloneObject(this.incentivos.dataSource.cards);
      this.cardCfg2 = cloneObject(this.incentivos.dataSource.cards2);
      this.moneCfg = cloneObject(this.incentivos.dataSource.monetization);
      this.profCfg = cloneObject(this.incentivos.dataSource.profile);
      this.calcCfg = cloneObject(this.incentivos.dataSource.calc);
      return;
    }

    this.cardCfg = cloneObject(dataSource.cards);
    this.cardCfg2 = cloneObject(dataSource.cards2);
    this.moneCfg = cloneObject(dataSource.monetization);
    this.profCfg = cloneObject(dataSource.profile);

    let profile = this.user.get('profile');

    if (profile.tip_use === 1) {
      this.profTyp = profile.cla_use;
      this.cod_bt = profile.cod_bt;
      this.incentivos.cod_bt = this.cod_bt;
      this.dsObs().subscribe(x => {
        let br: any = x.body;
        let r = br.resultado;
        this.fillDs(r);
      });
    } else {
      this.baseHierObs().subscribe(x => {
        let br: any = x.body;
        let h = br.base_hierarchy;
        if (!isNullOrUndefined(h)) {
          this.proHier(h);
        }
      });
    }

  }

  changeSecSubs() {
    this.userSubs = this.incentivos.currUserObs$.subscribe(x => {
      this.cod_bt = x.cod_sec;
      this.profTyp = x.cod_gru;
      this.incentivos.cod_bt = this.cod_bt;
      this.dsObs().subscribe(x => {
        let br: any = x.body;
        let r = br.resultado;
        this.fillDs(r);
      });
    });
  }

  private proHier(h: any) {
    let hr = {
      tip_cod: h[0].tip_cod,
      cod_rel: h[0].cod_rel
    };
    this.incentivos.currHierObs$.next(hr);
  }

  private baseHierObs() {
    return this.antAdmin.getBaseHierarchy(this.user.email, 9);
  }

  private dsObs() {
    return this.antInc.getDataSources(this.cod_bt);
  }

  private fillDs(ds: any) {
    if(this.profTyp==2){
      this.cardCfg[0] = this.cardCfg2[0];
      this.cardCfg[1].small_text = this.cardCfg2[1].small_text;
      this.cardCfg[2] = this.cardCfg2[2];
      this.profCfg.vars_n[0] = 'Grupos Stock (C)';
      this.profCfg.vars_n[2] = 'Pagos Puntuales (M)';
      this.profCfg.vars_nm[2] = 'Pagos Puntuales (M)';
      this.profCfg.vars_i[0] = 'diversity_3';
      this.profCfg.vars_i[2] = 'alarm_on';
    }
    this.profCfg.vars_s = [0, 0, 0, 0];
    this.profCfg.state = 0;
    this.profCfg.vars_s1 = 0;
    this.profCfg.vars_s2 = 0;
    this.profCfg.vars_f1 = false;
    this.profCfg.vars_f2 = false;

    this.profCfg.name = ds.profile.nom_per;
    this.profCfg.position = ds.profile.car_per;
    this.profCfg.hier1 = ds.profile.des_uni;
    this.profCfg.hier2 = ds.profile.des_cor;
    this.profCfg.hier3 = ds.profile.des_ter;

    this.cardCfg[0].state = 0;
    this.cardCfg[1].state = 0;
    this.cardCfg[2].state = 0;
    this.cardCfg[3].state = 0;

    let bs1 = 0, bs2 = 0, bd1 = 0, bd2 = 0;
    let bb = 0, bp = 0, bsp = 0;
    if (this.profTyp == 1) {
      bb = ds.bonos.bon_sal + ds.bonos.bon_cli + ds.bonos.bon_efe1 + ds.bonos.bon_efe2;
      bp = ds.bonos.bon_p_sal + ds.bonos.bon_p_cli + ds.bonos.bon_p_efe1 + ds.bonos.bon_p_efe2;
      bsp = (bb + bp) * ds.bonos.bon_s_tas + ds.bonos.bon_s_cli;
    } else {
      bb = ds.bonos.bon_gru + ds.bonos.bon_cli + ds.bonos.bon_ppun + ds.bonos.bon_efe2g;
      bp = ds.bonos.bon_p_gru + ds.bonos.bon_p_cli + ds.bonos.bon_p_ppun + ds.bonos.bon_p_efe2g;
      bsp = (bb + bp) * (ds.bonos.bon_s_arg + ds.bonos.bon_s_t_gru);
    }

    this.moneCfg.state = 0;
    this.moneCfg.prof_typ=this.profTyp;
  
    this.moneCfg.base = bb;
    this.moneCfg.plus = bp;
    this.moneCfg.super_plus = bsp;
    this.moneCfg.total = bb + bp + bsp;


    if (ds.vars.cob_sal >= 1 || ds.vars.cob_gru >= 1) {
      bs1 += 1;
      this.profCfg.vars_s[0] = 1;
      this.cardCfg[0].state = 1;
    }
    if (ds.vars.cob_cli >= 1) {
      bs1 += 1;
      this.profCfg.vars_s[1] = 1;
      this.cardCfg[1].state = 1;
    }
    if (ds.vars.cob_efec1 >= 1 || ds.vars.cob_ppun >= 1) {
      bs2 += 1;
      this.profCfg.vars_s[2] = 1;
      this.cardCfg[2].state = 1;
    }
    if (ds.vars.cob_efec2 >= 1) {
      bs2 += 1;
      this.profCfg.vars_s[3] = 1;
      this.cardCfg[3].state = 1;
    }
    if (ds.vars.sal_fmet == 1 || ds.vars.gru_fmet == 1) {
      this.profCfg.vars_s[0] = 2;
      this.cardCfg[0].state = 2;
      bd1 += 1;
    }
    if (ds.vars.cli_fmet == 1) {
      this.profCfg.vars_s[1] = 2;
      this.cardCfg[1].state = 2;
      bd1 += 1;
    }
    if (ds.vars.efec1_fmet == 1 || ds.vars.ppun_fmet == 1) {
      this.profCfg.vars_s[2] = 2;
      this.cardCfg[2].state = 2;
      bd2 += 1;
    }
    if (ds.vars.efec2_fmet == 1) {
      this.profCfg.vars_s[3] = 2;
      this.cardCfg[3].state = 2;
      bd2 += 1;
    }

    if ((bs1 >= 1 && bs2 >= 1 && bd2 < 2) || (bs1 == 2 && bd2 == 2)) {
      this.moneCfg.state = 1;
      this.profCfg.state = 1;
      this.profCfg.vars_s1 = 2;
      this.profCfg.vars_s2 = 2;
    } else {
      if (bd2 == 2) {
        this.profCfg.vars_f1 = true;
        this.profCfg.vars_s1 = 2 - bs1;
      } else {
        if (bs2 == 0) {
          this.profCfg.vars_f2 = true;
          this.profCfg.vars_s2 = 1;
        }
        if (bs1 == 0) {
          this.profCfg.vars_f1 = true;
          this.profCfg.vars_s1 = 1;
        }
      }
    }
    if (bd1 + bd2 == 4) {
      this.profCfg.state = 2;
      this.moneCfg.state = 2;
    }

    if (this.profTyp == 1) {
      this.cardCfg[0].percent = Math.max(Math.min(Math.trunc(ds.vars.cob_sal * 100), 100), 0);
      this.cardCfg[2].percent = Math.max(Math.min(Math.trunc(ds.vars.cob_efec1 * 100), 100), 0);

      this.cardCfg[0].percentr = ds.vars.cob_sal < 0 ? 0 : ds.vars.cob_sal * 100;
      this.cardCfg[2].percentr = ds.vars.cob_efec1 < 0 ? 0 : ds.vars.cob_efec1 * 100;

      this.cardCfg[0].monetization = ds.bonos.bon_sal + ds.bonos.bon_p_sal;
      this.cardCfg[1].monetization = ds.bonos.bon_cli + ds.bonos.bon_p_cli;
      this.cardCfg[2].monetization = ds.bonos.bon_efe1 + ds.bonos.bon_p_efe1;
      this.cardCfg[3].monetization = ds.bonos.bon_efe2 + ds.bonos.bon_p_efe2;

      this.cardCfg[0].chips[0].value = ds.vars.var_sal;
      this.cardCfg[0].chips[1].value = ds.vars.sal_met;
      this.cardCfg[0].chips[2].value = ds.vars.sal_ini;
      this.cardCfg[0].chips[3].value = ds.vars.sal_cie;
      this.cardCfg[0].chips[4].value = ds.vars.sal_tra;
      this.cardCfg[0].chips[5].value = ds.vars.sal_her;

      this.cardCfg[2].chips[0].value = ds.vars.efec1_cie;
      this.cardCfg[2].chips[1].value = ds.vars.efec1_met;
      this.cardCfg[2].chips[2].value = ds.vars.efec1_ini;
      this.cardCfg[2].chips[3].value = ds.vars.efec1_rec;
      this.cardCfg[2].chips[4].value = ds.vars.efec1_rel;
      this.cardCfg[2].chips[5].value = ds.vars.efec1_cas;
    } else {
      this.cardCfg[0].percent = Math.max(Math.min(Math.trunc(ds.vars.cob_gru * 100), 100), 0);
      this.cardCfg[2].percent = Math.max(Math.min(Math.trunc(ds.vars.cob_ppun * 100), 100), 0);

      this.cardCfg[0].percentr = ds.vars.cob_gru < 0 ? 0 : ds.vars.cob_gru * 100;
      this.cardCfg[2].percentr = ds.vars.cob_ppun < 0 ? 0 : ds.vars.cob_ppun * 100;

      this.cardCfg[0].monetization = ds.bonos.bon_gru + ds.bonos.bon_p_gru;
      this.cardCfg[1].monetization = ds.bonos.bon_clig + ds.bonos.bon_p_clig;
      this.cardCfg[2].monetization = ds.bonos.bon_ppun + ds.bonos.bon_p_ppun;
      this.cardCfg[3].monetization = ds.bonos.bon_efe2g + ds.bonos.bon_p_efe2g;

      this.cardCfg[0].chips[0].value = ds.vars.var_gru;
      this.cardCfg[0].chips[1].value = ds.vars.gru_met;
      this.cardCfg[0].chips[2].value = ds.vars.gru_ini;
      this.cardCfg[0].chips[3].value = ds.vars.gru_cie;
      this.cardCfg[0].chips[4].value = ds.vars.gru_tra;
      this.cardCfg[0].chips[5].value = ds.vars.gru_her;

      this.cardCfg[2].chips[0].value = ds.vars.av_ppun;
      this.cardCfg[2].chips[1].value = ds.vars.ppun_met;
      this.cardCfg[2].chips[2].value = ds.vars.ppun_ini;
      this.cardCfg[2].chips[3].value = ds.vars.ppun_cie;
      //this.cardCfg[0].chips[4].value = ds.vars.ppun_tra;
      //this.cardCfg[0].chips[5].value = ds.vars.ppun_her;
    }
    this.cardCfg[1].percent = Math.max(Math.min(Math.trunc(ds.vars.cob_cli * 100), 100), 0);
    this.cardCfg[3].percent = Math.max(Math.min(Math.trunc(ds.vars.cob_efec2 * 100), 100), 0);

    this.cardCfg[1].percentr = ds.vars.cob_cli < 0 ? 0 : ds.vars.cob_cli * 100;
    this.cardCfg[3].percentr = ds.vars.cob_efec2 < 0 ? 0 : ds.vars.cob_efec2 * 100;

    this.cardCfg[1].chips[0].value = ds.vars.var_cli;
    this.cardCfg[1].chips[1].value = ds.vars.cli_met;
    this.cardCfg[1].chips[2].value = ds.vars.cli_ini;
    this.cardCfg[1].chips[3].value = ds.vars.cli_cie;
    this.cardCfg[1].chips[4].value = ds.vars.cli_tra;
    this.cardCfg[1].chips[5].value = ds.vars.cli_her;

    this.cardCfg[3].chips[0].value = ds.vars.efec2_cie;
    this.cardCfg[3].chips[1].value = ds.vars.efec2_met;
    this.cardCfg[3].chips[2].value = ds.vars.efec2_ini;
    this.cardCfg[3].chips[3].value = ds.vars.efec2_rec;
    this.cardCfg[3].chips[4].value = ds.vars.efec2_rel;
    this.cardCfg[3].chips[5].value = ds.vars.efec2_cas;

    this.calcCfg = {
      prof_typ:this.profTyp,

      var_sal: ds.vars.var_sal,
      sal_met: ds.vars.sal_met,
      bon_sal: ds.bonos.bon_sal,
      bon_p_sal: ds.bonos.bon_p_sal,

      var_gru: ds.vars.var_gru,
      gru_met: ds.vars.gru_met,
      bon_gru: ds.bonos.bon_gru,
      bon_p_gru: ds.bonos.bon_p_gru,

      var_cli: ds.vars.var_cli,
      cli_met: ds.vars.cli_met,
      bon_cli: ds.bonos.bon_cli,
      bon_p_cli: ds.bonos.bon_p_cli,
      bon_clig: ds.bonos.bon_clig,
      bon_p_clig: ds.bonos.bon_p_clig,


      efec1_cie: ds.vars.efec1_cie,
      efec1_met: ds.vars.efec1_met,
      bon_efe1: ds.bonos.bon_efe1,
      bon_p_efe1: ds.bonos.bon_p_efe1,

      av_ppun: ds.vars.av_ppun,
      ppun_met: ds.vars.ppun_met,
      bon_ppun: ds.bonos.bon_ppun,
      bon_p_ppun: ds.bonos.bon_p_ppun,

      efec2_cie: ds.vars.efec2_cie,
      efec2_met: ds.vars.efec2_met,
      bon_efe2: ds.bonos.bon_efe2,
      bon_p_efe2: ds.bonos.bon_p_efe2,
      bon_efe2g: ds.bonos.bon_efe2g,
      bon_p_efe2g: ds.bonos.bon_p_efe2g,

      tasa_mes: ds.vars.tasa_mes,
      tasa_min: ds.vars.tasa_min,
      tasa_dif: (ds.vars.tasa_mes - ds.vars.tasa_min) * 10000,
      bon_s_tas: (bb + bp) * ds.bonos.bon_s_tas,
      bon_s_cli: ds.bonos.bon_s_cli,

      arg_ini: ds.vars.arg_ini,
      arg_cie: ds.vars.arg_cie,
      bon_s_arg: (bb + bp) * ds.bonos.bon_s_arg,
      t_gru: ds.vars.t_gru,
      bon_s_t_gru: (bb + bp) * ds.bonos.bon_s_t_gru,

      edit_vm: true
    }

    if (((ds.vars.efec1_ini == 0 && this.profTyp==1) || (ds.vars.ppun_ini == 0 && this.profTyp==2)) && ds.vars.efec2_ini == 0) {
      this.calcCfg.edit_vm = false;
    }

    this.incentivos.dataSource = cloneObject({
      profile: cloneObject(this.profCfg),
      monetization: cloneObject(this.moneCfg),
      cards: cloneObject(this.cardCfg),
      cards2: cloneObject(this.cardCfg2),
      calc: cloneObject(this.calcCfg)
    });

    this.incentivos.dsLoadedObs$.next(true);
  }


  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

}

import { Component, OnInit } from '@angular/core';
import { ModSysAdminService } from 'app/core/data/remote/instances/mod-sys-admin.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { UserService } from 'app/system/admin/services/user.service';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';
import { ModIncentivosAService } from '../compartido/servicios/mod-incentivos-a.service';
import { cabeceraCfg, monetizacionCfg } from './principal.util';

@Component({
  selector: 'app-principal-incentivos-a',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  cabeceraCfg: any;
  monetizacionCfg: any;

  constructor(
    private user: UserService,
    private incentivosA: IncentivosAService,
    private antInc: ModIncentivosAService,
    private antAdmin: ModSysAdminService,
    private loader: StgAppLoaderService
  ) { }

  ngOnInit(): void {
    this.loader.open();
    let profile = this.user.get('profile');
    this.cabeceraCfg = cabeceraCfg;
    this.monetizacionCfg = monetizacionCfg;
    this.incentivosA.selHierObs$.subscribe((x:any) => {
      this.getDs(x);
    });
    this.baseHierObs().subscribe(x => {
      let br: any = x.body;
      let h = br.base_hierarchy;
      let hf = h.filter((x: any) => x.flag_1 == 1 || x.flag_1==0)[0];
      this.incentivosA.tip_cod = hf.tip_cod;
      this.incentivosA.cod_rel = hf.cod_rel;
      
      if (this.incentivosA.tip_cod == 7) {
        this.incentivosA.setHeaders1();
        this.cabeceraCfg.showButtons=[false,true];
        this.incentivosA.showPicker(false);
      } else {
        this.incentivosA.setHeaders2();
        if(hf.tip_cod==19){
          this.cabeceraCfg.showButtons=[true,true];
        }
        this.incentivosA.selHierObs$.next(hf);
      }
      this.loader.close();
    });
  }

  private baseHierObs() {
    return this.antAdmin.getBaseHierarchy(this.user.email, 9);
  }

  private getDs(h:any) {
    this.cabeceraCfg.enableButtons=false;
    this.antInc.getDataSources(h.tip_cod, h.cod_rel).subscribe(x => {
      //console.log(x)
      let r = x.body.resultado;
      this.cabeceraCfg.name = r.profile.nom_per;
      this.cabeceraCfg.position = r.profile.car_per;
      this.cabeceraCfg.des_rel=r.profile.des_rel;
      this.setMonIcons(r.vars);
      this.setMonDetVars(r.vars);
      this.setMonBonos(r.bonos);
      this.setCalcCfg(h,r.vars, r.bonos);
      this.cabeceraCfg.enableButtons=true;
    });
  }

  private setCalcCfg(h:any,vars: any, bonos: any) {
    let bob = bonos.bon_cli + bonos.bon_sal + bonos.bon_efe1 + bonos.bon_efe2 + bonos.bon_sc1 + bonos.bon_pac;
    let bop = bonos.bon_p_cli + bonos.bon_p_sal + bonos.bon_p_efe1 + bonos.bon_p_efe2 + bonos.bon_p_sc1 + bonos.bon_p_pac;
    this.incentivosA.calcCfg = {
      tip_cod:h.tip_cod,
      cod_rel:h.cod_rel,
      var_sal: vars.var_sal,
      var_cli: vars.var_cli,
      efec1_cie: vars.efec1_cie,
      efec2_cie: vars.efec2_cie,
      sc1: vars.sc1,
      pac: vars.pac,

      sal_met: vars.sal_met,
      cli_met: vars.cli_met,
      efec1_met: vars.efec1_met,
      efec2_met: vars.efec2_met,
      sc1_met: vars.sc1_met,
      pac_met: vars.pac_met,

      tasa_mes: vars.tasa_mes,
      tasa_min: vars.tasa_min,
      cor_reg: 0,
      cor_sat: 0,
      rop: 0,

      bon_sal: bonos.bon_sal,
      bon_cli: bonos.bon_cli,
      bon_efe1: bonos.bon_efe1,
      bon_efe2: bonos.bon_efe2,
      bon_sc1: bonos.bon_sc1,
      bon_pac: bonos.bon_pac,

      bon_p_sal: bonos.bon_p_sal,
      bon_p_cli: bonos.bon_p_cli,
      bon_p_efe1: bonos.bon_p_efe1,
      bon_p_efe2: bonos.bon_p_efe2,
      bon_p_sc1: bonos.bon_p_sc1,
      bon_p_pac: bonos.bon_p_pac,

      bon_tot: bob,
      bon_p_tot: bop,
      tasa_dif: (vars.tasa_mes - vars.tasa_min) * 10000,
      bon_s_tas: (bob + bop) * bonos.bon_s_tas,
      bon_s_cli: bonos.bon_s_cli,
      bon_s_cor: bonos.bon_s_cor,
      //bon_s_rop:bonos.bon_s_rop
      bon_s_rop: 0
    }
  }

  private setMonBonos(bonos: any) {
    let bob = bonos.bon_cli + bonos.bon_sal + bonos.bon_efe1 + bonos.bon_efe2 + bonos.bon_sc1 + bonos.bon_pac;
    let bop = bonos.bon_p_cli + bonos.bon_p_sal + bonos.bon_p_efe1 + bonos.bon_p_efe2 + bonos.bon_p_sc1 + bonos.bon_p_pac;
    let bos = bonos.bon_s_cli + (bop + bob) * bonos.bon_s_tas + bonos.bon_s_cor;// + bonos.bon_s_rop;
    let s = this.monetizacionCfg.state;
    let bot = bob + bop + bos;

    this.monetizacionCfg.detBon[0]['v'] = bob;
    this.monetizacionCfg.detBon[1]['v'] = bop;
    this.monetizacionCfg.detBon[2]['v'] = bos;
    this.monetizacionCfg.detBon[3]['v'] = s == 1 ? bot : 0;
    this.monetizacionCfg.detBon[3]['sv'] = s == 0 ? bot : 0;
    this.monetizacionCfg.detBon[3]['f'] = s == 1 ? true : false;
  }

  private setMonIcons(vars: any) {
    let f1 = vars.cob_sal >= 1 ? 1 : 0;
    let f2 = vars.cob_cli >= 1 ? 1 : 0;
    let f3 = vars.cob_efec1 >= 1 ? 1 : 0;
    let f4 = vars.cob_efec2 >= 1 ? 1 : 0;
    let f5 = vars.cob_sc1 >= 1 ? 1 : 0;
    let f6 = vars.cob_pac >= 1 ? 1 : 0;


    this.monetizacionCfg.icons[0]['a'] = f1 == 0 ? false : true;
    this.monetizacionCfg.icons[1]['a'] = f2 == 0 ? false : true;
    this.monetizacionCfg.icons[2]['a'] = f3 == 0 ? false : true;
    this.monetizacionCfg.icons[3]['a'] = f4 == 0 ? false : true;
    this.monetizacionCfg.icons[4]['a'] = f5 == 0 ? false : true;
    this.monetizacionCfg.icons[5]['a'] = f6 == 0 ? false : true;

    this.monetizacionCfg.vars_comp = f1 + f2 + f3 + f4 + f5 + f6
    this.monetizacionCfg.state = this.monetizacionCfg.vars_comp >= 3 ? 1 : 0;
  }

  private setMonDetVars(vars: any) {
    this.monetizacionCfg.detVars[0]['c'] = vars.cob_sal;
    this.monetizacionCfg.detVars[1]['c'] = vars.cob_cli;
    this.monetizacionCfg.detVars[2]['c'] = vars.cob_efec1;
    this.monetizacionCfg.detVars[3]['c'] = vars.cob_efec2;
    this.monetizacionCfg.detVars[4]['c'] = vars.cob_sc1;
    this.monetizacionCfg.detVars[5]['c'] = vars.cob_pac;

    this.monetizacionCfg.detVars[0]['r'] = vars.var_sal;
    this.monetizacionCfg.detVars[1]['r'] = vars.var_cli;
    this.monetizacionCfg.detVars[2]['r'] = vars.efec1_cie;
    this.monetizacionCfg.detVars[3]['r'] = vars.efec2_cie;
    this.monetizacionCfg.detVars[4]['r'] = vars.sc1;
    this.monetizacionCfg.detVars[5]['r'] = vars.pac;

    this.monetizacionCfg.detVars[0]['m'] = vars.sal_met;
    this.monetizacionCfg.detVars[1]['m'] = vars.cli_met;
    this.monetizacionCfg.detVars[2]['m'] = vars.efec1_met;
    this.monetizacionCfg.detVars[3]['m'] = vars.efec2_met;
    this.monetizacionCfg.detVars[4]['m'] = vars.sc1_met;
    this.monetizacionCfg.detVars[5]['m'] = vars.pac_met;

  }

}

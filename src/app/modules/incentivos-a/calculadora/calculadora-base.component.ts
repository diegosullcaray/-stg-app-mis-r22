import { cloneObject } from 'app/core/shared/functions.util';
import { IncentivosAService } from '../compartido/servicios/incentivos-a.service';
import { ModIncentivosAService } from '../compartido/servicios/mod-incentivos-a.service';

export abstract class CalculadoraBaseComponent {
    config: any;
    bon_tot: number;
    bon_p_tot: number;
    bon_f_tot: number;

    constructor(public antService: ModIncentivosAService, public incentivos: IncentivosAService) { }

    init(): void {
        this.set();
    }

    abstract navMain(): void;

    // inCls() {
    //     if (this.config.edit_efe) {
    //         return "stg-input";
    //     }
    //     return "stg-input in-dis";
    // }

    calc() {
        let c = this.config;
        this.antService.calculate(c.tip_cod,c.cod_rel,
            c.var_sal, c.var_cli, c.efec1_cie, c.efec2_cie,
            c.tasa_mes, c.tasa_min, c.sc1,c.pac,c.cor_reg,c.cor_sat,c.rop
        ).subscribe(x => {
            let br: any = x.body;
            let r = br.resultado;
            this.config.bon_sal = r.bon_sal;
            this.config.bon_cli = r.bon_cli;
            this.config.bon_efe1 = r.bon_efe1;
            this.config.bon_efe2 = r.bon_efe2;
            this.config.bon_sc1 = r.bon_sc1;
            this.config.bon_pac = r.bon_pac;

            this.config.bon_p_sal = r.bon_p_sal;
            this.config.bon_p_cli = r.bon_p_cli;
            this.config.bon_p_efe1 = r.bon_p_efe1;
            this.config.bon_p_efe2 = r.bon_p_efe2;
            this.config.bon_p_sc1 = r.bon_p_sc1;
            this.config.bon_p_pac = r.bon_p_pac;

            this.bon_tot = r.bon_sal + r.bon_cli + r.bon_efe1 + r.bon_efe2+r.bon_sc1+r.bon_pac;
            this.bon_p_tot = r.bon_p_sal + r.bon_p_cli + r.bon_p_efe1 + r.bon_p_efe2+r.bon_p_sc1+r.bon_p_pac;

            this.config.bon_s_cli = r.bon_s_cli;
            this.config.bon_s_tas = (this.bon_tot + this.bon_p_tot) * r.bon_s_tas;
            this.config.bon_s_cor = r.bon_s_cor;
            this.config.bon_s_rop = (this.bon_tot + this.bon_p_tot) * r.bon_s_rop;
            this.config.tasa_dif = (this.config.tasa_mes - this.config.tasa_min) * 10000;

            this.bon_f_tot = this.bon_tot + this.bon_p_tot + r.bon_s_cli + this.config.bon_s_tas+r.bon_s_cor+r.bon_s_rop;
        });
    }

    private set() {
        let c = this.incentivos.calcCfg;
        this.config = cloneObject(c);
        this.bon_tot = c.bon_sal + c.bon_cli + c.bon_efe1 + c.bon_efe2+c.bon_sc1+c.bon_pac;
        this.bon_p_tot = c.bon_p_sal + c.bon_p_cli + c.bon_p_efe1 + c.bon_p_efe2+c.bon_p_sc1+c.bon_p_pac;
        this.bon_f_tot = this.bon_tot + this.bon_p_tot + c.bon_s_cli + c.bon_s_tas+c.bon_s_cor+c.bon_s_rop;
    }

    rest() {
        this.set();
    }

    param(evt: any, p: string) {
        this.config[p] = evt.target.value;
    }
}
import { cloneObject } from 'app/core/shared/functions.util';
import { Incentivos2Service } from "../compartido/servicio/incentivos2.service";
import { ModIncentivos2Service } from "../compartido/servicio/mod-incentivos2.service";

export abstract class CalculadoraBaseComponent {
    config: any;
    prof: any;
    bon_tot: number;
    bon_p_tot: number;
    bon_f_tot: number;

    constructor(public antService: ModIncentivos2Service, public incentivos: Incentivos2Service) { }

    init(): void {
        this.prof = this.incentivos.dataSource.profile;
        this.set();
    }

    abstract navMain():void;

    inCls(){
        if(this.config.edit_vm){
          return "stg-input";
        }
        return "stg-input in-dis";
      }

    calc() {
        this.antService.calculate(this.incentivos.cod_bt,
            this.config.var_sal,this.config.var_gru, this.config.var_cli, this.config.efec1_cie, this.config.efec2_cie,this.config.av_ppun,
            this.config.tasa_mes, this.config.tasa_min,this.config.arg_ini,this.config.arg_cie,this.config.t_gru
        ).subscribe(x => {
            let br: any = x.body;
            let r = br.resultado;
            this.config.bon_sal = r.bon_sal;
            this.config.bon_gru = r.bon_gru;
            this.config.bon_cli = r.bon_cli;
            this.config.bon_clig = r.bon_clig;
            this.config.bon_efe1 = r.bon_efe1;
            this.config.bon_efe2 = r.bon_efe2;
            this.config.bon_efe2g = r.bon_efe2g;
            this.config.bon_ppun = r.bon_ppun;

            this.config.bon_p_sal = r.bon_p_sal;
            this.config.bon_p_gru = r.bon_p_gru;
            this.config.bon_p_cli = r.bon_p_cli;
            this.config.bon_p_clig = r.bon_p_clig;
            this.config.bon_p_efe1 = r.bon_p_efe1;
            this.config.bon_p_efe2 = r.bon_p_efe2;
            this.config.bon_p_efe2g = r.bon_p_efe2g;
            this.config.bon_p_ppun = r.bon_p_ppun;

            if(this.config.prof_typ==1){
                this.bon_tot = r.bon_sal + r.bon_cli + r.bon_efe1 + r.bon_efe2;
                this.bon_p_tot = r.bon_p_sal + r.bon_p_cli + r.bon_p_efe1 + r.bon_p_efe2;
            }else{
                this.bon_tot = r.bon_gru + r.bon_clig + r.bon_ppun + r.bon_efe2g;
                this.bon_p_tot = r.bon_p_gru + r.bon_p_clig + r.bon_p_ppun + r.bon_p_efe2g;
            }

            this.config.bon_s_cli = r.bon_s_cli;
            this.config.bon_s_tas = (this.bon_tot +this.bon_p_tot) * r.bon_s_tas;
            this.config.tasa_dif= (this.config.tasa_mes -  this.config.tasa_min) * 10000;

            this.config.bon_s_arg = (this.bon_tot +this.bon_p_tot) * r.bon_s_arg;
            this.config.bon_s_t_gru = (this.bon_tot +this.bon_p_tot) * r.bon_s_t_gru;

            if(this.config.prof_typ==1){
                this.bon_f_tot = this.bon_tot + this.bon_p_tot + r.bon_s_cli + this.config.bon_s_tas;
            }else{
                this.bon_f_tot = this.bon_tot + this.bon_p_tot + this.config.bon_s_arg + this.config.bon_s_t_gru;
            }
        });
    }

    private set() {
        let c = this.incentivos.dataSource.calc;
        console.log(c)
        this.config = cloneObject(c);
        if(this.config.prof_typ==1){
            this.bon_tot = c.bon_sal + c.bon_cli + c.bon_efe1 + c.bon_efe2;
            this.bon_p_tot = c.bon_p_sal + c.bon_p_cli + c.bon_p_efe1 + c.bon_p_efe2;
            this.bon_f_tot = this.bon_tot + this.bon_p_tot + c.bon_s_cli + c.bon_s_tas;
        }else{
            this.bon_tot = c.bon_gru + c.bon_cli + c.bon_ppun + c.bon_efe2g;
            this.bon_p_tot = c.bon_p_gru + c.bon_p_cli + c.bon_p_ppun + c.bon_p_efe2g;
            this.bon_f_tot = this.bon_tot + this.bon_p_tot + c.bon_s_arg + c.bon_s_t_gru;
        }
        
    }

    rest() {
        this.set();
    }

    param(evt: any, p: string) {
        this.config[p] = evt.target.value;
    }
}
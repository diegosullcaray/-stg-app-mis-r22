import { isNullOrUndefined } from "app/core/shared/functions.util";
import { Incentivos2Service } from "../compartido/servicio/incentivos2.service";
import { ModIncentivos2Service } from "../compartido/servicio/mod-incentivos2.service";

export abstract class ClientesBaseComponent {
  loadingDs: boolean;
  dataSource: any;
  totSource:any;

  constructor(public antService: ModIncentivos2Service, public incentivos: Incentivos2Service) { }

  init(): void {
    this.loadingDs = true;
    this.totSource = {
      gen_c:0,
      rur_c:0,
      mig_c:0,
      tot_c:0,
      tot_m:0
    };
    this.antService.getCliBanc(this.incentivos.cod_bt).subscribe(x => {
      let br: any = x.body;
      this.dataSource = br.resultado.det;
      if(!isNullOrUndefined(br.resultado.tot.tot_m)){
        this.totSource = br.resultado.tot;
      }
      this.loadingDs=false;
    });

  }

  trCls(i:number){
    if(i==1){
      return "rt";
    }else if(i==2){
      return "rh";
    }
    return "";
  }

  iconCls(x:any){
    if(x==1){
      return "material-icons state-1 i";
    }
    return "material-icons state-2 i";
  }

  abstract navMain(): void;

}

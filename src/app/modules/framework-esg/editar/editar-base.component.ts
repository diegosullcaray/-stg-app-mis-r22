import { FormBuilder, FormGroup } from "@angular/forms";
import { FrameworkEsgService } from "../compartido/servicios/framework-esg.service";
import { ModFrameworkEsgService } from "../compartido/servicios/mod-framework-esg.service";

export abstract class EditarBaseComponent {
    editForm: FormGroup;
    alertState = "closed";
    alertHide = true;
    editMode:boolean;
    title:string;

    constructor(public antService: ModFrameworkEsgService, public esgService: FrameworkEsgService, public formBuilder: FormBuilder) { }

    init(): void {
        this.editMode=this.esgService.editMode;
        let row = this.esgService.selectedRow;
        let atts = JSON.parse(row.cfg_met);
        let hk = this.esgService.histEditKeys;
        let ak = this.esgService.attributesCfg;
        let controls = {
            des_dis: row.des_dis,
            sit_met: row.sit_met,
        };
        hk.forEach(x => controls[x.key] = row[x.key]);
        ak.forEach((x: any) => controls[x.key] = atts[x.key]);
        this.editForm = this.formBuilder.group(controls);
        if(!this.editMode){
            this.editForm.disable();
            this.title="Detalle Metrica ESG";
        }else{
            this.title="Editar Metrica ESG";
        }
    }

    abstract navMain(): void;

    openAlert(): void {
        this.alertState = 'open';
        this.alertHide = false;
        setTimeout(()=>{
            this.alertState = 'closed';
        },2500);
    }

    submitForm() {
        let row = this.esgService.selectedRow;
        let hk = this.esgService.histEditKeys;
        let ak = this.esgService.attributesCfg;
        let ctrs = this.editForm.controls;
        let sd = {
            des_dis: ctrs.des_dis.value,
            sit_met:ctrs.sit_met.value,
            hist: {},
            cfg_met: {}
        };
        hk.forEach(x => sd.hist[x.key] = ctrs[x.key].value);
        ak.forEach((x: any) => sd.cfg_met[x.key] = ctrs[x.key].value);
        //console.log(sd)
        this.antService.postActualizaMet(row.cod_met, sd).subscribe(x => {
            let res = x.body.result;
            if(res.code==200){
                this.navMain();
                this.esgService.refreshTable$.next(row.cod_cat);
            }else{
                this.openAlert();
            }
        });        
    }
}
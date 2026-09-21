import { FormBuilder, FormGroup } from "@angular/forms";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { Subject, Subscription } from "rxjs";
import { AdministracionService } from "../../compartido/servicios/administracion.service";
import { ModAdminService } from "../../compartido/servicios/mod-admin.service";

export abstract class DetalleBaseComponent {
    editForm: FormGroup;
    alertState = "closed";
    alertHide = true;
    dataSource:any;
    show:boolean;
    subs1:Subscription;
    subs2:Subscription;

    constructor(public antAdmin: ModAdminService, public administracion: AdministracionService,public formBuilder: FormBuilder) { }

    destroy(){
        this.subs1.unsubscribe();
        this.subs2.unsubscribe();
    }

    init(): void {
        this.dataSource = this.administracion.selectedRow;
        this.show=false;
        if(isNullOrUndefined(this.dataSource)){
            this.navMain();
        }else{
            this.dataSource['file_id']='9f77f5db-9448-4d97-99ae-10b2030505e6';
            this.dataSource['file_id2']='dcd80303-c736-4ce6-a65b-b7fe7286d038';
            this.dataSource['file_des']='download_RCT2023071401.231';
            this.dataSource['file_des2']='download_Castigos 202305 Formato Finanzas.xlsx';
            this.editForm = this.formBuilder.group(this.dataSource);
            this.editForm.get('nom').disable();
            this.editForm.get('email').disable();
            this.show=true;
        }


        this.subs1=this.administracion.onCompleteSaveFile$.subscribe(x=>{
            console.log(x);
        });

        this.subs2=this.administracion.onCompleteSaveAllFiles$.subscribe(x=>{
            console.log("se completo toda la carga");
            console.log(x);
        });
    }

    abstract navMain(): void;

    openAlert(): void {
        this.alertState = 'open';
        this.alertHide = false;
        setTimeout(()=>{
            this.alertState = 'closed';
        },2500);
    }

    submitForm(){
        console.log(this.editForm.controls);
        this.administracion.uploadFiles();
    }
}
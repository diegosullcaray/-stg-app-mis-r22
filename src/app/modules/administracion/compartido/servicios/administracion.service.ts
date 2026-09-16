import { Injectable } from "@angular/core";
import { StgFInputService } from "app/core/screen/components/stg-finput/stg-finput.service";
import { InFormDialogService } from "app/modules/shared/components/in-form-dialog/in-form-dialog.service";
import { Subject } from "rxjs";

@Injectable()
export class AdministracionService {

    onCompleteSaveFile$: Subject<any>;
    onCompleteSaveAllFiles$: Subject<any>;

    selectedRow$ = new Subject<any>();
    doneLoadingDataSource$ = new Subject<any>();

    onEventForm$:Subject<any>;

    selectedRow:any;

    configs:{}={};

    constructor(private formService: InFormDialogService,private fileService:StgFInputService) {
        this.onCompleteSaveFile$=this.fileService.onCompleteSaveFile$;
        this.onCompleteSaveAllFiles$=this.fileService.onCompleteSaveAllFiles$;

        this.onEventForm$=this.formService.onEvent$;

        this.formService.setDialogOptions(
            {
                panel: {
                    width: '400px',
                    height: '200px'
                },
                title: {
                    text: "Comentario"
                }
            }
        );
        this.formService.setFormOptions(
            {
                fields: [
                    {
                        key: 'des_com',
                        label: 'Comentario'
                    }
                ]
            }
        );
     }

    showFormDialog(){
        this.formService.showDialog();
    }

    uploadFiles(){
        this.fileService.upload();
    }
}
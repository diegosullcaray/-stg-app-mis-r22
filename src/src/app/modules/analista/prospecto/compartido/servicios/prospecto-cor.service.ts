import { Injectable } from "@angular/core";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { InFormDialogService } from "app/modules/shared/components/in-form-dialog/in-form-dialog.service";
import { LayoutService } from "app/system/admin/services/layout.service";
import { Subject } from "rxjs";
import { StgFInputService } from '../../../../../core/screen/components/stg-finput/stg-finput.service';

@Injectable()
export class ProspectoCorService {
    selectedRow:any;

    histEditKeys:any[];
    attributesCfg:any;
    sitCfg:any;
    catsCfg:any;
    dep:any;
    prov:any;
    dist:any;
    ciiu: any;
    ctalicenc: any;
    editMode:boolean;
    addMode: boolean;
    terr: any;
    corr: any;
    agen: any;
    canalcap: any;

    apertCta: any;
    estadCorr: any;
    instalado: any;
    zona: any;
    prospecto: any;
    tipAgente: any;
    tipVinculo: any; 
    vincFamil: any;

    refreshTable$ = new Subject<number>();
    onSubmitForm$:Subject<any>;
    metsLists = {};
    currMetListCat = 1;
    onCompleteSaveFile$: Subject<any>;
    onCompleteSaveAllFiles$: Subject<any>;

    constructor(private layout:LayoutService,private formService: InFormDialogService,private loader:StgAppLoaderService,
        private fileService:StgFInputService){
        this.onSubmitForm$=this.formService.onSubmit$;
        this.onCompleteSaveFile$=this.fileService.onCompleteSaveFile$;
        this.onCompleteSaveAllFiles$=this.fileService.onCompleteSaveAllFiles$;

        this.formService.setDialogOptions(
            {
                panel: {
                    width: '400px',
                    height: '200px'
                },
                title: {
                    text: "Agregar Usuario"
                }
            }
        );
        this.formService.setFormOptions(
            {
                fields: [
                    {
                        key: 'cod_bt',
                        label: 'Codigo BT'
                    }
                ]
            }
        );
    }

    openLoader(){
        this.loader.open();
    }

    closeLoader(){
        this.loader.close();
    }

    showFormDialog(){
        this.formService.showDialog();
    }

    isMobile(){
        return this.layout.isMobile;
    }
    uploadFiles(){
        this.fileService.upload();
    }
}
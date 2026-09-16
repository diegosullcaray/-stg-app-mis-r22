import { Injectable } from "@angular/core";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { InFormDialogService } from "app/modules/shared/components/in-form-dialog/in-form-dialog.service";
import { LayoutService } from "app/system/admin/services/layout.service";
import { Subject } from "rxjs";

@Injectable()
export class FrameworkEsgService {
    selectedRow:any;

    histEditKeys:any[];
    attributesCfg:any;
    sitCfg:any;
    catsCfg:any;

    editMode:boolean;

    refreshTable$ = new Subject<number>();
    onSubmitForm$:Subject<any>;
    metsLists = {};
    currMetListCat = 1;

    constructor(private layout:LayoutService,private formService: InFormDialogService,private loader:StgAppLoaderService){
        this.onSubmitForm$=this.formService.onSubmit$;
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
}
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import {  EditarRoutingPmModule } from './editar-routing-cor.module';  
import { FormsModule } from '@angular/forms';
import { EditarDialogPmComponent } from './editar-dialog-pm.component';
import { EditarPmComponent } from './editar-pm.component';

@NgModule({
    imports:[
        EditarRoutingPmModule,
        SharedCWCModule,
        SharedCMCModule 
 
    ],
     
    declarations:[EditarPmComponent,EditarDialogPmComponent] 
})
export class EditarPmModule{}
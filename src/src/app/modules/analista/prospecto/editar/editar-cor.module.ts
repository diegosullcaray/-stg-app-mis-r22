import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { EditarDialogCorComponent } from './editar-dialog-cor.component';
import { EditarRoutingCorModule } from "./editar-routing-cor.module"; 
import { EditarCorComponent } from './editar-cor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        EditarRoutingCorModule,
        SharedCWCModule,
        SharedCMCModule 
    ],
   
    declarations:[EditarCorComponent,EditarDialogCorComponent]
})
export class EditarCorModule{}
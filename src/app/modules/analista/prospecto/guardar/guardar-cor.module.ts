import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { GuardarDialogCorComponent } from './guardar-dialog-cor.component';
import { GuardarRoutingCorModule } from "./guardar-routing-cor.module"; 
import { GuardarCorComponent } from './guardar-cor.component';
import { FormsModule } from '@angular/forms';  
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";

@NgModule({
    imports:[
        GuardarRoutingCorModule,
        SharedCWCModule,
        SharedCMCModule,
        RxReactiveFormsModule  
    ],
   
    declarations:[GuardarCorComponent,GuardarDialogCorComponent]
})
export class GuardarCorModule{}
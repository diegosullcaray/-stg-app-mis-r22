import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { FormsModule } from '@angular/forms';  
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
//import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { GuardarPmComponent } from './guardar-pm.component';
import { GuardarRoutingPmModule } from './guardar-routing-pm.module';
import { GuardarDialogPmComponent } from './guardar-dialog-pm.component';

@NgModule({
    imports:[
        GuardarRoutingPmModule,
        SharedCWCModule,
        SharedCMCModule,
        //RxReactiveFormsModule  
    ],
   
    declarations:[GuardarPmComponent,GuardarDialogPmComponent]
})
export class GuardarPmModule{}
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { ingresosAppRoutingModule } from "./ingresosApp-routing.module";
import { ingresosAppComponent } from "./ingresosApp.component";

@NgModule({
    imports:[
        ingresosAppRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule  
    ],
    declarations:[ingresosAppComponent],
    //providers:[ModAppService]
})
export class ingresosAppModule{}
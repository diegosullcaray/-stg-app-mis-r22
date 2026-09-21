import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
 
import { EsgRoutingModule } from './esg-routing.module';
import { EsgComponent } from './esg.component';

@NgModule({
    imports:[
        EsgRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule  
    ],
    declarations:[EsgComponent],
    //providers:[ModAppService]
})
export class EsgModule{}
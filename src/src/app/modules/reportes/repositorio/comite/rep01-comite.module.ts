import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { SelectModule } from "../../legacy/support/components/select/select.module";
import { Rep01ComiteRoutingModule } from "./rep01-comite-routing.module";
import { Rep01ComiteComponent } from "./rep01-comite.component";


@NgModule({
    imports:[
        Rep01ComiteRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        SelectModule
    ],
    declarations:[Rep01ComiteComponent],
    //providers:[ComercialService,ModRepService] 
     


})
export class Rep01ComiteModule{}
import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { PriorizacionLeadsRoutingModule } from "./priorizacion-leads-routing.module";
import { PriorizacionLeadsComponent } from "./priorizacion-leads.component";

@NgModule({
    imports:[
        PriorizacionLeadsRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[PriorizacionLeadsComponent],
    //providers:[]
})
export class PriorizacionLeadsModule{}
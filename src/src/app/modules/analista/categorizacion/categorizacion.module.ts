import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { CategorizacionRoutingModule } from "./categorizacion-routing.module";
import { CategorizacionComponent } from "./categorizacion.component";

@NgModule({
    imports:[
        CategorizacionRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[CategorizacionComponent]
})
export class CategorizacionModule{}
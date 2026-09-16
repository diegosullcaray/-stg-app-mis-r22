import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { BecasRoutingModule } from "./becas-routing.module";
import { BecasComponent } from "./becas.component";

@NgModule({
    imports:[
        BecasRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[BecasComponent],
    //providers:[]
})
export class BecasModule{}
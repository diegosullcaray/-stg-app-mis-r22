import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { ListasRoutingModule } from "./listas-routing.module";
import { ListasComponent } from "./listas.component";

@NgModule({
    imports:[
        ListasRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[ListasComponent]
})
export class ListasModule{}
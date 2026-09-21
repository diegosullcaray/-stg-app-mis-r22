import { NgModule } from "@angular/core";
import { IncentivosDiaRoutingModule } from "./incentivos-dia-routing.module";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";


@NgModule({
    imports:[
        IncentivosDiaRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ]
})
export class IncentivosDiaModule{}

import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { ReporteDemoRoutingModule } from "./reporte-demo-routing.module";
import { ReporteDemoComponent } from "./reporte-demo.component";

@NgModule({
    imports:[
        ReporteDemoRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[ReporteDemoComponent],
    //providers:[ModAppService]
})
export class ReporteDemoModule{}
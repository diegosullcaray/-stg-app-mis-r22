import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module"; 
import { DemoTable3Component } from "./demo-table3.component";
import { DemoTable3RoutingModule } from "./demo-table3-routing.module";
import { StgTable3Service } from "app/core/screen/components/stg-table3/stg-table3.service";

const components=[
    DemoTable3Component
];

@NgModule({
    imports:[
        DemoTable3RoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[components],
    providers:[StgTable3Service]
})
export class DemoTable3Module{}
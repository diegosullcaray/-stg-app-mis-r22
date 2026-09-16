import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { RutasRoutingModule } from "./rutas-routing.module";
import { RutasComponent } from "./rutas.component";

@NgModule({
    imports:[
        RutasRoutingModule,
        //SharedCWCModule,
        //SharedCMCModule,
        //HighchartsChartModule      
    ],
    declarations:[RutasComponent],
    providers:[]
})
export class RutasModule{}
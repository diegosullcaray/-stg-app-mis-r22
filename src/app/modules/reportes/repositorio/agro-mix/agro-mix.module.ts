import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";     
import { AgroMixComponent } from "./agro-mix.component";
import { AgroMixRoutingModule } from "./agro-mix-routing.module";
import { HighchartsChartModule } from "highcharts-angular";
import { DetalleDialogComponent } from "./detalle/detalle-dialog.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MapaSimpleComponent } from "./mapa-simple.component";

@NgModule({
    imports:[
        AgroMixRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule ,
        LeafletModule
    ],
    declarations:[AgroMixComponent,DetalleDialogComponent,MapaSimpleComponent],
    //providers:[ModAppService]
})  
export class agroMixModule{}
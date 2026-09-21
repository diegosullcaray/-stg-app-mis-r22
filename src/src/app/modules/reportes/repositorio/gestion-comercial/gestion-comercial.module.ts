import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";     
  
import { HighchartsChartModule } from "highcharts-angular";
//import { DetalleDialogComponent } from "./detalle/detalle-dialog.component";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
//import { MapaSimpleComponent } from "./mapa-simple.component";
import { GestionComercialRoutingModule } from "./gestion-comercial.routing.module";
import { GestionComercialComponent } from "./gestion-comercial.component";

@NgModule({
    imports:[
        GestionComercialRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule,
        HighchartsChartModule ,
        LeafletModule
    ],
    //declarations:[GestionComercialComponent,DetalleDialogComponent,MapaSimpleComponent],
    declarations:[GestionComercialComponent],
    //providers:[ModAppService]
})  
export class gestionComercialModule{}
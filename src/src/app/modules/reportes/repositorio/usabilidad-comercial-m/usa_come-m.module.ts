import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { UsaComeMRoutingModule } from "./usa_come-m-routing.module";
import { UsaComeMComponent } from "./usa_come-m.component";
import { DetalleMComponent } from "./detalle/detalle-m.component";
import { DetalleDialogMComponent } from "./detalle/detalle-dialog-m.component";
const components=[ 
    DetalleMComponent,
    DetalleDialogMComponent, 
];
@NgModule({
    imports:[
        UsaComeMRoutingModule,
        CommonModule,
        FormsModule,  
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[UsaComeMComponent,components],
    //providers:[ModAppService]
})
export class UsaComeMModule{}
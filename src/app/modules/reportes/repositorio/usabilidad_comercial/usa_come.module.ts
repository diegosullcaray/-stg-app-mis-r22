import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";  
import { UsaComeRoutingModule } from "./usa_come-routing.module";
import { UsaComeComponent } from "./usa_come.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { DetalleDialogComponent } from "./detalle/detalle-dialog.component";
const components=[ 
    DetalleComponent,
    DetalleDialogComponent, 
];
@NgModule({
    imports:[
        UsaComeRoutingModule,
        CommonModule,
        FormsModule,  
        FlexLayoutModule,
        SharedMaterialModule, 
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[UsaComeComponent,components],
    //providers:[ModAppService]
})
export class UsaComeModule{}
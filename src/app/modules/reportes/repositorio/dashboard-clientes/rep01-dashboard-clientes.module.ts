import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { Rep01DashboardClientesRoutingModule } from "./rep01-dashboard-clientes-routing.module";
import { Rep01DashboardClientesComponent } from "./rep01-dashboard-clientes.component";

@NgModule({
    imports:[
        Rep01DashboardClientesRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[Rep01DashboardClientesComponent],
    //providers:[ModAppService]
})
export class Rep01DashboardClientesModule{}
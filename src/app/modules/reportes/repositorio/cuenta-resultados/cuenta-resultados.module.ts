import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { CuentaResultadosRoutingModule } from "./cuenta-resultados-routing.module";
import { CuentaResultadosComponent } from "./cuenta-resultados.component";

@NgModule({
    imports: [
        CuentaResultadosRoutingModule,
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations: [CuentaResultadosComponent]
})
export class CuentaResultadosModule { }

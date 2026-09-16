import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ModAppService } from "app/core/data/remote/instances/mod-app-service";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "app/modules/shared/shared-cmc.module";
import { ComercialService } from "../../legacy/comercial/comercial.service";
import { SelectModule } from "../../legacy/support/components/select/select.module";
import { Rep01PrecosechasRoutingModule } from "./rep01-precosechas-routing.module";
import { Rep01PrecosechasComponent } from "./rep01-precosechas.component";
import { ModRepService } from '../../compartido/servicios/mod-rep.service';


@NgModule({
    imports:[
        Rep01PrecosechasRoutingModule,
        SharedCWCModule,
        SharedCMCModule,
        SelectModule
    ],
    declarations:[Rep01PrecosechasComponent],
    //providers:[ComercialService,ModRepService] 
     

})
export class Rep01PrecosechasModule{}
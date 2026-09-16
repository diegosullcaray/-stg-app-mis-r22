import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { FrameworkEsgService } from "./compartido/servicios/framework-esg.service";
import { ModFrameworkEsgService } from "./compartido/servicios/mod-framework-esg.service";
import { FrameworkEsgRoutingModule } from "./framework-esg-routing.module";
import { FrameworkEsgComponent } from "./framework-esg.component";
import { PrincipalComponent } from "./principal/principal.component";

@NgModule({
    imports:[
        FrameworkEsgRoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[FrameworkEsgComponent,PrincipalComponent],
    providers:[ModFrameworkEsgService,FrameworkEsgService]
})
export class FrameworkEsgModule{}
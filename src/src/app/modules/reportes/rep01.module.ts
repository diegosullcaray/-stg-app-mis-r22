import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { ModRepService } from "./compartido/servicios/mod-rep.service";
import { DummyComponent } from "./components/dummy/dummy.component";
import { RepSidenavComponent } from "./components/rep-sidenav/rep-sidenav.component";
import { ComercialService } from "./legacy/comercial/comercial.service";
import { Rep01RoutingModule } from "./rep01-routing.module";
import { Rep01Component } from "./rep01.component";

@NgModule({
    imports: [
        Rep01RoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations: [Rep01Component,RepSidenavComponent,DummyComponent],
    providers:[ModRepService]
})
export class Rep01Module { }
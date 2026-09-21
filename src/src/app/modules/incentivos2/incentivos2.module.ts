import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ModAppService } from "app/core/data/remote/instances/mod-app-service";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module";
import { SharedMaterialModule } from "app/core/screen/components/shared-material.module";
import { SharedCMCModule } from "../shared/shared-cmc.module";
import { Incentivos2RoutingModule } from "./incentivos2-routing.module";
import { Incentivos2Component } from "./incentivos2.component";
import { VariableComponent } from './variable/variable.component';
import { MonetizacionComponent } from './monetizacion/monetizacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PrincipalComponent } from './principal/principal.component';
import { Incentivos2Service } from "./compartido/servicio/incentivos2.service";
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CalculadoraDialogComponent } from "./calculadora/calculadora-dialog.component";
import { ModIncentivos2Service } from "./compartido/servicio/mod-incentivos2.service";
import { ClientesDialogComponent } from "./clientes/clientes-dialog.component";

@NgModule({
    imports:[
        Incentivos2RoutingModule,
        SharedCWCModule,
        SharedCMCModule
    ],
    declarations:[Incentivos2Component, VariableComponent, MonetizacionComponent, PerfilComponent, PrincipalComponent, 
        CalculadoraComponent,CalculadoraDialogComponent, ClientesComponent,ClientesDialogComponent],
    providers:[ModAppService,Incentivos2Service,ModIncentivos2Service]
})
export class Incentivos2Module{}
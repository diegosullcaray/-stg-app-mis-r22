import { NgModule } from "@angular/core";
import { SharedCWCModule } from "app/core/screen/components/shared-cwc.module"; 
import { ProspectoCorService } from './compartido/servicios/prospecto-cor.service';
import { ModProspectoCorService } from './compartido/servicios/mod-prospecto-cor.service';
import { ProspectoCorRoutingModule } from './prospecto-cor-routing.module';
import { ProspectoCorComponent } from './prospecto-cor.component';
import { PrincipalComponent } from "./principal/principal.component"; 
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
//import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; 
import { SharedCMCModule } from '../../shared/shared-cmc.module';
import { ModRepService } from '../../reportes/compartido/servicios/mod-rep.service';
 


@NgModule({
    imports:[
        ProspectoCorRoutingModule,
        SharedCWCModule, 
        SharedCMCModule  
    ], 
    declarations:[ProspectoCorComponent,PrincipalComponent],
    providers:[ModProspectoCorService,ProspectoCorService,ModRepService]
})
export class ProspectoCorModule{}
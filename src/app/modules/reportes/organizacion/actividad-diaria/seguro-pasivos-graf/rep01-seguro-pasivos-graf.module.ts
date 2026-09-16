import { NgModule } from "@angular/core"; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { TableModule } from '../../../legacy/support/components/table/table.module';
import { SelectModule } from '../../../legacy/support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsLegacyModule } from '../../../legacy/support/components/shared-components.module'; 
import { Rep01SeguroPasivosGrafRoutingModule } from "./rep01-seguro-pasivos-graf-routing.module";
import { ComercialService } from "app/modules/reportes/legacy/comercial/comercial.service";
import { ModRepService } from "app/modules/reportes/compartido/servicios/mod-rep.service";
 

@NgModule({
    imports:[
        Rep01SeguroPasivosGrafRoutingModule,
        SharedComponentsLegacyModule,
        CommonModule,
        FlexLayoutModule,
        SelectModule,
        TableModule,

        MatCardModule

 
    ],
    providers: [ComercialService,ModRepService],
})
export class Rep01SeguroPasivosGrafModule{} 
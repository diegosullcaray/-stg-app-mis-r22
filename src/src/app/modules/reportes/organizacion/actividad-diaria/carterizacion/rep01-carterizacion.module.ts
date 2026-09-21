import { NgModule } from "@angular/core"; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { TableModule } from '../../../legacy/support/components/table/table.module';
import { SelectModule } from '../../../legacy/support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsLegacyModule } from '../../../legacy/support/components/shared-components.module';
import { ComercialService } from "app/modules/reportes/legacy/comercial/comercial.service";
import { ModRepService } from "app/modules/reportes/compartido/servicios/mod-rep.service";
import { Rep01CarterizacionRoutingModule } from "./rep01-carterizacion-routing.module";

  
@NgModule({
    imports:[
        Rep01CarterizacionRoutingModule,
        SharedComponentsLegacyModule,
        CommonModule,
        FlexLayoutModule,
        SelectModule,
        TableModule,

        MatCardModule
    ] 
})
export class Rep01CarterizacionModule{} 
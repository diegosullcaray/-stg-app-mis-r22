import { NgModule } from "@angular/core"; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { TableModule } from '../../../legacy/support/components/table/table.module';
import { SelectModule } from '../../../legacy/support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsLegacyModule } from '../../../legacy/support/components/shared-components.module';  
import { Rep01SeguroOptativoRoutingModule } from "./rep01-seguro-optativo-routing.module";


@NgModule({
    imports:[
        Rep01SeguroOptativoRoutingModule,
        SharedComponentsLegacyModule,
        CommonModule,
        FlexLayoutModule,
        SelectModule,
        TableModule,

        MatCardModule
    ]
})
export class Rep01SeguroOptativoModule{} 
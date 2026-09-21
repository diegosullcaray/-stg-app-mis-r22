import { NgModule } from "@angular/core"; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { TableModule } from '../../../legacy/support/components/table/table.module';
import { SelectModule } from '../../../legacy/support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsLegacyModule } from '../../../legacy/support/components/shared-components.module';
import { SupervisionRoutingModule } from "./supervision-routing.modulet";


@NgModule({
    imports:[
        SupervisionRoutingModule,
        SharedComponentsLegacyModule,
        CommonModule,
        FlexLayoutModule,
        SelectModule,
        TableModule,

        MatCardModule
    ]
})
export class SupervisionModule{}

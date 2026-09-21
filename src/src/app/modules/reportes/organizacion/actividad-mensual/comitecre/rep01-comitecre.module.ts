import { NgModule } from "@angular/core";
import { Rep01ComiteRoutingModule } from "./rep01-comitecre-routing.modulet";
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { TableModule } from '../../../legacy/support/components/table/table.module';
import { SelectModule } from '../../../legacy/support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsLegacyModule } from '../../../legacy/support/components/shared-components.module';


@NgModule({
    imports:[
        Rep01ComiteRoutingModule,
        SharedComponentsLegacyModule,
        CommonModule,
        FlexLayoutModule,
        SelectModule,
        TableModule,

        MatCardModule
    ]
})
export class Rep01comitecreModule{}
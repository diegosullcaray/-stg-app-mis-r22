import { NgModule } from "@angular/core";
import { Rep01CaptaCaractRoutingModule } from './rep01-capta-caract-routing.modulet';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from "@angular/common";

import { TableModule } from '../../../legacy/support/components/table/table.module';
import { SelectModule } from '../../../legacy/support/components/select/select.module';
import { MatCardModule } from '@angular/material/card';
import { SharedComponentsLegacyModule } from '../../../legacy/support/components/shared-components.module';


@NgModule({
    imports:[
        Rep01CaptaCaractRoutingModule,
        SharedComponentsLegacyModule,
        CommonModule,
        FlexLayoutModule,
        SelectModule,
        TableModule,

        MatCardModule
    ]
})
export class Rep01CaptaCaractModule{}


/*import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Rep01ClientesDiaRoutingModule } from "./rep01-clientes-dia-routing.modulet";

@NgModule({
    imports:[
        Rep01ClientesDiaRoutingModule,
        CommonModule
    ]
})
export class Rep01ClientesDiaModule{} */
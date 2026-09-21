
import { NgModule } from '@angular/core';
import { SelectModule } from '../../support/components/select/select.module';
import { RDARoutingModule } from './rda-routing.module'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddProspecomponent } from './sectorista/crs-prospe/add-prospe.component';
import { FlexLayoutModule } from '@angular/flex-layout';  
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
    imports: [
        RDARoutingModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [AddProspecomponent]
})
 
export class RDAModule { }
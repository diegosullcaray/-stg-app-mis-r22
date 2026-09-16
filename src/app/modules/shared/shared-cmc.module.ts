import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
import { HierRemSelectorComponent } from './components/hier-rem-selector/hier-rem-selector.component';
import { TblPickerDialogComponent } from './components/tbl-picker-dialog/tbl-picker-dialog.component';
import { SecPickerDialogComponent } from './components/sec-picker-dialog/sec-picker-dialog.component';
import { SingLocSelectorComponent } from './components/sing-loc-selector/sing-loc-selector.component';
import { TblPickerDialogService } from './components/tbl-picker-dialog/tbl-picker-dialog.service';
import { SecPickerDialog2Service } from './services/sec-picker-dialog2.service';
import { InFormDialogService } from './components/in-form-dialog/in-form-dialog.service';
import { InFormDialogComponent } from './components/in-form-dialog/in-form-dialog.component';
import { HierRemSelector2Component } from './components/hier-rem-selector2/hier-rem-selector2.component';
import { BlankLoaderComponent } from './components/blank-loader/blank-loader.component';
import { ClientSummaryComponent } from './components/client-summary/client-summary.component';
import { ClientSummaryAntService } from './components/client-summary/client-summary-ant.service';
import { ClientSummaryService } from './components/client-summary/client-summary.service';
import { GoogleMapsModule } from '@angular/google-maps';

const components = [
    SecPickerDialogComponent,
    HierRemSelectorComponent,
    HierRemSelector2Component,
    SingLocSelectorComponent,
    TblPickerDialogComponent,
    InFormDialogComponent,
    BlankLoaderComponent,
    ClientSummaryComponent
];

const services = [
    TblPickerDialogService, 
    SecPickerDialog2Service, 
    InFormDialogService,
    ClientSummaryAntService,
    ClientSummaryService
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        SharedMaterialModule,
        SharedCWCModule,
        GoogleMapsModule
        
    ],
    declarations: components,
    exports: components,
    providers: [services]
})
export class SharedCMCModule { }
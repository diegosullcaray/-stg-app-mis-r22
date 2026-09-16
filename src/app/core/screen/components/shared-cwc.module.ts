import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { StgHoverMenuComponent } from './stg-hover-menu/stg-hover-menu.component';
import { SharedMaterialModule } from './shared-material.module';
import { StgTableComponent } from './stg-table/stg-table.component';
import { StgLoading1 } from './stg-loading-1/stg-loading-1.component';
import { StgWindowBarComponent } from './stg-window-bar/stg-window-bar.component';
import { StgPaginatorComponent } from './stg-paginator/stg-paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StgAppLoaderComponent } from './stg-app-loader/stg-app-loader.component';
import { StgBasicTreeSidenavComponent } from './stg-basic-tree-sidenav/stg-basic-tree-sidenav.component';
import { StgAlertComponent } from './stg-alert/stg-alert.component';
import { StgToolbarComponent } from './stg-toolbar/stg-toolbar.component';
import { StgProgressComponent } from './stg-progress/stg-progress.component';
import { StgTable2Component } from './stg-table2/stg-table2.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DynamicFormatPipe } from '../pipes/dynamic-format-pipe';
import { StgButtonComponent } from './stg-button/stg-button.component';
import { StgListComponent } from './stg-list/stg-list.component';
import { StgFormComponent } from './stg-form/stg-form.component';
import { StgBinputComponent } from './stg-binput/stg-binput.component';
import { TruncatePipe } from '../pipes/truncate-pipe';
import { StgBinputDialogComponent } from './stg-binput/dialog/stg-binput-dialog.component';
import { StgAppConfirmComponent } from './stg-app-confirm/stg-app-confirm.component';
import { StgFinputComponent } from './stg-finput/stg-finput.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { StgPinputComponent } from './stg-pinput/stg-pinput.component';
import { StgNinputComponent } from './stg-ninput/stg-ninput.component';
import { StgTable3Component } from './stg-table3/stg-table3.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StgMenuFilterComponent } from './stg-menu-filter/stg-menu-filter.component';
import { StgWindowBarMComponent } from './stg-window-bar-m/stg-window-bar-m.component';
import { StgTable4Component } from './stg-table4/stg-table4.component';

const components = [
    StgHoverMenuComponent,
    StgTableComponent,
    StgLoading1,
    StgWindowBarComponent,
    StgWindowBarMComponent,
    StgPaginatorComponent,
    StgAppLoaderComponent,
    StgAppConfirmComponent,
    StgBasicTreeSidenavComponent,
    StgAlertComponent,
    StgToolbarComponent,
    StgProgressComponent,
    StgTable2Component,
    StgTable4Component,
    StgButtonComponent,
    StgListComponent,
    StgFormComponent,
    StgBinputComponent,
    StgBinputDialogComponent,
    StgFinputComponent,
    StgPinputComponent,
    StgNinputComponent,
    StgTable3Component,
    StgMenuFilterComponent
];

const pipes = [
    DynamicFormatPipe,
    TruncatePipe
]

const libraries = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    NgScrollbarModule,
    SharedMaterialModule,
    RxReactiveFormsModule,
    ScrollingModule
]

const exports = [...components,...pipes,...libraries];

const imports = libraries;

const declarations = [...components,...pipes];

@NgModule({
    imports:imports,
    declarations:declarations,
    exports:exports,
    //providers:[DynamicFormatPipe]
})
export class SharedCWCModule {}
 
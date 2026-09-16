import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBasicComponent } from './table-basic/table-basic.component';
import { TableMultiheaderComponent } from './table-multiheader/table-multiheader.component';
import { CdkTableModule } from '@angular/cdk/table';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TableAjaxComponent } from './table-ajax/table-ajax.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PipeModule } from '../../pipes/pipe.module';

const components = [
    TableBasicComponent,
    TableMultiheaderComponent,
    TableAjaxComponent
  ]

@NgModule({
    imports: [
      CommonModule,
      CdkTableModule,
      MatPaginatorModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatIconModule,
      MatTooltipModule,
      MatButtonModule,
      MatRadioModule,
      MatCheckboxModule,
      MatTableModule,
      
      MatFormFieldModule,
      MatInputModule,
      FlexLayoutModule,
      PipeModule
    ],
    declarations: components,
    exports:components

  })
  export class TableModule {}
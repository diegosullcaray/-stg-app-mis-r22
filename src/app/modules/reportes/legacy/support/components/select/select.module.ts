import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBasicComponent } from './select-basic/select-basic.component';
import { SelectGroupComponent } from './select-group/select-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { CacheService } from '../../services/cache.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const components = [
    SelectBasicComponent,
    SelectGroupComponent,
    SelectMultipleComponent
  ]

@NgModule({
    imports: [
      CommonModule,
      FormsModule, ReactiveFormsModule,
      FlexLayoutModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatCardModule
    ],
    declarations: components,
    exports:components,
    providers:[CacheService]

  })
  export class SelectModule {}

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';
const components = [
    //NotFoundComponent
  ]

@NgModule({
    imports: [
      //CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      FlexLayoutModule,
      //SharedDirectivesModule,
      SharedMaterialModule,
      //TranslateModule    
    ],
    declarations: components,
    exports: [FormsModule,
      ReactiveFormsModule,SharedMaterialModule]
  })
  export class SharedComponentsLegacyModule {}
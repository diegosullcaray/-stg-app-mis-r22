import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import { FlexLayoutModule } from '@angular/flex-layout';
//import { TranslateModule } from '@ngx-translate/core';
import { SigninComponent } from './views/signin/signin.component';
import { SessionRoutes } from './session-routing.module';
import { SharedMaterialModule } from 'app/core/screen/components/shared-material.module';

// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //TranslateModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(SessionRoutes)
  ],
  declarations: [SigninComponent]
})
export class SessionModule { }
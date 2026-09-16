import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteSecComponent } from './auto-complete-sec/auto-complete-sec.component';

const components = [
  AutoCompleteSecComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, 
    FlexLayoutModule,
  ],
  declarations: components,
  exports: components

})
export class AutoCompleteModule { }

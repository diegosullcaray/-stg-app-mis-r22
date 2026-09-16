import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalNumberPipe } from './local-number.pipe';


const pipes = [
  LocalNumberPipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class PipeModule {}
import { Injectable } from '@angular/core';

@Injectable()
export class SelectService {
  /*private conf={
    width:'100%',
    class:'mat-table-1',
    edit:false,
    sticky:0,
    isLoadingResults:false,
    isErrorResults:false
  }*/
  private variable='';
  private selected;
  private label='';
  private disabled='';
  private data=[];
  constructor() {
  }

  adddata(data){
    this.data=data;
  }

  /*results(loading:boolean,error:boolean){
    this.conf.isErrorResults=error;
    this.conf.isLoadingResults=loading;
  }*/

  labelName(label){
    this.label=label;
  }

  //  disabledVAlue(disabled){
  //    this.disabled=disabled;
  //  }

  selectedVAlue(selected){
    this.selected=selected;
  }

  getVariable(variable:string){
    this.variable=variable
  }




}

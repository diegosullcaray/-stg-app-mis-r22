import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber, formatPercent, formatDate } from '@angular/common';
import { isNull, isUndefined } from 'app/core/shared/functions.util';

@Pipe({
  name: 'localNumber'
})
export class LocalNumberPipe implements PipeTransform {
  constructor() {}

  transform(value: any, format:any) {
    if (isNull(value) || isUndefined(value)) {
      return '';
    }
    if(isUndefined(format)){
      return value
    }else{
      var isMode=(isUndefined(format.mode))?false:true;
      var unit=(isUndefined(format.unit))?'':' '+format.unit;
    }
    switch(format.type) { 
      case 'string': { 
        return value;
        break; 
      } 
      case 'number': {
        return isMode?formatNumber(value,'en-US',format.mode)+unit:value;
        break; 
      }
      case 'percent': {
        return isMode?formatPercent(value,'en-US',format.mode)+unit:value;
        break; 
      } 
      case 'traffic-light': {
        const color=(value==0)?'orange-icon':(value==-1)?'red-icon':(value==1)?'green-icon':false
        if(color){
          return '<span class="material-icons '+color+'">lens</span>';
        }else{
          return '';
        }
        break; 
      } 
      case 'date':{
        return isMode?formatDate(value,format.mode,'en-US')+unit:value;
      }
      default: { 
          return value
         break; 
      } 
   }
  }
}
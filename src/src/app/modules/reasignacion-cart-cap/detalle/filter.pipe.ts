 

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
name: 'filterByHdester'
})
export class FilterPeoplePipe implements PipeTransform {
transform(values: any[], hdester: string): any[] {
return values.filter(v => v.hdester === hdester);
}
}
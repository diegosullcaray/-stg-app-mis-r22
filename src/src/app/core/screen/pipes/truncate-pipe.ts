import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'app/core/shared/functions.util';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
        if(isNullOrUndefined(value)){
            return value;
        }
        if (completeWords) {
            limit = value.substr(0, limit).lastIndexOf(' ');
        }
        return value.length > limit ? value.substr(0, limit-ellipsis.length) + ellipsis : value;
    }
}
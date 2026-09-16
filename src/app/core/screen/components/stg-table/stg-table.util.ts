import { isNullOrUndefined } from "app/core/shared/functions.util";
import { COLOR_BACKGROUND_1 } from "app/core/shared/variables.util";

export function prepareDataForPagination(pageLenght: number, dataSource: any[], pageKey?: string): void {
    let pk = isNullOrUndefined(pageKey) ? '__page__' : pageKey;
    let i = 1;
    let pc = 1;
    dataSource.forEach(x => {
        x[pk] = pc;
        i++;
        if (i > pageLenght) {
            i = 1;
            pc++;
        }
    });
}

export const STG_GRID_STYLE = '1px solid #e9e9ef';

export const STG_INPUT_TABLE_BACKGROUND = 'rgb(220, 230, 241)';

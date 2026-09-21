import { isNullOrUndefined } from "app/core/shared/functions.util";

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
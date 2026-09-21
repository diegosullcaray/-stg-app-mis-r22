import { cloneObject, mergeObjects } from 'app/core/shared/functions.util';

export const stgLightTable2Config = {
    style: {
        'background': '#ffffff',
        'font-size': '12px'
    },
    grid: {
        mode: 'bottom',
        border: '1px solid #e3eaf0'
    },
    header: {
        style: {
            'background': '#f8fbfd',
            'color': '#40566a',
            'font-weight': '800'
        },
        cellStyle: {
            'min-width': '86px',
            'height': '40px'
        }
    },
    body: {
        hover: {
            enabled: true,
            style: {
                'background': '#fbfdff'
            }
        }
    }
};

export function createStgLightTable2Config(overrides: any = {}): any {
    return mergeObjects(cloneObject(stgLightTable2Config), overrides);
}

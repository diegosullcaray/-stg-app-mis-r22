const iconFn = function (value: any) {
    if (value == 1) {
        return 'check_circle';
    }
    return "";
}

export const headers = [
    {
        label: 'Prospectado',
        key: 'ind_pro',
        style: {
            'max-width': '100px',
            'min-width': '100px',
            'width': '50px',

        },
        cellStyle: {
            'color': 'lightgreen',
            'text-align': 'center'
        },
        format: {
            type: 'icon',
            params: {
                size: '14px',

                convertFn: iconFn
            }
        }
    },
    {
        label: 'Segmento',
        key: 'seg_cli',
        style: {
            'max-width': '120px',
            'min-width': '120px',
            'width': '120px',

        }
    },
    {
        label: 'Nombre',
        key: 'des_cli'
    },
    {
        label: 'Documento',
        key: 'num_doc',
        style: {
            'max-width': '120px',
            'min-width': '120px',
            'width': '120px',

        }
    }
];
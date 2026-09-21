import { isNullOrUndefined } from "app/core/shared/functions.util";
import { first } from "rxjs-compat/operator/first";

export const principalConfig = {
    loading: true,
    meta: [],
    filters: [
        /*{
            type: "select",
            label: "Variable",
            data: [
                { label: 'Num. Operaciones', value: 0 },
                { label: 'Monto Desem.', value: 1 }
            ],
            selected: 0
        },*/
        {
            type: "select",
            label: "Grupo",
            data: [
                { label: 'Individual', value: 1 },
                { label: 'Grupal', value: 2 }
            ],
            selected: 0
        }
    ],
    //dataTable: [],
    des_lab: "",
    des_rel: "",
    hierTabs: [
        { enabled: false, label: "Territorio", active: false, data: [], pagination: false, headers: [] },
        { enabled: false, label: "Corredor", active: false, data: [], pagination: false, headers: [] },
        { enabled: false, label: "Unidad", active: false, data: [], pagination: false, headers: [] },
        { enabled: false, label: "Asesor", active: false, data: [], pagination: false, headers: [] }
    ],
    currTabIdx: 0
};

export const scItems = [{ label: 'Nuev.', key: 'nue' }, { label: 'Repre.', key: 'repre' }, { label: 'Recu.', key: 'recu' }];

export const filter1 = [
    { val: 0, label: 'Operaciones' },
    { val: 1, label: 'Monto' }
];

export const filter2 = [
    { valf2: 1, labelf2: 'Individual' },
    { valf2: 2, labelf2: 'Grupal' }
];

const nivFn = function (row: any) {
    if (row.flag_niv == 1) {
        return {
            'color': '#008080',
            'background': '#f2f2f2'
        };
    }
    return {};
}

const csFn = function (params: any) {
    if (params.rowData.flag_niv == 1) {
        return {
            'color': '#008080',
            'background': '#f2f2f2'
        };
    }
    return {
        'background': 'white'
    };
};

export const tblOpts = {
    style: {
        'font-size': '12px'
    },
    grid: {
        //enabled: false
        //mode: 'bottom'
    },
    header: {
        style: {
            //'background': '#0081FF',
            //'color': 'white',
            //'background': 'white',
            'font-size': '12px',
            //'opacity': '0.6'
        }
    },
    body: {
        //stickyCols:[80],
        style: {
            'color': '#004481'
        },
        rowStyleFn: nivFn
    }
}

const ctFn = function (value: string, row: any) {
    if (row.tip_cod == 1 || row.flag_niv == 1) {
        return {
            type: 'truncate',
            params: {
                limit: 10
            }
        };
    }
    return {
        type: 'truncate',
        params: {
            link2: true,
            limit: 10
        }
    };
};

const ctFn2 = function (value: string, row: any) {
    if (row.flag_niv == 1) {
        return { type: 'integer' };
    }
    return { type: 'integer', params: { link2: true } };
};

const tlFn = function (value: number) {
    if (isNullOrUndefined(value) || value < 0.95) {
        return 'red';
    } else if (value < 1) {
        return 'orange'
    }
    return 'green';
};

export const tblHeaderTerr = {
    label: "Territorio",
    key: "terr",
    style: {
        'left': '0px',
        'position': 'sticky',
        'z-index': '99',
        'background': '#035096',
        'min-width': '87px',
        'width': '87px',
        'max-width': '87px'
    },
    cellStyle: {
        'left': '0px',
        'position': 'sticky',
        'z-index': '99',
        //'background': 'white',
        'min-width': '87px',
        'width': '87px',
        'max-width': '87px'
    },
    cellStyleFn: csFn,
    format: {
        type: 'truncate',
        params: {
            limit: 10
        }
    }
}

export const tblHeaderCorr = {
    label: "Corredor",
    key: "corr",
    style: {
        'left': '0px',
        'position': 'sticky',
        'z-index': '99',
        'background': '#035096',
        'min-width': '87px',
        'width': '87px',
        'max-width': '87px'
    },
    cellStyle: {
        'left': '0px',
        'position': 'sticky',
        'z-index': '99',
        //'background': 'white',
        'min-width': '87px',
        'width': '87px',
        'max-width': '87px'
    },
    cellStyleFn: csFn,
    format: {
        type: 'truncate',
        params: {
            limit: 10
        }
    }
}

export const tblHeaderUni = {
    label: "Unidad",
    key: "uni",
    style: {
        'left': '0px',
        'position': 'sticky',
        'z-index': '99',
        'background': '#035096',
        'min-width': '87px',
        'width': '87px',
        'max-width': '87px'
    },
    cellStyle: {
        'left': '0px',
        'position': 'sticky',
        'z-index': '99',
        //'background': 'white',
        'min-width': '87px',
        'width': '87px',
        'max-width': '87px'
    },
    cellStyleFn: csFn,
    format: {
        type: 'truncate',
        params: {
            limit: 10
        }
    }
}

export const tblHeaders = [
    {
        label: 'Rank.',
        key: 'rank',
        format: {
            type: 'integer'
        },
        cellStyle: {
            'text-align': 'center',
            'position': 'sticky',
            'z-index': '99',
            'min-width': '38px',
            'width': '38px',
            'max-width': '38px',
            'left': '0px',
            //'background': 'white'
        },
        cellStyleFn: csFn,
        style: {
            'position': 'sticky',
            'min-width': '38px',
            'width': '38px',
            'max-width': '38px',
            'z-index': '99',
            'left': '0px',
            'background': '#035096'
        }
    },
    {
        label: "Descripción",
        key: "des_rel",
        style: {
            'left': '49px',
            'position': 'sticky',
            'z-index': '99',
            'background': '#035096',
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        cellStyle: {
            'left': '49px',
            'position': 'sticky',
            'z-index': '99',
            //'background': 'white',
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        cellStyleFn: csFn,
        format: {
            type: 'custom',
            params: {
                typeFn: ctFn
            }
        }
    },
    {
        label: "Desembolso",
        subs: [
            {
                label: 'Real',
                key: 'real',
                cellStyle: {
                    'text-align': 'right'
                },
                format: {
                    type: 'integer',
                    // params: {
                    //     link2: true
                    // }
                },
                style: {
                    'min-width': '80px',
                    'width': '80px'
                }
            },
            {
                label: 'Meta',
                key: 'meta',
                cellStyle: {
                    'text-align': 'right'
                },
                format: {
                    type: 'integer'
                },
                style: {
                    'min-width': '80px',
                    'width': '80px'
                }
            },
            {
                label: 'Avance',
                key: 'avan',
                cellStyle: {
                    'display': 'flex',
                    'justify-content': 'right'
                },
                format: {
                    type: 'percent',
                    params: {
                        trafficFn: tlFn
                    }
                },
                style: {
                    'min-width': '80px',
                    'width': '80px'
                }
            }
        ]
    },
    {
        label: "Num. Ases.",
        key: "num_sec",
        cellStyle: {
            'text-align': 'right'
        },
        format: {
            type: 'integer'
        },
        style: {
            'min-width': '50px',
            'width': '50px'
        }
    },
    {
        label: "Desem. Prom.",
        key: "prom_var",
        cellStyle: {
            'text-align': 'right'
        },
        format: {
            type: 'decimal'
        },
        style: {
            'min-width': '75px',
            'width': '75px'
        }
    }
]

export function eventHeaders(evt_idx: number) {
    let fi = (evt_idx + 1).toString().padStart(2, '0');

    return [
        {
            label: 'Base',
            key: 'bas_gc_' + fi,
            style: {
                'min-width': '70px',
                'width': '70px'
            },
            cellStyle: {
                'text-align': 'right'
            },
            format: {
                type: 'custom',
                params: {
                    typeFn: ctFn2
                }
            }
        },
        {
            label: 'Gesti.',
            key: 'ges_gc_' + fi,
            style: {
                'min-width': '70px',
                'width': '70px'
            },
            cellStyle: {
                'text-align': 'right'
            },
            format: {
                type: 'integer'
            }
        },
        {
            label: 'Ejecu.',
            key: 'desem_gc_' + fi,
            style: {
                'min-width': '70px',
                'width': '70px'
            },
            cellStyle: {
                'text-align': 'right'
            },
            format: {
                type: 'integer'
            }
        },
        {
            label: 'Efec.',
            key: 'rat_gc_' + fi,
            format: {
                type: 'percent'
            },
            style: {
                'min-width': '50px',
                'width': '50px'
            },
            cellStyle: {
                'text-align': 'right'
            }
        }
    ]
}
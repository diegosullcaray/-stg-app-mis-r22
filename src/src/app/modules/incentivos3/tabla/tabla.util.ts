import { incentivos3IconSet } from "../incentivos3.util";

//rgb(124, 181, 236)
const tableOpts1 = {
    style: {
        'font-size': '10px'
    },
    grid: {
        enabled: false
        //mode: 'only_headers'
    },
    header: {
        style: {
            //background: '#5964E5'
            'color': 'black',
            'background': 'white'
        },
        cellStyle: {
            //'height': '32px',
            'min-width': '85px',
            'font-size': '10px'
        }
    },
    body: {
        cellStyle: {
            'height': '23px',
            'padding': '3px'
        }
    }
};

const chipFn1 = function (value: any, row: any, key: string) {
    let b = "#bdbdbd";
    let c = "#304156";
    if (key == 'var_real' || key == 'cie_n') {
        b = "#a0d2fa";
    } else if (key == 'mon') {
        b = "#125386";
        c = "white";
    } else if (key == 'met' && row.avan_fix < 1) {
        b = "#e4858d";
    } else if (key == 'met' && row.avan_fix >= 1) {
        b = "#64ef5f";
    }
    return "text-align:right;background:" + b + ";color:" + c + ";border: 1px solid #125386;padding: 0px 3px;border-radius: 4px;";
}

const chipFn2 = function (value: any, row: any, key: string) {
    let b = "#a0d2fa";
    let c = "#304156";
    if (key == 'ini') {
        b = "#bdbdbd";
    } else if (key == 'mon') {
        b = "#125386";
        c = "white";
    } else if (key == 'met' && row.avan_fix < 1) {
        b = "#e4858d";
    } else if (key == 'met' && row.avan_fix >= 1) {
        b = "#64ef5f";
    }
    return "text-align:right;background:" + b + ";color:" + c + ";border: 1px solid #125386;padding: 0px 3px;border-radius: 4px;";
}

const textFn1 = function (value: any, row: any, key: string) {
    return "";
}

const iconFn = function (value: any, row: any) {
    if (value <= 6) {
        const k = Object.keys(incentivos3IconSet)[value-1];
        return incentivos3IconSet[k];
    } else {
        return value;
    }
}

const head1 = [
    {
        label: 'Variable',
        key: 'cod_var',
        format: {
            type: 'icon',
            params: {
                convertFn: iconFn
            }
        },
        style: {
            'min-width': '60px',
            'width': '60px'
        }
    },
    /*{
        key: 'des_var',
        label: 'Variable',
        style: {
            'min-width': '82px',
            'width': '82px'
        },
        format:{
            type:'link'
        }
    },*/
    {
        label: 'Cierre',
        subs: [
            {
                key: 'ini_n',
                label: 'Anterior',
                format: {
                    type: 'chip',
                    params: {
                        contStyleFn: chipFn1,
                        textStyleFn: textFn1
                    }
                }
            },
            {
                key: 'cie_n',
                label: 'Actual',
                format: {
                    type: 'chip',
                    params: {
                        contStyleFn: chipFn1,
                        textStyleFn: textFn1
                    }
                }
            }
        ]
    },
    {
        label: 'Traslado',
        subs: [
            {
                key: 'cie_n_o',
                label: 'Origen',
                format: {
                    type: 'chip',
                    params: {
                        contStyleFn: chipFn1,
                        textStyleFn: textFn1
                    }
                }
            },
            {
                key: 'cie_n_d',
                label: 'Destino',
                format: {
                    type: 'chip',
                    params: {
                        contStyleFn: chipFn1,
                        textStyleFn: textFn1
                    }
                }
            }
        ]
    },
    {
        label:'Variación',
        subs:[
            {
                key: 'var_real',
                label: 'Real',
                format: {
                    type: 'chip',
                    params: {
                        contStyleFn: chipFn1,
                        textStyleFn: textFn1
                    }
                }
            },
            {
                key: 'met',
                label: 'Meta',
                format: {
                    type: 'chip',
                    params: {
                        contStyleFn: chipFn1,
                        textStyleFn: textFn1
                    }
                }
            },
        ]
    },
    {
        key: 'mon',
        label: 'Monetización',
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        format: {
            type: 'chip',
            params: {
                format:'pen',
                contStyleFn: chipFn1,
                textStyleFn: textFn1
            }
        }
    }
];

const head2 = [
    {
        label: 'Efectividad',
        key: 'cod_var',
        format: {
            type: 'icon',
            params: {
                convertFn: iconFn
            }
        },
        style: {
            'min-width': '60px',
            'width': '60px'
        }
    },
    /*{
        key: 'des_var',
        label: 'Efectividad',
        style: {
            'min-width': '50px',
            'width': '95px'
        },
        format:{
            type:'link'
        }
    },*/
    {
        key: 'ini',
        label: 'Base Inicial',
        format: {
            type: 'chip',
            params: {
                contStyleFn: chipFn2,
                textStyleFn: textFn1
            }
        }
    },
    {
        key: 'man_efe',
        label: 'Mantiene',
        format: {
            type: 'chip',
            params: {
                contStyleFn: chipFn2,
                textStyleFn: textFn1
            }
        }
    },
    {
        key: 'rec',
        label: 'Recuperado',
        format: {
            type: 'chip',
            params: {
                contStyleFn: chipFn2,
                textStyleFn: textFn1
            }
        }
    },
    {
        key: 'efec',
        label: 'Efectividad',
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'chip',
            params: {
                format: 'percent',
                contStyleFn: chipFn2,
                textStyleFn: textFn1
            }
        }
    },
    {
        key: 'met',
        label: 'Meta',
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'chip',
            params: {
                format: 'percent',
                contStyleFn: chipFn2,
                textStyleFn: textFn1
            }
        }
    },
    {
        key: 'mon',
        label: 'Monetizacion',
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        format: {
            type: 'chip',
            params: {
                format:'pen',
                contStyleFn: chipFn2,
                textStyleFn: textFn1
            }
        }
    }
];

export const tablaConfig = {
    loading:true,
    ds1: [],
    ds2: [],
    hd1: head1,
    hd2: head2,
    opt1: tableOpts1
};
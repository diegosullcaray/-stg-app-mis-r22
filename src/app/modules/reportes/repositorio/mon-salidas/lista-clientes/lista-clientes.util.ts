export const tblOpts = {
    style: {
        'font-size': '12px',
        'color': 'rgba(82, 82, 91)',
    },
    header: {
        style: {
            background: '#7a9bd3',
            //'background': 'rgba(161, 161, 170)',
            'color': 'white',
            'font-size': '12px'
        }
    }
    //grid: {
    //enabled: true
    //mode: 'bottom'
    //}
}

const styleFn = function (params: any) {
    if(params.value == 'ALTO'){
        return {
            'color': '#FF4500',
            'font-weight': 'bold'
        }
    }
    return {};
};

export const headers1 = [
    {
        label: "Nro. Documento",
        key: "ndoc",
        style: {
            'min-width': '80px',
            'width': '80px'
        }
    },
    {
        label: "Nombre",
        key: "nom",
        style: {
            'min-width': '300px',
            'width': '300px'
        }
        /*format: {
            type: 'link',
            params:{
                underline: true
            }
        }*/
    },
    {
        label: "Prioridad",
        key: "pri",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        }
    },
    {
        label: "Monto Desembolsado",
        key: "mon_desem",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        },
        format:{
            type:'integer'
        }
    },
    {
        label: "Nivel de Riesgo",
        key: "nrie",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        },
        cellStyleFn:styleFn
    },
    {
        label: "Fecha de Salida",
        key: "fec_eval",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        }
    },
    {
        label: "Unidad",
        key: "uni",
        style: {
            'min-width': '300px',
            'width': '300px'
        }
    },
    {
        label: "Asesor",
        key: "ase",
        style: {
            'min-width': '300px',
            'width': '300px'
        }
    }
];

export const headers2 = [
    {
        label: "Nro. Documento",
        key: "ndoc",
        style: {
            'min-width': '80px',
            'width': '80px'
        }
    },
    {
        label: "Nombre",
        key: "nom",
        style: {
            'min-width': '240px',
            'width': '240px'
        }
        /*format:{
            type:'link',
            params:{
                underline: true
            }
        }*/
    },
    {
        label: "Prioridad",
        key: "pri",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        }
    },
    {
        label: "Monto Desembolsado",
        key: "mon_desem",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        },
        format:{
            type:'integer'
        }
    },
    {
        label: "Nivel de Riesgo",
        key: "nrie",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        },
        cellStyleFn:styleFn
    },
    {
        label: "Fecha de Vencimiento",
        key: "fec_eval",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        cellStyle: {
            'text-align': 'right'
        }
    },
    {
        label: "Unidad",
        key: "uni",
        style: {
            'min-width': '300px',
            'width': '300px'
        }
    },
    {
        label: "Asesor",
        key: "ase",
        style: {
            'min-width': '300px',
            'width': '300px'
        }
    }
];
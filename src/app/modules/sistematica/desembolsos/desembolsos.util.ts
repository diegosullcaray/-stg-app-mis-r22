export const tableOpts1 = {
    style: {
        'font-size': '12px'
    },
    header: {
        cellStyle: {
            'height': '32px',
            'min-width': '85px'
        }
    }
};

export const headDesem1 = [
    {
        key: 'dia_habil',
        label: 'Día'
    },
    {
        label: 'Fecha',
        subs: [
            {
                key: 'Fecha',
                label: ''
            },
            {
                key: 'fecha_nombre',
                label: ''
            }
        ]
    },
    {
        label: 'Diario',
        subs: [
            {
                key: 'ope_diario',
                label: 'Ejecutado'
            },
            {
                key: 'TMDIARIO1',
                label: 'Meta'
            },
            {
                key: 'cumpl_ope_diario',
                label: '%Cumplimiento'
            }
        ]
    },
    {
        label: 'Acumulado',
        subs: [
            {
                key: 'ope_acum',
                label: 'Ejecutado'
            },
            {
                key: 'meta_ope_acum',
                label: 'Meta'
            },
            {
                key: 'cumpl_ope_acum',
                label: '%Cumplimiento'
            }
        ]
    },
    {
        key: 'porc_dias',
        label: '% Días Transcurridos'
    }
];

export const headDesem2 = [
    {
        key: 'dia_habil',
        label: 'Día'
    },
    {
        label: 'Fecha',
        subs: [
            {
                key: 'Fecha',
                label: ''
            },
            {
                key: 'fecha_nombre',
                label: ''
            }
        ]
    },
    {
        label: 'Diario',
        subs: [
            {
                key: 'des_diario',
                label: 'Ejecutado'
            },
            {
                key: 'TMDIARIO',
                label: 'Meta'
            },
            {
                key: 'cumpl_des_diario',
                label: '%Cumplimiento'
            }
        ]
    },
    {
        label: 'Acumulado',
        subs: [
            {
                key: 'des_acum',
                label: 'Ejecutado'
            },
            {
                key: 'meta_des_acum_can',
                label: 'Meta'
            },
            {
                key: 'cumpl_des_acum',
                label: '%Cumplimiento'
            }
        ]
    },
    {
        key: 'porc_dias',
        label: '% Días Transcurridos'
    }
];

export const headDesem3 = [
    {
        key: 'RNOMSUB',
        label: 'Descripción'
    },
    {
        key: 'cumpl_des_acum',
        label: 'Cump. Monto'
    },
    {
        key: 'cumpl_ope_acum',
        label: 'Cump. Operaciones'
    }
];

export const headDesem4 = [
    {
        key: 'variable',
        label: 'Descripción'
    },
    {
        label: 'Monto',
        subs: [
            {
                key: 'des_diario',
                label: 'Diario'
            },
            {
                key:'des_mensual',
                label: 'Mensual'
            }
        ]
    },
    {
        label: 'Operaciones',
        subs: [
            {
                key: 'ope_diario',
                label: 'Diario'
            },
            {
                key:'ope_mensual',
                label: 'Mensual'
            }
        ]
    }
];
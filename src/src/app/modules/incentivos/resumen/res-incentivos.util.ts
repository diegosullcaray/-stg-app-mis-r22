export const tableHeaders = [
    {
        label: 'Monetizador',
        key: 'monetizador',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Resultados',
        key: 'resultados',
        subs: [
            {
                label: 'Actual',
                key: 'res_actual',
                type: 'custom_r'//numbersq
            },
            {
                label: 'Real',
                key: 'res_real',
                type: 'custom_r',
                actions: [
                    {
                        key: 'res_real_det',
                        style: {
                            icon: 'search',
                            width: '20px'
                        }
                    }
                ]
            }
        ]
    },
    {
        label: "",
        key: "blanco",
        //blank: true,
        style: {
            background: 'white'
        },
        subs: [
            {
                label: 'Meta',
                key: 'meta',
                type: 'custom_r'
            }
        ]
    },
    {
        label: 'Llave',
        key: 'llave',
        subs: [
            {
                label: 'Distancia Meta',
                key: 'dist_meta',
                type: 'custom_r'
            },
            {
                label: 'Estado',
                key: 'est_llave',
                iconizer: 'llave'
            }
        ]
    },
    {
        label: 'Candado',
        key: 'candado',
        subs: [
            {
                label: 'Cumplimiento Minimo',
                key: 'cump_min',
                type: 'custom_r',
                style: {
                    background: 'rgb(68,114,196)',
                    color: 'black',
                }
            },
            {
                label: 'Estado',
                key: 'est_candado',
                iconizer:'candado',
                style: {
                    background: 'rgb(189,215,238)',
                    color: 'black',
                }
            }
        ]
    },
    {
        label: 'Monetización',
        key: 'monetizacion',
        type: 'number',
        style: {
            background: 'rgb(189,215,238)',
            color: 'black'
        }
    }
]
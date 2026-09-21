
export const tableHeaders = [
    {
        label: 'Fecha 22',
        key: 'fec_pro',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Ahorros',
        key: 'red_ah_sec',
        subs: [
            {
                label: "Saldo Inicial",
                key: 'a1',//'red_ah_sal_ini',
                type: 'number'
            },
            {
                label: "Variación",
                key: 'a2',//'red_ah_sal_var',
                type: 'comp_f'
            },
            {
                label: "Saldo Final",
                key: 'a3',//'red_ah_sal_fin',
                type: 'number'
            }
        ]
    },
    {
        label: 'CTS',
        key: 'red_cts_sec',
        subs: [
            {
                label: "Saldo Inicial",
                key: 'b1',//'red_cts_sal_ini',
                type: 'number'
            },
            {
                label: "Variación",
                key: 'b2',//'red_cts_sal_var',
                type: 'comp_f'
            },
            {
                label: "Saldo Final",
                key: 'b3',//'red_cts_sal_fin',
                type: 'number'
            }
        ]
    },
    {
        label: 'Plazo Fijo',
        key: 'red_dpf_sec',
        subs: [
            {
                label: "Saldo Inicial",
                key: 'c1',//'red_dpf_sal_ini',
                type: 'number'
            },
            {
                label: "Variación",
                key: 'c2',//'red_dpf_sal_var',
                type: 'comp_f'
            },
            {
                label: "Saldo Final",
                key: 'c3',//'red_dpf_sal_fin',
                type: 'number'
            }
        ]
    }
]
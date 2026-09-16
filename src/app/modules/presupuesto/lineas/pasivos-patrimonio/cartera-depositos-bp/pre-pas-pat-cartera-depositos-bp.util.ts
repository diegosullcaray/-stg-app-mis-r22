export const tableHeaders = [
    {
        label: 'Fecha',
        key: 'fec_pro',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label:'Ahorros',
        key:'bp_ah_sec',
        subs:[
            {
                label:"Saldo Inicial",
                key:'a1',
                //key:'bp_ah_sal_ini',
                type:'number'
            },
            {
                label:"Variación",
                key:'a2',
                //key:'bp_ah_sal_var',
                type:'comp_f'
            },
            {
                label:"Saldo Final",
                key:'a3',
                //key:'bp_ah_sal_fin',
                type:'number'
            }
        ]
    },
    {
        label:'CTS',
        key:'bp_cts_sec',
        subs:[
            {
                label:"Saldo Inicial",
                key:'b1',
                //key:'bp_cts_sal_ini',
                type:'number'
            },
            {
                label:"Variación",
                key:'b2',
                //key:'bp_cts_sal_var',
                type:'comp_f'
            },
            {
                label:"Saldo Final",
                key:'b3',
                //key:'bp_cts_sal_fin',
                type:'number'
            }
        ]
    },
    {
        label:'Plazo Fijo',
        key:'bp_dpf_sec',
        subs:[
            {
                label:"Saldo Inicial",
                key:'c1',
                //key:'bp_dpf_sal_ini',
                type:'number'
            },
            {
                label:"Variación",
                key:'c2',
                //key:'bp_dpf_sal_var',
                type:'comp_f'
            },
            {
                label:"Saldo Final",
                key:'c3',
                //key:'bp_dpf_sal_fin',
                type:'number'
            }
        ]
    }
]
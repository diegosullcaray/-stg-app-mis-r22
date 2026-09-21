import { STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";

export const loadingConf = {
    height: '307px'
};

export const tableConf = {
    table: {
        height: '400px',
        //grid: '1px solid rgb(31, 73, 125)'
        //grid: '1px solid rgb(216, 216, 216)'
        grid: STG_GRID_STYLE
    },
    header: {
        'min-width': '100px',
        'background-color':'rgb(79,129,189)'
    }
};

/*export const tableHeaders = [
    {
        label: 'Descripción',
        key: 'descripcion',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true 
    },
    {
        label: 'Saldo Puntual',
        key: 'monto_cartera_caract_1',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
         
        type:'number'
    },
    {
        label: 'Variación Saldo Puntual',
        key: 'dif_total',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
         
        type:'number'
    },
    {
        label: 'Clientes',
        key: 'total_cli',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        
        type:'number'
    },
    {
        label: 'Variación Clientes',
        key: 'dif_cli_total',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
         
        type:'number'
    },
    {
        label: 'Saldo Medio',
        key: 'hsalmedmn',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
         
        type:'number'
    },
    {
        label:'Ahorro',
        key:'cs1',
        subs:[
            {
                label:'Monto',
                key:'monto_cartera_caract_AHORROS_2',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Variación Monto',
                key:'dif_ahorro',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Clientes',
                key:'numcli_cartera_caract_AHORROS_2',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Variación Clientes',
                key:'dif_cli_ahorro',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Saldo Medio',
                key:'hsalmedAhorro_act',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Variación Saldo Medio',
                key:'dif_salmedAh',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            }
        ]
    },
    {
        label:'CTS',
        key:'cs2',
        subs:[
            {
                label:'Monto',
                key:'monto_cartera_caract_CTS_2',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Variación Monto',
                key:'dif_cts',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Clientes',
                key:'numcli_cartera_caract_CTS_2',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Variación Clientes',
                key:'dif_cli_cts',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            },
            {
                label:'Saldo Medio',
                key:'hsalmedcts_act',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            },
            {
                label:'Variación Saldo Medio',
                key:'dif_salmedcts',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            }
        ]
    },
    {
        label:'DPF',
        key:'cs3',
        subs:[
            {
                label:'Monto',
                key:'monto_cartera_caract_PLAZO FIJO_2',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Variación Monto',
                key:'dif_DPF',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Clientes',
                key:'numcli_cartera_caract_PLAZO FIJO_2',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Variación Clientes',
                key:'dif_cli_DPF',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            },
            {
                label:'Saldo Medio',
                key:'hsalmeddpf_act',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            },
            {
                label:'Variación Saldo Medio',
                key:'dif_salmeddpf',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            }
        ]
    }
]
*/
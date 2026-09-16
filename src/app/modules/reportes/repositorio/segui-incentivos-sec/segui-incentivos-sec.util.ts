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

export const tableHeaders = [
    {
        label: 'Colaborador',
        key: 'des_sec',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label:'Variables para la activación de monetización',
        key:'cs1',
        subs:[
            {
                label:'Saldo de Cartera',
                key:'cob_sal',
                type:'percent',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Stock de Clientes',
                key:'cob_cli',
                type:'percent',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Efectividad -30 a 0 días',
                key:'cob_efec1',
                type:'percent',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            },
            {
                label:'Efectividad 1 a 30 días',
                key:'cob_efec2',
                type:'percent',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                }
            }
        ]
    },
    {
        label:'Monetización',
        key:'cs2',
        subs:[
            {
                label:'Bono Base',
                key:'bob',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number2d'
            },
            {
                label:'Bono Plus',
                key:'bop',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number2d'
            },
            {
                label:'Bono Super Plus',
                key:'bos',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number2d'
            },
            {
                label:'Total Monetizado',
                key:'bot',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number2d'
            }
        ]
    }
]
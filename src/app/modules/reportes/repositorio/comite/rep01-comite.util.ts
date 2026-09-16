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

/*
export const tableConf2 = {
    table: {
        height: '200px',
        //grid: '1px solid rgb(31, 73, 125)'
        //grid: '1px solid rgb(216, 216, 216)'
        grid: STG_GRID_STYLE
    },
    header: {
        'min-width': '100px',
        'background-color':'rgb(79,129,189)'
    }
};*/

export const tableHeaders = [
    {
        label: 'Comite de Créditos',
        key: 'RDESVAR',
        style: {
            'min-width': '250px',
            'max-width': '250px'
        },
        sticky:true
    },/*
    {
        label: 'Dic 22',
        key: 'col_2',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },*/
    {
        label: 'Feb 23',
        key: 'col_3',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label: 'Mar 23',
        key: 'col_4',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label: 'Abr 23',
        key: 'col_5',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label: 'May 23',
        key: 'col_6',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label: 'Jun 23',
        key: 'col_7',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label: 'Jun 22',
        key: 'col_1',
        type:'string',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    },
    {
        label: 'Var (22-23)',
        key: 'VARI',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true
    }
]
    

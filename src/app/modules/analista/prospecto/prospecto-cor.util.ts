
const rsFn1=function(row:any){
    if(row.is_nod){
        return {
            'color':'#008080',
            'background':'#f2f2f2'
        };
    }
    return {};
}

export const tblOpts1 = {
    style:{
        'font-size':'12px'
    },
    header: {
        style: {
            'background': '#4472c4',
            'color': 'white'
        }
    },
    body:{
        hover: {
            enabled: true
        },
        selection: {
            enabled: true
        },
        rowStyleFn:rsFn1
    }
};

const iconFn=function(value:any){
    if(value==1){
        return 'edit';
    }
    return "";
}
export const headOpt1 = [ 
    {
        label:'Clientes',
        key:'cs1',
        subs:[
            { 
                    label: 'Fecha',
                    key: 'HFECPRO',
                    //sticky: true,
                    style: {
                        'min-width': '150px'
                    }
                },
                {
                    label: 'Nombre Prospecto',
                    key: 'HAPENOMB',
                    type: 'string'
                },
                {
                    label: 'DNI',
                    key: 'HNUMDOC',
                    type: 'string'
                 },
                {
                    label: 'Nombre Comercial',
                    key: 'HNOMCOM',
                    type: 'string'
                } 
        ] 
    },
    {
        label:'Corresponsales',
        key:'cs2',
        subs:[
            {
                label: 'Estado',
                key: 'HESTDCORE',
                type: 'string'
            },  
            {
                label: 'Fecha Estado',
                key: 'HFECESTA',
                type: 'string'
            },
             
            {
                label: 'Canal Captación',
                key: 'HCANACAP',
                type: 'string'
            },
            {
                label: 'Territorio',
                key: 'HDESTER',
                type: 'string'
            },
            {
                label: 'Corredor',
                key: 'HDESCOR',
                type: 'string'
            },
            {
                label: 'Agencia',
                key: 'HDESAGE',
                type: 'string'
            }

        ]
    }
     
];
 

export const tblOpts2 = {
    style:{
        'font-size':'12px'
    },
    header: {
        style: {
            'background': '#4472c4',
            'color': 'white'
        }
    },
    body:{
        hover: {
            enabled: true
        },
        selection: {
            enabled: true
        },
        rowStyleFn:rsFn1
    }
};
 

export const headOpt2=[
    {
        key:'is_edit',
        label:'<span class="material-icons-outlined" style="font-size:18px !important;vertical-align:middle;">edit</span>',
        style:{
            'max-width':'50px',
            'min-width':'50px',
            'width':'50px',
            'background': '#008080'
        },
        format:{
            type:'icon',
            params:{
                size:'14px',
                convertFn:iconFn
            }
        }
    },
    {
        key: 'des_met',
        label: 'Metrica',
        style:{
            'background': '#008080'
        }
    },
    {
        key:'des_med',
        label:'Medida',
        style:{
            'background': '#008080'
        }
    },
    {
        key:'des_dis',
        label:'Esta disponible?',
        style:{
            'background':'#4472c4'
        }
    }
];


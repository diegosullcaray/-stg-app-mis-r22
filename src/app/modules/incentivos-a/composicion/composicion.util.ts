export const tableOptions={
    style:{
        'font-size':'12px'
    },
    grid:{
        mode:'only_headers'
    },
    header:{
        style:{
            'background':'white',
            'color':'rgb(79, 129, 189)'
        },
        cellStyle:{
            'height':'32px',
            'width':'85px',
            'min-width':'85px',
            'max-width':'85px'
        }
    }
};

const csFn=function(params:any){
    let r ={};
    if(params.value && params.value>=0){
        r['color']='#3bd136';
    }else{
        r['color']='#e91e2f';
    }
    return r;
};

export const tableHeaders=[
    {
        key:'des_rel',
        label:'Descripción',
        style:{
            'max-width':'null',
            'width':'null'
        }
    },
    {
        label:'Cartera',
        subs:[
            {
                key:'var_sal',
                label:'Var. Mes',
                format:{
                    type:'decimal'
                }
            },
            {
                key:'desf_sal',
                label:'Desfase Meta',
                format:{
                    type:'decimal'
                },
                cellStyleFn:csFn
            }
        ]
    },
    {
        label:'Clientes',
        subs:[
            {
                key:'var_cli',
                label:'Var. Mes',
                format:{
                    type:'decimal'
                }
            },
            {
                key:'desf_cli',
                label:'Desfase Meta',
                format:{
                    type:'decimal'
                },
                cellStyleFn:csFn
            }
        ]
    },
    {
        label:'Meta:',
        subs:[
            {
                key:'efec1_cie',
                label:'Efectividad -30 a 0',
                format:{
                    type:'percent'
                }
            }
        ]
    },
    {
        label:'Meta:',
        subs:[
            {
                key:'efec2_cie',
                label:'Efectividad 1 a 30',
                format:{
                    type:'percent'
                }
            }
        ]
    },
    {
        label:'',
        style:{
            'max-width':'20px',
            'min-width':'20px',
            'width':'20px'
        }
    },
    {
        label:'Gestión Tasas',
        subs:[
            {
                key:'tasa_dif',
                label:'Diferencial',
                format:{
                    type:'pbs'
                },
                cellStyleFn:csFn
            }
        ]
    }
];
export const tableOptions={
    style:{
        'font-size':'12px'
    },
    header:{
        style:{
            'background':'rgb(79, 129, 189)'
        },
        cellStyle:{
            'height':'40px',
            'width':'85px',
            'min-width':'85px',
            'max-width':'85px'
        }
    }
};

const csFn=function(params:any){
    let r ={};
    if(params.value && params.value>=1){
        r['color']='#3bd136';
    }else{
        r['color']='#e91e2f';
    }
    return r;
};

const csFn2 =function(params:any){
    let r ={};
    if(params.rowData.dis && params.rowData.dis==1){
        r['color']='#3bd136';
    }else{
        r['color']='#e91e2f';
    }
    return r;
};

export const tableHeaders=[
    {
        key:'des_sec',
        label:'Asesor',
        style:{
            'max-width':'null',
            'width':'null'
        }
    },
    {
        label:'Variables para la activación de monetización',
        subs:[
            {
                key:'cob_sal',
                label:'Saldo de Cartera',
                format:{
                    type:'percent'
                },
                cellStyleFn:csFn
            },
            {
                key:'cob_cli',
                label:'Stock de Clientes',
                format:{
                    type:'percent'
                },
                cellStyleFn:csFn
            },
            {
                key:'cob_efec1',
                label:'Efectividad -30 a 0 días',
                format:{
                    type:'percent'
                },
                cellStyleFn:csFn
            },
            {
                key:'cob_efec2',
                label:'Efectividad 1 a 30 días',
                format:{
                    type:'percent'
                },
                cellStyleFn:csFn
            }
        ]
    },
    {
        label:'Monetizacion',
        subs:[
            {
                key:'bob',
                label:'Bono Base',
                format:{
                    type:'decimal'
                }
            },
            {
                key:'bop',
                label:'	Bono Plus',
                format:{
                    type:'decimal'
                }
            },
            {
                key:'bos',
                label:'Bono Super Plus',
                format:{
                    type:'decimal'
                }
            },
            {
                key:'bot',
                label:'Total Monetizado',
                cellStyleFn:csFn2,
                format:{
                    type:'decimal'
                }
            },
            {
                key:'smf',
                label:'Semaforo',
                cellStyleFn:csFn2,
                format:{
                    type:'icon',
                    params:{
                        size:'18px'
                    }
                }
            }
        ]
    }
];
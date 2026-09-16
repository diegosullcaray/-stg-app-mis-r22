import { isNullOrUndefined } from "app/core/shared/functions.util";


export const perfilConfig = {
    loading: true,
    usu: {
      nom: '--',
      niv: '--',
      des_niv: '--',
      img_url: '--',
      tip_cod: 0,
      cod_rel: '--',
      cla_usu: 0,
      carg: '--',
      num_doc: 0
    } 
  };
  const tableStyleFn = function (row: any) {
    if (row.style == 1) {
        return {
            "background": "#E9E8E8",
            "font-weight": "bold",
            "font-color": "#164d90"
        };
    }
    return { "font-color": "#164d90" };
}
  export const tableConfOPTS = {
    style:{
        'font-size':'11px'
    },
    header:{
        cellStyle:{
            'min-width': '60px'    
        }
    },
    body: {
        rowStyleFn: tableStyleFn,
    }
};

export const tblHeadersCategorizacion = [
    {
        label:'Descripción',
        key:'c1',
        cellStyle:{
           'min-width':'50px',
           'text-align': 'center',
        },
        sticky:true,
        style:{"min-width":"50px","width":"50px"} 
     },
     {
        label:'Descripción',
        key:'c2',
        cellStyle:{
           'min-width':'50px', 'text-align': 'center'
        },
        sticky:true,
        style:{"min-width":"50px","width":"50px"} 
     },
     {
        label:'Descripción',
        key:'c3',
        cellStyle:{
           'min-width':'50px', 'text-align': 'center'
        },
        sticky:true,
        style:{"min-width":"50px","width":"50px"} 
     },
     {
        label:'Descripción',
        key:'c4',
        cellStyle:{
           'min-width':'50px', 'text-align': 'center'
        },
        sticky:true,
        style:{"min-width":"50px","width":"50px"} 
     },
     {
        label:'Descripción',
        key:'c5',
        cellStyle:{
           'min-width':'50px', 'text-align': 'center'
        },
        sticky:true,
        style:{"min-width":"50px","width":"50px"} 
     },
     {
        label:'Descripción',
        key:'c6',
        cellStyle:{
           'min-width':'50px', 'text-align': 'center'
        },
        sticky:true,
        style:{"min-width":"50px","width":"50px"} 
     },
]
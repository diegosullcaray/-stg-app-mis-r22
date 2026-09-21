import { isNullOrUndefined } from "app/core/shared/functions.util";

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
const cellStyleFn = function (row: any, key: string) {
  console.log('Evaluando fila:', row.tip_cod, 'key:', key);
  if (key === 'descripcion' && row.tip_cod === 17) {
    console.log('✓ Estilo aplicado');
    return {
      'cursor': 'pointer',
      'text-decoration': 'underline',
      'color': '#007bff'
    };
  }
  return {};
};
const rowClassFn = function (row: any) {
   console.log(row)
   return row.tip_cod === 17 ? 'resaltado-hover' : '';
};
export const tableConfOPTS = { 
   body: {
      rowStyleFn: tableStyleFn,
      cellStyleFn: cellStyleFn,
      rowClassFn: rowClassFn
    }
};
const tlFn = function (value: number) {
    if (isNullOrUndefined(value)) {
        return 'red';
      } else if (value >= 1.0) { // 100%
        return 'green';
      } else if (value >= 0.8) { // 80%
        return 'orange';
      } else {
        return 'red';
      }
}; 
const colorFn = function (value: number): string {
    console.log(value)
    if (isNullOrUndefined(value)) {
      return 'red';
    } else if (value >= 0) {
      return 'green';
    } else {
      return 'red';
    }
  };


  const ctFn=function(value:string,row:any){ 
   console.log(row)
   if(row.htipcod==17){
      console.log(row.htipcod)
      console.log("excepto 17")
      if(row.fila!=1){
      return {type: 'link',params: { underline: true }};
   }
   }  
   if(row.htipcod===17){
      console.log("ES 17")
      return {type: 'none'};

   }
   return {type: 'none'};
   
   // if(row.htipcod=='17'){ 
   //   return {type: 'none'};
   // } 
   // console.log("Holaaa")
   // return {type: 'link',params: { underline: true }};
 };
 
export const tblHeaders = [
    {
       label:'Descripción',
       key:'descripcion',
       cellStyle:{
          'min-width':'250px'
       },
       sticky:true,
       style:{"min-width":"150px","width":"150px"},
       format: {
         type: 'custom',
         params: {
             typeFn: ctFn
         }
     }
    },
    {
       label:'Avance Mes',
       subs:[
          {
             label:'Cartera',
             key:'num_cli_stock_2',
             format:{
                type:'integer'
             },
             cellStyle:{
                'text-align':'right'
             },
             style:{"min-width":"80px","width":"80px"}
          },
          {
             label:'N° Enrolado',
             subs:[
                {
                   label:'Mes',
                   key:'num_enro_2',
                   format:{
                      type:'integer'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                },
                {
                   label:'Var. TMF-1',
                   key:'var_enro',
                   format:{
                      type:'integer' ,
                      params: {
                        trafficFn: colorFn
                    }   
                   },
                   cellStyle:{
                      'text-align':'right' 
                   },
                   
                   style:{"min-width":"80px","width":"80px"}
                }
             ]
          },
          {
             label:'% Enrolado',
             subs:[
                {
                   label:'Mes',
                   key:"percent_enro",
                   format:{
                      type:'percent'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                },
                {
                   label:'Var.TMF-1',
                   key:'var_percent_enro',
                   format:{
                      type:'percent'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                }
             ]
          },
          {
             label:'N° Usabilidad',
             subs:[
                {
                   label:'Mes',
                   key:"num_usab_2",
                   format:{
                      type:"integer"
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                },
                {
                   label:'Var.TMF-1',
                   key:'var_usabili',
                   format:{
                      type:'integer'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                }
             ]
          },
          {
             label:'% Usabilidad',
             subs:[
                {
                   label:'Mes',
                   key:"percent_usa",
                   format:{
                      type:'percent'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                },
                {
                   label:"Var.TMF-1",
                   key:"var_percent_usa",
                   format:{
                      type:'percent'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                }
             ]
          },
          {
            label:"% Usabilidad Meta",
            subs:[
               {
                  label:"Mes",
                  key:"met_usa",
                  format:{
                     type:"percent"
                  },
                  cellStyle:{
                     "text-align":"right"
                  },
                  style:{"min-width":"80px","width":"80px"}
               },
               {
                  label:"Cumplimiento",
                  key:"cumplUsa",
                  format:{
                    type:'percent',
                    params: {
                      trafficFn: tlFn
                  }   
                 },
                  cellStyle:{
                     "text-align":"right"
                  },
                  style:{"min-width":"110px","width":"110px"}
               }
            ]
         },
          {
             label:'% Usabilidad Cartera',
             subs:[
                {
                   label:'Mes',
                   key:'percen_usa_cart',
                   format:{
                      type:'percent'
                   },
                   cellStyle:{
                      'text-align':'right'
                   },
                   style:{"min-width":"80px","width":"80px"}
                },
                {
                   label:'Var.TMF-1',
                   key:'var_perce_usa_carte',
                   format:{
                      type:'percent',
                      
                   },
                   cellStyle:{
                     'text-align':'right'
                  },
                   style:{"min-width":"80px","width":"80px"}
                }
             ]
          },
          {
            label:"% Usabilidad Cartera Meta",
            subs:[
               {
                  label:"Mes",
                  key:"met_usa_cartera",
                  format:{
                     type:"percent"
                  },
                  cellStyle:{
                     "text-align":"right"
                  },
                  style:{
                     "min-width":"80px",
                     "width":"80px"
                  }
               },
               {
                  label:"Cumplimiento",
                  key:"cumplUsaCar",
                  format:{
                     type:"percent",
                     params: {
                        trafficFn: tlFn
                    }   
                  },
                  cellStyle:{
                     "text-align":"right"
                  },
                  style:{
                     "min-width":"110px",
                     "width":"110px"
                  }
               }
            ]
         }
       ]
    }
 ]
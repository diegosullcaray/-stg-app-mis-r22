import { isNullOrUndefined } from "app/core/shared/functions.util";

const tableStyleFn = function (row: any) {
    if (row.style == 1) {
        return {
            "background": "#E9E8E8", 
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
   //  {
   //     label:'Cartera Crédito',
   //     subs:[
   //        {
   //           label:'Saldo Cartera',
   //           key:'CAP_4',
   //           format:{
   //              type:'integer'
   //           },
   //           cellStyle:{
   //              'text-align':'right'
   //           },
   //           style:{"min-width":"80px","width":"80px"}
   //        }, 
   //        {
   //          label:'Variación Anual',
   //          key:'var_cap_anual',
   //          format:{
   //             type:'integer'
   //          },
   //          cellStyle:{
   //             'text-align':'right'
   //          },
   //          style:{"min-width":"80px","width":"80px"}
   //       }, 
   //       {
   //          label:'Variación Mes',
   //          key:'var_cap_mes',
   //          format:{
   //             type:'integer'
   //          },
   //          cellStyle:{
   //             'text-align':'right'
   //          },
   //          style:{"min-width":"80px","width":"80px"}
   //       }, 
   //       {
   //          label:'Variación Día',
   //          key:'var_cap_dia',
   //          format:{
   //             type:'integer'
   //          },
   //          cellStyle:{
   //             'text-align':'right'
   //          },
   //          style:{"min-width":"80px","width":"80px"}
   //       } 
   //     ]
   //  },
    {
      label:'Cartera Crédito',
      subs:[
         {
            label:'Saldo Cartera',
            key:'CAP_4',
            format:{
               type:'integer'
            },
            cellStyle:{
               'text-align':'right'
            },
            style:{"min-width":"80px","width":"80px"}
         }, 
         {
           label:'Variación Anual',
           key:'var_cap_anual',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px"}
        }, 
        {
           label:'Variación Mes',
           key:'var_cap_mes',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px"}
        }, 
        {
           label:'Variación Día',
           key:'var_cap_dia',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px"}
        } ,
        {
         label:'Desebolsos Mes',
         key:'des_mes',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px"}
      } ,
      {
         label:'Desebolsos Día',
         key:'des_dia',
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
      label:'Pasivos - Ahorros',
      style: {'background':'#79098F'},
      subs:[
         {
            label:'Saldo',
            key:'saldo_ahorro_hoy',
            format:{
               type:'integer'
            },
            cellStyle:{
               'text-align':'right' 
            },
            style:{"min-width":"80px","width":"80px",'background':'#79098F'}
         }, 
         {
           label:'Variación Anual',
           key:'Var_Ahorro_Anual',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px",'background':'#79098F'}
        }, 
        {
           label:'Variación Mes',
           key:'Var_Ahorro_Mes',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px",'background':'#79098F'}
        }, 
        {
           label:'Variación Día',
           key:'Var_Ahorro_Dia',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px",'background':'#79098F'}
        } ,
        {
         label:'Saldo Medio',
         key:'hsaldmedio',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#79098F'}
      } ,
      {
         label:'Var. Saldo Medio',
         key:'Var_Saldo_Medio_Mes',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#79098F'}
      } ,
      {
         label:'Saldo Ahorro Cuentas Desembolsadas',
         key:'sahorrodesemb',
         //key:'fondeoestable',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#79098F'}
      } 
      // ,{
      //    label:'Var. Fondeo Estable',
      //    key:'var_fondeoestable',
      //    format:{
      //       type:'integer'
      //    },
      //    cellStyle:{
      //       'text-align':'right'
      //    },
      //    style:{"min-width":"80px","width":"80px",'background':'#79098F'}
      // } 
      ]
   },
   {
      label:'Ecosistem Digital',
      style:{'background':'#CCC918'},
      subs:[
         {
            label:'N° Clientes Creditos',
            key:'num_cli',
            format:{
               type:'integer'
            },
            cellStyle:{
               'text-align':'right'
            },
            style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
         }, 
         {
           label:'N° Enrolados',
           key:'HTIPNUMDOC',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
        }, 
        {
           label:'N° Enrolados Activos',
           key:'N_Enrolados_Activos',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
        }, 
        {
           label:'N°_Pago Creditos App',
           key:'N_Pago_Creditos_App',
           format:{
              type:'integer'
           },
           cellStyle:{
              'text-align':'right'
           },
           style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
        } ,
        {
         label:'N° Operciones QR',
         key:'N_Operaciones_QR',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
      } ,
      {
         label:'N° Operaciones (Plin + Envio a Contactos)',
         key:'N_Operaciones_Plin_Contacto',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
      } 
      /*,
      {
         label:'Saldo ',
         key:'saldodigital',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
      } ,
      {
         label:'Var. Saldo',
         key:'var_saldodigital',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
      } ,
      {
         label:'Var. Clientes Tx Activas',
         key:'var_clitrxactivas',
         format:{
            type:'integer'
         },
         cellStyle:{
            'text-align':'right'
         },
         style:{"min-width":"80px","width":"80px",'background':'#CCC918'}
      } 
      */
      ]
   }
 ]
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { incentivos3IconSet } from "../incentivos3.util";

const ctFn=function(value:string,row:any){
  if(isNullOrUndefined(row.cod_bdd)){
    return {type:'none'};
  }
  return {type:'link'};
};

const ctFn2=function(value:string,row:any){
  if(isNullOrUndefined(row.fmt)){
    return {type:'integer'};
  }
  return {type:row.fmt};
};

const csFn=function(params:any){
  let r ={};
  if(params.value && params.value<0){
      r['color']='#E3005B';
  }
  return r;
};

const csFn2=function(params:any){
  let r ={};
  if(params.value && params.value<0 && params.rowData.cod_var=='tas_diff'){
      r['color']='#E3005B';
  }
  return r;
};

export const detalleConfig = {
  loading: true,
  items: [
    {
      title: 'Detalle Cartera',
      title2: 'Detalle Cartera Vigente',
      icon: incentivos3IconSet.car,
      cards: ['Saldo', 'Var. Mensual', 'Meta'],
      disc: '*Valores netos no incluyen desembolsos fuera de la zonificación y créditos a trabajadores FC',
      head: 1
    },
    {
      title: 'Detalle Clientes',
      icon: incentivos3IconSet.cli,
      cards: ['Clientes', 'Var. Mensual', 'Meta'],
      disc: '*Valores netos no incluyen desembolsos fuera de la zonificación y créditos a trabajadores FC',
      head: 1
    },
    {
      title: 'Detalle Supervision C1',
      icon: incentivos3IconSet.sc1
    },
    {
      title: 'Detalle Efect. -30 a 0 días',
      icon: incentivos3IconSet.efec1,
      cards: ['Efectividad', 'Dist. Meta', 'Meta'],
      disc: '* Valores netos no incluyen producto Impulsa Mi Perú',
      head: 2
    },
    {
      title: 'Detalle Efect. 1 a 30 días',
      icon: incentivos3IconSet.efec2,
      cards: ['Efectividad', 'Dist. Meta', 'Meta'],
      disc: '* Valores netos no incluyen producto Impulsa Mi Perú',
      head: 2
    },
    {
      title: 'Detalle Efect. 31 a 60 días',
      icon: incentivos3IconSet.efec3,
      cards: ['Efectividad', 'Dist. Meta', 'Meta'],
      disc: '* Valores netos no incluyen producto Impulsa Mi Perú',
      head: 2
    }
  ],
  items2: [
    {
      title: 'Productividad',
      icon: incentivos3IconSet.prod,
      cards: ['Productividad', 'Var. Mensual', 'Meta'],
      disc: '*Valores netos no incluyen desembolsos fuera de la zonificación y créditos a trabajadores FC',
      head: 1
    },
    {
      title: '--',
    },
    {
      title: '--',
    },
    {
      title: '--',
    },
    {
      title: '--',
    },
    {
      title: 'Gestión de Precios',
      icon: incentivos3IconSet.tas,
      disc: '*Valores netos no incluyen desembolsos fuera de la zonificación y créditos a trabajadores FC',
      head: 1
    }
  ],
  opts: {
    style: {
      'font-size': '12px'
    },
    header: {
      style: {
        background: '#0098E0',
        color: 'white'
      },
      cellStyle: {
        //'height': '32px',
        'min-width': '85px',
        //'font-size': '10px'
      }
    },
    body: {
      cellStyle: {
        'height': '20px',
        'padding': '3px'
      }
    }
  },
  header1: [
    {
      key: 'des_var',
      label: 'Variable',
      format: {
        type: 'custom',
        params:{
          typeFn:ctFn,
          typeParams:{
            link:{
              underline:true
            }
          }
        }
      }
    },
    {
      label: 'Avance',
      subs: [
        {
          key: 'f1',
          label: 'Anterior',
          style: {
            'min-width': '80px',
            'width': '80px'
          },
          cellStyle: {
            'text-align': 'right'
          },
          cellStyleFn : csFn2,
          format: {
            type: 'custom',
            params:{
              typeFn:ctFn2,
              typeParams:{}
            }
          }
        },
        {
          key: 'f2',
          label: 'Actual',
          style: {
            'min-width': '80px',
            'width': '80px'
          },
          cellStyle: {
            'text-align': 'right'
          },
          cellStyleFn : csFn2,
          format: {
            type: 'custom',
            params:{
              typeFn:ctFn2,
              typeParams:{}
            }
          }
        },
        {
          key: 'diff',
          label: 'Variación',
          style: {
            'min-width': '80px',
            'width': '80px'
          },
          cellStyle: {
            'text-align': 'right'
          },
          cellStyleFn : csFn2,
          format: {
            type: 'custom',
            params:{
              typeFn:ctFn2,
              typeParams:{}
            }
          }
        }
      ]
    }
  ],
  header2: [
    {
      key: 'des_rel',
      label: 'Des Rel',
      format: {
        type: 'link'
      }
    },
    {
      key: 'var_real',
      label: 'Var Real',
      style: {
        'min-width': '80px',
        'width': '80px'
      },
      cellStyle: {
        'text-align': 'right'
      },
      format: {
        type: 'integer'
      }
    },
    {
      key: 'met',
      label: 'Meta',
      style: {
        'min-width': '80px',
        'width': '80px'
      },
      cellStyle: {
        'text-align': 'right'
      },
      format: {
        type: 'integer'
      }
    },
    {
      key: 'diff',
      label: 'Distancia',
      style: {
        'min-width': '80px',
        'width': '80px'
      },
      cellStyle: {
        'text-align': 'right'
      },
      cellStyleFn:csFn,
      format: {
        type: 'integer'
      }
    }
  ]
}
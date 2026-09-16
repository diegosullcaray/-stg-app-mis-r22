import { isNullOrUndefined } from "app/core/shared/functions.util";

export const principalConfig = {
    loading: true,
    dataCards: [],
    dataTable: [],
    hierBuffer: [],
    des_lab: "",
    des_rel: "",
    tip_cod:0
};

const tlFn = function (value: number) {
    if (isNullOrUndefined(value) || value < 0.9025) {
        return 'red';
    } else if (value < 0.95) {
        return 'orange'
    }
    return 'green';
};

const ctFn=function(value:string,row:any){
    if(row.tip_cod==1){
      return {type: 'none'};
    }
    return {type: 'link',params: { underline: true }};
  };

export const tblOpts = {
    style: {
        'font-size': '12px'
    },
    grid: {
        //enabled: false
        mode: 'bottom'
    },
    header: {
        style: {
            //background: '#5964E5'
            'color': 'black',
            'background': 'white',
            'font-size': '14px',
            'opacity': '0.6'
        }
    },
    body:{
        style: {
            'color': '#004481'
        }
    }
}

export const tblHeaders = [
    {
        label: "Descripción",
        key: "desc",
        format: {
            type: 'custom',
            params: {
                typeFn: ctFn
            }
        }
    },
    {
        label: "Salida en el mes",
        key: "sali1",
        cellStyle: {
            'text-align': 'center'
        },
        format: {
            type: 'integer',
            params: {
                link2: true
            }
        }
    },
    {
        label: "Salidas en los últimos 3M",
        key: "sali3",
        cellStyle: {
            'text-align': 'center'
        },
        format: {
            type: 'integer',
            params: {
                link2: true
            }
        }
    },
    {
        label: "Churn rate",
        key: "ret",
        cellStyle: {
            'display': 'flex',
            'justify-content': 'center'
        },
        format: {
            type: 'percent',
            params: {
                trafficFn: tlFn
            }
        }
    },
    {
        label: "Clientes por Vencer",
        key: "clive",
        cellStyle: {
            'text-align': 'center'
        },
        format: {
            type: 'integer',
            params: {
                link2: true
            }
        }
    }
]
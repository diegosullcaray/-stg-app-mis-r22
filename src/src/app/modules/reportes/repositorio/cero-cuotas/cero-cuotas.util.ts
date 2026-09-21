import { isNullOrUndefined } from "app/core/shared/functions.util";

export const colorPosNegStyleFn = function (params: any) {
    let val = Number(params.value);
    if (isNaN(val)) return {};

    if (val < 0) {
        return { 'color': '#ef4444', 'font-weight': 'bold' }; // Rojo
    } else if (val > 0) {
        return { 'color': '#22c55e', 'font-weight': 'bold' }; // Verde
    }
    return {};
};

export const colorThresholdStyleFn = function (params: any) {
    let val = Number(params.value);
    
    // Si no es un número válido, no aplicamos ningún estilo
    if (isNaN(val)) return {};

    // Definimos el límite de -1.5M (1,500,000)
    const limiteAmbarRojo = -1500000; 

    if (val > 0) {
        // Verde: mayor a 0
        return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold'  }; 
    } else if (val <= 0 && val > limiteAmbarRojo) {
        // Ámbar: menor o igual a 0, pero mayor a -1.5M
        return { 'background-color': '#fef08a', 'color': '#854d0e', 'font-weight': 'bold' }; 
    } else if (val <= limiteAmbarRojo) {
        // Rojo: menor o igual a -1.5M
        return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' }; 
    }

    return {};
}; 

export const colorThresholdStyleFnCliente = function (params: any) {
    let val = Number(params.value);
    
    // Si no es un número válido, no aplicamos ningún estilo
    if (isNaN(val)) return {};

    // Definimos el límite de -1.5M (1,500,000)
    const limiteAmbarRojo =  -200;//-1500000; 

    if (val > 0) {
        // Verde: mayor a 0
        return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold'  }; 
    } else if (val <= 0 && val > limiteAmbarRojo) {
        // Ámbar: menor o igual a 0, pero mayor a -1.5M
        return { 'background-color': '#fef08a', 'color': '#854d0e', 'font-weight': 'bold' }; 
    } else if (val <= limiteAmbarRojo) {
        // Rojo: menor o igual a -1.5M
        return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' }; 
    }

    return {};
}; 

// 2. Función para pintar el fondo de la celda según el porcentaje
// NOTA: Asumo que los valores vienen en decimal (ej: 1 = 100%, 0.8 = 80%).
// Si vienen como entero (ej: 100, 80), cambia el 1 por 100 y el 0.8 por 80.
export const bgTrafficLightStyleFn = function (params: any) {
    let val = Number(params.value);
    if (isNaN(val)) return {};

    if (val >= 1) { // >= 100%
        return { 'background-color': '#dcfce7', 'color': '#166534', 'font-weight': 'bold' }; // Fondo Verde
    } else if (val >= 0.8) { // 80% - 99.9%
        return { 'background-color': '#fef08a', 'color': '#854d0e', 'font-weight': 'bold' }; // Fondo Amarillo
    } else { // < 80%
        return { 'background-color': '#fee2e2', 'color': '#991b1b', 'font-weight': 'bold' }; // Fondo Rojo
    }
};

const tableStyleFn = function (row: any) {
    //console.log(row)
    if (row.style == 1) {
        return {
            // "cursor" : "pointer",
            // "text-decoration": "underline",
            "background": "#f1f7ea",
            "font-weight": "bold",
            "font-color": "#164d90",
            "color": "#475569",
            "letter-spacing":"0.05em",
            "border-bottom": "background-color 0.15s ease"
             
        };
    }
    //   if(row.STYLE==0 && row.htipcod==2){
    //       return { "transition": "color 0.2s ease",
    //      "color": "#4CAC54",
    //      "letter-spacing":"0.05em",
    //     "border-bottom": "background-color 0.15s ease"};
    //  }
    if(row.style==0){
        return {
        // "cursor" : "pointer",
        // "text-decoration": "underline",
        "transition": "color 0.2s ease",
        "color": "#004B8D",
        "letter-spacing":"0.05em",
        "border-bottom": "background-color 0.15s ease"
        }
    }
    
    return { "font-color": "#164d90" };
}
export const linkStyleFn = function (params: any) {
    // Extraemos directamente la propiedad 'style' desde rowData
    let styleValue = params?.rowData?.style;

    if (styleValue == 1) {
        return {
            "cursor": "pointer",
            "text-decoration": "underline",
            "color": "#164d90",
            "transition": "color 0.2s ease"
        };
    } else if (styleValue == 0) {
        return {
            "cursor": "pointer",
            "text-decoration": "underline",
            "color": "#004B8D",
            "transition": "color 0.2s ease"
        };
    }
    
    return {};
};

const tableStyleFnModal = function (row: any) {
    
        return {
        "cursor" : "pointer",
         "text-decoration": "underline",
        "transition": "color 0.2s ease",
        "color": "#4CAC54",
        "letter-spacing":"0.05em",
        "border-bottom": "background-color 0.15s ease"
        }
    
}
 
 
  export const tblOpts = {
     
    style: {
        'font-size':'10px'
    },
    header: {
        style: {  
            "border-right":"0px",
            'color': '#475569',
            'background': '#f8fafc',
            'font-size': '10px',
            "text-transform": "uppercase",
            "letter-spacing":"0.05em",
            "border-bottom": "2px solid #e2e8f0",
            "white-space": "nowrap",
            "font-weight": "600"
             
        } ,
        cellStyle:{
            'min-width': '50px'    
        }
    },
    body:{   
        rowStyleFn: tableStyleFn ,
        stickyCols: [100]
    }
    
}

export const tblOptsModal = {
     
    style: {
        'font-size':'10px'
    },
    header: {
        style: {  
            "border-right":"0px",
            'color': '#475569',
            'background': '#f8fafc',
            'font-size': '10px',
            "text-transform": "uppercase",
            "letter-spacing":"0.05em",
            "border-bottom": "2px solid #e2e8f0",
            "white-space": "nowrap",
            "font-weight": "600"
             
        } ,
        cellStyle:{
            'min-width': '50px'    
        }
    },
    body:{   
        rowStyleFn: tableStyleFnModal 
    }
    
}
 
  export const principalConfig = {
    loading: true,
    dataCards: [],
    dataTable: [],
    hierBuffer: [],
    des_lab: "",
    des_rel: "",
    tip_cod:0
};

export const tablaTab1 = [
    {
        label: 'Descripcion',
        key: 'descripcion',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        cellStyleFn: linkStyleFn
    },
    {
        label: 'Product.',
        key: 'prod_ind',
        format:{
            type:'decimal'
         }
    },
    {
        label: '% Cump. Prod',
        key: 'Percent_Cumpl',
        format:{
            type:'percent'
        },
        cellStyleFn: bgTrafficLightStyleFn
         
    },
    {
        label: 'TMM Prod.',
        key: 'TMMPROD',
        format:{
            type:'decimal'
         },
         cellStyleFn: colorPosNegStyleFn
        
    },
    {
        label: 'Desemb.',
        key: 'mont_dese_2',
        format:{
            type:'integer'
         }
    },
    // {
    //     label: '% Desemb.',
    //     key: 'percent_avance_montode',
    //     format:{
    //         type:'percent'
    //     }
    // },
    {
        label: '% Cump. Desemb.',
        key: 'percentcumpldesembolsometadi',
        format:{
            type:'percent'
        },
        cellStyleFn: bgTrafficLightStyleFn
    },
    {
        label: 'TMM Desemb.',
        key: 'TMMDESEMB',
        format:{
            type:'integer'
         },
         cellStyleFn: colorPosNegStyleFn
    },
    {
        label: 'Ticket',
        key: 'tick_prom_2',
        format:{
            type:'integer'
        }
    },
    {
        label: 'TMM Ticket',
        key: 'TMM_TICK',
        format:{
            type:'decimal'
        },
        cellStyleFn: colorPosNegStyleFn
    },
    {
        label: 'TAPP',
        key: 'tapp_mes_2',
        format:{
            type:'percent'
        }
    },
    {
        label: 'TMM TAPP',
        key: 'TMMTAPP',
        format:{
            type:'decimal'
        },
        cellStyleFn: colorPosNegStyleFn
    },
    {
        label: 'Canc.Vig.',
        key: 'Canc_vigente',
        format:{
            type:'integer'
        }
    },
    {
        label: 'Rodamiento',
        key: 'HRODAM',
        format:{
            type:'integer'
        }
    },
    {
        label: 'Saldo Vig.',
        key: 'sal_vig_2',
        format:{
            type:'integer'   

        }
    },
    {
        label: 'Var.Saldo Vig.',
        key: 'HVSALVIGMN',
        format:{
            type:'integer'   

        },
        cellStyleFn: colorPosNegStyleFn
    },
    {
        label: 'Meta Fecha VarSal',
        key: 'hvalvar_10256',
        format:{
            type:'integer'   

        }
    },
    {
        label: 'Dist Meta Fecha',
        key: 'distdiariacartvig',
        format:{
            type:'integer'   

        },
        cellStyleFn: colorThresholdStyleFn
    },
    {
        label: 'Meta Var.Saldo Vig.',
        key: 'hvalvar_9000',
        format:{
            type:'integer'   

        }
    }
]

export const tablaTab2 = [
    {
        label: 'Descripcion',
        key: 'descripcion',
        style: {
            'min-width': '100px',
            'max-width': '100px'
        },
        cellStyleFn: linkStyleFn
    },
    {
        label: 'Cliente Stock',
        key: 'cli_stock_2',
        format:{
            type:'decimal'
        }
    },
    {
        label: 'var clientes stock',
        key: 'TMMCLISTOCK',
        format:{
            type:'decimal'
        },
        cellStyleFn: colorPosNegStyleFn
    },
    // {
    //     label: '%Avance Stock Clientes',
    //     key: 'percent_avance_cli_stock',
    //     format:{
    //         type:'percent'
    //     } 
    // },
    {
        label: 'Meta Fecha Var Clientes',
        key: 'hvalvar_10257',
        format:{
            type:'decimal'
        } 
    },
    {
        label: 'Dist Meta Fecha',
        key: 'var_distancia_metadi',
        format:{
            type:'decimal'
        } ,
        cellStyleFn: colorThresholdStyleFnCliente
    },
    {
        label: 'Meta Var.Stock Cliente',
        key: 'hvalvar_10062',
        format:{
            type:'integer'
        } 
    } 
    ,
    {
        label: 'Cliente Nuevos',
        key: 'HNUMCLIN',
        format:{
            type:'integer'
        }
    },
    {
        label: '%Cump Nuevos',
        key: 'Percent_Cumpl_clinuevo',
        format:{
            type:'percent'
        },
        cellStyleFn: bgTrafficLightStyleFn
    },
    {
        label: 'TMM Cliente Nuevos',
        key: 'TMMCLINUEV',
        format:{
            type:'integer'
        },
        cellStyleFn: colorPosNegStyleFn
    }  
   
    
]

export const tablaTab3 = [

]

    

export const tableHeadersModal = [
    {
        label: 'Producto',
        key: 'HDESCUL',
        style: {
            'min-width': '100px',
            'max-width': '100px'
        }
        
    },{
        label: 'Cliente',
        key: 'HDESCLI', 
        cellStyle:{
            'text-align':'left'
         },
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'Estado Producto',
        key: 'HETPROD', 
        cellStyle:{
            'text-align':'left'
         },
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'Cuenta Cliente',
        key: 'HCTACLI', 
        cellStyle:{
            'text-align':'right'
         },
        style: {
            'min-width': '120px',
            'max-width': '120px'
        }
    },
    {
        label: 'Saldo Capital',
        key: 'HCAPMON',
        cellStyle:{
            'text-align':'right'
         },
        format:{
            type:'integer'
         },
        style: {
            'min-width': '100px',
            'max-width': '100px'
        }
    },
    
    {
        label: 'Saldo Vencido',
        key: 'HVENMON',
        cellStyle:{
            'text-align':'right'
         },
        format:{
            type:'integer'
         },
        style: {
            'min-width': '100px',
            'max-width': '100px'
        }
    } ,
     
    {
        label: 'Extensión',
        key: 'HEXTENS',
        cellStyle:{
            'text-align':'right'
         },
        format:{
            type:'integer'
         },
        style: {
            'min-width': '100px',
            'max-width': '100px'
        }
    } 


]
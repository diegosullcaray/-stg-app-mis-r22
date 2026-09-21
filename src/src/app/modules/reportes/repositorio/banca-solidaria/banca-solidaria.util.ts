import { isNullOrUndefined } from "app/core/shared/functions.util";

const tableStyleFn = function (row: any) {
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
export const linkStyleFn = function (params: any) {
    // Extraemos directamente la propiedad 'style' desde rowData
    console.log(params)
    let styleValue = params?.rowData?.style;
    console.log(styleValue)
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
        rowStyleFn: tableStyleFn 
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
            'min-width': '100px',
            'max-width': '100px'
        },
        cellStyleFn: linkStyleFn
    },
    {
        label: 'Productividad',
        key: 'prod_ind',
        format:{
            type:'decimal'
         }
    },
    {
        label: '% Cumplimiento',
        key: 'Percent_Cumpl',
        format:{
            type:'percent'
        }
         
    },
    {
        label: 'TMM Productividad',
        key: 'TMMPROD',
        format:{
            type:'decimal'
         }
        
    },
    {
        label: 'Desembolsos',
        key: 'mont_dese_2',
        format:{
            type:'integer'
         }
    },
    {
        label: '% Desembolsos',
        key: 'percent_avance_montode',
        format:{
            type:'percent'
        }
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
        }
    },
    {
        label: 'Saldo Vigente',
        key: 'sal_vig_2',
        format:{
            type:'integer'   

        }
    },{
        label: 'Var.Saldo Vigente',
        key: 'HVSALVIGMN',
        format:{
            type:'integer'   

        }
    },
    {
        label: 'Meta Var.Saldo Vigente',
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
        }
    },
    {
        label: 'Cliente Stock',
        key: 'cli_stock_2',
        format:{
            type:'decimal'
        }
    },
    {
        label: 'TMM Cliente Stock',
        key: 'TMMCLISTOCK',
        format:{
            type:'decimal'
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
        label: 'TMM Cliente Nuevos',
        key: 'TMMCLINUEV',
        format:{
            type:'integer'
        }
    }
    ,
    {
        label: 'TAPP',
        key: 'tapp_mes_2',
        format:{
            type:'decimal'
        }
    },
    {
        label: 'TMM TAPP',
        key: 'TMMTAPP',
        format:{
            type:'decimal'
        }
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
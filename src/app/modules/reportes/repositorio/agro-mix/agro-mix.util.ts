import { isNullOrUndefined } from "app/core/shared/functions.util";

const tableStyleFn = function (row: any) {
    if (row.STYLE == 1) {
        return {
            "cursor" : "pointer",
            "text-decoration": "underline",
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
    if(row.STYLE==0){
        return {
        "cursor" : "pointer",
        "text-decoration": "underline",
        "transition": "color 0.2s ease",
        "color": "#4CAC54",
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
 
 
  export const tblOpts = {
     
    style: {
        'font-size':'11px'
    },
    header: {
        style: {  
            "border-right":"0px",
            'color': '#475569',
            'background': '#f8fafc',
            'font-size': '12px',
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
        'font-size':'12px'
    },
    header: {
        style: {  
            "border-right":"0px",
            'color': '#475569',
            'background': '#f8fafc',
            'font-size': '12px',
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
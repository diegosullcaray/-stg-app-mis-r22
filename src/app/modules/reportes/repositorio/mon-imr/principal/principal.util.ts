export const principalConfig = {
    loading: true,
    dataCards: [],
    dataTable: [],
    hierBuffer: [],
    des_lab: "",
    des_rel: "",
    tip_cod:0
};

 
const tableStyleFn = function (row: any) {
    if (row.style == 1) {
        return {
            "background": "#E9E8E8",
            "font-weight": "bold",
            "font-color": "#164d90",
            'font-size': '15px'
        };
    }
    return { "font-color": "#164d90",'type': 'integer'};
    
} 

export const tblOpts = {
     
    style: {
        'font-size':'13px'
    },
    header: {
        style: { 
            'color': '#fff',
            'background': '#164d90',
            'font-size': '15px', 
        } 
    },
    body:{   
        rowStyleFn: tableStyleFn 
    }
    
}

export const filter1 = [
    { val: 1, label: 'Total' },
    { val: 2, label: 'Sin Impulsa' } 
]; 
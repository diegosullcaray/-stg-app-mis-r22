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
            'min-width': '100px'    
        }
    },
    body: {
        rowStyleFn: tableStyleFn,
    }
};

export const tableConfOPTS2 = {
    style:{
        'font-size':'11px'
    },
    header:{
        cellStyle:{
            'min-width': '50px'    
        }
    }
};

export const filter1 = [
    { val: 'ClientesNuevos', label: 'Clientes Nuevos' },
    { val: 'Mujer', label: 'Mujer' },
    { val: 'Rural', label: 'Rural' },  
    { val: 'Bancarizado', label: 'Bancarizado' },
    { val: 'Vulnerable', label: 'Vulnerable' }
];
 
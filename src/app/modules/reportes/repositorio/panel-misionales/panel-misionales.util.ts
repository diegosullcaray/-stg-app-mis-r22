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
    { val: 'Todos', label: 'Todos' },
    { val: 'Agua y Saneamiento', label: 'Agua y Saneamiento' },
    { val: 'Crédito Educativo', label: 'Crédito Educativo' },
    { val: 'Emprendimiento Mujer', label: 'Emprendimiento Mujer' },
    { val: 'Producto Verde', label: 'Crédito Verde' }
];
   
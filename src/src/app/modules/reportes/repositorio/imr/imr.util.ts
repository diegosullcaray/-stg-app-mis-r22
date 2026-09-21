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
    { val: 0, label: 'Todos' },
    { val: 1, label: 'Cartera Heredada' },
    { val: 2, label: 'Cartera No Heredada' },
    { val: 3, label: 'Sin Asignar' },  
    { val: 4, label: 'Sin Asesor Origen' }
];
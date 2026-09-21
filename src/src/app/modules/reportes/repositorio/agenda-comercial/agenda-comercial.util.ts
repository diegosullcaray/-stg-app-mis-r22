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
        stickyCols: [0],
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
    { val: 1, label: 'Nivel de fuga Alto' },
    { val: 2, label: 'Nivel de fuga Medio' },
    { val: 3, label: 'Nivel de fuga Bajo' }
];

export const filter2 = [
    { valf2: 0, labelf2: 'Todos' }  ,
    { valf2: 1, labelf2: 'Nivel de Prop Alto' },
    { valf2: 2, labelf2: 'Nivel de Prop Medio' },
    { valf2: 3, labelf2: 'Nivel de Prop Bajo' } 
];

export const filter3 = [
    { valf3: 0, labelf3: 'Todos' }  ,
    { valf3: 1, labelf3: 'Esta Semana' },
    { valf3: 2, labelf3: 'Semana Anterior' },
    { valf3: 3, labelf3: 'Este Mes' } 
];
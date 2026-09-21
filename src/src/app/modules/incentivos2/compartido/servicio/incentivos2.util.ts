export const dataSource = {
    profile:{
        name:'--',
        position:'--',
        hier1:'--',
        hier2:'--',
        hier3:'--',
        state: 0,
        vars_s1:0,
        vars_f1:true,
        vars_s2:0,
        vars_f2:true,
        vars_s:[0,0,0,0],
        vars_n:['Saldo de Cartera (C)','Stock de Clientes (C)','Efectividad -30-0 días (M)','Efectividad 1-30 días (M)'],
        vars_nm:['','','Efect. -30-0 días (M)','Efect. 1-30 días (M)'],
        vars_i:['work','groups','battery_6_bar','battery_3_bar']
    },
    monetization:{
        base:0,
        plus:0,
        super_plus:0,
        total:0,
        state: 0,
        prof_typ: 1
    },
    cards: [
        {
            title: "Saldo de Cartera",
            state: 0,
            percent: 0,
            percentr: 0,
            monetization: 0,
            small_text: '*No incluye los créditos convenio',
            chips: [
                {
                    label: 'Var. Real',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Meta',
                    value: 0,
                    type: 'g',
                    format: 'number'
                },
                {
                    label: 'Inicio',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Cierre',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Trasladado',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Heredado',
                    value: 0,
                    type: 's',
                    format: 'number'
                }
            ]
        },
        {
            title: "Stock de Clientes",
            state: 0,
            percent: 0,
            percentr: 0,
            monetization: 0,
            small_text: '*No incluye clientes solo con créditos convenio',
            chips: [
                {
                    label: 'Var. Real',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Meta',
                    value: 0,
                    type: 'g',
                    format: 'number'
                },
                {
                    label: 'Inicio',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Cierre',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Trasladado',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Heredado',
                    value: 0,
                    type: 's',
                    format: 'number'
                }
            ]
        },
        {
            title: "Efectividad -30 a 0 días",
            state: 0,
            percent: 0,
            percentr: 0,
            monetization: 0,
            small_text: '',
            chips: [
                {
                    label: 'Cierre',
                    value: 0,
                    type: 'u',
                    format: 'percent'
                },
                {
                    label: 'Meta',
                    value: 0,
                    type: 'g',
                    format: 'percent'
                },
                {
                    label: 'Base Inicial',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Recuperado (M+ME)',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Relegado (D+MV)',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Castigos',
                    value: 0,
                    type: 's',
                    format: 'number'
                }
            ]
        },
        {
            title: "Efectividad 1 a 30 días",
            state: 0,
            percent: 0,
            percentr: 0,
            monetization: 0,
            small_text: '',
            chips: [
                {
                    label: 'Cierre',
                    value: 0,
                    type: 'u',
                    format: 'percent'
                },
                {
                    label: 'Meta',
                    value: 0,
                    type: 'g',
                    format: 'percent'
                },
                {
                    label: 'Base Inicial',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Recuperado (M+ME)',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Relegado (D+MV)',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Castigos',
                    value: 0,
                    type: 's',
                    format: 'number'
                }
            ]
        }
    ],
    cards2: [
        {
            title: "Grupos Stock",
            state: 0,
            percent: 0,
            percentr: 0,
            monetization: 0,
            small_text: '',
            chips: [
                {
                    label: 'Var. Real',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Meta',
                    value: 0,
                    type: 'g',
                    format: 'number'
                },
                {
                    label: 'Inicio',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Cierre',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: 'Trasladado',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Heredado',
                    value: 0,
                    type: 's',
                    format: 'number'
                }
            ]
        },
        {
            small_text: ''
        },
        {
            title: "Pagos Puntuales",
            state: 0,
            percent: 0,
            percentr: 0,
            monetization: 0,
            small_text: '',
            chips: [
                {
                    label: 'Avance Real',
                    value: 0,
                    type: 'u',
                    format: 'percent'
                },
                {
                    label: 'Meta',
                    value: 0,
                    type: 'g',
                    format: 'percent'
                },
                {
                    label: 'Inicio',
                    value: 0,
                    type: 's',
                    format: 'number'
                },
                {
                    label: 'Cierre',
                    value: 0,
                    type: 'u',
                    format: 'number'
                },
                {
                    label: '--',
                    value: '',
                    type: 's',
                    format: 'number'
                },
                {
                    label: '--',
                    value: '',
                    type: 's',
                    format: 'number'
                }
            ]
        }
    ]
};
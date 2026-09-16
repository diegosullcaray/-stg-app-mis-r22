export const loadingConf = {
    height: '550px'
};

export const tableConf = {
    table: {
        height: '550px',
        //grid: '1px solid red'
        grid: '1px solid rgb(216, 216, 216)'
    },
    header: {
        'text-align': 'center',
        'min-width': '100px',
        'color': 'white',
        //grid:'1px solid rgb(216, 216, 216)'
    }
};

export const tableHeaders = [
    {
        label: 'Fecha',
        key: 'fec_pro',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Saldo Inicial',
        key: 'a1',
        //key: 'sal_ini',
        type: 'number'
    },
    {
        label: 'Desembolso',
        key: 'mon_des_sec',
        subs: [
            {
                label: 'Asesores Nuevos',
                key: 'b1',
                //key: 'ase_nue',
                type: 'comp_f'
            },
            {
                label: 'Asesores en Produccion',
                key: 'b2',
                //key: 'ase_ope',
                //type: 'numbersq'
                type: 'comp_f'
            },
            {
                label: 'Productividad por Asesor',
                key: 'b3',
                //key: 'prod_ase',
                type: 'comp_f'
            },
            {
                label: 'Operaciones Desembolsadas',
                key: 'b4',
                //key: 'ope_des',
                type: 'numbersq'
            },
            {
                label: 'Ticket Promedio',
                key: 'b5',
                //key: 'tick_prom',
                type: 'comp_f'
            },
            {
                label: 'Monto Desembolsado',
                key: 'b6',
                //key: 'mon_des',
                type: 'number'
            }
        ]
    },
    {
        label: 'Cancelacion',
        key: 'cancelacion',
        subs: [
            {
                label: 'Ratio Cancelacion',
                key: 'c1',
                //key: 'rat_can',
                type: 'percent'
            },
            {
                label: 'Monto Cancelado',
                key: 'c2',
                //key: 'mon_can',
                type: 'number'
            }
        ]
    },
    {
        label: 'Saldo Castigado',
        key: 'a2',
        //key: 'sal_cas',
        type: 'number'
    },
    {
        label: 'Saldo Cierre',
        key: 'a3',
        //key: 'sal_fin',
        type: 'number'
    }
]

export const tableHeaders2 = [
    {
        label: 'Fecha',
        key: 'fec_pro',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Productos Core',
        key: 'prod_core',
        subs: [
            {
                label: 'Agropecuario',
                key: 'd_1',
                //key: 'mon_des_1',
                type: 'number'
            },
            {
                label: 'Construyendo Confianza',
                key: 'd_2',
                //key: 'mon_des_2',
                type: 'number'
            },
            {
                label: 'Crédito Educativo',
                key: 'd_3',
                //key: 'mon_des_3',
                type: 'number'
            },
            {
                label: 'Emprendiendo Confianza',
                key: 'd_4',
                //key: 'mon_des_4',
                type: 'number'
            },
            {
                label: 'Iniciando Confianza PYME',
                key: 'd_5',
                //key: 'mon_des_5',
                type: 'number'
            },
            {
                label: 'Palabra de Mujer',
                key: 'd_6',
                //key: 'mon_des_6',
                type: 'number'
            },
            {
                label: 'Iniciando Oficios',
                key: 'd_7',
                //key: 'mon_des_18',
                type: 'number'
            }
        ]
    },
    {
        label: 'Productos No Core',
        key: 'prod_no_core',
        subs: [
            {
                label: 'Consumo',
                key: 'd_8',
                //key: 'mon_des_7',
                type: 'number'
            },
            {
                label: 'Garantía Liquida',
                key: 'd_9',
                //key: 'mon_des_8',
                type: 'number'
            },
            {
                label: 'Trabajadores FC',
                key: 'd_10',
                //key: 'mon_des_9',
                type: 'number'
            }
        ]
    },
    {
        label: 'Otros',
        key: 'd_11',
        //key: 'mon_des_99',
        type: 'number'
    }
]

export const tableHeaders3 = [
    {
        label: 'Fecha',
        key: 'fec_pro',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Productos Core',
        key: 'prod_core',
        subs: [
            {
                label: 'Agropecuario',
                key: 'g_1',
                //key: 'rat_comp_1',
                type: 'percent'
            },
            {
                label: 'Construyendo Confianza',
                key: 'g_2',
                //key: 'rat_comp_2',
                type: 'percent'
            },
            {
                label: 'Crédito Educativo',
                key: 'g_3',
                //key: 'rat_comp_3',
                type: 'percent'
            },
            {
                label: 'Emprendiendo Confianza',
                key: 'g_4',
                //key: 'rat_comp_4',
                type: 'percent'
            },
            {
                label: 'Iniciando Confianza PYME',
                key: 'g_5',
                //key: 'rat_comp_5',
                type: 'percent'
            },
            {
                label: 'Palabra de Mujer',
                key: 'g_6',
                //key: 'rat_comp_6',
                type: 'percent'
            },
            {
                label: 'Iniciando Oficios',
                key: 'g_7',
                //key: 'rat_comp_18',
                type: 'percent'
            }
        ]
    },
    {
        label: 'Productos No Core',
        key: 'prod_no_core',
        subs: [
            {
                label: 'Consumo',
                key: 'g_8',
                //key: 'rat_comp_7',
                type: 'percent'
            },
            {
                label: 'Garantía Liquida',
                key: 'g_9',
                //key: 'rat_comp_8',
                type: 'percent'
            },
            {
                label: 'Trabajadores FC',
                key: 'g_10',
                //key: 'rat_comp_9',
                type: 'percent'
            }
        ]
    },
    {
        label: 'Otros',
        key: 'g_11',
        //key: 'rat_comp_99',
        type: 'percent'
    }
]
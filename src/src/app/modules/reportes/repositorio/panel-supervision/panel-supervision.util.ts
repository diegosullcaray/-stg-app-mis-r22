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
    { val: 1, label: 'PRE DESEMBOLSO' },
    { val: 2, label: 'POST DESEMBOLSO' } 
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
export const tableHeaders3 = [
    {
        label: 'TERRITORIO',
        key: 'TERRITORIO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'CORREDOR',
        key: 'CORREDOR',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'UNIDAD DE NEGOCIO',
        key: 'UNIDAD_NEGOCIO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'FECHA DE SUPERVISION',
        key: 'FECHA_SUPERVISION',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'NOMBRE DEL SUPERVISOR',
        key: 'NOMBRE_SUPERVISOR',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'NOMBRE DEL ASESOR',
        key: 'NOMBRE_ASESOR',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'NOMBRE DEL CLIENTE ',
        key: 'NOMBRE_CLIENTE',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'FECHA DE DESEMBOLSO',
        key: 'FECHA_DESEMBOLSO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'MONTO DESEMBOLSADO',
        key: 'MONTO_DESEMBOLSADO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'SALDO CAPITAL',
        key: 'SALDO_CAPITAL',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'DETALLE DE INCIDENCIA ',
        key: 'DETALLE_INCIDENCIA',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'TIPO DE MEDIDA',
        key: 'TIPO_MEDIDA',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'RESPONSABLE DE MEDIDA',
        key: 'RESPONSABLE_MEDIDA',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'FECHA DE EJECUCION DEL PLAN',
        key: 'FECHA_EJECUCION_PLAN',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'DETALLE DE MEDIDA',
        key: 'DETALLE_MEDIDA',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    }


]

export const tableHeaders2 = [
    {
        label: 'TERRITORIO',
        key: 'TERRITORIO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'CORREDOR',
        key: 'CORREDOR',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'UNIDAD DE NEGOCIO',
        key: 'UNIDAD_NEGOCIO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'NOMBRE DEL ASESOR',
        key: 'NOMBRE_ASESOR',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'NOMBRE DEL CLIENTE',
        key: 'NOMBRE_CLIENTE',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'FECHA DE DESEMBOLSO',
        key: 'FECHA_DESEMBOLSO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'MONTO DESEMBOLSADO ',
        key: 'MONTO_DESEMBOLSADO',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'SALDO CAPITAL',
        key: 'SALDO_CAPITAL',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'DIRECCION',
        key: 'DIRECCION',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'INCIDENCIA ENCONTRADA',
        key: 'INCIDENCIA_ENCONTRADA',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    },
    {
        label: 'COMENTARIOS',
        key: 'COMENTARIOS',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        }
    }


]
export const tableHeaders = [
    {
        label: 'Descripción',
        key: 'descripcion',
        style: {
            'min-width': '150px',
            'max-width': '150px'
        },
        sticky:true 
    },
    {
        label:'PRE DESEMBOLSO',
        key:'cs1',
        subs:[
            {
                label:'# Ope Desembolsadas',
                key:'ope_desembolsadas',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                } 
            },
            {
                label:'# Ope Supervisadas',
                key:'cs1_1',
                subs:[
                    {
                        label:'Desembolsado',
                        key:'desembolsado_pre',
                        type:'number',
                        style: {
                            'min-width': '85px',
                            'max-width': '85px'
                        }  
                    },
                    {
                        label:'No Desembolsado',
                        key:'Nrodesembolsado_pre',
                        type:'number',
                        style: {
                            'min-width': '85px',
                            'max-width': '85px'
                        }  
                    }

                ]
            },
            {
                label:'CONFORME',
                key:'conforme_pre',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px',
                    'background-color':'#00FF00'
                } 
            },
            {
                label:'SEÑALES ALERTA',
                key:'señales_alerta_pre',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px',
                    'background-color':'#E3DC0A'
                } 
            },
            {
                label:'REVISTE GRAVEDAD',
                key:'reviste_gravedad_pre',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px',
                    'background-color':'#E30A0A'
                    
                } 
            },
            {
                label:'REGISTRO DE PLANES DE ACCION',
                key:'registro_planes_accion_pre',
                type:'number',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                } 
            }
            
        ]
    },
    {
        label:'POST DESEMBOLSO',
        key:'cs2',
        subs:[
            {
                label:'Cuota de Supervision ',
                key:'cuota_super_post',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'# Ope Supervisadas',
                key:'ope_supervisadas_post',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'CONFORME ',
                key:'conforme_post',
                style: {
                    'min-width': '85px',
                    'max-width': '85px',
                    'background-color':'#00FF00'
                },
                type:'number'
            },
            {
                label:'SEÑALES DE ALERTA',
                key:'señales_alerta_post',
                style: {
                    'min-width': '90px',
                    'max-width': '90px',
                    'background-color':'#E3DC0A'
                },
                type:'number'
            },
            {
                label:'REVISTE GRAVEDAD',
                key:'reviste_gravedad_post',
                style: {
                    'min-width': '90px',
                    'max-width': '90px',
                    'background-color':'#E30A0A'
                },
                type:'number'
            },
            {
                label:'REGISTRO DE PLANES DE ACCION',
                key:'registro_planes_accion_post',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            }
        ]
    },
    {
        label:'CUMPLIMIENTO DE SUPERVISION',
        key:'cs3',
        subs:[
            {
                label:'Cumplimiento PRE',
                key:'cumplimiento_pre_cs',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Cumplimiento POST',
                key:'cumplimiento_post_cs',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'Cumplimiento PLANES DE ACCION',
                key:'cumplimiento_planes_cs',
                style: {
                    'min-width': '85px',
                    'max-width': '85px'
                },
                type:'number'
            },
            {
                label:'CUMPLIMIENTO TOTAL',
                key:'cumplimiento_total_cs',
                style: {
                    'min-width': '90px',
                    'max-width': '90px'
                },
                type:'number'
            } 
        ]
    }
]
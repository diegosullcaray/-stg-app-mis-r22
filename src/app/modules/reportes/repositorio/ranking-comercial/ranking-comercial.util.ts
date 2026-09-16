import { isNullOrUndefined } from "app/core/shared/functions.util";

const tableStyleFn = function (row: any) {
    if (row.style == 1) {
        return {
            "background": "#E9E8E8",
            
            "font-weight": "normal", 
            "font-color": "#164d90",
            "border-left":"none",
            "border-right":"none",
            "font-size": "12px"
        };
    }
    return { "font-color": "#164d90" };
}



export const tableConfOPTS = {
    style:{
        'font-size':'12px',
        'font-weight': 'none'  
    },
    header:{
        cellStyle:{
            'min-width': '60px'    
        }
    },
    body: {
        rowStyleFn: tableStyleFn,
        stickyCols: [100]
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
    { val: 1, label: 'Total' },
    { val: 2, label: 'Programas del Gobierno' },
    { val: 3, label: 'Sin Programas de Gobierno' } 
    
];
// Función para color semáforo por valor directo
export const tlFn = function (value: any): string {
    if (value == null) return '#dc3545'; // rojo si null
    const parsed = parseFloat(value.toString().replace(/[,%\s]/g, ''));
    if (parsed >= 1.0) return '#28a745';     // verde
    if (parsed >= 0.8) return '#ffc107';     // ambar
    return '#dc3545';                        // rojo
  };
  
  // Estilo dinámico basado en campo auxiliar "__styleColor_X"
  const stylePorLlave = function (row: any, col?: any): any {
    const key = col?.key;
    const color = row?.[`__styleColor_${key}`];
  
    return {
      color: color || 'inherit',
      'font-weight': 'bold'
    };
  };
  
  const renderConSemaforo = function (row: any, col?: any): string {
    const key = col?.key;
    const icon = row?.[`__traffic_icon_${key}`] || '';
    const value = row?.[key] ?? '';
    return `${icon} ${value}`;
  };
  
  export const trafficFnMap: any = {
    stylePorLlave,     // si ya lo usas para estilos de color (opcional)
    renderConSemaforo  // este se usa para mostrar ícono + valor
  };
  export const positiveNegativeStyleFn = function (params: any) {
    let val = Number(params.value);
    
    if (isNaN(val)) return {};

    if (val > 0) {
        // Positivo -> Verde oscuro corporativo y negrita
        return { 'color': '#28a745', 'font-weight': 'bold' }; 
    } else if (val < 0) {
        // Negativo -> Rojo y negrita
        return { 'color': '#dc3545', 'font-weight': 'bold' }; 
    }

    // Si es exactamente 0, no le ponemos color especial
    return { 'font-weight': 'bold' };
};
export const renderSemaforoAvance = function(row: any, col: any) {
    let val = Number(row[col.key]); // Obtenemos el porcentaje de la fila actual
    if (isNaN(val)) return '';

    // 1. Formateamos el número a porcentaje (ej. 0.1528 -> "15.28%")
    let formattedVal = (val * 100).toFixed(2) + '%';
    
    // Obtenemos el Timing de la fila
    let timing = Number(row.Timing);
    
    // Si no hay timing válido, solo devolvemos el porcentaje
    if (isNaN(timing) || timing === 0) return formattedVal;

    // Convertimos el Timing a decimal para poder compararlo (ej. 20.83 -> 0.2083)
    let timingDecimal = timing / 100;
    
    let icon = '🔴'; // Rojo por defecto

    // Lógica que solicitaste:
    if (val >= timingDecimal) {
        icon = '🟢'; // Verde si es mayor o igual
    } else if ((val / timingDecimal) >= 0.8) {
        icon = '🟡'; // Amarillo si el ratio es >= 0.8
    }

    // Devolvemos el ícono pegado al valor
    return `${icon} ${formattedVal}`;
};

  export const linkStyleFn = function (params: any) {
    // Extraemos directamente la propiedad 'style' desde rowData
    let styleValue = params?.rowData?.style;

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
export const tablaTab1 = [
    {
        label: 'Unidad',
        key: 'des_uuni' ,
        cellStyleFn: linkStyleFn
    },
    {
        label: 'Corredor',
        key: 'des_ucor' 
    },
    {
        label: 'Territorio',
        key: 'des_uter' 
    },
    {
        label: 'Productividad',
        style: {
            'background-color': '#2C3E50',
            'color': '#ffffff'
        },
        subs: [
            {
                key: 'prod_ind',
                label: 'Real',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'meta_produc',
                label: 'Meta Mes',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'TMMPROD',
                label: 'TMM',
                format: { type: 'decimal' },
                cellStyleFn: positiveNegativeStyleFn,
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'Percent_Cumpl_Semaforo', // <-- Nuevo campo procesado
                label: '% Avance',
                // ¡QUITAMOS EL FORMAT! Angular pintará el string "🟢 25.19%" tal cual.
            }
        ]
    },
    {
        label: 'Desembolsos',
        style: {
            'background-color': '#34495E', 
            'color': '#ffffff'
        },
        subs: [
            {
                key: 'mont_dese_2',
                label: 'Real',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'meta_desemb',
                label: 'Meta Mes',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'TMMDESEMB',
                label: 'TMM',
                format: { type: 'decimal' },
                cellStyleFn: positiveNegativeStyleFn,
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'percent_cumpl_desemb_Semaforo', // <-- Nuevo campo procesado
                label: '% Avance'
                // ¡QUITAMOS EL FORMAT!
            }
        ]
    },
    {
        label: 'Var. saldo vigente', 
        style: {
            'background-color': '#1A5276',
            'color': '#ffffff'
        },
        subs: [
            {
                key: 'HVSALVIGMN',
                label: 'Real',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'MetaVarSVDiaria',
                label: 'Meta Fecha',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'DistMetaFechaDi',
                label: 'Dist.Meta Fecha',
                format: { type: 'decimal' },
                cellStyleFn: positiveNegativeStyleFn,
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'metavarsvimensu',
                label: 'Meta Mensual',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'HVSALVIGMNTRI',
                label: 'Ult.3M',
                format: { type: 'decimal' },
                cellStyleFn: positiveNegativeStyleFn,
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'percent_cumpl_varsalv_Semaforo', // <-- Nuevo campo procesado
                label: '% Avance'
                // ¡QUITAMOS EL FORMAT!
            }
        ]
    },
    {
        label: 'Gestión Tasas',
        style: {
            'background-color': '#0E6655', 
            'color': '#ffffff'
        },
        subs: [
            {
                key: 'tapp_mes_2',
                label: 'Tapp Actual',
                format: { type: 'percent' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'TMMTAPP',
                label: 'TMM Tapp',
                format: { type: 'decimal' },
                cellStyleFn: positiveNegativeStyleFn,
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'tick_prom_2',
                label: 'Ticket Actual',
                format: { type: 'decimal' },
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'TappMin',
                label: 'Tapp Minima' ,
                cellStyle: {
                    'text-align': 'right'
                  }
            },
            {
                key: 'TAPPVSMIN',
                label: 'Tapp vs Tapp Minima',
                format: { type: 'decimal' },
                
            } 
        ]
    }
]
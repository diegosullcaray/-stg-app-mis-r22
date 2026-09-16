import { isNullOrUndefined } from "app/core/shared/functions.util";

const tableStyleFn = function (row: any) {
    if (row.style == 1) {
        return {
            "background": "#E9E8E8",
            
            "font-weight": "normal", 
            "font-color": "#164d90",
            "border-left":"none",
            "border-right":"none",
            "font-size": "14px"
        };
    }
    return { "font-color": "#164d90" };
}



export const tableConfOPTS = {
    style:{
        'font-size':'14px',
        'font-weight': 'none'  
    },
    header:{
        cellStyle:{
            'min-width': '60px'    
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
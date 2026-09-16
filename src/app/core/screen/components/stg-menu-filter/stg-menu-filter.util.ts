export interface StgMenuFilterItemData {
  label: string;
  value: any;
}

export interface StgMenuFilterItem {
  type: 'select';
  label?: string;
  data: StgMenuFilterItemData[];
  
  /**
   * Índice del array 'data' que estará seleccionado por defecto.
   * Si no se define o está fuera de rango, no se seleccionará nada.
   */
  selected?: number;
}

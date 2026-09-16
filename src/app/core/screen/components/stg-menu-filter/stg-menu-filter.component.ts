import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { StgMenuFilterItem } from './stg-menu-filter.util';

@Component({
  selector: 'stg-menu-filter',
  templateUrl: './stg-menu-filter.component.html',
  styleUrls: ['./stg-menu-filter.component.scss']
})
export class StgMenuFilterComponent implements OnInit {

  @Input() config: StgMenuFilterItem[] = [];
  @Output() onAccept = new EventEmitter<any>();

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  /**
   * Array que almacena la selección de cada ítem en config.
   * El índice coincide con la posición en config.
   */
  selectedValues: any[] = [];

  ngOnInit(): void {
    // Inicializa los valores seleccionados por defecto según 'selected'
    this.selectedValues = this.config.map(item => {
      if (item.type === 'select') {
        // Si 'selected' está definido y es un índice válido en 'data', usar ese value
        if (
          typeof item.selected === 'number' &&
          item.selected >= 0 &&
          item.selected < item.data.length
        ) {
          return item.data[item.selected].value;
        } else {
          return null; // No hay selección por defecto
        }
      }
      // Si hubiera otros tipos, manejarlos aquí
      return null;
    });
  }

  // Aceptar: emitir los valores y cerrar
  accept(): void {
    const output = this.config.map((item, i) => {
      if (item.type === 'select') {
        const val = this.selectedValues[i];
        // Si no hay valor o es null, index = -1
        let idx = -1;
        if (val !== null && val !== undefined) {
          idx = item.data.findIndex(d => d.value == val);
        }
        return {
          type: item.type,
          index: idx,
          value: val
        };
      }
      // En caso de que en el futuro tengas otros tipos:
      return {
        type: item.type,
        index: -1,
        value: null
      };
    });

    this.onAccept.emit(output);
    this.closeMenu();
  }

  // Cancelar: cerrar sin emitir
  cancel(): void {
    this.closeMenu();
  }

  private closeMenu(): void {
    if (this.menuTrigger) {
      this.menuTrigger.closeMenu();
    }
  }
}

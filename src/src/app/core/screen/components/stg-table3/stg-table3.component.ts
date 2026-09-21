import { Component, Input, OnInit } from '@angular/core';
import { IStgTable3Header, StgTable3Options, StgTable3GridType } from './stg-table3.util';

/**
 * Estructura extendida para un nodo de cabecera (internamente):
 * - level: nivel de profundidad en el árbol de cabeceras.
 * - colSpan: cuántas columnas hoja cuelgan de este nodo.
 * - rowSpan: cuántas filas abarca verticalmente.
 * - children: sub-nodos en el árbol.
 */
interface StgTable3HeaderExtended extends IStgTable3Header {
  level: number;
  colSpan: number;
  rowSpan: number;
  children: StgTable3HeaderExtended[];
}

/**
 * Estructura para celdas del <thead>, utilizada en la plantilla.
 */
interface StgHeaderMatrixCell {
  label: string;
  colSpan?: number; // Se define solo si es mayor a 1
  rowSpan?: number; // Se define solo si es mayor a 1
  style?: { [cssProp: string]: string };
}

@Component({
  selector: 'stg-table3',
  templateUrl: './stg-table3.component.html',
  styleUrls: ['./stg-table3.component.scss']
})
export class StgTable3Component implements OnInit {

  @Input() columns: IStgTable3Header[] = [];
  @Input() data: Record<string, any>[] = [];
  @Input() options: StgTable3Options = new StgTable3Options();

  headerRows: StgHeaderMatrixCell[][] = [];
  leafColumns: IStgTable3Header[] = [];
  selectedRowIndex = -1;
  hoveredRowIndex = -1;

  ngOnInit(): void {
    // Construir la estructura multinivel de cabeceras
    const extendedRoots = this.columns.map(col => this.buildExtendedTree(col, 0));
    const maxLevel = Math.max(...extendedRoots.map(r => this.getMaxLevel(r)));
    this.setRowSpanForLeaves(extendedRoots, maxLevel);
    const flattened = this.flattenPreorder(extendedRoots);
    this.buildHeaderRows(flattened);
    this.leafColumns = this.findLeafColumns(this.columns);
  }

  //#region LÓGICA MULTINIVEL

  private buildExtendedTree(header: IStgTable3Header, level: number): StgTable3HeaderExtended {
    const node: StgTable3HeaderExtended = {
      ...header,
      level,
      colSpan: 1,
      rowSpan: 1,
      children: []
    };
    if (header.subs && header.subs.length > 0) {
      node.children = header.subs.map(sub => this.buildExtendedTree(sub, level + 1));
      node.colSpan = node.children.reduce((sum, child) => sum + child.colSpan, 0);
    }
    return node;
  }

  private getMaxLevel(node: StgTable3HeaderExtended): number {
    if (node.children.length === 0) {
      return node.level;
    }
    const childLevels = node.children.map(ch => this.getMaxLevel(ch));
    return Math.max(...childLevels);
  }

  private setRowSpanForLeaves(nodes: StgTable3HeaderExtended[], maxLevel: number): void {
    for (const n of nodes) {
      if (n.children.length === 0) {
        n.rowSpan = maxLevel - n.level + 1;
      } else {
        this.setRowSpanForLeaves(n.children, maxLevel);
      }
    }
  }

  private flattenPreorder(nodes: StgTable3HeaderExtended[]): StgTable3HeaderExtended[] {
    const list: StgTable3HeaderExtended[] = [];
    for (const n of nodes) {
      list.push(n);
      if (n.children.length > 0) {
        list.push(...this.flattenPreorder(n.children));
      }
    }
    return list;
  }

  private buildHeaderRows(flattened: StgTable3HeaderExtended[]): void {
    const highestLevel = Math.max(...flattened.map(n => n.level));
    this.headerRows = Array.from({ length: highestLevel + 1 }, () => []);
    for (const node of flattened) {
      const cell: StgHeaderMatrixCell = {
        label: node.label,
        style: node.style
      };
      if (node.colSpan > 1) {
        cell.colSpan = node.colSpan;
      }
      if (node.rowSpan > 1) {
        cell.rowSpan = node.rowSpan;
      }
      this.headerRows[node.level].push(cell);
    }
  }

  private findLeafColumns(headers: IStgTable3Header[]): IStgTable3Header[] {
    const leaves: IStgTable3Header[] = [];
    for (const h of headers) {
      if (h.subs && h.subs.length > 0) {
        leaves.push(...this.findLeafColumns(h.subs));
      } else {
        leaves.push(h);
      }
    }
    return leaves;
  }

  //#endregion

  //#region COMPUTACIÓN DE BORDES

  /**
   * Devuelve el estilo computado para el contenedor.
   * Si options.grid.type es 'full', se pinta el borde; si es 'bottom' o 'none', no se pinta.
   */
  getContainerStyle(): { [cssProp: string]: string } {
    if (this.options.grid?.type === 'full') {
      const borderStyle = this.options.grid?.style?.border || '1px solid #ccc';
      return {
        border: borderStyle,
        'border-radius': '4px'
      };
    }
    return {};
  }

  /**
   * Devuelve el estilo computado para las celdas de cabecera (<th>).
   * Se fusionan:
   * - options.header.cellStyle,
   * - el estilo propio de la celda,
   * - y se aplica el borde inferior y, según el tipo de grid, el borde derecho.
   * Para las cabeceras se determina la celda final de cada fila según la suma de colSpan.
   */
  computeHeaderCellStyle(rowIndex: number, cellIndex: number, cellStyle?: { [cssProp: string]: string }): { [cssProp: string]: string } {
    const merged = {
      ...(this.options.header?.cellStyle || {}),
      ...(cellStyle || {})
    };
    const gridType = this.options.grid?.type || 'bottom';
    const borderStyle = this.options.grid?.style?.border || '1px solid #ccc';
    if (gridType === 'full' || gridType === 'bottom') {
      merged['border-bottom'] = borderStyle;
    }
    if (gridType === 'full' && !this.getHeaderCellIsLast(rowIndex, cellIndex)) {
      merged['border-right'] = borderStyle;
    }
    return merged;
  }

  /**
   * Determina si la celda en la fila rowIndex y posición cellIndex es la última de esa fila,
   * analizando la suma de colSpan de la fila y comparándola con el total de columnas (leafColumns).
   */
  private getHeaderCellIsLast(rowIndex: number, cellIndex: number): boolean {
    if (!this.headerRows || !this.headerRows[rowIndex]) {
      return false;
    }
    const totalColumns = this.leafColumns.length;
    let pos = 0;
    const row = this.headerRows[rowIndex];
    for (let i = 0; i < row.length; i++) {
      const span = row[i].colSpan ? row[i].colSpan : 1;
      pos += span;
      if (i === cellIndex) {
        return pos === totalColumns;
      }
    }
    return false;
  }

  /**
   * Devuelve el estilo computado para las celdas del cuerpo (<td>).
   * Si options.grid.type es 'full', se aplican borde inferior y derecho (excepto en la última celda de la fila, determinada con "last").
   * Si es 'bottom', se pinta solo el borde inferior.
   * Si es 'none', no se pinta ningún borde.
   */
  getCellStyle(isLast?: boolean): { [cssProp: string]: string } {
    const merged = { ...(this.options.body?.cellStyle || {}) };
    const gridType = this.options.grid?.type || 'bottom';
    const borderStyle = this.options.grid?.style?.border || '1px solid #ccc';
    if (gridType === 'full' || gridType === 'bottom') {
      merged['border-bottom'] = borderStyle;
    }
    if (gridType === 'full' && !isLast) {
      merged['border-right'] = borderStyle;
    }
    return merged;
  }

  //#endregion

  //#region HOVER Y SELECCIÓN DE FILAS

  onRowMouseOver(index: number): void {
    if (this.options.body?.hover?.enabled) {
      this.hoveredRowIndex = index;
    }
  }

  onRowMouseLeave(): void {
    if (this.options.body?.hover?.enabled) {
      this.hoveredRowIndex = -1;
    }
  }

  onRowClick(index: number): void {
    if (this.options.body?.selection?.enabled) {
      this.selectedRowIndex = (this.selectedRowIndex === index) ? -1 : index;
    }
  }

  getRowStyle(index: number): { [cssProp: string]: string } {
    const style = { ...(this.options.body?.rowStyle || {}) };
    if (this.options.body?.selection?.enabled && index === this.selectedRowIndex) {
      if (this.options.body.selection.style) {
        const selStyle = this.options.body.selection.style;
        if (selStyle.background) style.background = selStyle.background;
        if (selStyle.color) style.color = selStyle.color;
      }
      return style;
    }
    if (this.options.body?.hover?.enabled && index === this.hoveredRowIndex) {
      if (this.options.body.hover.style?.background) {
        style.background = this.options.body.hover.style.background;
      }
    }
    return style;
  }

  //#endregion
}

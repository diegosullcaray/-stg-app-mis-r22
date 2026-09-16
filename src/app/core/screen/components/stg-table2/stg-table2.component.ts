import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { cloneObject, isNullOrUndefined, mergeObjects } from 'app/core/shared/functions.util';
import { Subject } from 'rxjs';
import { stgDefaultTable2Config } from './stg-table2.util';
import { style } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'stg-table2',
  templateUrl: './stg-table2.component.html',
  styleUrls: ['./stg-table2.component.scss']
})
export class StgTable2Component implements OnInit, OnChanges {
  @Input() options: any;
  @Input() dataSource: any[];
  @Input() headers: any[];
  @Input() optionsObserver: Subject<any>;
  config: any;
  headerDef: any[] = [];
  rowDef: any[] = [];
  private sortReady = false;
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(false, []);
  @Input() enableSort: number = 0; //   Por defecto 0
  @ViewChild(MatSort) sort!: MatSort;
  originalDataSource: any[] = []; // <-- para guardar el original
 currentSortColumn: string | null = null;
 currentSortDirection: 'asc' | 'desc' | '' = '';

  @Output() onSelectRow = new EventEmitter<any>();
  @Output() onClickCell = new EventEmitter<any>();
  dataSourceTable = new MatTableDataSource<any>([]);
  constructor(private sanitizer: DomSanitizer,private cdRef: ChangeDetectorRef) { }
 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.headers) {
      let nv: any = changes.headers.currentValue;
      if (nv && nv.length > 0) {
        this.headerDef = [];
        this.rowDef = [];
        //this.setStickys();
        this.headerDefs();
        this.rowDefs();
      }
    }
    if (changes['dataSource']) {
      this.initDataSource(); // Reutiliza
    }
  }
  ngAfterViewInit() {
    this.sortReady = true;
  this.initDataSource();
  if (this.enableSort == 1) {
    this.dataSourceTable.sort = this.sort;
  }
  }
  private initDataSource(): void {
    if (this.dataSource) {
      this.originalDataSource = [...this.dataSource]; // guarda una copia
      this.dataSourceTable = new MatTableDataSource(this.dataSource);
      if (this.enableSort == 1) {
        this.dataSourceTable.sort = this.sort;
      }
    }
  }

   

  onSortChange(event: Sort) {
    if (this.enableSort !== 1) return; // solo si habilitado

  const { active, direction } = event;

  if (!active) {
    return;
  }

  // Si clickeaste otra columna, resetea el estado
  if (this.currentSortColumn !== active) {
    this.currentSortDirection = '';
  }

  if (this.currentSortDirection === '') {
    // Ahora ascendente
    this.currentSortDirection = 'asc';
    this.dataSourceTable.data = this.sortData(active, 'asc');
  } else if (this.currentSortDirection === 'asc') {
    // Luego descendente
    this.currentSortDirection = 'desc';
    this.dataSourceTable.data = this.sortData(active, 'desc');
  } else {
    // Luego volver al original
    this.currentSortDirection = '';
    this.dataSourceTable.data = [...this.originalDataSource];
  }

  this.currentSortColumn = active;

  this.cdRef.detectChanges();
  this.dataSourceTable._updateChangeSubscription();
  }
  private sortData(column: string, direction: string): any[] {
    const data = [...this.dataSourceTable.data]; // Clona los datos antes de ordenarlos
    return data.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
  
      if (valueA < valueB) {
        return direction === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  ngOnInit(): void {
    this.displayedColumns = this.rowDef.map(col => col.key);
    this.config = mergeObjects(cloneObject(stgDefaultTable2Config), this.options);
    if (this.optionsObserver) {
      this.optionsObserver.subscribe(x => {
        this.config = mergeObjects(this.config, x);
      });
    }
    
    if (this.sortReady) {
      this.dataSourceTable.sort = this.sort;
    }
     
    if (this.config.header.sticky) {
      this.config.header.style['top'] = '0';
      this.config.header.style['position'] = 'sticky';
      this.config.header.style['z-index'] = '999';
    }
    if (this.config.grid.enabled) {
      this.config.style = mergeObjects(this.config.style, {
        'border-collapse': 'separate',
        'border-spacing': '0'
      });
    }
    //this.headerDefs();
    //this.rowDefs();
  }

  byPassHeaderLabel(val: string) {
    return this.sanitizer.bypassSecurityTrustHtml(val);
  }

  numberLoadingRows() {
    return new Array(this.config.body.loading.rows);
  }

  isLoadingEnabled() {
    return this.config.body.loading.enabled;
  }

  isVoidDataSource() {
    return isNullOrUndefined(this.dataSource) || this.dataSource.length == 0;
  }

  selectRow(row: any) {
    let body = this.config.body;
    let selection = body.selection;
    if (selection.enabled) {
      if (selection.allowDeselect === false) {
        this.selection.select(row);
      } else {
        this.selection.toggle(row);
      }
      this.onSelectRow.emit(row);
    }
  }

  clickCell(value: any, key: any, row: any) {
    // let body = this.config.body;
    // let cellEvent = body.cellEvent;
    // if(cellEvent.enabled){
    let evt = {
      value: value,
      key: key,
      row: row
    };
    this.onClickCell.emit(evt);
    //}
  }

  globalStyle() {
    let r = {};
    let grid = this.config.grid;
    let modes = ['full', 'only_headers']
    if (grid.enabled && modes.includes(grid.mode)) {
      r['--border'] = grid.border;
      r['--border-radius'] = grid['border-radius'];
    }
    let s = this.config.style;
    if (s && s.background) {
      r['--global-background'] = s.background;
    }
    //else if(grid.enabled && grid.mode=='bottom'){
    //r['--border']=grid.border;
    //r['--border-radius']=grid['border-radius'];
    //}
    return r;
  }

  getHeaderCellStyle(h: any, r: number, c: number, cl: number) {
    let grid = this.config.grid;
    let thS = mergeObjects({}, this.config.header.cellStyle);
    thS = mergeObjects(thS, h.style);
    //let sf = h.style ? h.style.sticky ? true : false : false;
    //let bf = h.style ? h.style.background ? true : false : false;
    //TODO merge con la funcion
    if (grid.enabled) {
      let gS = {
        'border-bottom': grid.border,
      };
      if (c < cl - 1 && grid.mode == 'full') {
        gS['border-right'] = grid.border;
      }
      thS = mergeObjects(thS, gS);
    }
    return thS;
  }

  getBodyCellStyle(td: any, tr: any, r: number, c: number, rl: number, cl: number) {
    let body = this.config.body;
    let grid = this.config.grid;
    let tdS = mergeObjects({}, body.cellStyle);
    //let totH = this.headerDef.length;
    //let hconf = this.headerDef[totH-1][c];
    if (td.cellStyle) {
      tdS = mergeObjects(tdS, td.cellStyle);
    }
    if (td.cellStyleFn) {
      let pms = {
        key: td.key,
        value: tr[td.key],
        rowData: tr
      }
      tdS = mergeObjects(tdS, td.cellStyleFn(pms));
    }
    if (grid.enabled && grid.mode != "only_headers") {
      let gS = {};
      if (c < cl - 1 && grid.mode == 'full') {
        gS['border-right'] = grid.border;
      }
      if (r < rl - 1) {
        gS['border-bottom'] = grid.border;
      }
      tdS = mergeObjects(tdS, gS);
    }
    return tdS;
  }

  getBodyRowStyle(tr: any) {
    let body = this.config.body;
    let hover = body.hover;
    let rS = {};
    if (body.rowStyleFn) {
      rS = mergeObjects(rS, body.rowStyleFn(tr));
    }
    if (hover.enabled) {
      rS['--row-hover-background'] = hover.style['background'];
      rS['--row-hover-color'] = hover.style['color'];
    }
    let selection = body.selection;
    if (selection.enabled) {
      rS['--row-selected-background'] = selection.style['background'];
      rS['--row-selected-color'] = selection.style['color'];
    }
    return rS;
  }

  private setStickys() {
    this.assignStickyCols();
    this.fixStickyBottomToTop();
    this.fixStickyTopToBottom();
    this.computeStickyLeftSums();
  }

  private assignStickyCols() {
    const stickyCols = this.options.body.stickyCols || [];
    let colIndex = 0;

    const assignToLeaf = (node: any) => {
      if (!node.subs || node.subs.length === 0) {
        if (colIndex < stickyCols.length) {
          node.style = node.style || {};
          node.cellStyle = node.cellStyle || {};
          let ls = 0;
          for (let i = 0; i < colIndex; i++) {
            ls += stickyCols[i];
          }
          node.style = {
            ...node.style,
            'width': stickyCols[colIndex],
            'min-width': stickyCols[colIndex],
            'max-width': stickyCols[colIndex],
            'left': ls + 'px',
            'position': 'sticky'
          };
          node.cellStyle = {
            ...node.cellStyle,
            'width': stickyCols[colIndex],
            'min-width': stickyCols[colIndex],
            'max-width': stickyCols[colIndex],
            'left': ls + 'px',
            'position': 'sticky'
          };
          node['sticky'] = true;
          node['sticky-left'] = ls;
          colIndex++;
        }
        return;
      }

      for (const child of node.subs) {
        assignToLeaf(child);
      }
    };

    // Recorrer el árbol desde la raíz
    for (const header of this.headers) {
      assignToLeaf(header);
    }
  }

  private computeStickyLeftSums() {
    const computeChildrenStickyLeft = (node: any): number => {
      if (!node.subs || node.subs.length === 0) {
        return !isNullOrUndefined(node['sticky-left']) ? node['sticky-left'] : 0;
      }

      let totalSum = 0;
      for (const child of node.subs) {
        totalSum += computeChildrenStickyLeft(child);
      }

      if (node.sticky == true) {
        node.style = node.style || {};
        node.style['left'] = totalSum;
      }

      return totalSum;
    };

    for (const header of this.headers) {
      computeChildrenStickyLeft(header);
    }
  }


  private fixStickyTopToBottom(h?: any) {
    let th = h ? h : this.headers;
    th.forEach((x: any) => {
      if (x.sticky && x.subs && x.subs.length > 0) {
        x.subs.forEach((y: any) => {
          y['sticky'] = true;
        });
        this.fixStickyTopToBottom(x.subs);
      }
    });
  }

  private fixStickyBottomToTop() {
    this.headers.forEach((x: any) => {
      let s = this.childWithSticky(x);
      if (s) {
        x['sticky'] = true;
      }
    });
  }

  private childWithSticky(n: any) {
    if (n.subs && n.subs.length > 0) {
      let r = false
      for (let i = 0; i < n.subs.length; i++) {
        r = this.childWithSticky(n.subs[i]);
        if (r) {
          break;
        }
      }
      return r;
    } else {
      return n['sticky'];
    }
  }

  private rowDefs() {
    let hs = this.headers;
    hs.forEach((x: any) => {
      this.findRd(x);
    });
  }

  private findRd(n: any) {
    if (n.subs && n.subs.length > 0) {
      n.subs.forEach((x: any) => {
        this.findRd(x);
      });
    } else {
      this.rowDef.push(n);
    }
  }

  //funcion que ubica cada definition de header en la fila que le corresponde y calcula el colspan y el rowspan
  private headerDefs() {
    this.headers.forEach((x: any) => {
      this.evalHn(x, 0);
    });
    this.fixSpans();
  }

  //funcion para evaluar el nivel al que pertenece el header
  //tambien se encarga de calcular el colspan
  private evalHn(n: any, l: number) {
    if (!this.headerDef[l]) {
      this.headerDef.push([]);
    }
    if (n.subs && n.subs.length > 0) {
      n.subs.forEach((x: any) => {
        this.evalHn(x, l + 1);
      });
    }
    n['colspan'] = this.colspan(n);
    this.headerDef[l].push(n);
  }

  //funcion que corrige los colspan=1 y calcula el rowspan
  private fixSpans() {
    this.headerDef.forEach((x, i) => {
      x.forEach((y: any) => {
        if (y.colspan == 1) {
          y.colspan = null;
        }
        this.rowspan(y, i);
      });
    });
  }

  //funcion que calcula el rowspan de un header
  private rowspan(e: any, l: number) {
    let mlh = this.headerDef.length;
    if (isNullOrUndefined(e.subs) || e.subs.length == 0) {
      if (mlh - l > 1) {
        e['rowspan'] = mlh - l;
      } else {
        e['rowspan'] = null;
      }
    }
  }

  //funcion que calcula el colspan de un header
  private colspan(e: any) {
    if (e.subs && e.subs.length > 0) {
      let buff = 0;
      e.subs.forEach((c: any) => {
        buff += this.colspan(c);
      });
      return buff;
    }
    return 1;
  }

}

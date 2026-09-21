import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { copyFields, isNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { IStgTableHeader } from "./stg-table.interface";
import { COLOR_BACKGROUND_1 } from "app/core/shared/variables.util";

@Component({
    selector: 'stg-table',
    templateUrl: './stg-table.component.html',
    styleUrls: ['./stg-table.component.scss']
})
export class StgTableComponent implements OnInit,OnChanges {
    headerRowDefs: string[][];
    rowDef: string[];
    columnDefs: any[];
    selection = new SelectionModel<any>(false, []);
    headersLenght: number;

    private defLoadingStyleConf: any;
    private defTableStyleConf: any;

    @Input() loadingObs: boolean;
    @Input() loadingStyleConfig: any;
    @Input() tableStyleConfig: any;
    @Input() headersDef: IStgTableHeader[];
    @Input() dataSource: any;
    @Input() metaSources: any;
    @Input() actionTrigger: any;
    @Input() iconizerMap: any;
    @Input() activeSelection: any;
    @Input() customValueFormatter: any;
    @Input() customCellStyler: any;
    @Input() customComponentStyler: any;
    @Input() customComponentCell: any;
    @Output() onSelectRow = new EventEmitter<any>();
    @Output() onEditCell = new EventEmitter<any>();
    //@Output() onSubmitTable = new EventEmitter<any>();

    private borderedHeaders1: string[] = [];
    private borderedHeaders2: string[] = [];

    constructor(public layour: LayoutService, private dialog: MatDialog) { }

    runTrigger(k, d) {
        let evt = {
            row: d,
            key: k,
            value: d[k]
        }
        let ctx = {
            dialog: this.dialog,
            meta: this.metaSources
        }
        this.actionTrigger(evt, ctx);
    }

    /*submitTable(){
        this.onSubmitTable.emit(this.dataSource);
    }*/

    onEditInput(evt: any, row: any, key: any) {
        let or = { ...row };
        row[key] = evt.target.value;
        let em = {
            evt: evt,
            row: row,
            key: key,
            old_row: or
        };
        this.onEditCell.emit(em);
    }


    selectRow(row: any) {
        if (this.activeSelection) {
            this.selection.toggle(row);
            this.onSelectRow.emit(row);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.headersDef){
            let nv:any = changes.headersDef.currentValue;
            if(nv && nv.length>0){
                this.computeHeaders();
            }
        }
    }

    ngOnInit(): void {
        if (!this.tableStyleConfig) {
            this.tableStyleConfig = {};
        }
        if (this.loadingObs === undefined) {
            this.loadingObs = false;
        }


        this.defLoadingStyleConf = {
            height: '300px',
            background: 'grey',
            padding: '5px'
        };

        this.defTableStyleConf = {
            table: {
                'height': '300px',
                //grid: STG_GRID_STYLE,
                'width': '100%',
                'background': 'white'
            },
            header: {
                'background': COLOR_BACKGROUND_1,
                'text-align': 'center',
                'min-width': '80px',
                'color': 'white',
                'padding': '0px'
            },
            row: {
                'height': '32px',
                'padding': '0px'
            }
        };;

        copyFields(this.defTableStyleConf.table, this.tableStyleConfig.table);
        copyFields(this.defTableStyleConf.header, this.tableStyleConfig.header);
        copyFields(this.defTableStyleConf.row, this.tableStyleConfig.row);
        copyFields(this.defTableStyleConf.other, this.tableStyleConfig.other);
        if(this.headersDef && this.headersDef.length>0){
            this.computeHeaders();
        }
        
    }

    public iconizerIcon(value, iconizer) {
        if (this.iconizerMap) {
            let i: any = this.iconizerMap[iconizer];
            let f: any = i.icon;
            return f(value);
        }
        return 'check_box_outline_blank';
    }

    public iconizerStyle(value, iconizer) {
        if (this.iconizerMap) {
            let i: any = this.iconizerMap[iconizer];
            let f: any = i.style;//esto es una funcion que crea un objeto de estilo
            let s: any = f(value);
            s['font-size'] = '18px';
            return s;
        }
        return null;
    }

    private computeHeaders() {
        this.headerRowDefs = [];
        this.rowDef = [];
        this.columnDefs = [];
        let mh = {};
        let mhd = {};
        this.processHeader(this.headersDef, mh, 0, mhd);
        Object.keys(mh).sort().forEach(e => {
            this.headerRowDefs.push(mh[e]);
        });
        this.registerBorderedHeaders1(this.headersDef);
        this.registerBorderedHeaders2();
        this.processColumnDefs(mhd);
        /*console.log("headerRowDefs",this.headerRowDefs);
        console.log("rowDef",this.rowDef);
        console.log("columnDefs",this.columnDefs);*/
    }

    private registerBorderedHeaders1(hd: IStgTableHeader[]) {
        let l = hd[0];
        this.borderedHeaders1.push(l.key);
        if (l.subs) {
            this.registerBorderedHeaders1(l.subs);
        }
    }

    private registerBorderedHeaders2() {
        this.headersDef.forEach(x => {
            this.borderedHeaders2.push(x.key);
        });
    }

    private processColumnDefs(mhd: any) {
        let lvls = this.headerRowDefs.length;
        let hs = this.headerSpans(mhd, lvls);
        this.headerRowDefs.forEach(e => {
            e.forEach(e => {
                let cd = mhd[e];
                let { subs, blank, ...i } = cd;//desestructuracion de objetos json, crealas variables subs y blank desde las claves de cd y asigna las restantes a i
                i['isDataCol'] = cd.subs && cd.subs.length > 0 ? false : true;
                i['rowspan'] = hs[cd.key].rowspan
                i['colspan'] = hs[cd.key].colspan;
                this.columnDefs.push(i);
            });
        });
    }

    private headerSpans(detail: any, levels: number): {} {
        let buff = {};
        Object.keys(detail).forEach(x => {
            let e = detail[x];
            let r: any = {};
            let cl = e.lvl;
            if (e.subs && e.subs.length > 0) {
                let cs = this.horizontalLevels(e);
                //if(cs>1){
                r['colspan'] = cs;
                //}
                /*let rs = levels-(this.lowLevels(e,0)+cl);
                if(rs>1){
                    r['rowspan']=rs;
                }*/
            } else {
                let rs = levels - cl;
                //if(rs>1){
                r['rowspan'] = rs;
                //}
            }
            if (r.rowspan || r.colspan) {
                buff[e.key] = r;
            }
        });
        return buff;
    }

    private horizontalLevels(e: any) {
        if (e.subs && e.subs.length > 0) {
            let buff = 0;
            e.subs.forEach((c: any) => {
                buff += this.horizontalLevels(c);
            });
            return buff;
        }
        return 1;
    }

    /*private lowLevels(e:any,ref:number):number{
        if(e.subs && e.subs.length>0){
            let buff = [];
            e.subs.forEach((c:any)=>{
                buff.push(this.lowLevels(c,ref+1));
            });
            return Math.max(...buff);
        }
        return ref;
    }*/

    private lowLevel(cd: any): number {
        if (cd.subs && cd.subs.length > 0) {
            let buff = [];
            cd.subs.foreach(e => {
                buff.push(this.lowLevel(e));
            });
            return Math.max(...buff);
        }
        return 0;
    }

    private processHeader(subs: IStgTableHeader[], map: {}, lvl: number, det: {}) {
        let buff = map['lvl' + lvl];
        if (isNullOrUndefined(buff)) {
            buff = [];
        }
        subs.forEach(e => {
            if (e.key && e.key !== '') {
                buff.push(e.key);
            }
            if (e.subs && e.subs.length > 0) {
                this.processHeader(e.subs, map, lvl + 1, det);
            } else {
                this.rowDef.push(e.key);
            }
            if (e.key && e.key !== '') {
                let ex = {};
                copyFields(ex, e);
                ex['lvl'] = lvl;
                det[e.key] = ex;
            }
        });
        map['lvl' + lvl] = buff;
    }

    getHeaderStyle(cfg: any, k: string): any {
        let { grid, ...b } = this.defTableStyleConf.header;
        let gt = this.defTableStyleConf.table.grid;
        if (gt) {//'1px solid rgb(216, 216, 216)'
            b['border-right'] = gt;
            b['border-bottom'] = gt;
            if (this.borderedHeaders1.includes(k)) {
                b['border-left'] = gt;
            }
            if (this.borderedHeaders2.includes(k)) {
                b['border-top'] = gt;
            }
        }
        if (grid) {
            b['border-right'] = grid;
            b['border-bottom'] = grid;
            if (this.borderedHeaders1.includes(k)) {
                b['border-left'] = grid;
            }
            if (this.borderedHeaders2.includes(k)) {
                b['border-top'] = grid;
            }
        }
        if (cfg) {
            copyFields(b, cfg);
        }
        return b;
    }

    getTableStyle(): any {
        let cfg = {
            width: this.defTableStyleConf.table.width,
            background: this.defTableStyleConf.table.background
        }
        return cfg;
    }

    getParTableStyle(): any {
        let cfg = {
            height: this.defTableStyleConf.table.height
        }
        return cfg;
    }

    getTableRowStyle() {
        let cfg = {
            height: this.defTableStyleConf.row.height
        }
        return cfg;
    }

    getTableCellStyle(v: any, k: string,r:any) {
        let gt = this.defTableStyleConf.table.grid;
        let gr = this.defTableStyleConf.row.grid;
        let fk = this.rowDef[0];
        let cfg = {
            padding: this.defTableStyleConf.row.padding
        }
        if (gt) {
            cfg['border-right'] = gt;
            cfg['border-bottom'] = gt;
            if (k == fk) {
                cfg['border-left'] = gt;
            }
        }
        if (gr) {
            cfg['border-right'] = gr;
            cfg['border-bottom'] = gr;
            if (k == fk) {
                cfg['border-left'] = gr;
            }
        }
        if (this.customCellStyler) {
            return this.customCellStyler(v, k, r, cfg);
        }
        return cfg;
    }

    getComponentStyle(t: string, k: string) {
        if (this.customComponentStyler) {
            return this.customComponentStyler(t, k);
        }
        return null;
    }

    loadingStyle(): any {
        let cfg = { height: this.defLoadingStyleConf.height, padding: this.defLoadingStyleConf.padding };
        if (this.loadingStyleConfig) {
            copyFields(cfg, this.loadingStyleConfig, ['height', 'padding']);
        }
        return cfg;
    }

    loadingBodyStyle(): any {
        let cfg = { background: this.defLoadingStyleConf.background };
        if (this.loadingStyleConfig) {
            copyFields(cfg, this.loadingStyleConfig, ['background']);
        }
        return cfg;
    }

    loadingHeaderStyle(): any {
        let cfg = { background: this.defLoadingStyleConf.background };
        if (this.loadingStyleConfig) {
            copyFields(cfg, this.loadingStyleConfig, ['background']);
        }
        return cfg;
    }

}
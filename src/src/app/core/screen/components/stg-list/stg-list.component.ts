import { SelectionModel } from "@angular/cdk/collections";
import { EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { OnChanges } from "@angular/core";
import { Component } from "@angular/core";
import { cloneObject, isNullOrUndefined, mergeObjects } from "app/core/shared/functions.util";
import { Subject } from "rxjs";
import { stgDefaultListConfig } from "./stg-list.util";

@Component({
    selector: 'stg-list',
    templateUrl: './stg-list.component.html',
    styleUrls: ['./stg-list.component.scss']
})
export class StgListComponent implements OnInit {
    @Input() options: any;
    @Input() labelKey: string;
    private _dataSource : any[];

    @Input() optionsObserver: Subject<any>;
    config: any;

    selection = new SelectionModel<any>(false, []);

    @Output() onSelectItem = new EventEmitter<any>();

    constructor() { }

    public get dataSource(): any[] {
        return this._dataSource;
    }

    @Input()
    public set dataSource(ds: any[]) {
        if (ds) {
            this._dataSource = ds;
            this.selection.clear();
        }
    }

    ngOnInit(): void {
        this.config = mergeObjects(cloneObject(stgDefaultListConfig), this.options ? this.options : {});
        if (this.optionsObserver) {
            this.optionsObserver.subscribe(x => {
                this.config = mergeObjects(this.config, x);
            });
        }
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

    getBodyItemStyle(tr: any, r: number, rl: number) {
        let item = this.config.item;
        let body = this.config.body;
        let hover = body.hover;
        let grid = this.config.grid;
        let iStyle = {};
        iStyle = mergeObjects(iStyle, item.style);
        if (item.styleFn) {
            iStyle = mergeObjects(iStyle, item.styleFn(tr));
        }

        if (grid.enabled) {
            let gS = {};
            if (r < rl - 1) {
                gS['border-bottom'] = grid.border;
            }
            iStyle = mergeObjects(iStyle, gS);
        }

        if (hover.enabled) {
            iStyle['--item-hover-background'] = hover.style['background'];
            iStyle['--item-hover-color'] = hover.style['color'];
        }
        let selection = body.selection;
        if (selection.enabled) {
            iStyle['--item-selected-background'] = selection.style['background'];
            iStyle['--item-selected-color'] = selection.style['color'];
        }
        return iStyle;
    }

    globalStyle() {
        let r = {};
        let grid = this.config.grid;
        if (grid.enabled) {
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

    selectItem(item: any) {
        let body = this.config.body;
        let selection = body.selection;
        if (selection.enabled) {
            this.selection.toggle(item);
            this.onSelectItem.emit(item);
        }
    }
}
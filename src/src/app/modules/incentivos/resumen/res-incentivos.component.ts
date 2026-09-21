import { formatNumber } from "@angular/common";
import { Input, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { DetalleIncentivosComponent } from "../detalle/det-incentivos.component";
import { tableHeaders } from "./res-incentivos.util";

@Component({
    selector: 'res-incentivos',
    templateUrl: './res-incentivos.component.html',
    styleUrls: ['./res-incentivos.component.scss']
})
export class ResumenIncentivosComponent implements OnInit {
    loadingConf: {};
    tableConf: {};
    iconColMap: {};
    headerDefs: IStgTableHeader[];
    @Input() dataSource: any;
    @Input() loadingObs: boolean;
    @Input() cardsSource: any;
    @Input() extraSources: any;

    constructor(public layout: LayoutService) { }

    ngOnInit(): void {
        this.loadingConf = {
            height: '307px'
        };
        this.tableConf = {
            table: {
                height: '307px',
                //grid: '1px solid rgb(31, 73, 125)'
                grid: STG_GRID_STYLE
            },
            header: {
                'min-width': '100px'
            }
        };
        this.iconColMap = {
            candado: {
                icon: this.iconCandado,
                style: this.iconStyleCandado
            },
            llave: {
                icon: this.iconLlave,
                style: this.iconStyleLlave
            }
        }
        this.headerDefs = tableHeaders;
    }

    customFormatter(v: any, k: any, r: any) {
        if (k === 'monetizacion') {
            return formatNumber(v, 'en-US', '.0-2');
        } else {
            if (!v) {
                return v;
            } else if (r.orden === 1) {
                return formatNumber(v, 'en-US', '.0-2');
            } else if (r.orden >= 2 && r.orden <= 6) {
                return formatNumber(v, 'en-US', '.0-0');
            } else {
                return formatNumber(v * 100, 'en-US', '.2-2') + '%';
            }
        }
    }

    public iconLlave(v) {
        return 'vpn_key';
    }

    public iconStyleLlave(v) {
        if (v === 1) {
            return { 'color': 'rgb(146,208,80)' };
        }
        return { 'color': 'rgb(222,34,34)' };
    }

    public iconCandado(v) {
        return 'https';
    }

    public iconStyleCandado(v) {
        if (v === 1) {
            return { 'color': 'rgb(146,208,80)' };
        }
        return { 'color': 'rgb(222,34,34)' };
    }

    public action(event, context) {
        const dialogConfig = new MatDialogConfig();
        let i = event.row.orden;
        dialogConfig.data = {
            data1: event.row
        };
        if (i >= 5) {
            let es = context.meta['efec'];
            dialogConfig.data['data2'] = es[i === 5 ? 1 : 0];
        }

        context.dialog.open(DetalleIncentivosComponent, dialogConfig);
    }

    public cardTitleStyle() {
        let s = {
            'height': '50px'
        }
        if (this.layout.isMobile) {
            s['font-size'] = '12px';
        }
        return s;
    }
}
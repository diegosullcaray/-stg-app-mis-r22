import { ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { STG_GRID_STYLE, STG_INPUT_TABLE_BACKGROUND } from "app/core/screen/components/stg-table/stg-table.util";
import { printLog } from "app/core/shared/debug.util";
import { cloneObject } from "app/core/shared/functions.util";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";


@Component({
    selector: 'app-pre-ges-sis-responsables',
    templateUrl: './pre-ges-sis-responsables.component.html',
    styleUrls: ['./pre-ges-sis-responsables.component.scss']
})
export class PreGesSisResponsablesComponent implements OnInit, OnDestroy {
    @ViewChild('filterInput', { static: false }) filterInput: ElementRef;

    title: string;

    dataLvls: any;
    currLvl: any;

    tableConf: any;
    headerDefs: any;
    dataSource: any;
    bdataSource: any;
    loadingObs: boolean;

    constructor(
        private antBud: ModBudgetService
    ) { }

    ngOnInit(): void {
        this.title = "Administración de Responsables";


        this.dataLvls = [{
            tip_cod: 7,
            des_lvl: 'Financiera'
        }, {
            tip_cod: 15,
            des_lvl: 'Territorio'
        }, {
            tip_cod: 14,
            des_lvl: 'Corredor'
        }, {
            tip_cod: 11,
            des_lvl: 'Administrador'
        }, {
            tip_cod: 4,
            des_lvl: 'Agencia'
        }, {
            tip_cod: 9,
            des_lvl: 'Banca Preferente'
        }
        ];

        this.currLvl = this.dataLvls[3];

        this.tableConf = {
            table: {
                grid: STG_GRID_STYLE,
                height: '370px'
            }
        }

        this.headerDefs = [{
            label: 'Elemento',
            key: 'des_rel',
            sticky: true
        }, {
            label: 'Correo',
            key: 'cod_res',
            type: 'input',
            style: {
                'min-width': '210px'
            }
        }, {
            label: 'Usuario Registro',
            key: 'usu_log'
        }, {
            label: 'Hora Registro',
            key: 'tim_log',
            style: {
                'min-width': '160px'
            }
        }
        ]

        this.dataSource = [];
        this.bdataSource = [];
        this.getData(this.currLvl.tip_cod);

    }
    ngOnDestroy(): void {

    }

    inputStyler(t: string, k: string) {
        return {
            background: STG_INPUT_TABLE_BACKGROUND
        }
    }

    private getData(tip_cod: number) {
        this.loadingObs = true;
        this.antBud.getRegResultados(tip_cod).subscribe(
            x => {
                this.dataSource = x.body.resultado;
                this.bdataSource = cloneObject(this.dataSource);
                this.loadingObs = false;
            }
        );
    }

    selectItem(v: any) {
        this.getData(v.tip_cod);
        this.filterInput.nativeElement.value="";
    }

    onSelectItem(evt: any) {
        if (evt.isUserInput) {
            this.selectItem(evt.source.value);
        }
    }

    filter(evt: any) {
        let v = evt.target.value.toLowerCase();
        if (v === "") {
            this.dataSource = cloneObject(this.bdataSource);
        } else {
            this.dataSource = this.bdataSource.filter(x => x.des_rel.toLowerCase().includes(v));
        }
    }

    save() {
        this.antBud.openMsg("Guardando...");
        this.antBud.postRegResultados(this.dataSource).subscribe(
            x => {
                printLog(x);
                printLog("Guardado...");
                this.antBud.closeMsg();
            }
        );
    }

    restart() {
        this.dataSource = cloneObject(this.bdataSource);
    }
}
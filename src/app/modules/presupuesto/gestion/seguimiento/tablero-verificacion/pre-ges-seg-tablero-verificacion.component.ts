import { ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";
import { cloneObject } from "app/core/shared/functions.util";
import { ModBudgetService } from "app/modules/presupuesto/compartido/servicios/mod-budget.service";
import moment from "moment";


@Component({
    selector: 'app-pre-ges-seg-tablero-verificacion',
    templateUrl: './pre-ges-seg-tablero-verificacion.component.html',
    styleUrls: ['./pre-ges-seg-tablero-verificacion.component.scss']
})
export class PreGesSegTableroVerificacionComponent implements OnInit, OnDestroy {
    @ViewChild('filterInput', { static: false }) filterInput: ElementRef;

    title: string;

    confHier: any;

    dataLvls: any;
    currLvl: any;

    tableConf: any;
    headerDefs: any;
    dataSource: any;
    bdataSource: any;
    loadingObs: boolean;
    iconColMap: any;

    constructor(
        private antBud: ModBudgetService
    ) { }

    ngOnInit(): void {
        this.title = "Verifiación por Niveles";
        const hoy = Date.now();     
        let currentDate = moment(hoy).format("YYYY-MM-DD"); 
        this.confHier = {
            r_tip_cod: 99,
            r_cod_rel: '#ALL#',
            r_lvl_hier: 1,
            cod_hier: 9,
            //cod_hier: 8,
            params_hier:{key:"fec",val:currentDate},
            //max_lvl: 2,
            max_lvl: 6,
            roots: [{tip_cod: 7, cod_rel: '231', lvl: 1}], 
            dlg_tlt: "LINEAS PRESUPUESTO"
        }

        this.tableConf = {
            table: {
                grid: STG_GRID_STYLE,
                height: '370px'
            }
        }

        this.iconColMap = {
            estado: {
                icon: this.iconEstado,
                style: this.iconStyleEstado
            }
        }

        this.headerDefs = [
            {
                label: 'Elemento',
                key: 'des_rel',
                sticky: true,
                style: {
                    'min-width': '210px'
                }
            }, {
                label: 'Verifiación',
                key: 'ver_Sec',
                subs: [
                    {
                        label: 'Estado',
                        key: 'cod_est',
                        iconizer: 'estado'
                    }, {
                        label: 'Usuario',
                        key: 'usu_log'
                    }, {
                        label: 'Hora',
                        key: 'tim_log',
                        style: {
                            'min-width': '160px'
                        }
                    }
                ]
            }
        ];

        this.dataSource = [];
        this.bdataSource = [];
        //this.getData(this.currLvl.tip_cod);

    }
    ngOnDestroy(): void {

    }

    iconEstado(v) {
        return 'circle';
    }

    iconStyleEstado(v) {
        if (v === 1) {
            return { 'color': '#39ff14' };
        }
        return { 'color': '#fe2712' };
    }

    selectHier(evt: any) {
        this.filterInput.nativeElement.value = "";
        if (evt.length == 2) {
            let lv: any = evt[0];
            let tv: any = evt[1];
            this.loadingObs = true;

            this.antBud.getLogVerificaciones(tv.cod_rel, lv.cod_rel).subscribe(
                x => {
                    this.dataSource = x.body.resultado;
                    this.bdataSource = cloneObject(this.dataSource);
                    this.loadingObs = false;
                }
            );
        }else{
            this.dataSource=[];
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
}
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { InFormDialogService } from "app/modules/shared/components/in-form-dialog/in-form-dialog.service";
import { SecPickerDialog2Service } from "app/modules/shared/services/sec-picker-dialog2.service";
import { Subject } from "rxjs";

@Injectable()
export class AnalistaService {
    cla_user: number;
    cod_bt: string;
    nom_sec: string;

    tip_use: number;

    tip_cod: number;
    cod_rel: string;

    selectedSec$ = new Subject<any>();
    doneLoadingDataSource$ = new Subject<any>();

    onEventForm$: Subject<any>;

    selectedRow: any;

    detail_title: string;




    prof_info: any;
    data_info: any;

    hist_cods: any;

    graph1_opts: any;
    graph2_opts: any;
    graph3_opts: any;

    tbl_01_ds: any;
    tbl_01_h: any;
    tbl_opts: any;

    constructor(private secPicker: SecPickerDialog2Service, private formService: InFormDialogService) {
        this.secPicker.selectedSec$.subscribe(x => {
            this.selectedSec$.next(x);
        });
        this.detail_title = "Detalle Cliente";
        this.onEventForm$ = this.formService.onEvent$;

        this.formService.setDialogOptions(
            {
                panel: {
                    width: '400px',
                    height: '200px'
                },
                title: {
                    text: "Comentario"
                }
            }
        );
        this.formService.setFormOptions(
            {
                fields: [
                    {
                        key: 'des_com',
                        label: 'Comentario'
                    }
                ]
            }
        );


        /***********************************/

        this.data_info = {
            nom: '--',
            car: '--',
            cod_bt: '--',
            f4: '--',
            sal_cap: 0,
            mon_des: 0,
            mor_1: 0,
            mor_30: 0
        };

        /*******************************/

        this.graph1_opts = {
            credits: {
                enabled: false
            },
            title: {
                text: "Evolutivo Mensual",
                style: {
                    'font-size': '12px'
                }
            },
            colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],
            yAxis: {
                title: {
                    text: 'Monto (Miles)'
                }
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    },
                    marker: {
                        symbol: 'circle',
                        radius: 3
                    }
                    //pointStart: 1
                }
            },
            legend: {
                itemStyle: {
                    'font-size': '10px'
                }
            },
            series: []
        };

        /*******************************/

        this.graph2_opts = {
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },
            title: {
                text: "Comparativo Dia",
                style: {
                    'font-size': '12px'
                }
            },
            colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],
            xAxis: {
                categories: [
                    '--',
                    '--',
                    '--'
                ],
                crosshair: true,
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Saldo (Miles)',
                }
            },
            legend: {
                itemStyle: {
                    'font-size': '10px'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: []
        };

        /*************************************/

        this.graph3_opts = {
            credits: {
                enabled: false
            },
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            colors: ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],
            title: {
                text: 'Cartera (Miles) por Tramos de Días de Atraso',
                //align: 'left',
                style: {
                    'font-size': '12px'
                }
            },
            /*tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },*/
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    //cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend: {
                itemStyle: {
                    'font-size': '9px'
                }
            },
            series: []
        };

        /*************************************/

        this.tbl_01_h = [
            {
                key: 'num_doc',
                label: 'Documento'
            },
            {
                key: 'nom',
                label: 'Nombre',
                style: {
                    'max-width': '300px',
                    'min-width': '300px',
                    'width': '300px'
                },
                format: {
                    type: 'link'
                }
            },
            {
                key: 'opes',
                label: 'Num. Operaciones'
            },
            {
                key: 'sal_cap',
                label: 'Saldo Capital'
            }
        ];

        this.tbl_opts = {
            style: {
                'font-size': '10px'
            },
            header: {
                style: {
                    'background': '#0081ff'
                }
            },
            body: {
                cellStyle: {
                    'height': '15px'
                },
                hover: {
                    enabled: true
                },
            }
        };
    }



    showSecPickerDialog(f: boolean) {
        this.secPicker.tip_cod = this.tip_cod;
        this.secPicker.cod_rel = this.cod_rel;
        this.secPicker.showDialog(f);
    }

    showFormDialog() {
        this.formService.showDialog();
    }
}
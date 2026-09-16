import { incentivos4IconSet } from "../incentivos4.util";

export const avancesConfig = {
    blocks: [
        {
            show: true,
            lbl: 'Saldo Cartera Vigente',
            icon: incentivos4IconSet.car,
            val: 0.731,
            tbl: {
                ant:"S/. 1,215,634.18",
                act:"S/ 2,874,815.03",
                var:"S/ -2,202.70",
                met:"S/ 30,000"
            }
        },
        {
            show: true,
            lbl: 'Stock Clientes',
            icon: incentivos4IconSet.cli,
            val: 0.35,
            tbl: {
                ant:"173",
                act:"373",
                var:"-2",
                met:"3"
            }
        },
        {
            show: false,
            lbl: 'Supervisión Capa 1',
            icon: incentivos4IconSet.sc1,
            val: 0.35,
            tbl: {
                ant:"500",
                act:"500",
                var:"500",
                met:"1000"
            }
        },
        {
            show: true,
            lbl: 'Efectividad -30 a 0',
            icon: incentivos4IconSet.efec1,
            val: 0.35,
            tbl: {
                ant:"53.7%",
                act:"53.7%",
                var:"53.7%",
                met:"98.7%"
            }
        },
        {
            show: true,
            lbl: 'Efectividad 1 a 30',
            icon: incentivos4IconSet.efec2,
            val: 0.35,
            tbl: {
                ant:"53.7%",
                act:"53.7%",
                var:"53.7%",
                met:"98.7%"
            }
        },
        {
            show: true,
            lbl: 'Efectividad 31 a 60',
            icon: incentivos4IconSet.efec3,
            val: 0.35,
            tbl: {
                ant:"53.7%",
                act:"53.7%",
                var:"53.7%",
                met:"98.7%"
            }
        }
    ],
    pieCfg: {
        chart: {
            type: 'pie',
            spacing:[0, 0, 0, 0]
        },
        title: {
            text: undefined
        },
        tooltip: {
            valueSuffix: '%'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    distance: -25,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '10px',
                        textOutline: 'none',
                        //opacity: 0.7
                    }
                }
            }
        },
        series: [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: [
                    {
                        name: 'Water',
                        y: 55.02
                    },
                    {
                        name: 'Fat',
                        y: 44.98
                    }
                ]
            }
        ]
    }
}
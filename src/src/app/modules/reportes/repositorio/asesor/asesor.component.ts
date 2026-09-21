import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from 'app/core/shared/functions.util';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { perfilConfig, tableConfOPTS, tblHeadersCategorizacion } from './asesor.util';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';

type TabType = 'credito' | 'metrica' | 'seguros' | 'movilidad' | 'desembolsos' | 'efectividad' | 'categorizacion';

@Component({
    selector: 'app-asesor.component',
    templateUrl: './asesor.component.html',
    styleUrls: ['./asesor.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AsesorComponent implements OnInit {

    // Propiedades para el modal
    showModal = false;
    selectedPoint: any = null;

    public radarChartType: ChartType = 'radar';

    // Configuración del radar chart con evento onClick
    public radarChartOptions: ChartOptions<'radar'> = {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const element = elements[0];
                const datasetIndex = element.datasetIndex;
                const index = element.index;
                
                // Obtener información del punto clickeado
                const label = this.demoradarChartData.labels[index];
                const value = this.demoradarChartData.datasets[datasetIndex].data[index];
                const datasetLabel = this.demoradarChartData.datasets[datasetIndex].label;
                
                // Abrir modal con la información
                this.openModal({
                    label: label,
                    value: value,
                    dataset: datasetLabel,
                    color: this.demoradarChartData.datasets[datasetIndex].borderColor
                });
            }
        },
        elements: {
            line: {
                borderWidth: 2
            },
            point: {
                radius: 3,
                hitRadius: 10,
                hoverRadius: 5
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: '#cbd5e1',
                    font: {
                        size: 10,
                        family: "'Inter', sans-serif"
                    }
                },
                ticks: {
                    display: false,
                    backdropColor: 'transparent'
                },
                beginAtZero: true,
                max: 100
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    boxWidth: 10,
                    font: { size: 10 }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(15, 39, 68, 0.95)',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                borderColor: '#3b82f6',
                borderWidth: 1,
                padding: 10,
                displayColors: true,
                callbacks: {
                    label: (context) => {
                        return `${context.dataset.label}: ${context.parsed.r}`;
                    }
                }
            }
        }
    };
    
    public demoradarChartData: ChartConfiguration<'radar'>['data'] = {
        labels: ['Cartera', 'Efec -30a0', 'Clientes', 'Efec 1a30', 'Efec 31a60'],
        datasets: [
            { 
                data: [65, 59, 90, 81, 56], 
                label: 'Tú',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#3b82f6'
            },
            { 
                data: [28, 48, 40, 19, 96], 
                label: 'Meta',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: '#10b981',
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#10b981'
            }
        ]
    };

    // Método para abrir el modal
    openModal(pointData: any) {
        this.selectedPoint = pointData;
        this.showModal = true;
    }

    // Método para cerrar el modal
    closeModal() {
        this.showModal = false;
        this.selectedPoint = null;
    }

    public chartClicked({ event, active }: { event: any, active: {}[] }): void {
        console.log('Chart clicked:', event, active);
    }

    public chartHovered({ event, active }: { event: any, active: {}[] }): void {
        // console.log('Chart hovered:', event, active);
    }

    currentDate: any;
    perfil: any;
    dataSource: any;
    headerDefs: any;
    load0: BehaviorSubject<boolean>;
    Opts: any;
    usuarioBT: any;
    VariableCard1: any;
    VariableCard2: any;
    VariableCard3: any;
    VariableCard4: any;
    c1: any;
    c2: any;
    c3:any;
    c4:any;
    c5:any;
    c6:any;
    tblHeadersCategorizacion: any; 
    Ccategorizacion: boolean;
    
    activeTab: TabType = 'credito';
    
    tabConfig = {
        credito: {
            card1: 'Saldo de Cartera Vigente(miles PEN)',
            card2: 'Desembolsos (miles PEN)',
            card3: 'Op. Desembolsadas',
            card4: 'Clientes Nuevos',
            storedProc: 'CMG_CARTERA_ASESOR_01',
            params: {
                cod_rel: true,
                Fecha: true,
                tip_cod: 1,
                met: '1'
            },
            dataIndexes: {
                card1: { row: 1, col: 2 },
                card2: { row: 5, col: 2 },
                card3: { row: 6, col: 2 },
                card4: { row: 14, col: 2 }
            }
        },
        metrica: {
            card1: 'Meta',
            card2: 'Cartera',
            card3: 'Enrolado',
            card4: 'Usabilidad',
            storedProc: 'Tab_Dig_Com_A_01',
            params: {
                usuariobt: true,
                Fecha: true, 
            },
            dataIndexes: {
                card1: { row: 0, col: 1 },
                card2: { row: 2, col: 1 },
                card3: { row: 4, col: 1 },
                card4: { row: 8, col: 1 }
            }
        },
        seguros: {
            card1: 'Total Seguros del mes',
            card2: 'Protección Cuota',
            card3: 'Multiple Riesgo',
            card4: 'Oncológico',
            storedProc: 'SEGUROS_ASESOR_01',
            params: {
                cod_rel: true,
                tip_cod: 1,
                Fecha: true
            }
            ,
            dataIndexes: {
                card1: { row: 6, col: 2 },
                card2: { row: 0, col: 2 },
                card3: { row: 3, col: 2 },
                card4: { row: 4, col: 2 }
            } 
        },
        categorizacion: {
            card1: 'Disciplina',
            card2: 'Calificación',
            card3: 'Permanencia',
            card4: 'Formación',
            storedProc: 'REP_CATEGO_ASE_01',
            params: {
                cod_bt: true                
            },
            dataIndexes: {
                card1: { row: 1, col: 2 },
                card2: { row: 3, col: 2 },
                card3: { row: 5, col: 2 },
                card4: { row: 9, col: 2 }
            }
        },
        movilidad: {
            card1: 'Visitas Realizadas',
            card2: 'KM Recorridos',
            card3: 'Clientes Visitados',
            card4: 'Eficiencia Ruta',
            storedProc: 'CMG_MOVILIDAD_ASESOR_01',
            params: {
                cod_rel: true,
                Fecha: true,
                tip_cod: 1,
                met: '1',
                incluir_historico: false  
            },
            dataIndexes: {
                card1: { row: 1, col: 2 },
                card2: { row: 3, col: 2 },
                card3: { row: 5, col: 2 },
                card4: { row: 9, col: 2 }
            }
        },
        desembolsos: {
            card1: 'Monto Desembolsado',
            card2: 'Operaciones',
            card3: 'Ticket Promedio',
            card4: 'Tiempo Promedio',
            storedProc: 'CMG_DESEMBOLSOS_ASESOR_01',
            params: {
                cod_rel: true,
                Fecha: true,
                tip_cod: 1,
                met: '1',
                moneda: 'PEN',
                estado: 'activo'
            },
            dataIndexes: {
                card1: { row: 0, col: 2 },
                card2: { row: 4, col: 2 },
                card3: { row: 8, col: 2 },
                card4: { row: 12, col: 2 }
            }
        },
        efectividad: {
            card1: 'Tasa Conversión',
            card2: 'Leads Atendidos',
            card3: 'Operaciones Cerradas',
            card4: 'Score Efectividad',
            storedProc: 'CMG_EFECTIVIDAD_ASESOR_01',
            params: {
                cod_rel: true,
                Fecha: true,
                tip_cod: 1,
                periodo: 'mensual',
                met: '1'
            },
            dataIndexes: {
                card1: { row: 3, col: 2 },
                card2: { row: 6, col: 2 },
                card3: { row: 11, col: 2 },
                card4: { row: 16, col: 2 }
            }
        }
    };

    constructor(
        public antRep: ModRepService, 
        public user: UserService, 
        public loader: StgAppLoaderService,
        private detector: ChangeDetectorRef,
    ) { 
        this.tblHeadersCategorizacion = cloneObject(tblHeadersCategorizacion); 
    }

    ngOnInit(): void {
        this.Ccategorizacion= false;
        this.loader.open()
        this.load0 = new BehaviorSubject(false);
        this.setDefaults();
        let profile = this.user.get('profile');
        this.currentDate = moment(profile.curr_fec).format("YYYY-MM-DD"); 
        this.perfil.usu.img_url = profile.pic_url
        this.perfil.usu.nom = profile.nombre;
        this.perfil.usu.carg = profile.cargo
        this.perfil.num_doc = profile.num_doc
        this.perfil.cod_rel = profile.cod_bt
        this.usuarioBT = profile.cod_bt
        this.Opts = tableConfOPTS; 
        this.loadData()
    }

    private setDefaults() {
        this.perfil = cloneObject(perfilConfig)
        this.VariableCard1 = null;
        this.VariableCard2 = null;
        this.VariableCard3 = null;
        this.VariableCard4 = null;
    }

    changeTab(tab: TabType) {
        this.loader.open()
        this.activeTab = tab;
        this.VariableCard1 = null;
        this.VariableCard2 = null;
        this.VariableCard3 = null;
        this.VariableCard4 = null;
        this.loadData();
    }

    isActiveTab(tab: TabType): boolean {
        return this.activeTab === tab;
    }

    getCurrentConfig() {
        return this.tabConfig[this.activeTab];
    }

    private buildParams(paramsConfig: any): any {
        const params: any = {};
        
        for (const key in paramsConfig) {
            const value = paramsConfig[key];
            
            if (value === true) {
                if (key === 'cod_rel') {
                    params[key] = this.perfil.cod_rel;
                } else if (key === 'Fecha') {
                    params[key] = this.currentDate;
                }else if (key === 'usuariobt') {
                    params[key] = this.usuarioBT;
                }else if (key === 'cod_bt') {
                    params[key] = this.usuarioBT;
                }
            } else {
                params[key] = value;
            }
        }
        
        return params;
    }

    loadData() {
        const config = this.getCurrentConfig(); 
        const params = this.buildParams(config.params);
        
        this.antRep.getRegularTableResult(config.storedProc, params).subscribe(x => { 
            const r = x.body.resultado;  
            
            const indexes = config.dataIndexes;
            
            if (config.storedProc === 'Tab_Dig_Com_A_01') {
                console.log(r)
                this.VariableCard1 = r.meta1[0]["meta"]
                this.VariableCard2 = r.meta1[0]["carteraCount"]
                this.VariableCard3 = r.meta1[0]["enroladoCount"]
                this.VariableCard4 = r.meta1[0]["usabilidadCount"]
                this.dataSource = r.data; 
                this.headerDefs = JSON.parse(r.headers);

            }
            else if (config.storedProc === 'REP_CATEGO_ASE_01') {
                this.VariableCard1 = r.meta1[0]["r1"]
                this.VariableCard2 = r.meta1[0]["r2"]
                this.VariableCard3 = r.meta1[0]["r3"]
                this.VariableCard4 = r.meta1[0]["r4"]

                this.c1 = r.data[0]
                this.c2 = r.data[1]
                this.c3 = r.data[2]
                this.c4 = r.data[3]
                this.c5 = r.data[4]
                this.c6 = r.data[5] 
                this.Ccategorizacion = true;

                const dynamicValues: { [key: string]: string } = {
                    'ci1': r.data[0],
                    'ci2': r.data[1],
                    'ci3': r.data[2],
                    'ci4': r.data[3],
                    'ci5': r.data[4],
                    'ci6': r.data[5]
                };
  
                this.dataSource = r.meta1;  
                this.headerDefs = tblHeadersCategorizacion.map((header, index) => ({
                    ...header,
                    label: r.data[index]?.nom || header.label 
                }));
                  
            }
            else {
                this.Ccategorizacion= false;
                this.VariableCard1 = this.extractData(r.data, indexes.card1);
                this.VariableCard2 = this.extractData(r.data, indexes.card2);
                this.VariableCard3 = this.extractData(r.data, indexes.card3);
                this.VariableCard4 = this.extractData(r.data, indexes.card4);
                this.dataSource = r.data; 
                this.headerDefs = JSON.parse(r.headers);
            } 
            this.loader.close()
            this.load0.next(true);
        })
    }
    
    private extractData(data: any[][], index: { row: number, col: number }): any {
        try {
            if (data && data[index.row] && data[index.row][index.col] !== undefined) {
                return data[index.row][index.col];
            } 
            return null;
        } catch (error) { 
            return null;
        }
    }
}
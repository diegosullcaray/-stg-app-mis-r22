import * as moment from 'moment';
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { cloneObject, isNullOrUndefined } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { MonImrAntService } from "./mon-imr-ant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { principalConfig, filter1 } from "../../principal/principal.util";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class MonImrService {
    tip_cod: number;
    cod_rel: string;
    imp: number;
    config: any; 
    curr_hier: any;

    loading: boolean
    firstLoad: boolean;

    curr_fec: string;

    principal: any;
    detalle: any;
    tip_cod2: any;

    dataHears: any;

    lvl_scroll: [];
    show_lvl_scroll: boolean;

    dataSource: any;

    filter1: any;
    selector1: any;
    firstload: boolean;
    showFilterFlagAsesor: boolean;
    showFilterBox: boolean;  
    tipcod4: any;
    codrel4: any;

    private isLoading = false; // Flag para evitar múltiples llamadas

    constructor(
        private loader: StgAppLoaderService,
        private user: UserService,
        private antAdmin: ModSysAdminService,
        public mDialog: MatDialog,
        private antSali: MonImrAntService,
        private sanitizer: DomSanitizer
    ) {
        this.setDefaults();
    } 

    // Método principal con async/await
    async loadData() {
        if (this.isLoading) return; // Evitar múltiples llamadas simultáneas
        
        this.isLoading = true;
        this.loader.open();
        
        try {
            let profile = this.user.get('profile');
            this.curr_fec = profile.curr_fec;
            //console.log(profile.tip_use)
            
            if (profile.tip_use === 1) {
                this.tip_cod = 1;
                this.cod_rel = profile.cod_bt;
                this.principal.tip_cod = 1;
                await this.setDsAsync(this.tip_cod, this.cod_rel);
            } else {
                await this.getBaseHierAsync();
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            this.isLoading = false;
            this.loader.close();
        }
    }

    onToggleSelect(Sitem: any) {  
        // ✅ Solo procesar si es diferente al actual
        //console.log(this.selector1?.val);
        //console.log(Sitem.val);
        if (this.selector1?.val !== Sitem.val) {
            //console.log(`Cambiando selección de "${this.selector1?.label || 'ninguno'}" a "${Sitem.label}"`);
            
            // ✅ Actualizar el selector
            this.selector1 = Sitem; 
            
            if (!this.firstload) { 
                // ✅ Mostrar loader para cambios de selección
                this.loader.open();
                this.principal.loading = true;
                //console.log('Cargando datos para:', Sitem.label);
                this.setDs(this.tipcod4, this.codrel4);
                //console.log(1);  
                //console.log('des1'+this.tip_cod + ' ' + this.tipcod4);
                this.tip_cod = this.tipcod4;
                this.cod_rel = this.codrel4;
                //console.log('ig1'+this.tip_cod + ' ' + this.tipcod4);
            } else {
                // ✅ Si es la primera carga, ejecutar loadData para mostrar el loader
                //console.log('Primera carga con selección:', Sitem.label);
                this.firstload = false; // Marcar que ya no es la primera carga
                this.loadData();
                //console.log(2);
            }
        } else if (this.firstload) {
            // ✅ Si es el mismo selector pero primera carga, también cargar datos
            //console.log('Primera carga con mismo selector:', Sitem.label);
            this.firstload = false;
            this.loadData();
            //console.log(3);
        } else {
            //console.log(4);
            //console.log('Selección no cambiada, mantener:', Sitem.label);
        }
        

    }

    onTabChanged(evt: any) {
        this.showFilterBox = evt.index == 2 ? true : false;
        this.showFilterFlagAsesor = evt.index == 2 ? false : true;
    }       

    clean() {
        this.setDefaults();
    }

    private setDefaults() {
        this.firstLoad = true;
        this.principal = cloneObject(principalConfig);
        this.show_lvl_scroll = false;
        this.curr_hier = { des_rel: "", des_lab: "" }; 
    }

    // Versión async de getBaseHier
    private getBaseHierAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.antAdmin.getBaseHierarchy(this.user.email, 9).subscribe({
                next: (x) => {
                    let br: any = x.body;
                    let h = br.base_hierarchy;
                    if (!isNullOrUndefined(h)) {
                        //console.log('des2'+this.tip_cod + ' ' + this.tipcod4);
                        this.tip_cod = h[0].tip_cod;
                        this.cod_rel = h[0].cod_rel;
                        this.tipcod4 = h[0].tip_cod;
                        this.codrel4 = h[0].cod_rel; 
                        this.imp = h[0].imp;
                        let currentDate = moment(this.curr_fec).format("YYYY-MM-DD"); 
                        //console.log('ig2'+this.tip_cod + ' ' + this.tipcod4);
                        
                        this.antAdmin.getLevelHierarchy(9, h[0].lvl, this.tip_cod, [this.cod_rel], { key: "fec", val: currentDate }).subscribe({
                            next: (x) => {
                                let lh = x.body.level_hierarchy;
                                let cl = lh[0]; 
                                this.saveBuffer({ tip_cod: cl.tip_cod, cod_rel: cl.cod_rel, des_rel: cl.des_rel });
                                this.principal.tip_cod = h[0].tip_cod;
                                
                                // Llamar a setDsAsync y esperar su resolución
                                this.setDsAsync(h[0].tip_cod, h[0].cod_rel).then(() => {
                                    this.tip_cod2 = cl;
                                    resolve();
                                }).catch(reject);
                            },
                            error: reject
                        });
                        //console.log(this.tip_cod + ' ' + this.tipcod4);

                    } else {
                        resolve();
                    }
                },
                error: reject
            });
        });
    }

    // Versión async de setDs
    private setDsAsync(tip_cod: number, cod_rel: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.firstLoad) {
                this.principal.loading = true;
            }

            this.antSali.getDataSources(tip_cod, cod_rel, this.curr_fec, this.selector1.val).subscribe({
                next: (x) => {
                    const semaforoKeys = ["Esp1","Esp2","Esp3"]; 
                    let ds = x.body.resultado;   

                    // IncVarMes
                const allIncVarMesValues = ds.table.map(row => parseFloat(row["IncVarMes"])); 
                const positiveNumbers = allIncVarMesValues.filter((n) => n > 0); 
                const negativeNumbers = allIncVarMesValues.filter((n) => n < 0); 
                    // Ordena los números positivos de menor a mayor
                const sortedPositiveNumbers = [...positiveNumbers].sort((a, b) => a - b); 
                const sortedNegativeNumbers = [...negativeNumbers].sort((a, b) => a - b); 

                const allIncVarMesValues_tmm = ds.table.map(row => parseFloat(row["IncTMM"])); 
                const positiveNumbers_tmm = allIncVarMesValues_tmm.filter((n) => n > 0); 
                const negativeNumbers_tmm = allIncVarMesValues_tmm.filter((n) => n < 0);  
                const sortedPositiveNumbers_tmm = [...positiveNumbers_tmm].sort((a, b) => a - b); 
                const sortedNegativeNumbers_tmm = [...negativeNumbers_tmm].sort((a, b) => a - b); 

                // IngVarMes
                const allIngVarMesValues = ds.table.map(row => parseFloat(row["IngVarMes"])); 
                const positiveNumbers2 = allIngVarMesValues.filter((n) => n > 0);
                const negativeNumbers2 = allIngVarMesValues.filter((n) => n < 0);
                const sortedPositiveNumbers2 = [...positiveNumbers2].sort((a, b) => a - b); 
                const sortedNegativeNumbers2 = [...negativeNumbers2].sort((a, b) => a - b); 
                
                const allIngVarMesValues_tmm = ds.table.map(row => parseFloat(row["IngTMM"])); 
                const positiveNumbers2_tmm = allIngVarMesValues_tmm.filter((n) => n > 0);
                const negativeNumbers2_tmm = allIngVarMesValues_tmm.filter((n) => n < 0);
                const sortedPositiveNumbers2_tmm = [...positiveNumbers2_tmm].sort((a, b) => a - b); 
                const sortedNegativeNumbers2_tmm = [...negativeNumbers2_tmm].sort((a, b) => a - b); 

                // SalVarMes
                const allSalVarMesValues = ds.table.map(row => parseFloat(row["SalVarMes"])); 
                const positiveNumbers3 = allSalVarMesValues.filter((n) => n > 0);
                const negativeNumbers3 = allSalVarMesValues.filter((n) => n < 0);
                const sortedPositiveNumbers3 = [...positiveNumbers3].sort((a, b) => a - b); 
                const sortedNegativeNumbers3 = [...negativeNumbers3].sort((a, b) => a - b); 

                const allSalVarMesValues_tmm = ds.table.map(row => parseFloat(row["SalTMM"])); 
                const positiveNumbers3_tmm = allSalVarMesValues_tmm.filter((n) => n > 0);
                const negativeNumbers3_tmm = allSalVarMesValues_tmm.filter((n) => n < 0);
                const sortedPositiveNumbers3_tmm = [...positiveNumbers3_tmm].sort((a, b) => a - b); 
                const sortedNegativeNumbers3_tmm = [...negativeNumbers3_tmm].sort((a, b) => a - b); 


                this.principal.dataTable = ds.table.map(row => { 
                    const newRow = { ...row };

                    for (const controlKey of semaforoKeys) {
                        if (controlKey === "Esp1") {  
                            const number = row["IncVarMes"];
                            let color = 'gray';
                            
                            if (number > 0) { 
                                // Encuentra el índice del número en el array ordenado
                                const index = sortedPositiveNumbers.indexOf(number); 
                                // Normaliza el índice para que esté entre 0 y 1
                                const normalizedIndex = sortedPositiveNumbers.length > 1 ? index / (sortedPositiveNumbers.length - 1) : 0; 
                                // Ahora usa esta posición normalizada para el cálculo de la luminosidad
                                const lightness = 75 - normalizedIndex * 45; 
                                color = `hsl(0, 75%, ${lightness}%)`;
                               
                            } else if (number < 0) { 
                                const index = sortedNegativeNumbers.indexOf(number); 
                                const normalizedIndex = sortedNegativeNumbers.length > 1 ? index / (sortedNegativeNumbers.length - 1) : 0; 
                                const lightness = 75 - normalizedIndex * 45;
                                color = `hsl(240, 75%, ${lightness}%)`; 
                            }


                            const number_tmm = row["IncTMM"];
                            let color_tmm = 'gray'; 
                            if (number_tmm > 0) {  
                                const index_tmm = sortedPositiveNumbers_tmm.indexOf(number_tmm);  
                                const normalizedIndex_tmm = sortedPositiveNumbers_tmm.length > 1 ? index_tmm / (sortedPositiveNumbers_tmm.length - 1) : 0;  
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45; 
                                color_tmm = `hsl(0, 75%, ${lightness_tmm}%)`; 
                            } else if (number_tmm < 0) { 
                                const index_tmm = sortedNegativeNumbers_tmm.indexOf(number_tmm); 
                                const normalizedIndex_tmm = sortedNegativeNumbers_tmm.length > 1 ? index_tmm / (sortedNegativeNumbers_tmm.length - 1) : 0; 
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45;
                                color_tmm = `hsl(240, 75%, ${lightness_tmm}%)`; 
                            }
                            
                            const htmlString = `<div class="cell-content">  
                                <span class="number2" style="color: ${color};display: block; text-align: right;" >${row["_IncVarMes"] || ''}</span>
                            </div>`;
                            const htmlString_tmm = `<div class="cell-content">  
                                <span class="number2" style="color: ${color_tmm};display: block; text-align: right;" >${row["_IncTMM"] || ''}</span>
                            </div>`;
                           newRow["IncVarMes"] = this.sanitizer.bypassSecurityTrustHtml(htmlString);
                           newRow["IncTMM"] = this.sanitizer.bypassSecurityTrustHtml(htmlString_tmm);

                        } else if (controlKey === "Esp2") {
                            const number2 = row["IngVarMes"];
                            let color2 = 'gray';
                            
                            
                             if (number2 > 0) {  
                                const index = sortedPositiveNumbers2.indexOf(number2);  
                                const normalizedIndex = sortedPositiveNumbers2.length > 1 ? index / (sortedPositiveNumbers2.length - 1) : 0;  
                                const lightness = 75 - normalizedIndex * 45; 
                                color2 = `hsl(0, 75%, ${lightness}%)`;
                               
                            } else if (number2 < 0) { 
                                const index = sortedNegativeNumbers2.indexOf(number2); 
                                const normalizedIndex = sortedNegativeNumbers2.length > 1 ? index / (sortedNegativeNumbers2.length - 1) : 0; 
                                const lightness = 75 - normalizedIndex * 45;
                                color2 = `hsl(240, 75%, ${lightness}%)`; 
                            } 

                            const number2_tmm = row["IngTMM"];
                            let color2_tmm = 'gray';
                            
                            
                             if (number2_tmm > 0) {  
                                const index_tmm = sortedPositiveNumbers2_tmm.indexOf(number2_tmm);  
                                const normalizedIndex_tmm = sortedPositiveNumbers2_tmm.length > 1 ? index_tmm / (sortedPositiveNumbers2_tmm.length - 1) : 0;  
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45; 
                                color2_tmm = `hsl(0, 75%, ${lightness_tmm}%)`;
                               
                            } else if (number2_tmm < 0) { 
                                const index_tmm = sortedNegativeNumbers2_tmm.indexOf(number2_tmm); 
                                const normalizedIndex_tmm = sortedNegativeNumbers2_tmm.length > 1 ? index_tmm / (sortedNegativeNumbers2_tmm.length - 1) : 0; 
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45;
                                color2_tmm = `hsl(240, 75%, ${lightness_tmm}%)`; 
                            } 

                            const htmlString2 = `<div class="cell-content">  
                                <span class="number2" style="color: ${color2};">${row["_IngVarMes"] || ''}</span>  
                            </div>`;
                            const htmlString2_tmm = `<div class="cell-content">  
                                <span class="number2" style="color: ${color2_tmm};">${row["_IngTMM"] || ''}</span>  
                            </div>`;
                            newRow["IngVarMes"] = this.sanitizer.bypassSecurityTrustHtml(htmlString2);
                            newRow["IngTMM"] = this.sanitizer.bypassSecurityTrustHtml(htmlString2_tmm);

                        } else if (controlKey === "Esp3") {
                            const number3 = row["SalVarMes"];
                            let color3 = 'gray';

                            if (number3 > 0) { //se invierten los colores a pedido del usuario 
                                const index = sortedPositiveNumbers3.indexOf(number3);  
                                const normalizedIndex = sortedPositiveNumbers3.length > 1 ? index / (sortedPositiveNumbers3.length - 1) : 0;  
                                const lightness = 75 - normalizedIndex * 45; 
                                color3 = `hsl(240, 75%, ${lightness}%)`;
                               
                            } else if (number3 < 0) { 
                                const index = sortedNegativeNumbers3.indexOf(number3); 
                                const normalizedIndex = sortedNegativeNumbers3.length > 1 ? index / (sortedNegativeNumbers3.length - 1) : 0; 
                                const lightness = 75 - normalizedIndex * 45;
                                color3 = `hsl(0, 75%, ${lightness}%)`; 
                            } 

                            const number3_tmm = row["SalTMM"];
                            let color3_tmm = 'gray';

                            if (number3_tmm > 0) {  
                                const index_tmm = sortedPositiveNumbers3_tmm.indexOf(number3_tmm);  
                                const normalizedIndex_tmm = sortedPositiveNumbers3_tmm.length > 1 ? index_tmm / (sortedPositiveNumbers3_tmm.length - 1) : 0;  
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45; 
                                color3_tmm = `hsl(240, 75%, ${lightness_tmm}%)`;
                               
                            } else if (number3_tmm < 0) { 
                                const index_tmm = sortedNegativeNumbers3_tmm.indexOf(number3_tmm); 
                                const normalizedIndex_tmm = sortedNegativeNumbers3_tmm.length > 1 ? index_tmm / (sortedNegativeNumbers3_tmm.length - 1) : 0; 
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45;
                                color3_tmm = `hsl(0, 75%, ${lightness_tmm}%)`; 
                            } 


                            const htmlString3 = `<div class="cell-content">  
                                <span class="number2" style="color: ${color3};">${row["_SalVarMes"] || ''}</span>
                            </div>`;
                            const htmlString3_tmm  = `<div class="cell-content">  
                                <span class="number2" style="color: ${color3_tmm };">${row["_SalTMM"] || ''}</span>
                            </div>`;
                            
                            newRow["SalVarMes"] = this.sanitizer.bypassSecurityTrustHtml(htmlString3);
                            newRow["SalTMM"] = this.sanitizer.bypassSecurityTrustHtml(htmlString3_tmm);
                        }
                    }
                    return newRow;
                });

                    const parsedHeaders = JSON.parse(ds.dataHeaders[0]['Headers']); 
                    const headersProcesados = parsedHeaders.filter(
                        h => !(h.cellStyle?.display?.toLowerCase() === 'none')
                    );

                    this.principal.dataCards = ds.cards;
                    this.principal.dataHeaders = headersProcesados;
                    this.principal.loading = false;
                    resolve(); // ✅ Resolver la promesa cuando todo esté listo
                },
                error: (error) => {
                    this.principal.loading = false;
                    reject(error); // ✅ Rechazar en caso de error
                }
            });
        });
    }

    // ✅ Versión síncrona mejorada de setDs con manejo del loader
    private setDs(tip_cod: number, cod_rel: string) {
        // ✅ No mostrar loader aquí porque ya se muestra en onToggleSelect
        if (!this.firstLoad) {
            this.principal.loading = true;
        }  

        this.antSali.getDataSources(tip_cod, cod_rel, this.curr_fec, this.selector1.val).subscribe({
            next: (x) => {
                // Mismo procesamiento que setDsAsync pero sin Promise
                const semaforoKeys = ["Esp1","_IncVarMes","IncVarMes","Esp2","_IngVarMes","IngVarMes","Esp3","_SalVarMes","SalVarMes"]; 
                //const semaforoKeys = ["Esp1","_IncVarMes","IncVarMes","Esp2","_IngVarMes","IngVarMes","Esp3","_SalVarMes","SalVarMes"]; 
                let ds = x.body.resultado;   
                 
                // IncVarMes
                const allIncVarMesValues = ds.table.map(row => parseFloat(row["IncVarMes"])); 
                const positiveNumbers = allIncVarMesValues.filter((n) => n > 0); 
                const negativeNumbers = allIncVarMesValues.filter((n) => n < 0); 
                    // Ordena los números positivos de menor a mayor
                const sortedPositiveNumbers = [...positiveNumbers].sort((a, b) => a - b); 
                const sortedNegativeNumbers = [...negativeNumbers].sort((a, b) => a - b); 

                const allIncVarMesValues_tmm = ds.table.map(row => parseFloat(row["IncTMM"])); 
                const positiveNumbers_tmm = allIncVarMesValues_tmm.filter((n) => n > 0); 
                const negativeNumbers_tmm = allIncVarMesValues_tmm.filter((n) => n < 0);  
                const sortedPositiveNumbers_tmm = [...positiveNumbers_tmm].sort((a, b) => a - b); 
                const sortedNegativeNumbers_tmm = [...negativeNumbers_tmm].sort((a, b) => a - b); 

                // IngVarMes
                const allIngVarMesValues = ds.table.map(row => parseFloat(row["IngVarMes"])); 
                const positiveNumbers2 = allIngVarMesValues.filter((n) => n > 0);
                const negativeNumbers2 = allIngVarMesValues.filter((n) => n < 0);
                const sortedPositiveNumbers2 = [...positiveNumbers2].sort((a, b) => a - b); 
                const sortedNegativeNumbers2 = [...negativeNumbers2].sort((a, b) => a - b); 
                
                const allIngVarMesValues_tmm = ds.table.map(row => parseFloat(row["IngTMM"])); 
                const positiveNumbers2_tmm = allIngVarMesValues_tmm.filter((n) => n > 0);
                const negativeNumbers2_tmm = allIngVarMesValues_tmm.filter((n) => n < 0);
                const sortedPositiveNumbers2_tmm = [...positiveNumbers2_tmm].sort((a, b) => a - b); 
                const sortedNegativeNumbers2_tmm = [...negativeNumbers2_tmm].sort((a, b) => a - b); 

                // SalVarMes
                const allSalVarMesValues = ds.table.map(row => parseFloat(row["SalVarMes"])); 
                const positiveNumbers3 = allSalVarMesValues.filter((n) => n > 0);
                const negativeNumbers3 = allSalVarMesValues.filter((n) => n < 0);
                const sortedPositiveNumbers3 = [...positiveNumbers3].sort((a, b) => a - b); 
                const sortedNegativeNumbers3 = [...negativeNumbers3].sort((a, b) => a - b); 

                const allSalVarMesValues_tmm = ds.table.map(row => parseFloat(row["SalTMM"])); 
                const positiveNumbers3_tmm = allSalVarMesValues_tmm.filter((n) => n > 0);
                const negativeNumbers3_tmm = allSalVarMesValues_tmm.filter((n) => n < 0);
                const sortedPositiveNumbers3_tmm = [...positiveNumbers3_tmm].sort((a, b) => a - b); 
                const sortedNegativeNumbers3_tmm = [...negativeNumbers3_tmm].sort((a, b) => a - b); 

                 


                this.principal.dataTable = ds.table.map(row => { 
                    const newRow = { ...row };

                    for (const controlKey of semaforoKeys) {
                        if (controlKey === "Esp1") {  
                            const number = row["IncVarMes"];
                            let color = 'gray';
                            
                            if (number > 0) { 
                                // Encuentra el índice del número en el array ordenado
                                const index = sortedPositiveNumbers.indexOf(number); 
                                // Normaliza el índice para que esté entre 0 y 1
                                const normalizedIndex = sortedPositiveNumbers.length > 1 ? index / (sortedPositiveNumbers.length - 1) : 0; 
                                // Ahora usa esta posición normalizada para el cálculo de la luminosidad
                                const lightness = 75 - normalizedIndex * 45; 
                                color = `hsl(0, 75%, ${lightness}%)`;
                               
                            } else if (number < 0) { 
                                const index = sortedNegativeNumbers.indexOf(number); 
                                const normalizedIndex = sortedNegativeNumbers.length > 1 ? index / (sortedNegativeNumbers.length - 1) : 0; 
                                const lightness = 75 - normalizedIndex * 45;
                                color = `hsl(240, 75%, ${lightness}%)`; 
                            }


                            const number_tmm = row["IncTMM"];
                            let color_tmm = 'gray'; 
                            if (number_tmm > 0) {  
                                const index_tmm = sortedPositiveNumbers_tmm.indexOf(number_tmm);  
                                const normalizedIndex_tmm = sortedPositiveNumbers_tmm.length > 1 ? index_tmm / (sortedPositiveNumbers_tmm.length - 1) : 0;  
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45; 
                                color_tmm = `hsl(0, 75%, ${lightness_tmm}%)`; 
                            } else if (number_tmm < 0) { 
                                const index_tmm = sortedNegativeNumbers_tmm.indexOf(number_tmm); 
                                const normalizedIndex_tmm = sortedNegativeNumbers_tmm.length > 1 ? index_tmm / (sortedNegativeNumbers_tmm.length - 1) : 0; 
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45;
                                color_tmm = `hsl(240, 75%, ${lightness_tmm}%)`; 
                            }
                            
                            const htmlString = `<div class="cell-content">  
                                <span class="number2" style="color: ${color};display: block; text-align: right;" >${row["_IncVarMes"] || ''}</span>
                            </div>`;
                            const htmlString_tmm = `<div class="cell-content">  
                                <span class="number2" style="color: ${color_tmm};display: block; text-align: right;" >${row["_IncTMM"] || ''}</span>
                            </div>`;
                           newRow["IncVarMes"] = this.sanitizer.bypassSecurityTrustHtml(htmlString);
                           newRow["IncTMM"] = this.sanitizer.bypassSecurityTrustHtml(htmlString_tmm);

                        } else if (controlKey === "Esp2") {
                            const number2 = row["IngVarMes"];
                            let color2 = 'gray';
                            
                            
                             if (number2 > 0) {  
                                const index = sortedPositiveNumbers2.indexOf(number2);  
                                const normalizedIndex = sortedPositiveNumbers2.length > 1 ? index / (sortedPositiveNumbers2.length - 1) : 0;  
                                const lightness = 75 - normalizedIndex * 45; 
                                color2 = `hsl(0, 75%, ${lightness}%)`;
                               
                            } else if (number2 < 0) { 
                                const index = sortedNegativeNumbers2.indexOf(number2); 
                                const normalizedIndex = sortedNegativeNumbers2.length > 1 ? index / (sortedNegativeNumbers2.length - 1) : 0; 
                                const lightness = 75 - normalizedIndex * 45;
                                color2 = `hsl(240, 75%, ${lightness}%)`; 
                            } 

                            const number2_tmm = row["IngTMM"];
                            let color2_tmm = 'gray';
                            
                            
                             if (number2_tmm > 0) {  
                                const index_tmm = sortedPositiveNumbers2_tmm.indexOf(number2_tmm);  
                                const normalizedIndex_tmm = sortedPositiveNumbers2_tmm.length > 1 ? index_tmm / (sortedPositiveNumbers2_tmm.length - 1) : 0;  
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45; 
                                color2_tmm = `hsl(0, 75%, ${lightness_tmm}%)`;
                               
                            } else if (number2_tmm < 0) { 
                                const index_tmm = sortedNegativeNumbers2_tmm.indexOf(number2_tmm); 
                                const normalizedIndex_tmm = sortedNegativeNumbers2_tmm.length > 1 ? index_tmm / (sortedNegativeNumbers2_tmm.length - 1) : 0; 
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45;
                                color2_tmm = `hsl(240, 75%, ${lightness_tmm}%)`; 
                            } 

                            const htmlString2 = `<div class="cell-content">  
                                <span class="number2" style="color: ${color2};">${row["_IngVarMes"] || ''}</span>  
                            </div>`;
                            const htmlString2_tmm = `<div class="cell-content">  
                                <span class="number2" style="color: ${color2_tmm};">${row["_IngTMM"] || ''}</span>  
                            </div>`;
                            newRow["IngVarMes"] = this.sanitizer.bypassSecurityTrustHtml(htmlString2);
                            newRow["IngTMM"] = this.sanitizer.bypassSecurityTrustHtml(htmlString2_tmm);

                        } else if (controlKey === "Esp3") {
                            const number3 = row["SalVarMes"];
                            let color3 = 'gray';

                            if (number3 > 0) { //se invierten los colores a pedido del usuario 
                                const index = sortedPositiveNumbers3.indexOf(number3);  
                                const normalizedIndex = sortedPositiveNumbers3.length > 1 ? index / (sortedPositiveNumbers3.length - 1) : 0;  
                                const lightness = 75 - normalizedIndex * 45; 
                                color3 = `hsl(240, 75%, ${lightness}%)`;
                               
                            } else if (number3 < 0) { 
                                const index = sortedNegativeNumbers3.indexOf(number3); 
                                const normalizedIndex = sortedNegativeNumbers3.length > 1 ? index / (sortedNegativeNumbers3.length - 1) : 0; 
                                const lightness = 75 - normalizedIndex * 45;
                                color3 = `hsl(0, 75%, ${lightness}%)`; 
                            } 

                            const number3_tmm = row["SalTMM"];
                            let color3_tmm = 'gray';

                            if (number3_tmm > 0) {  
                                const index_tmm = sortedPositiveNumbers3_tmm.indexOf(number3_tmm);  
                                const normalizedIndex_tmm = sortedPositiveNumbers3_tmm.length > 1 ? index_tmm / (sortedPositiveNumbers3_tmm.length - 1) : 0;  
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45; 
                                color3_tmm = `hsl(240, 75%, ${lightness_tmm}%)`;
                               
                            } else if (number3_tmm < 0) { 
                                const index_tmm = sortedNegativeNumbers3_tmm.indexOf(number3_tmm); 
                                const normalizedIndex_tmm = sortedNegativeNumbers3_tmm.length > 1 ? index_tmm / (sortedNegativeNumbers3_tmm.length - 1) : 0; 
                                const lightness_tmm = 75 - normalizedIndex_tmm * 45;
                                color3_tmm = `hsl(0, 75%, ${lightness_tmm}%)`; 
                            } 


                            const htmlString3 = `<div class="cell-content">  
                                <span class="number2" style="color: ${color3};">${row["_SalVarMes"] || ''}</span>
                            </div>`;
                            const htmlString3_tmm  = `<div class="cell-content">  
                                <span class="number2" style="color: ${color3_tmm };">${row["_SalTMM"] || ''}</span>
                            </div>`;
                            
                            newRow["SalVarMes"] = this.sanitizer.bypassSecurityTrustHtml(htmlString3);
                            newRow["SalTMM"] = this.sanitizer.bypassSecurityTrustHtml(htmlString3_tmm);
                        }
                    }
                    return newRow;
                });

                const parsedHeaders = JSON.parse(ds.dataHeaders[0]['Headers']); 
                const headersProcesados = parsedHeaders.filter(
                    h => !(h.cellStyle?.display?.toLowerCase() === 'none')
                );

                this.principal.dataCards = ds.cards;
                this.principal.dataHeaders = headersProcesados;
                this.principal.loading = false;
                
                // ✅ Cerrar loader después de procesar los datos
                this.loader.close();
            },
            error: (error) => {
                this.principal.loading = false;
                // ✅ Cerrar loader también en caso de error
                this.loader.close();
                console.error('Error in setDs:', error);
            }
        }); 
    }

    private saveBuffer(obj: any) {
        obj['idx'] = this.principal.hierBuffer.length;
        this.setCurrHier(obj.des_rel, obj.tip_cod);
        this.principal.hierBuffer.push(obj);
    }

    private setCurrHier(des_rel: string, tip_cod: number) {
        this.curr_hier.des_rel = des_rel; 
        if (tip_cod == 18) {
            this.curr_hier.des_lab = "Unidad";
        } else if (tip_cod == 19) {
            this.curr_hier.des_lab = "Corredor";
        } else if (tip_cod == 20) {
            this.curr_hier.des_lab = "Territorio";
        } else if (tip_cod == 21) {
            this.curr_hier.des_lab = "Grupo";
        } else {
            this.curr_hier.des_lab = "Total";
        }
    }

    changeHier(item: any) {
        if (this.principal.hierBuffer.length - 1 == item.idx) {
            return;
        }
        this.loader.open();
        this.principal.loading = true;
        let tip_cod = item.tip_cod;
        let cod_rel = item.cod_rel; 
        this.tipcod4 = item.tip_cod;
        this.codrel4 = item.cod_rel; 
        //console.log(tip_cod);
        this.principal.hierBuffer = this.principal.hierBuffer.slice(0, item.idx + 1);
        let l = this.principal.hierBuffer.length;
        let ci = this.principal.hierBuffer[l - 1];
        
        this.setCurrHier(ci.des_rel, ci.tip_cod); 
        this.setDs(tip_cod, cod_rel);
        //console.log('hier '+tip_cod+' '+this.tipcod4);
    }

    ddHier(evt: any) {
        let tip_cod = evt.tip_cod;

        if (tip_cod == 1) {
            return;
        }
        this.loader.open();
        this.tipcod4 = tip_cod;
        this.codrel4 = evt.cod_rel;
        this.principal.loading = true;
        let cod_rel = evt.cod_rel;
        this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.desc });
        this.setDs(tip_cod, cod_rel);
        //console.log('hier '+tip_cod+' '+this.tipcod4);
    }
}
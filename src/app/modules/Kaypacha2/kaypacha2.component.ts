import * as Highcharts from 'highcharts';
import { AfterContentInit, Component, OnInit } from "@angular/core";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service"; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'; 
import { UserService } from 'app/system/admin/services/user.service';
import { bonosConfig, cabeceraConfig, desempenioConfig, baseDinamizadoresConfig, preguntasConfig, historicoConfig } from './kaypacha2.util';
import { ModKaypachaService } from '../kaypacha/compartido/servicio/mod-kaypacha.service';
import { BuscadorKaypachaComponent } from './buscador/buscador.component';

@Component({
    selector: 'app-kaypacha2',
    templateUrl: './kaypacha2.component.html',
    styleUrls: ['./kaypacha2.component.scss'],
    //providers: [DatePipe]
})
export class Kaypacha2Component implements OnInit, AfterContentInit {
    Highcharts: typeof Highcharts = Highcharts;
    loading: boolean = true;

    cabeceraConfig:any;
    preguntasConfig:any;
    bonosConfig:any;
    historicoConfig:any;
    desempenioConfig:any;
    dinamizadoresConfig:any;
    data:any;
    mostrarRanking: boolean;
    octultarPanel:boolean;
    constructor(public layout: LayoutService, private ant: ModKaypachaService, public dialog: MatDialog, public user: UserService) {

    }

    ngAfterContentInit(): void { 
    }

    ngOnInit(): void {
        this.mostrarRanking=false
        this.octultarPanel=true;
        this.cabeceraConfig=cloneObject(cabeceraConfig);
        this.preguntasConfig=cloneObject(preguntasConfig);
        this.bonosConfig=cloneObject(bonosConfig);
        this.historicoConfig=cloneObject(historicoConfig);
        this.desempenioConfig=cloneObject(desempenioConfig);
        this.dinamizadoresConfig={i1:baseDinamizadoresConfig.line,i2:baseDinamizadoresConfig.line};
        let profile = this.user.get('profile');
        console.log("profile")
        console.log(profile)
        this.getServerData(profile.cod_bt);
    }

    private getServerData(codBT?: string): void {
        this.loading = true;
        let profile = this.user.get('profile'); 
        this.ant.getColaboradoresdData(codBT).subscribe(x => { 
            let r = x.body.resultado;
            //console.log(r)
            this.cabeceraConfig.nombre = r.bloq.HDESPER;
            this.cabeceraConfig.cargo = r.bloq.HDESCAR;
            this.cabeceraConfig.posicion = onNullOrUndefined(r.bloq.rank, "--");
            //if (/*!codBT && (/*r.pars.hab_bot == "1" ||*/ profile.tip_use == 0 /*)*/) {
                if ( r.pars.hab_bot == "1" || profile.tip_use == 0 ) {
                this.cabeceraConfig.boton = true;
            }  
            this.data=r.pars.din_lis
            this.historicoConfig.puntFinal=r.puntFinal.HPUNF;
            this.historicoConfig.posicion=r.puntFinal.HDESPOS
            this.historicoConfig.Desc1=r.datVar.Desc1
            this.historicoConfig.Desc2=r.datVar.Desc2
            this.historicoConfig.data=JSON.parse(r.pars.din_lis)
            this.historicoConfig.datavar=JSON.parse(r.datVar.din_lis)
            this.historicoConfig.cab=[''] 
            this.historicoConfig.cabvar=[''] 
            this.historicoConfig.cabstyle=[''] 
            this.historicoConfig.datavarCab=[''] 
            r.cab.forEach((v, i) => {   
                
                //this.historicoConfig.cab[i]= v.RDESCAB; //v.HRDESCAB
                this.historicoConfig.cab[i]= v.HRDESCAB; //v.HRDESCAB
            });     
            r.cabvar.forEach((v, i) => {   
                
                //this.historicoConfig.cabvar[i]= v.RDESCAB;  //v.HRDESCAB
                this.historicoConfig.cabvar[i]= v.HRDESCAB;  //v.HRDESCAB
            });  
            r.cab.forEach((v, i) => {   
                
               // this.historicoConfig.cabstyle[i]= v.RDESCOL;  //v.HRDESCAB
               this.historicoConfig.cabstyle[i]= v.HRDESCAB;  //v.HRDESCAB
            });  
            // r.cab.forEach((v, i) => {   
                
            //     this.historicoConfig.datavarCab[i]= v;  //v.HRDESCAB
            // }); 
            //this.historicoConfig.hist[12] = onNullOrUndefined(r.bloq.punt_tot, '--'); 
            console.log(r);
            console.log( this.historicoConfig.cabvar)
            console.log(this.historicoConfig.cab)
            
            this.loading = false;
        });
    }
     
     
    openSearch(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            showCloseBtn: true
        }; 
        const dialogRef = this.dialog.open(BuscadorKaypachaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            if (v) {
                this.getServerData(v.cod_bt);
            }
        });
    }

}
import { AfterContentInit, Component, OnInit, ChangeDetectorRef, AfterViewInit, EventEmitter, Output } from '@angular/core'; 
import { LayoutService } from "app/system/admin/services/layout.service"; 
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'; 
import { UserService } from 'app/system/admin/services/user.service';
import { tableConf, tableOptions, tableHeaders,  tableHeaders2 } from './kaypacha3.util';
import { ModKaypachaService } from '../kaypacha/compartido/servicio/mod-kaypacha.service';
import { BuscadorKaypachaComponent } from './buscador/buscador.component';  
import { BehaviorSubject, Subject } from 'rxjs'; 

@Component({
    selector: 'app-kaypacha3',
    templateUrl: './kaypacha3.component.html',
    styleUrls: ['./kaypacha3.component.scss'], 
})
export class Kaypacha3Component implements OnInit { 
    tableConf: {}; 
  optObs = new Subject<any>(); 
    loading: boolean = true;   
    puntajeFinal: any;
    nombreUsuario: any;
    cargo: any;
    posicion: any
  dataSources: any;
  dataSources2: any;
  loadingObs: boolean;
  config: any; 
  headers:any;
  headers1_1:any;
  headers2:any;
  headers2_2:any;
  options:any;  
  boton:any;
    constructor(
        public layout: LayoutService, 
        private ant: ModKaypachaService, 
        public dialog: MatDialog, public user: UserService 
        ) {
            this.loadingObs = true;
          }
 

    ngOnInit(): void {  
        this.boton=false;  
        let profile = this.user.get('profile');  
        this.options=tableOptions;
        this.tableConf = tableConf;   
        //console.log(profile.cod_bt)
        this.getServerData(profile.cod_bt);
        //console.log(profile.cod_bt)
        this.headers = tableHeaders;
        this.headers2 = tableHeaders2; 
        
    } 
    private getServerData(codBT?: string): void {
         
        this.loading = true;  
        
        this.ant.getColaboradoresdData(codBT).subscribe(x => { 
            let profile = this.user.get('profile'); 
            this.dataSources=[]; 
            this.dataSources2=[]; 
            this.headers=[]
            this.headers1_1=[]
            this.headers2=[]
            this.headers2_2=[]

           
            this.boton = true;
            let r = x.body.resultado;   
            // if ( r.puntos.HACTBOTON == "1" || profile.tip_use == 0 ) {
            //     this.boton = true;
            // }   
            this.headers =  eval(r.cab1[0].JSONNHEAD1) ; 
            this.headers1_1 =  eval(r.cab1_1[0].JSONNHEAD1) ; 
            this.dataSources =r.res1   
            this.headers2 =  eval(r.cab2[0].JSONNHEAD1) ; 
            this.headers2_2 =  eval(r.cab2_2[0].JSONNHEAD1) ; 
            this.dataSources2 =r.res2   
            this.puntajeFinal=r.puntos.HPUNTAFINAL;
            this.posicion=r.puntos.HDESPOS;
            this.nombreUsuario=r.datosUsurio.HDESPER;
            this.cargo=r.datosUsurio.HDESCAR;  
            this.loadingObs = false;    

            
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
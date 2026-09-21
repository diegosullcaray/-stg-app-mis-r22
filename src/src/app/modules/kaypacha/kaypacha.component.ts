import * as Highcharts from 'highcharts';
import { AfterContentInit, Component, OnInit } from "@angular/core";
import { cloneObject, isNullOrUndefined, onNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { ModKaypachaService } from "./compartido/servicio/mod-kaypacha.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BuscadorKaypachaComponent } from './buscador/buscador.component';
import { UserService } from 'app/system/admin/services/user.service';
import { bonosConfig, cabeceraConfig, desempenioConfig, baseDinamizadoresConfig, preguntasConfig, puntajeConfig } from './kaypacha.util';

@Component({
    selector: 'app-kaypacha',
    templateUrl: './kaypacha.component.html',
    styleUrls: ['./kaypacha.component.scss'],
    //providers: [DatePipe]
})
export class KaypachaComponent implements OnInit, AfterContentInit {
    Highcharts: typeof Highcharts = Highcharts;
    loading: boolean = true;

    cabeceraConfig:any;
    preguntasConfig:any;
    bonosConfig:any;
    puntajeConfig:any;
    desempenioConfig:any;
    dinamizadoresConfig:any;

    constructor(public layout: LayoutService, private ant: ModKaypachaService, public dialog: MatDialog, public user: UserService) {

    }

    ngAfterContentInit(): void {
        /*Highcharts.charts.forEach(v => {
            v.setSize(null, null);
            v.redraw();
        });*/
    }

    ngOnInit(): void {
        this.cabeceraConfig=cloneObject(cabeceraConfig);
        this.preguntasConfig=cloneObject(preguntasConfig);
        this.bonosConfig=cloneObject(bonosConfig);
        this.puntajeConfig=cloneObject(puntajeConfig);
        this.desempenioConfig=cloneObject(desempenioConfig);
        this.dinamizadoresConfig={i1:baseDinamizadoresConfig.line,i2:baseDinamizadoresConfig.line};
        this.getServerData();
    }

    private getServerData(codBT?: string): void {
        this.loading = true;
        let profile = this.user.get('profile');
        this.ant.getDashboardData(codBT).subscribe(x => {
            let r = x.body.resultado;
            this.cabeceraConfig.nombre = r.bloq.col_nom;
            this.cabeceraConfig.posicion = onNullOrUndefined(r.bloq.rank, "--");
            if (!codBT && (r.pars.hab_bot == "1" || profile.tip_use == 0)) {
                this.cabeceraConfig.boton = true;
            }
            let d:string = r.pars.din_lis;
            if(!isNullOrUndefined(d)){
                let a:any = JSON.parse(d);
                a.forEach((x:any,i:number)=>{
                    let b:any;
                    if(x.type=="column"){
                        b = cloneObject(baseDinamizadoresConfig.column);
                    }else {
                        b = cloneObject(baseDinamizadoresConfig.line);
                    }
                    b.title=x.title;
                    b.options.colors[0]=x.color;
                    this.dinamizadoresConfig['i'+i]=b;
                });
            }
            this.setBloqConfig(this.preguntasConfig, r.bloq.bloq_par);
            this.setBloqConfig(this.bonosConfig, r.bloq.bloq_acum);
            this.setHistConfig(this.desempenioConfig, r.his, "bloq_des");
            this.setHistConfig(this.dinamizadoresConfig, r.his, "bloq_din");
            this.puntajeConfig.anio = r.bloq.anio;
            r.his.forEach((v, i) => {
                this.puntajeConfig.hist[i] = v.punt;
            });
            this.puntajeConfig.hist[12] = onNullOrUndefined(r.bloq.punt_tot, '--');
            this.loading = false;
        });
    }

    private setHistConfig(base: any, cfg: any, key: string) {
        cfg.forEach((v: any, i: number) => {
            if (v[key]) {
                let co: any = JSON.parse(v[key]);
                Object.keys(base).forEach(k => {
                    if (co[k]) {
                        base[k]['hist'][i] = co[k];
                    }
                });
            }
        });
    }

    private setBloqConfig(base: any, cfg: any): void {
        if (cfg) {
            let j = JSON.parse(cfg);
            Object.keys(j).forEach(k => {
                base[k]['val'] = j[k];
            });
        }
    }

    openSearch(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            showCloseBtn: true
        };
        //dialogConfig.disableClose = dc;
        const dialogRef = this.dialog.open(BuscadorKaypachaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            if (v) {
                this.getServerData(v.cod_bt);
            }
        });
    }

}
import { Component, OnInit } from "@angular/core";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";

@Component({
    selector: 'app-reporte-demo',
    templateUrl: './reporte-demo.component.html',
    styleUrls: ['./reporte-demo.component.scss']
})
export class ReporteDemoComponent implements OnInit{

    body:string;
    loading:boolean;

    constructor(private antRep:ModRepService,private loader:StgAppLoaderService){

    }

    ngOnInit(): void {
        this.loader.open();
        this.loading=true;
        this.antRep.getRegularTableResult('reporte-demo',{fecha:'2023-03-21',cod_user_bt:'TMPAM001'}).subscribe((x:any)=>{
            this.body = x.body.resultado.data[0].msg;
            this.loading=false;
            this.loader.close();
            //console.log(x.body.resultado.data)
        });
    }

}
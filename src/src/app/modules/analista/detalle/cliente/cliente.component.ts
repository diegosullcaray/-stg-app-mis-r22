import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AnalistaService } from "../../compartido/servicios/analista.service";
import { ModSecService } from "../../compartido/servicios/mod-sec.service";

@Component({
    selector: 'app-cliente-detalle-analista',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss']
})
export class ClienteDetalleComponent implements OnInit {
    loading:boolean;

    dataSource:any;

    constructor(private analista: AnalistaService,private antSec:ModSecService,
        private router: Router, private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.loading=true;
        let sr = this.analista.selectedRow;
        this.antSec.getDetalleCliente(this.analista.cod_bt,sr.num_doc,sr.tip_doc,sr.pais).subscribe(x=>{
            console.log(x);
            let body = x.body.resultado;
            this.dataSource=body.prof;
            this.loading=false;
        });
    }
}
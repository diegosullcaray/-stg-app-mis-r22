import { Component, OnDestroy, OnInit } from "@angular/core";
import { Incentivos4Service } from "../compartido/servicios/incentivos4.service";

@Component({
    selector: 'app-dinamizadores-incentivos4',
    templateUrl: './dinamizadores.component.html',
    styleUrls: ['./dinamizadores.component.scss']
})
export class DinamizadoresComponent implements OnInit {

    config: any;

    constructor(private inc4: Incentivos4Service) {
    }

    ngOnInit(): void {
        this.config = this.inc4.dinamizadoresConfig;
    }

    get visibleBlocks(): number {
        return this.config.blocks?.filter((c: any) => c.show).length || 1;  // evita división entre 0
    }

    get blockStyle(): any {
        // 1 1 => grow 1, shrink 1; basis => (100 / n %) menos el gap que añades en fxLayoutGap
        //console.log(`{height:110px;width:${this.visibleCards==7?180:200}px;}`);
        return { 
            width: this.visibleBlocks == 6 ? "200px" : "220px"
        };
    }
}
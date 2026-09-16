import * as Highcharts from 'highcharts';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Incentivos4Service } from "../compartido/servicios/incentivos4.service";
import { cloneObject } from 'app/core/shared/functions.util';

@Component({
    selector: 'app-avances-incentivos4',
    templateUrl: './avances.component.html',
    styleUrls: ['./avances.component.scss']
})
export class AvancesComponent implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;

    config: any;
    pieCfgs: [];

    constructor(private inc4: Incentivos4Service) {
    }

    ngOnInit(): void {
        this.config = this.inc4.avancesConfig;
        this.processPieCfgs();
    }

    private processPieCfgs(){
        this.pieCfgs = this.config.blocks?.filter((c: any) => c.show).map((c: any) => {
            let cCfg = cloneObject(this.config.pieCfg);
            let color = "lightgrey";
            if(c.val > 0.5) color = "#3399cc";
            if(c.val > 0.75) color = "#006699";
            if(c.val > 0.9) color = "#003366";
            cCfg['colors']=["#3399cc", "lightgrey"];
            return cCfg;
        });
    }

    get visibleBlocks(): number {
        return this.config.blocks?.filter((c: any) => c.show).length || 1;  // evita división entre 0
    }

    get blockSize(): any {
        // 1 1 => grow 1, shrink 1; basis => (100 / n %) menos el gap que añades en fxLayoutGap
        //console.log(`{height:110px;width:${this.visibleCards==7?180:200}px;}`);
        return { width: this.visibleBlocks == 6 ? "200px" : "220px" };
    }
}
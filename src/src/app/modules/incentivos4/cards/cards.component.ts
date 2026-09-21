import { Component, OnDestroy, OnInit } from "@angular/core";
import { Incentivos4Service } from "../compartido/servicios/incentivos4.service";

@Component({
    selector: 'app-cards-incentivos4',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
    config: any;

    constructor(private inc4: Incentivos4Service) {
    }

    ngOnInit(): void {
        this.config = this.inc4.cardsConfig;
    }

    getIconCls(val: number) {
        if (val == 0) {
            return "material-icons is dm";
        } else if (val == 1) {
            return "material-icons is am";
        } else {
            return "material-icons is nm";
        }
    }

    get visibleCards(): number {
        return this.config.cards?.filter((c: any) => c.show).length || 1;  // evita división entre 0
    }

    get cardSize(): any {
        // 1 1 => grow 1, shrink 1; basis => (100 / n %) menos el gap que añades en fxLayoutGap
        //console.log(`{height:110px;width:${this.visibleCards==7?180:200}px;}`);
        return {height:"110px",width:this.visibleCards==6?"200px":"220px"};
    }
}

import * as moment from 'moment';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Incentivos4Service } from "../compartido/servicios/incentivos4.service";
import { stringToDate1 } from 'app/core/shared/functions.util';

@Component({
    selector: 'app-principal-incentivos4',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
    config: any;
    date:any;
    
    constructor(private inc4:Incentivos4Service) {
    }

    ngOnInit(): void {
        this.date = stringToDate1("20250331");
        this.config = this.inc4.principalConfig;
    }
}
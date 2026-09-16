import { Component } from "@angular/core";
import { OnInit } from "@angular/core"; 
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";  
import { FormBuilder } from "@angular/forms";
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { GuardarBasePmComponent } from './guardar-base-pm.component';

@Component({
    selector: 'app-guardar-pm',
    templateUrl: './guardar-pm.component.html',
    styleUrls: ['./guardar-pm.component.scss'],
    animations: [bottomAlert]
})
export class GuardarPmComponent extends GuardarBasePmComponent implements OnInit {

    constructor(
        public antService: ModReportesEService, public esgService: ReportesEService,public formBuilder:FormBuilder,
        private router: Router, private activatedRoute: ActivatedRoute
    ) {
        super(antService,esgService,formBuilder);
    }

    ngOnInit(): void { 
        this.init();
    }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }
}
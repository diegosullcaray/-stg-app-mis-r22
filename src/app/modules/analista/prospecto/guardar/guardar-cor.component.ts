import { Component } from "@angular/core";
import { OnInit } from "@angular/core"; 
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util"; 
import { ProspectoCorService } from '../compartido/servicios/prospecto-cor.service';
import { ModProspectoCorService } from '../compartido/servicios/mod-prospecto-cor.service';
import { GuardarBaseCorComponent } from "./guardar-base-cor.component";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: 'app-guardar-prospecto-cor',
    templateUrl: './guardar-cor.component.html',
    styleUrls: ['./guardar-cor.component.scss'],
    animations: [bottomAlert]
})
export class GuardarCorComponent extends GuardarBaseCorComponent implements OnInit {

    constructor(
        public antService: ModProspectoCorService, public esgService: ProspectoCorService,public formBuilder:FormBuilder,
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
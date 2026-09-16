import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { FormBuilder, UntypedFormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { FrameworkEsgService } from "../compartido/servicios/framework-esg.service";
import { ModFrameworkEsgService } from "../compartido/servicios/mod-framework-esg.service";
import { EditarBaseComponent } from "./editar-base.component";

@Component({
    selector: 'app-editar-framework-esg',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.scss'],
    animations: [bottomAlert]
})
export class EditarComponent extends EditarBaseComponent implements OnInit {

    constructor(
        public antService: ModFrameworkEsgService,  public esgService: FrameworkEsgService,public formBuilder:FormBuilder,
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
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonImrService } from './compartido/servicios/mon-imr.service';

@Component({
    selector: 'app-re2-mon-imr.component',
    templateUrl: './mon-imr.component.html',
    styleUrls: ['./mon-imr.component.scss']
})
export class MonImrComponent implements OnInit, OnDestroy {
   

    constructor(private sali: MonImrService) {
        
    }

    ngOnDestroy(): void {
        this.sali.clean();
    }

    ngOnInit(): void {
        this.sali.loadData();
    }

}
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonSalidasService } from './compartido/servicios/mon-salidas.service';

@Component({
    selector: 'app-re2-mon-salidas.component',
    templateUrl: './mon-salidas.component.html',
    styleUrls: ['./mon-salidas.component.scss']
})
export class MonSalidasComponent implements OnInit, OnDestroy {
   

    constructor(private sali: MonSalidasService) {
        
    }

    ngOnDestroy(): void {
        this.sali.clean();
    }

    ngOnInit(): void {
        this.sali.loadData();
    }

}
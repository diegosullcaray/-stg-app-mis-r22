import { Component, OnDestroy, OnInit } from '@angular/core';
import { Incentivos3Service } from './compartido/servicios/incentivos3.service';

@Component({
    selector: 'app-incentivos3',
    templateUrl: './incentivos3.component.html',
    providers: [],
    styleUrls: ['./incentivos3.component.scss']
})
export class Incentivos3Component implements OnInit, OnDestroy {
   

    constructor(private inc3: Incentivos3Service) {
        
    }

    ngOnDestroy(): void {
        
        this.inc3.clean();
    }

    ngOnInit(): void {
        this.inc3.loadData();
    }

}
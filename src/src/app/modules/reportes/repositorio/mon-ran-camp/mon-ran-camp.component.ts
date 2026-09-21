import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonRanCampService } from "./compartido/servicios/mon-ran-camp.service";

@Component({
    selector: 'app-re2-mon-ran-camp.component',
    templateUrl: './mon-ran-camp.component.html',
    styleUrls: ['./mon-ran-camp.component.scss']
})
export class MonRanCampComponent implements OnInit, OnDestroy {
   

    constructor(private ranCamp: MonRanCampService) {
        
    }

    ngOnDestroy(): void {
        this.ranCamp.clean();
    }

    ngOnInit(): void {
        this.ranCamp.loadData();
    }

}
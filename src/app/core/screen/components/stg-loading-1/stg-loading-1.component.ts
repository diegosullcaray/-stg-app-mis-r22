import { Input, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { copyFields } from "app/core/shared/functions.util";

@Component({
    selector: 'stg-loading-1',
    templateUrl: './stg-loading-1.component.html',
    styleUrls: ['./stg-loading-1.component.scss']
})
export class StgLoading1 implements OnInit {
    @Input() styleConfig: {};

    ngOnInit(): void {

    }

    divStyle(): {} {
        let cfg = { 
            background: 'white',
        };
        if (this.styleConfig) {
            copyFields(cfg, this.styleConfig);
        }
        return cfg;
    }
}
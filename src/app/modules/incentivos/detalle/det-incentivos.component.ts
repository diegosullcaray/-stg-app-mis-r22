import { Inject, Input, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { onNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";

@Component({
    selector: 'det-incentivos',
    templateUrl: './det-incentivos.component.html',
    styleUrls: ['./det-incentivos.component.scss']
})
export class DetalleIncentivosComponent implements OnInit {
    rowSource:any;
    efecSource:any;

    title:string;

    constructor(@Inject(MAT_DIALOG_DATA) data,private layout:LayoutService){
        this.rowSource=data.data1;
        this.efecSource=data.data2;
        this.title=this.rowSource.monetizador;
    }

    isnull(v,r){
        return onNullOrUndefined(v,r);
    }

    getMainStyle():{}{
        let r = {
            width:'620px',
            height: '300px',
            color: 'navy'
        };
        if(this.layout.isMobile){
            r.width='250px',
            r.height='470px'
        }
        return r
    }

    ngOnInit(): void {
        
    }
}
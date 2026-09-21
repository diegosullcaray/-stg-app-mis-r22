import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-variable-kaypacha',
    templateUrl: './variable.component.html',
    styleUrls: ['./variable.component.scss']
})
export class VariableKaypachaComponent implements OnInit {
    @Input() config:any;
    
    constructor(){

    }
    setHeader(title) {
        return title;
      }
      
    setData(data, title) {
        if (!title) return ;
        return data;
      }

    ngOnInit(): void {
        
    }
}
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-historico-kaypacha',
    templateUrl: './historico.component.html',
    styleUrls: ['./historico.component.scss']
})
export class HistoricoKaypachaComponent implements OnInit {
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
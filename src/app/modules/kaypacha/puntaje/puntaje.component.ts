import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-puntaje-kaypacha',
    templateUrl: './puntaje.component.html',
    styleUrls: ['./puntaje.component.scss']
})
export class PuntajeKaypachaComponent implements OnInit {
    @Input() config:any;

    constructor(){

    }

    ngOnInit(): void {
        
    }
}
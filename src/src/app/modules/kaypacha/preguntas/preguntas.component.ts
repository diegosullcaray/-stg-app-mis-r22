import { Component, Input, OnInit } from "@angular/core";
import { LayoutService } from "app/system/admin/services/layout.service";

@Component({
    selector: 'app-preguntas-kaypacha',
    templateUrl: './preguntas.component.html',
    styleUrls: ['./preguntas.component.scss']
})
export class PreguntasKaypachaComponent implements OnInit {
    @Input() config: any;
    block_q: string[] = ['Tiempo en la posición', 'Central de riesgos', 'Disciplina', 'Auditoría, fraudes y criticidad', 'Formación'];
    block_y: any[];
    block_n: any[];

    constructor() {
    }

    ngOnInit(): void {
        this.block_y = [];
        this.block_n = [];
        Object.keys(this.config).forEach((p, i) => {
            if (i > 0) {
                let q = (i) + '.- ' + this.block_q[i - 1];
                let a = this.config[p].val;
                let qa = { q: q, a: a };
                if (a.toLowerCase() == 'si') {
                    qa['c']='preg-item1';
                    this.block_y.push(qa);
                } else {
                    qa['c']='preg-item2';
                    this.block_n.push(qa);
                }
            }
        });
        //console.log(this.block_n)
        //console.log(this.block_y)
    }

    isRankeable() {
        return this.config.p1.val.toLowerCase() == 'si';
    }

    showBlockY() {
        return this.block_y.length > 0;
    }

    showBlockN() {
        return this.block_n.length > 0;
    }
}
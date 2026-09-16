import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { isNullOrUndefined } from "app/core/shared/functions.util";

@Component({
    selector: 'stg-progress',
    templateUrl: './stg-progress.component.html',
    styleUrls: ['./stg-progress.component.scss']
})
export class StgProgressComponent implements OnInit {
    @Input() color: string = "red";
    @Input() background: string = "#e9ecef";
    @Input() height: number = 6;
    width: string = "100%";
    @Input() value: number = 0;
    @Input() min: number = 0;
    @Input() max: number = 100;
    @Input() fill: boolean =true;
    @Input() showThumb: boolean =true;

    ngOnInit(): void {
    }

    metaStyle() {
        return {
            "width": this.width
        }
    }

    baseStyle() {
        return {
            "height": this.height + "px",
            "width": "100%",
            "background": this.background,
            "border-radius": "0.25rem"
        }
    }

    currStyle() {
        let a = (this.max - this.min) / 100 * this.value;
        let b = Math.ceil(this.height * 2.5);
        let c = Math.ceil(b / 2 - this.height / 2);

        let f="#fff";
        if(this.fill){
            f = this.color;
        }

        return {
            "width": a + "%",
            "background": this.color,
            "position": "relative",
            "height": "100%",
            "--t-border": Math.ceil(this.height / 2) + 'px solid ' + this.color,
            "--t-diam": b + "px",
            "--t-right": '-' + Math.ceil(b / 2) + 'px',
            "--t-top": '-' + c + 'px',
            "--t-background": f
        }
    }
}
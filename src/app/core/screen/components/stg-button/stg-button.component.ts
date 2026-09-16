import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { LayoutService } from "app/system/admin/services/layout.service";

@Component({
    selector: 'stg-button',
    templateUrl: './stg-button.component.html',
    styleUrls: ['./stg-button.component.scss']
})
export class StgButtonComponent implements OnInit {
    @HostBinding('style.pointer-events') get pEvents(): string {
        if (this.disabled) {
            return 'none';
        }
        return 'auto';
    }

    @Input() icon: string;
    @Input() iconSource: any;
    @Input() iconType: any;
    @Input() color: any;
    @Input() hideTextOnMobil: boolean;
    @Input() buttonStyle: any;
    @Input() mode: string;//reg, min
    @Input() disabled: boolean;

    constructor(public layout: LayoutService) { }

    ngOnInit(): void {
        this.setDefault('iconSource', 'google');
        this.setDefault('iconType', '');
        this.setDefault('mode', 'reg');
        this.setDefault('disabled', false);
    }

    private setDefault(opt: any, def: any) {
        if (!this[opt]) {
            this[opt] = def;
        }
    }

    getStyle() {
        return this.buttonStyle;
    }

    iconCls() {
        let r = 'material-icons';
        if (this.iconSource == 'google') {
            let t = this.iconType;
            if (t != '') {
                r += '-' + t;
            }
        } else {
            r = 'ms-Icon ms-Icon--' + this.icon;
        }
        if (this.mode == 'min') {
            r += ' stg-btn-min-icon'
        }
        return r;
    }

}
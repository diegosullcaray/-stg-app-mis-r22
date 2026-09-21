import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";

@Component({
    selector: 'hier-rem-selector',
    templateUrl: './hier-rem-selector.component.html',
    styleUrls: ['./hier-rem-selector.component.scss']
})
export class HierRemSelectorComponent implements OnInit {
    @Input('confHier') conf_hier: any;
    @Output() onSelectHier = new EventEmitter<any>();

    dataSource: any[];
    active: boolean;
    selectedValues: any;
    title: string;
    loading: boolean;

    private curr_lvl: number;
    private callback_act:boolean;

    constructor(
        private antAdmin: ModSysAdminService,
        public layout: LayoutService,
        private dialog: MatDialog
    ) {
        this.active = false;
        this.dataSource = [];
        this.selectedValues = [];
        this.curr_lvl = 0;
        this.loading = false;
    }

    ngOnInit(): void {
        this.title = this.conf_hier.dlg_tlt;
        this.callback_act=true;
        let roots:any = this.conf_hier.roots; 
        let crls:string[]=[];
        roots.forEach(x => {
            crls.push(x.cod_rel);
        });
        this.getData(roots[0].tip_cod, crls, roots[0].lvl);
    }

    get lastSel(): any {
        let l = this.selectedValues.length;
        return this.selectedValues[l - 1];
    }

    getData(tip_cod: number, cod_rels: string[], lvl: number) {
        this.loading = true;
        this.antAdmin.getLevelHierarchy(this.conf_hier.cod_hier, lvl, tip_cod, cod_rels, this.conf_hier.params_hier).subscribe(
            x => {
                let lh = x.body.level_hierarchy;
                let dp = {
                    label: lh[0].lbl_hier,
                    level: lh[0].lvl_hier,
                    data: lh
                }
                this.dataSource.push(dp);
                if (this.callback_act) {
                    this.selectItem(lh[0]);
                }
                this.active = true;
                this.loading = false;
            }
        );
    }

    private selectItem(v: any) {
        let it = this.curr_lvl - v.lvl_hier + 1;
        let it2 = this.curr_lvl == this.conf_hier.max_lvl? it-1:it;
        let i = 1;
        while (i <= it) {
            this.selectedValues.pop();  
            i++;
        }
        i = 1;
        while (i <= it2) {
            this.dataSource.pop();
            i++;
        }
        if(this.callback_act){
            
            this.callback_act=false;
        }
        if (v.lvl_hier + 1 <= this.conf_hier.max_lvl) {
            this.getData(v.tip_cod, [v.cod_rel], v.lvl_hier + 1);
        }
        this.curr_lvl = v.lvl_hier;
        this.selectedValues.push(v);
        this.onSelectHier.emit([...this.selectedValues].reverse());

    }

    onSelectItem(evt: any) {
        if (evt.isUserInput || this.callback_act) {
            this.selectItem(evt.source.value);
        }
    }

    showMobileVer() {
        return this.active && this.layout.isMobile;
    }

    showDialog(templateRef: TemplateRef<any>) {
        this.dialog.open(templateRef);
    }
}
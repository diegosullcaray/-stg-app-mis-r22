import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MonRanCampService } from "../compartido/servicios/mon-ran-camp.service";
import { cloneObject } from "app/core/shared/functions.util";
import { tblOpts } from "./principal.util";
import { ActivatedRoute, Router } from "@angular/router";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { LayoutService } from "app/system/admin/services/layout.service";
import { StgPaginatorComponent } from "app/core/screen/components/stg-paginator/stg-paginator.component";

@Component({
    selector: 'app-rep2-principal-mon-salidas',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('paginator', { static: false }) paginatorComp: StgPaginatorComponent;
    config: any;
    curr_hier: any;

    tblOpts: any;

    flag1: boolean;
    flag2: boolean;

    constructor(
        private ranCamp: MonRanCampService,
        private activatedRoute: ActivatedRoute,
        private layout: LayoutService,
        private router: Router,
        private loader: StgAppLoaderService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.tblOpts = cloneObject(tblOpts);
        this.flag1 = true;
        this.flag2 = true;
    }

    ngOnInit(): void {

        this.config = this.ranCamp.principal;
        this.curr_hier = this.ranCamp.curr_hier;
    }

    ngOnDestroy(): void {

    }

    ngAfterViewChecked(): void {
        if (this.config.hierTabs[3].pagination && this.flag1) {
            this.flag1 = false;
            this.page(1);
        }
        if (this.paginatorComp && this.flag2) {
            this.flag2 = false;
            this.paginatorComp.toFirstPage();
        }
    }

    changePage(evt: any) {
        //this.flag1 = true;
        //this.flag2 = true;
        this.page(evt.page);
    }

    page(p: number) {
        this.ranCamp.page(p);
    }

    eventFilter(event: any) {
        this.ranCamp.filter(event);
    }

    changeHier(item: any) {
        this.ranCamp.changeHier(item);
    }

    ddEvent(evt: any) {
        if ((evt.key.startsWith("bas_gc") || evt.key == "des_rel") && evt.row.flag_niv == 0) {
            this.ddCli(evt);
        }
    }

    private ddCli(evt: any) {
        let idx = parseFloat(evt.key.slice(-2));
        if (isNaN(idx)) {
            this.ranCamp.detalle = {
                loading: true,
                map: { cod_evt: -99, des_evt: "Todos" },
                evt: evt
            };
        } else {
            this.ranCamp.detalle = {
                loading: true,
                map: this.config.meta[idx - 1],
                evt: evt
            };
        }

        this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    }

    setActiveTab(idx: number) {
        if (idx == this.config.currTabIdx) {
            return;
        }
        this.config.hierTabs[this.config.currTabIdx].active = false;
        this.config.hierTabs[idx].active = true;
        this.config.currTabIdx = idx;
    }
}
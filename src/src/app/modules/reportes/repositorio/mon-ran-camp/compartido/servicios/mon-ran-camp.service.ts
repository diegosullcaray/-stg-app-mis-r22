import * as moment from 'moment';
import { Injectable } from "@angular/core";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { UserService } from "app/system/admin/services/user.service";
import { cloneObject, isNullOrUndefined } from 'app/core/shared/functions.util';
import { MonRanCampAntService } from './mon-ran-camp-ant.service';
import { eventHeaders, principalConfig, scItems, tblHeaderCorr, tblHeaders, tblHeaderTerr, tblHeaderUni } from '../../principal/principal.util';
import { Subject } from 'rxjs';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';

@Injectable()
export class MonRanCampService {
    tip_cod: number;
    cod_rel: string;

    curr_hier: any;

    loading: boolean
    firstLoad: boolean;

    curr_fec: string;
    curr_flag: number;
    curr_gru: number;

    principal: any;
    detalle: any;

    lvl_scroll: [];
    show_lvl_scroll: boolean;

    constructor(
        private loader: StgAppLoaderService,
        private user: UserService,
        private antAdmin: ModSysAdminService,
        private antRanCamp: MonRanCampAntService
    ) {
        this.setDefaults();
    }

    clean() {
        this.setDefaults();
    }

    loadData() {
        this.loader.open();
        let profile = this.user.get('profile');
        //profile.cla_use == 2;
        this.curr_fec = profile.curr_fec;
        //this.curr_fec = '20250228';

        this.getBaseHier();
    }

    private setDefaults() {
        this.firstLoad = true;
        this.curr_flag = 0;
        this.curr_gru = 1;
        this.principal = cloneObject(principalConfig);
        this.show_lvl_scroll = false;
        this.curr_hier = { des_rel: "", des_lab: "" };
    }

    filter(evt: any) {
        this.principal.loading = true;
        this.loader.open();
        this.curr_flag = evt[0].value;
        this.curr_gru = evt[1].value;
        this.principal.filters[0].selected = evt[0].index;
        this.principal.filters[1].selected = evt[1].index;
        this.setDs(this.tip_cod, this.cod_rel);
    }

    private getBaseHier() {
        this.antAdmin.getBaseHierarchy(this.user.email, 9).subscribe(x => {
            let br: any = x.body;
            let h = br.base_hierarchy;
            if (!isNullOrUndefined(h)) {
                this.tip_cod = h[0].tip_cod;
                this.cod_rel = h[0].cod_rel
                let currentDate = moment(this.curr_fec).format("YYYY-MM-DD");
                this.antAdmin.getLevelHierarchy(9, h[0].lvl, this.tip_cod, [this.cod_rel], { key: "fec", val: currentDate }).subscribe(x => {
                    let lh = x.body.level_hierarchy;
                    let cl = lh[0];
                    //this.saveBuffer({ tip_cod: cl.tip_cod, cod_rel: cl.cod_rel, des_rel: cl.des_rel });
                    this.setDs(h[0].tip_cod, h[0].cod_rel);
                });
            }
        });
    }

    private evaluateTabs(tip_cod: number, ds: any) {
        if (tip_cod == 7) {
            this.principal.hierTabs[0].data = ds['table_1'];
            this.principal.hierTabs[1].data = ds['table_2'];
            this.principal.hierTabs[2].data = ds['table_3'];
            this.principal.hierTabs[3].data = ds['table_4'];

            if (this.firstLoad) {
                this.principal.hierTabs[0].enabled = true;
                this.principal.hierTabs[0].active = true;
                this.principal.hierTabs[1].enabled = true;
                this.principal.hierTabs[2].enabled = true;
                this.principal.hierTabs[3].enabled = true;
            }
        } else if (tip_cod == 20) {
            this.principal.hierTabs[1].data = ds['table_1'];
            this.principal.hierTabs[2].data = ds['table_2'];
            this.principal.hierTabs[3].data = ds['table_3'];

            if (this.firstLoad) {
                this.principal.hierTabs[1].enabled = true;
                this.principal.hierTabs[1].active = true;
                this.principal.hierTabs[2].enabled = true;
                this.principal.hierTabs[3].enabled = true;
            }
        } else if (tip_cod == 19) {
            this.principal.hierTabs[2].data = ds['table_1'];
            this.principal.hierTabs[3].data = ds['table_2'];

            if (this.firstLoad) {
                this.principal.hierTabs[2].enabled = true;
                this.principal.hierTabs[2].active = true;
                this.principal.hierTabs[3].enabled = true;
            }
        } else if (tip_cod == 18) {
            this.principal.hierTabs[3].data = ds['table_1'];
            if (this.firstLoad) {
                this.principal.hierTabs[3].enabled = true;
                this.principal.hierTabs[3].active = true;
            }
        }
        let sDs = this.principal.hierTabs[3].data;

        if (sDs.length > 100) {
            this.principal.hierTabs[3].pagination = true;
            this.principal.hierTabs[3]['pageLenght'] = 50;
            this.principal.hierTabs[3]['dataSourceLenght'] = sDs.length;
            this.principal.hierTabs[3]['dataOri'] = cloneObject(sDs);
            this.runPagination();
        }

        if (this.firstLoad) {
            this.updateHeaders(tip_cod, ds);
            this.firstLoad = false;
        }
    }


    private updateHeaders(tip_cod: number, ds: any) {
        // Base headers setup
        let headers = this.createBaseHeaders(ds);

        // Apply headers to all tabs
        this.principal.hierTabs.forEach((tab: any) => {
            tab.headers = cloneObject(headers);
        });

        // Handle specific tip_cod cases
        const headerConfigs = {
            7: () => this.updateHeadersForTipCod7(),
            20: () => this.updateHeadersForTipCod20(),
            19: () => this.updateHeadersForTipCod19(),
            18: () => this.updateHeadersForTipCod18()
        };

        if (headerConfigs[tip_cod]) {
            headerConfigs[tip_cod]();
        }
    }

    private createBaseHeaders(ds: any) {
        let headers = cloneObject(tblHeaders);

        // Add meta headers
        this.principal.meta.forEach((meta: any, i: number) => {
            headers.push({
                label: meta.des_evt,
                subs: eventHeaders(i)
            });
        });

        // Add performance headers
        scItems.forEach(item => {
            headers.push(this.createPerformanceHeader(item));
        });

        // Add distribution header
        headers.push(this.createDistributionHeader(ds));

        return headers;
    }

    private createPerformanceHeader(item: any) {
        const key = `desem_sc_${item.key}`;
        return {
            label: item.label,
            key,
            format: { type: 'integer' },
            style: { 'min-width': '80px', 'width': '80px' },
            cellStyle: { 'text-align': 'right' }
        };
    }

    private createDistributionHeader(ds: any) {
        let pdh = {
            label: 'Distribución Variable',
            subs: []
        };

        // Add meta distribution
        ds.meta.forEach((meta: any, i: number) => {
            const fi = (i + 1).toString().padStart(2, '0');
            pdh.subs.push(this.createDistributionSubHeader(meta.des2_evt, `dis_gc_${fi}`));
        });

        // Add performance distribution
        scItems.forEach(item => {
            const key = `dis_sc_${item.key}`;
            pdh.subs.push(this.createDistributionSubHeader(item.label, key));
        });

        return pdh;
    }

    private createDistributionSubHeader(label: string, key: string) {
        return {
            label,
            key,
            format: { type: 'percent' },
            style: { 'min-width': '50px', 'width': '50px' },
            cellStyle: { 'text-align': 'right' }
        };
    }

    private updateHeadersForTipCod7() {
        const labels = ['Territorio', 'Corredor', 'Unidad', 'Asesor'];
        labels.forEach((label, i) => {
            this.principal.hierTabs[i].headers[1].label = label;
        });

        this.insertHeaderItems([
            { tab: 1, items: [this.createPositionedHeader(tblHeaderTerr, 1)] },
            {
                tab: 2, items: [
                    this.createPositionedHeader(tblHeaderCorr, 1),
                    this.createPositionedHeader(tblHeaderTerr, 2)
                ]
            },
            {
                tab: 3, items: [
                    this.createPositionedHeader(tblHeaderUni, 1),
                    this.createPositionedHeader(tblHeaderCorr, 2),
                    this.createPositionedHeader(tblHeaderTerr, 3)
                ]
            }
        ]);
    }

    private updateHeadersForTipCod20() {
        const labels = ['', 'Corredor', 'Unidad', 'Asesor'];
        labels.forEach((label, i) => {
            if (label) this.principal.hierTabs[i].headers[1].label = label;
        });

        this.insertHeaderItems([
            { tab: 2, items: [this.createPositionedHeader(tblHeaderCorr, 1)] },
            {
                tab: 3, items: [
                    this.createPositionedHeader(tblHeaderUni, 1),
                    this.createPositionedHeader(tblHeaderCorr, 2)
                ]
            }
        ]);
    }

    private updateHeadersForTipCod19() {
        this.principal.hierTabs[2].headers[1].label = 'Unidad';
        this.principal.hierTabs[3].headers[1].label = 'Asesor';

        this.insertHeaderItems([
            { tab: 3, items: [this.createPositionedHeader(tblHeaderUni, 1)] }
        ]);
    }

    private updateHeadersForTipCod18() {
        this.principal.hierTabs[3].headers[1].label = 'Asesor';
    }

    private createPositionedHeader(headerTemplate: any, position: number) {
        const header = cloneObject(headerTemplate);
        const leftPosition = (48.8 + 97.8 * position).toString() + 'px';
        header.style.left = leftPosition;
        header.cellStyle.left = leftPosition;
        return header;
    }

    private insertHeaderItems(configurations: Array<{ tab: number, items: any[] }>) {
        configurations.forEach(config => {
            config.items.forEach((item, index) => {
                this.principal.hierTabs[config.tab].headers.splice(2 + index, 0, item);
            });
        });
    }

    page(p: number) {
        this.principal.hierTabs[3].data = this.principal.hierTabs[3].dataOri.filter(x => x.pk === p);
    }

    private runPagination() {
        let sHs = this.principal.hierTabs[3];
        if (sHs.pagination) {
            let pl = sHs.pageLenght;
            prepareDataForPagination(pl, this.principal.hierTabs[3].dataOri, 'pk');
            this.page(1);
        }
    }

    private setDs(tip_cod: number, cod_rel: string) {
        this.antRanCamp.getDataSources(tip_cod, cod_rel, this.curr_fec, this.curr_flag, this.curr_gru).subscribe(x => {
            let ds = x.body.resultado;
            this.principal.meta = ds.meta;
            //this.principal.dataTable = ds.table;

            this.evaluateTabs(tip_cod, ds);

            this.principal.loading = false;
            this.loader.close();

        });
    }

    private saveBuffer(obj: any) {
        obj['idx'] = this.principal.hierBuffer.length;
        this.setCurrHier(obj.des_rel, obj.tip_cod);
        this.principal.hierBuffer.push(obj);
    }

    private setCurrHier(des_rel: string, tip_cod: number) {
        this.curr_hier.des_rel = des_rel;
        if (tip_cod == 18) {
            this.curr_hier.des_lab = "Unidad";
        } else if (tip_cod == 19) {
            this.curr_hier.des_lab = "Corredor";
        } else if (tip_cod == 20) {
            this.curr_hier.des_lab = "Territorio";
        } else if (tip_cod == 21) {
            this.curr_hier.des_lab = "Grupo";
        } else {
            this.curr_hier.des_lab = "Total";
        }
    }

    changeHier(item: any) {
        if (this.principal.hierBuffer.length - 1 == item.idx) {
            return;
        }
        this.loader.open();
        this.principal.loading = true;
        let tip_cod = item.tip_cod;
        let cod_rel = item.cod_rel;
        this.principal.hierBuffer = this.principal.hierBuffer.slice(0, item.idx + 1);
        let l = this.principal.hierBuffer.length;
        let ci = this.principal.hierBuffer[l - 1];
        this.setCurrHier(ci.des_rel, ci.tip_cod);
        this.setDs(tip_cod, cod_rel);
    }

    ddHier(evt: any) {
        let tip_cod = evt.tip_cod;

        if (tip_cod == 1) {
            return;
        }
        this.loader.open();
        this.principal.loading = true;
        let cod_rel = evt.cod_rel;
        this.saveBuffer({ tip_cod: tip_cod, cod_rel: cod_rel, des_rel: evt.des_rel });
        this.setDs(tip_cod, cod_rel);
    }

}
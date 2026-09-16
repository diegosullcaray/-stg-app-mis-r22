import { Component, OnDestroy, OnInit } from "@angular/core";
import { MonSalidasService } from "../compartido/servicios/mon-salidas.service";
import { formatNumber } from "@angular/common";
import { cloneObject } from "app/core/shared/functions.util";
import { tblHeaders, tblOpts } from "./principal.util";
import { MatDialog } from "@angular/material/dialog";
import { LayoutService } from "app/system/admin/services/layout.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DetalleDialogComponent } from "../detalle/detalle-dialog.component";
import { StgWindowConfig } from "app/core/screen/components/stg-window/stg-window.config";


@Component({
  selector: 'app-rep2-principal-mon-salidas',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit, OnDestroy {
  config: any;
  curr_hier: any;

  tblOpts: any;
  tblHeaders: any;

  constructor(
    private sali: MonSalidasService,
    public layout: LayoutService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.tblOpts = cloneObject(tblOpts);
    this.tblHeaders = cloneObject(tblHeaders);
  }

  ngOnInit(): void {
    this.config = this.sali.principal;
    this.curr_hier = this.sali.curr_hier;
  }

  ngOnDestroy(): void {
  }

  changeHier(item: any) {
    this.sali.changeHier(item);
  }

  getFormatVal(val: number, typ: string) {
    /*if (cv == 1 && t=='pen') {
        return 'S/. ' + formatNumber(this.card.cie_real, 'en-US', '.0-0');
    } else */
    if (typ == 'number') {
      return formatNumber(val, 'en-US', '.0-0');
    } else if (typ == 'percent') {
      return formatNumber(val * 100, 'en-US', '.0-2') + '%';
    } else {
      return formatNumber(val, 'en-US', '.0-2');
    }
  }

  getCardValStyle(idx:number){
    if ([0, 3].includes(idx)) {
      return {};
    }else{
      return {
        'text-decoration': 'underline'
      }
    }
  }

  detCard(idx: number, item: any) {
    if ([0, 3].includes(idx)) {
      return;
    }
    this.sali.detalle = {
      loading: true,
      firstLoad: true,
      evt: {
        value: item.val,
        row: { tip_cod: this.sali.tip_cod, cod_rel: this.sali.cod_rel,desc:this.sali.curr_hier.des_rel},
        key: idx == 1 ? 'sali1' : idx == 2 ? 'sali3' : 'clive'
      }
    };
    if (this.layout.isMobile) {
      this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogDet();
    }
  }

  ddEvent(evt: any) {
    if (evt.key == "desc") {
      this.sali.ddHier(evt.row);
    } else if (evt.key != "ret") {
      this.ddCli(evt);
    }
  }

  private ddCli(evt: any) {
    this.sali.detalle = {
      loading: true,
      firstLoad: true,
      evt: evt
    };
    if (this.layout.isMobile) {
      this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
    } else {
      this.dialogDet();
    }
  }

  private dialogDet(): void {
    this.router.navigate(['./routed-detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });

    /*const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = '480px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);*/
  }

  getMobileGroups() {
    let groups = [];
    for (let i = 0; i < this.config.dataCards.length; i += 2) {
        groups.push(this.config.dataCards.slice(i, i + 2));
    }
    return groups;
  }

}
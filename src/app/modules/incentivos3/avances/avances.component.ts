import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { DetalleDialogComponent } from '../detalle/detalle-dialog.component';

@Component({
  selector: 'app-avances-incentivos3',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.scss', './circle-pie.scss']
})
export class AvancesComponent implements OnInit {
  config: any;

  constructor(
    private inc3: Incentivos3Service,
    public layout: LayoutService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.inc3.avances;
  }

  pieCls(item: any) {
    return "pie p" + item.per;
  }

  pieStyle(item: any) {

    if (item.val >= 0.65 && item.val < 1) {
      return "--pie-color: #efb45f";
    } else if (item.val > 0 && item.val < 0.65) {
      return "--pie-color: #E3005B";
    }
    return "--pie-color: #3fe91e";//#3fe91e
  }

  clsState(item: any) {
    let r = "";
    let x = item.sit;
    if (x == 1) {
      r = "material-icons sit1 s";
    } else if (x == 2) {
      r = "material-icons sit2 s";
    }
    else {
      r = "material-icons s";
    }
    return r;
  }

  showDetail(item: any) {
    if (item.enab) {
      let midx = {
        'car':91,//vigente
        'cli':2,
        'sc1':3,
        'efec1':4,
        'efec2':5,
        'efec3':6
      }
      this.inc3.detalle = {
        idx: midx[item.id],
        params: { comp: 1, req: 'getDetail', card: true, typ: 'cv' }
      };
      if (this.layout.isMobile) {
        this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
      } else {
        this.dialogDet();
      }
    }
  }

  private dialogDet(): void {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '700px';
    /*dialogConfig.data = {

    };*/
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }
}

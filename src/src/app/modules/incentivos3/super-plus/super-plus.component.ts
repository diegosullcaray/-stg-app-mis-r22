import { Component, OnInit } from '@angular/core';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { Detalle2DialogComponent } from '../detalle2/detalle2-dialog.component';
import { DetalleDialogComponent } from '../detalle/detalle-dialog.component';

@Component({
  selector: 'app-super-plus-incentivos3',
  templateUrl: './super-plus.component.html',
  styleUrls: ['./super-plus.component.scss']
})
export class SuperPlusComponent implements OnInit {
  config: any;

  constructor(private inc3: Incentivos3Service,
    public layout: LayoutService,
    private activatedRoute: ActivatedRoute, private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.inc3.superPlus;
  }


  getBoxCls(item: any) {
    
    if(item.state==0){
      return 'sp-box bg3';
    }
    return item.val >= 0 ? 'sp-box bg1' : 'sp-box bg2';
  }

  showDetail(item: any, i: number) {
    if (item.enab) {
      let params=item.params;
      this.inc3.detalle = {idx:i,params:params};
      if (this.layout.isMobile) {
        if (params.comp == 1) {
          this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute, skipLocationChange: true });
        } else {
          this.router.navigate(['./detalle-2'], { relativeTo: this.activatedRoute, skipLocationChange: true });
        }

      } else {
        if (params.comp == 1) {
          this.dialogDet();
        } else {
          this.dialogDet2();
        }
      }
    }
  }

  private dialogDet(): void {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '700px';
    // dialogConfig.data = {
    //   mod: 2
    // };
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }

  private dialogDet2(): void {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.width = '450px';
    dialogConfig.height = '700px';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(Detalle2DialogComponent, dialogConfig);
    /*dialogRef.afterClosed().subscribe(v => {
      if (v) {
          this.getServerData(v.cod_bt);
      }
    });*/
  }
}

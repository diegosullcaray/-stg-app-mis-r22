import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {  Router,ActivatedRoute } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { cloneObject } from 'app/core/shared/functions.util';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
// import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
// import { ReportesEService } from '../compartido/servicios/reportes-e.service';
// import { UsuariosDialogComponent } from '../usuarios/usuarios-dialog.component';
import { tableHeaders, tableOptions } from './principal.util';
import { ModKaypachaService } from '../../kaypacha/compartido/servicio/mod-kaypacha.service';
import { UserService } from '../../../system/admin/services/user.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';

@Component({
  selector: 'app-principal-reportes-k',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  options: any; 
  dataSource: any[]; 
  dataSourceOri: any[]; 
  headers: any;
  optObs = new Subject<any>();

  constructor( 
    private loader: StgAppLoaderService,
    private antRepE: ReportesEService,
    private ant: ModKaypachaService,  
    private activatedRoute: ActivatedRoute,
    private layout:LayoutService,
    public dialog: MatDialog,
    public user: UserService, 
    private router: Router) { }

  ngOnInit(): void {    
    this.headers = tableHeaders;
    this.options = tableOptions;
   let profile = this.user.get('profile');   
    this.ant.getListRanking(profile.cod_bt).subscribe(x => { 
        let r = x.body.resultado;    
        //console.log(r.list[0].JSONLIST)
        //console.log(eval(r.list[0].JSONLIST))
        this.dataSource=eval(r.list[0].JSONLIST)
        });  
    }
    actionLink(evt: any) {
       
      
      if (evt.key == 'name' && evt.row.reportType == 'Medal') { 
        this.antRepE.selectedReportObs$.next(evt.row);
 
        this.router.navigate(['./detalles'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  
      }
       
    }
 
}

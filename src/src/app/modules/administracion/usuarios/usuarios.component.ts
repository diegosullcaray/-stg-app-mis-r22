import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';
import { StgWindowConfig } from 'app/core/screen/components/stg-window/stg-window.config';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AdministracionService } from '../compartido/servicios/administracion.service';
import { ModAdminService } from '../compartido/servicios/mod-admin.service';
import { ContenedorBaseComponent } from '../contenedor-base/contenedor-base.component';
import { DetalleDialogComponent } from './detalle/detalle-dialog.component';
import { usuariosHd, usuariosTblOpts } from './usuarios.util';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss', '../compartido/estilos/comun.scss']
})
export class UsuariosComponent extends ContenedorBaseComponent implements OnInit {
  private currDataSource: any;
  private oriDataSource: any;

  dataSource: any;
  headers: any;
  options: any;

  @ViewChild('paginator', { static: false }) paginatorComp: StgPaginatorComponent;
  showPaginator: boolean;
  dataSourceLenght: number;
  pageLenght: number;

  load0: BehaviorSubject<boolean>;
  load1: BehaviorSubject<boolean>;

  constructor(
    private loader: StgAppLoaderService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private antAdmin: ModAdminService,
    private administracion: AdministracionService,
    public dialog: MatDialog,
    public layout: LayoutService
  ) {
    super(router, activatedRoute)
  }

  ngOnInit(): void {
    this.loader.open();
    this.load0 = new BehaviorSubject(false);
    this.load1 = new BehaviorSubject(false);

    this.pageLenght = 30;
    this.showPaginator = false;
    this.dataSource = [];
    this.headers = usuariosHd;
    this.options = usuariosTblOpts;

    combineLatest([this.load0, this.load1]).subscribe(([a, b]) => {
      if (a && b ) {
        this.loader.close();
      }
    });

    this.antAdmin.getListaUsuarios().subscribe(x => {
      this.currDataSource = x.body.resultado;
      this.oriDataSource = x.body.resultado;
      this.runPagination();
      this.load0.next(true);
    });

    this.antAdmin.getConfig(1).subscribe(x=>{
      this.administracion.configs['niv_usu']=JSON.parse(x.body.resultado.niv_usu.cfg);
      this.load1.next(true);
    });

    
  }

  changePage(evt: any) {
    this.page(evt.page);
  }

  page(p: number) {
    this.dataSource = this.currDataSource.filter(x => x.pk === p);
  }

  private runPagination() {
    let l = this.currDataSource.length;
    if (l > this.pageLenght) {
      this.showPaginator = true;
      prepareDataForPagination(this.pageLenght, this.currDataSource, 'pk');
      this.dataSourceLenght = l;
      this.changeDetectorRef.detectChanges();
      this.paginatorComp.toFirstPage();
      this.page(1);
    } else {
      this.showPaginator = false;
      this.dataSource = this.currDataSource;
    }
  }

  onSelectedRow(evt: any) {
    this.administracion.selectedRow = evt;
  }

  add() {
    if (this.layout.isMobile) {
      this.router.navigate(['./detalle'], { relativeTo: this.activatedRoute });
    } else {
      this.dialogAdd();
    }
  }

  private dialogAdd(): void {
    const dialogConfig = new StgWindowConfig();
    dialogConfig.height = '400px';
    const dialogRef = this.dialog.open(DetalleDialogComponent, dialogConfig);
  }

}

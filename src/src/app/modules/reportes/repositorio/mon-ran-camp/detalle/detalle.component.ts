import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { MonRanCampService } from '../compartido/servicios/mon-ran-camp.service';
import { MonRanCampAntService } from '../compartido/servicios/mon-ran-camp-ant.service';
import { StgPaginatorComponent } from 'app/core/screen/components/stg-paginator/stg-paginator.component';
import { cloneObject } from 'app/core/shared/functions.util';
import { tableHeaders, tableOpts } from './detalle.util';
import { prepareDataForPagination } from 'app/core/screen/components/stg-paginator/stg-paginator.util';


@Component({
  selector: 'app-rep2-detalle-mon-ran-camp',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @ViewChild('paginator', { static: false }) paginatorComp: StgPaginatorComponent;

  private oriDataSource: any;
  private currDataSource: any;


  config: any;
  tableOpts: any;
  tableHeaders: any;
  dataSource: any;

  showPaginator: boolean;
  dataSourceLenght: number;

  constructor(
    public ranCamp: MonRanCampService,
    public ant: MonRanCampAntService,
    public loader: StgAppLoaderService,
    private router: Router,
    public changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loader.open();
    this.config = this.ranCamp.detalle;
    let r = this.config.evt.row;
    let cp = this.config.map.cod_evt;
    this.tableHeaders = cloneObject(tableHeaders);
    this.tableOpts = cloneObject(tableOpts);
    this.ant.getDetail(r.tip_cod, r.cod_rel, cp, this.ranCamp.curr_fec).subscribe(x => {
      this.dataSource = x.body.resultado;
      this.dataSourceLenght = x.body.resultado.length;
      this.showPaginator = this.dataSourceLenght > 20;
      if (this.showPaginator) {
        this.oriDataSource = cloneObject(this.dataSource);
        this.currDataSource = cloneObject(this.dataSource);
        this.runPagination();
      }
      this.config.loading = false;
      this.loader.close();
    });
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }

  filter(evt: any) {


  }

  changePage(evt: any) {
    this.page(evt.page);
  }

  page(p: number) {
    this.dataSource = this.currDataSource.filter(x => x.pk === p);
  }

  private runPagination() {
    let l = this.currDataSource.length;
    let pl = 20;
    if (l > pl) {
      this.showPaginator = true;
      prepareDataForPagination(pl, this.currDataSource, 'pk');
      this.dataSourceLenght = l;
      this.changeDetectorRef.detectChanges();
      //this.paginatorComp.toFirstPage();
      this.page(1);
    } else {
      this.showPaginator = false;
      this.dataSource = this.currDataSource;
    }
  }
}


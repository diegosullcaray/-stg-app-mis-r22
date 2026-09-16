import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AnalistaService } from "../../compartido/servicios/analista.service";

export abstract class ListaBaseComponent {

  dataSource: any[];
  oriDataSource: any[];
  currDataSource: any[];
  headers: any[];
  title: string;
  dataSourceLength: number;

  emptyDataSource: number;
  loadingDataSource: boolean;

  tableOptions = {};

  checkFilters: any[];

  selectSub: Subscription;
  loadSub: Subscription;

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public analista: AnalistaService) { }

  init() {
    //acondicionar subscripciones mas adelante
    this.emptyDataSource = 0;
    this.loadingDataSource = true;
    this.selectSub = this.analista.selectedSec$.subscribe(x => {
      this.dataSourceLength = undefined;
      this.analista.nom_sec = x.des_sec;
      this.analista.cod_bt = x.cod_sec;
      this.loadingDataSource = true;
      this.getDataSource(x);
    });
    this.loadSub = this.analista.doneLoadingDataSource$.subscribe(x => {
      this.dataSourceLength = x.length;
      this.loadingDataSource = false;
      if (x.length === 0) {
        this.emptyDataSource = 1;
      } else {
        if (this.checkFilters) {
          this.checkFilters.forEach(c => {
            this.checkFilter(c.key);
          });
        }
        this.emptyDataSource = 0;
      }
    });
  }

  destroy(){
    this.loadSub.unsubscribe();
    this.selectSub.unsubscribe();
  }

  abstract getDataSource(sec: any);

  openSecPicker() {
    this.analista.showSecPickerDialog(true);
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  navRoot() {
    this.router.navigateByUrl('/app/analista');
  }

  abstract checkFilter(key: string);

}

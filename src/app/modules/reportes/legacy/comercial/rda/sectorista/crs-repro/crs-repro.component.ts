import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { TableMHService } from '../../../../support/services/table.service';
import { ComercialService } from '../../../../comercial/comercial.service';
import { ReplaySubject, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../support/services/report';
import { crs } from '../crs-map';
import { SelectService } from '../../../../support/services/select.service';
import { UserService } from 'app/system/admin/services/user.service';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

@Component({
  selector: 'app-crs-repro',
  templateUrl: './crs-repro.component.html',
  styleUrls: ['./crs-repro.component.scss']
})
export class CrsReproComponent implements OnDestroy {
  title_module: string = '';
  tUser: number = this.us.get('profile').tip_use;
  report: ReportT = new ReportT(crs('RES_SEC_REP'));
  config: string[] = this.report.getCount();
  config_table: TableMHService[] = [];
  filter$ = new Subject<{}>();
  level$ = new Subject<{}>();
  refresh$ = new BehaviorSubject(true);
  config_select_multiple: SelectService[] = [];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  selected: number = 0;
  data: {};
  config_select_multiple_form: SelectService[] = [];
  cliente: string = '';
  active_db = false;
  form: any = [
    {
      label: 'Cliente Contestó Teléfono Otorgado',
      selected: null,
      variable: 'preg_01',
      data: [
        { id: 'SI', desc: 'SI' },
        { id: 'NO', desc: 'NO' },
        { id: 'WHATSAPP', desc: 'WHATSAPP' }
      ]
    },
    {
      label: 'Afectación de su Negocio',
      selected: null,
      variable: 'preg_02',
      data: [
        { id: 'No Afectado', desc: 'No Afectado' },
        { id: 'Parcial', desc: 'Parcial' },
        { id: 'Total', desc: 'Total' }
      ]
    },
    {
      label: 'Mis Ventas Bajaron',
      selected: null,
      variable: 'preg_03',
      data: [
        { id: 0, desc: '0 %' },
        { id: 0.1, desc: '10 %' },
        { id: 0.2, desc: '20 %' },
        { id: 0.3, desc: '30 %' },
        { id: 0.4, desc: '40 %' },
        { id: 0.5, desc: '50 %' },
        { id: 0.6, desc: '60 %' },
        { id: 0.7, desc: '70 %' },
        { id: 0.8, desc: '80 %' },
        { id: 0.9, desc: '90 %' },
        { id: 1, desc: '100 %' },
      ]
    },
    {
      label: 'Está de Acuerdo con su Cronograma',
      selected: null,
      variable: 'preg_04',
      data: [
        { id: 'Si Acepta Masiva', desc: 'Si Acepta Masiva' },
        { id: 'Desea reprogramación individual', desc: 'Desea reprogramación individual' },
        { id: 'Desea pagar su cuota antigua (Reversa)', desc: 'Desea pagar su cuota antigua (Reversa)' },
        { id: 'En evaluación', desc: 'En evaluación' }
      ]
    }
  ];

  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private us: UserService/*,
    private route: ActivatedRoute,private registro: RegistrarVisitaService*/) {
     // registro.registrar('Analista/'+this.route.snapshot.url.join(''));
  }

  load(r) {
    this.level$.next(r)
  }

  loadFilter(r) {
    this.filter$.next(r)
  }

  private activateDB() {
    return false;
  }

  downloadDetail() {
    /*this.cs.downloadSimpleStoredReportData({ tip_cod: tc, cod_rel: cr, a_grup: "MONI_EFEC" }).subscribe(data => {
      this.fs.saveAs(data);
    });*/
  }

  ngOnInit() {
    this.mergeParams();
    this.loadForm();
    const filters: any = this.report.getFilters();
    filters.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.config_select_multiple.push(confS);
    })
  }

  loadForm() {
    const AconfS = [];
    this.form.forEach(f => {
      const confS = new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      AconfS.push(confS);
    })
    this.config_select_multiple_form = AconfS;
  }

  mergeParams() {
    combineLatest(this.filter$, this.level$, this.refresh$)
      .subscribe(([filter, level]) => {
        this.config.forEach((find, index) => {
          let params = { ...filter, ...level }
          this.renderTable(params, { find: find, index: index })
        })
      })
  }

  private renderTable(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table[add.index] = confT;
    const params = { ...confT.getParamsAdd(), ...r }
    this.activateDB();
    this.cs.getRegularData(report, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          let result = data.body['result'];
          const confT = new TableMHService(table);
          confT.results(true, false, false);
          confT.addColumns(result.headers);
          confT.addELEMENT_DATA(result.body);
          confT.addExt(result.additional);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table[add.index] = confT;
          this.cdr.detectChanges();
        });
  }

  public update(r) {
    let p = this.us.get('profile');
    let v = p.tip_use;
    let n = p.num_doc;
    if (this.tUser == 0 || (v===1 && n == r.row.num_doc_sec)) {
      this.cliente = r.row.nom_cli;
      delete r.row.nom_cli;
      this.data = { ...r.row };
      this.selected = 1;
      this.form = this.form.map(d => {
        return {
          label: d.label,
          selected: r.row[d.variable],
          variable: d.variable,
          data: d.data
        }
      });
      this.loadForm();
    }
  }

  previewSave(r) {
    delete r.nom_cli;
    this.data = { ...this.data, ...r };
  }

  save() {
    const report = 'UP_REPRO_01';
    this.selected = 0;
    console.log({ json: JSON.stringify(this.data) })
    this.cs.postRegularUpdate(report, { json: JSON.stringify(this.data) })
      .subscribe(r => {
        this.refresh$.next(true);
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

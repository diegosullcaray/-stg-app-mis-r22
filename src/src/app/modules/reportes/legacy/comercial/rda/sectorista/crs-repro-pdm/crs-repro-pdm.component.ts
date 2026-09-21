import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { TableMHService } from '../../../../support/services/table.service';
import { ComercialService } from '../../../../comercial/comercial.service';
import { ReplaySubject, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../support/services/report';
import { crs } from '../crs-map';
import { SelectService } from '../../../../support/services/select.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormArray, Validators, Form } from '@angular/forms';
import * as Moments from 'moment';
import { dateArray, IDate } from '../../../../support/common/date.module'
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/system/admin/services/user.service';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

@Component({
  selector: 'app-crs-repro-pdm',
  templateUrl: './crs-repro-pdm.component.html',
  styleUrls: ['./crs-repro-pdm.component.scss']
})
export class CrsReproPdmComponent implements OnInit, OnDestroy {
  title_module: string = '';
  tUser: number = this.us.get('profile').tip_use;
  report: ReportT = new ReportT(crs('REACT_PDM'));
  config: string[] = this.report.getCount();
  config_table: TableMHService = new TableMHService;
  filter$ = new Subject<{}>();
  level$ = new Subject<{}>();
  refresh$ = new BehaviorSubject(true);
  config_select_multiple: SelectService[] = [];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  selected: number = 0;
  form: UntypedFormGroup;
  reaccion: { label: string, variable: string, data: any} = {
    label: 'Reacción',
    variable: 'reaccion',
    data: [
      { id: 'Aceptó', desc: 'Aceptó' },
      { id: 'No Aceptó', desc: 'No Aceptó' },
      { id: 'No Califica', desc: 'No Califica' },
      { id: 'Postergar', desc: 'Postergar' }
    ]
  };
  motivo: { label: string, variable: string, data: any } = {
    label: 'Motivo',
    variable: 'motivo',
    data: []
  };
  cliente: string = '';
  math: {};
  tipForm: string = null;
  constructor(private cdr: ChangeDetectorRef,
    private cs: ComercialService,
    private us: UserService,
    private fb: UntypedFormBuilder/*,private route:ActivatedRoute,
              private registro: RegistrarVisitaService*/) {   /* registro.registrar('Analista/'+this.route.snapshot.url.join(''));*/ }

  ngOnInit() {
    this.mergeParams();
    this.initForm();
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

  public load(r): void {
    this.level$.next(r)
  }

  public loadFilter(r): void {
    this.filter$.next(r)
  }

  private mergeParams() {
    combineLatest(this.filter$, this.level$, this.refresh$)
      .subscribe(([filter, level]) => {
        this.tipForm = filter['base']
        let params = { ...filter, ...level }
        this.renderTable(params, { find: '_01', index: 0 })
      })
  }

  get motivoF() { return this.form.controls.motivo as UntypedFormControl }
  get reaccionF() { return this.form.controls.reaccion as UntypedFormControl }

  private initForm() {
    this.form = this.fb.group({
      reaccion: ['', [Validators.required]],
      motivo: ''
    });

    this.reaccionF.valueChanges
      .subscribe(r => {
        this.motivoF.patchValue(null);
        this.motivo.data = this.renderOption(r);
      })
  }

  private renderOption(r) {
    switch (r) {
      case 'No Aceptó': {
        if (this.tipForm == 'NUEVOS') {
          return [{ id: 'No desea sacar un crédito', desc: 'No desea sacar un crédito' },
          { id: 'Ya tiene crédito en otra entidad', desc: 'Ya tiene crédito en otra entidad' },
          { id: 'No desea trabajar con FC', desc: 'No desea trabajar con FC' }]
        }
        else if (this.tipForm == 'RECURRENTES') {
          /*return [{id:'Integrantes del grupo necesitan mayor monto',desc:'Integrantes del grupo necesitan mayor monto'},
                          {id:'Grupo no desea sacar el crédito',desc:'Grupo no desea sacar el crédito'},
                          {id:'Integrantes no se encuentran en la ciudad para acudir a la agencia',desc:'Integrantes no se encuentran en la ciudad para acudir a la agencia'}]*/
          return [{ id: 'No desea sacar un crédito grupal', desc: 'No desea sacar un crédito grupal' },
          { id: 'Ya tiene crédito  grupal  en otra entidad', desc: 'Ya tiene crédito  grupal  en otra entidad' },
          { id: 'Ya tiene crédito individual en otra entidad', desc: 'Ya tiene crédito individual en otra entidad' },
          { id: 'Cliente está fuera de la ciudad', desc: 'Cliente está fuera de la ciudad' },
          { id: 'No desea trabajar con FC', desc: 'No desea trabajar con FC' }]
        }
        else {
          return null;
        }
      }
      case 'No Califica': {
        if (this.tipForm == 'NUEVOS') {
          return [{ id: 'Mayor número de entidades a la permitida por FC', desc: 'Mayor número de entidades a la permitida por FC' },
          { id: 'Cliente con calificación distinta a normal', desc: 'Cliente con calificación distinta a normal' },
          { id: 'Cliente castigada, refinanciada o judicial', desc: 'Cliente castigada, refinanciada o judicial' },
          { id: 'Cliente tiene saldo deudor', desc: 'Cliente tiene saldo deudor' }]
        }
        else if (this.tipForm == 'RECURRENTES') {
          /*return [{id:'Grupo no cumple con el número de integrantes',desc:'Grupo no cumple con el número de integrantes'},
                            {id:'Más del 50% del grupo tienen la actividad en rojo',desc:'Más del 50% del grupo tienen la actividad en rojo'},
                            {id:'Varias de las integrantes ya no cumplen con las políticas de admisión',desc:'Varias de las integrantes ya no cumplen con las políticas de admisión'}]*/
          return [{ id: 'Mayor número de entidades a la permitida por FC', desc: 'Mayor número de entidades a la permitida por FC' },
          { id: 'Cliente con calificación distinta a normal o CPP', desc: 'Cliente con calificación distinta a normal o CPP' },
          { id: 'Cliente castigada, refinanciada o judicial', desc: 'Cliente castigada, refinanciada o judicial' },
          { id: 'Cliente tiene saldo deudor', desc: 'Cliente tiene saldo deudor' }]
        }
        else {
          return null;
        }
      }
      case 'Postergar': {
        return this.date();
      }
      default: {
        return [];
      }
    }
  }

  private date() {
    let now_start = Moments().add(1, 'months');
    let now_end = Moments().add(6, 'months');
    let config: IDate = {
      interval: 'months',
      lang: 'es',
      format: {
        id: 'MMMM - YYYY',
        desc: 'MMMM - YYYY'
      }
    };
    return dateArray(now_start, now_end, config)
  }

  private renderTable(r, add): void {
    const table = this.report.getTableFind(add.index);
    const report = this.report.getRNameCompleted(add.find);
    const confT = new TableMHService(table);
    confT.results(true, true, false);
    this.config_table = confT;
    const params = { ...confT.getParamsAdd(), ...r }
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
          this.config_table = confT;
          this.cdr.detectChanges();
        },
        () => {
          const confT = new TableMHService(table);
          confT.results(true, false, true);
          this.config_table = confT;
          this.cdr.detectChanges();
        });
  }

  public renderUpdate(r) {
    this.selected = 1;
    this.cliente = r.row.nom_cli;
    //console.log(r.row);
    delete r.row.nom_cli;
    this.math = r.row;

    this.reaccionF.patchValue(r.row.reaccion);
    this.motivoF.patchValue(r.row.motivo);
  }

  save() {
    this.selected = 0;
    const report = 'UP_REPRO_02';
    const json = { ...this.math, ...{ tip_base: this.tipForm }, ...this.form.getRawValue() }
    console.log(JSON.stringify(json))
    this.cs.postRegularUpdate(report, { json: JSON.stringify(json) })
      .subscribe(r => {
        this.refresh$.next(true);
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}

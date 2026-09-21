import { Component,ChangeDetectorRef, OnDestroy, OnInit} from '@angular/core';
import { TableMHService} from '../../../../support/services/table.service';
import { ComercialService } from '../../../../comercial/comercial.service';
import { ReplaySubject, Subject,combineLatest, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../support/services/report';
import { crs } from '../crs-map';
import { SelectService } from '../../../../support/services/select.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { UserService } from 'app/system/admin/services/user.service';
import { isNullOrUndefined, isUndefined } from 'app/core/shared/functions.util';
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';

@Component({
  selector: 'app-crs-cli-act',
  templateUrl: './crs-cli-act.component.html',
  styleUrls: ['./crs-cli-act.component.scss']
})
export class CrsCliActComponent implements OnDestroy {
  title_module:string='';
  tUser: number = this.us.get('profile').tip_use;
  report:ReportT=new ReportT(crs('DET_CLI')); //RES_SEC_CLI_ACT
  config:string[]=this.report.getCount();
  config_table:TableMHService[]=[];
  filter$=new Subject<{}>();
  level$=new Subject<{}>();
  refresh$=new BehaviorSubject(true);
  config_select_multiple:SelectService[]=[];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  selected:number = 0;
  data:{};
  config_select_multiple_form:SelectService[]=[];
  cliente:string='';
  form:any=[
    {
      label:'Tipo Teléfono',
      selected:null,
      variable:'tipo_tele',
      data:[
        {id:'SMARTPHONE',desc:'SMARTPHONE'},
        {id:'CELULAR SIMPLE',desc:'CELULAR SIMPLE'},
        {id:'TELEFONO FIJO',desc:'TELÉFONO FIJO'},
        {id:'SIN CELULAR',desc:'SIN CELULAR'}
      ]
    },
    {
      label:'Operador',
      selected:null,
      variable:'ope_tele',
      data:[
        {id:'Claro',desc:'Claro'},
        {id:'Movistar',desc:'Movistar'},
        {id:'Entel',desc:'Entel'},
        {id:'Bitel',desc:'Bitel'},
        {id:'Otros',desc:'Otros'}
      ]
    },
    {
      label:'Plan Telefónico',
      selected:null,
      variable:'plan_tele',
      data:[
        {id:'Prepago',desc:'Prepago'},
        {id:'PostPago',desc:'PostPago'}
      ]
    },
    {
      label:'Whatshapp',
      selected:null,
      variable:'whatshap',
      data:[
        {id:true,desc:'SI'},
        {id:false,desc:'NO'}
      ]
    }
  ];
  ciiu:any={
    label:'',
    data:[]
  }
  verificador:any={
    label:'Verificador',
    selected:null,
    variable:'verificador',
    data:[
      {id:true,desc:'OK'},
      {id:false,desc:'NO OK'}
    ]
  }
  verificador_tele:any={
    label:'Verificador',
    selected:null,
    variable:'verificador',
    data:[
      {id:'OK',desc:'OK'},
      {id:'NO OK',desc:'NO OK'},
      {id:'No tiene teléfono',desc:'No tiene teléfono'},
      {id:'No Ubicable',desc:'No Ubicable'}
    ]
  }
  txt_numero = new UntypedFormControl('');
  txt_email = new UntypedFormControl('');
  formG: UntypedFormGroup;
  
  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              private us:UserService,
              private fb:UntypedFormBuilder/*,
              private route:ActivatedRoute,private registro: RegistrarVisitaService*/) {
               // registro.registrar('Analista/'+this.route.snapshot.url.join(''));
              }

  private renderSlcCiu(): void {
    let report = 'SEL_CIU_01';
    this.cs.getRegularData(report, {}).subscribe(
      (data) => {
        let result = data.body['result'];
        this.ciiu.label='CIIU';
        this.ciiu.data=result.body;
      })
  }

  trackByFn(index) {
    return index;
  }
  load(r){
    this.level$.next(r)
  }

  loadFilter(r){
    this.filter$.next(r)
  }

  ngOnInit(){
    this.renderSlcCiu();
    this.mergeParams();
    this.loadForm();
    this.initForm();
    const filters:any=this.report.getFilters();
    filters.forEach(f=>{
      const confS=new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      this.config_select_multiple.push(confS);
    })
  }

  private initForm(){
    this.formG = this.fb.group({
      email: ['', [Validators.email]],
      verificador_ciiu:'',
      verificador_num_tele:'',
      bantotal: this.fb.group({
        ciu:new UntypedFormControl({ value: '', disabled: true }),
        cel:new UntypedFormControl({ value: '', disabled: true }),
      }),
      cius:this.fb.array(['','','']),
      cels: this.fb.array([]),
    });
    this.addCels();
    this.addCels();

    this.verNumF.valueChanges
    .subscribe((r)=>{
      let btlNum=this.btl.controls.cel.value;
      let numTele=this.formG.controls.cels.get('0').get('num_tele').value;
      if(r && isNullOrUndefined(numTele))
        this.formG.controls.cels.patchValue([{num_tele:btlNum}])
    })
    this.verCiiuF.valueChanges
    .subscribe((r)=>{
      let btlCiu=this.btl.controls.ciu.value;
      let ciu=this.formG.controls.cius.get('0').value;
      if(r && isNullOrUndefined(ciu))
        this.formG.controls.cius.patchValue([btlCiu])
    })
  }

  get verNumF(){ return this.formG.controls.verificador_num_tele as UntypedFormControl }
  get verCiiuF(){ return this.formG.controls.verificador_ciiu as UntypedFormControl  }
  get btl(){ return this.formG.controls.bantotal as UntypedFormGroup}

  addCels() {
    const cels = this.formG.controls.cels as UntypedFormArray;
    cels.push(this.fb.group({
      num_tele: ['',Validators.compose([Validators.pattern(/^(?!0+$)(?:\(?\+\d{1,3}\)?[- ]?|0)?\d{7,9}$/)])],
      tipo_tele: '',
      ope_tele:'',
      plan_tele:'',
      whatshap:''
    }));
  }

  loadForm(){
    const AconfS=[];
    this.form.forEach(f=>{
      const confS=new SelectService();
      confS.labelName(f.label);
      confS.getVariable(f.variable);
      confS.selectedVAlue(f.selected);
      confS.adddata(f.data);
      AconfS.push(confS);
    })
    this.config_select_multiple_form=AconfS;
  }

  mergeParams(){
    combineLatest(this.filter$,this.level$,this.refresh$)
    .subscribe(([filter,level])=>{
      this.config.forEach((find,index)=>{
        let params={...filter,...level}
        this.renderTable(params,{find:find,index:index})
      })
    })
  }

  private renderTable(r,add):void{
    const table=this.report.getTableFind(add.index);
    const report=this.report.getRNameCompleted(add.find);
    const confT= new TableMHService(table);
    confT.results(true,true,false);
    this.config_table[add.index]=confT;
    const params={...confT.getParamsAdd(),...r}
    this.cs.getRegularData(report,params)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
    (data)=>{
      let result=data.body['result'];
      const confT=new TableMHService(table);
      confT.results(true,false,false);
      confT.addColumns(result.headers);
      confT.addELEMENT_DATA(result.body);
      confT.addExt(result.additional);
      this.config_table[add.index]=confT;
      this.cdr.detectChanges();
    },
    ()=>{
      const confT= new TableMHService(table);
      confT.results(true,false,true);
      this.config_table[add.index]=confT;
      this.cdr.detectChanges();
    });
  }

  public update(r){
    let p = this.us.get('profile');
    let v = p.tip_use;
    let n = p.num_doc;
    if(1==1 || this.tUser==0 || (v===1 && n == r.row.num_doc_sec)){
      this.cliente=r.row.nom_cli;
      delete r.row.nom_cli;
      this.data={...r.row};
      this.selected=1;

      let cels=isUndefined(r.row.cels)?'[]':r.row.cels;
      let cius=isUndefined(r.row.cius)?'[]':r.row.cius;
      //console.log(cels);
      const celsJ:[]=JSON.parse(cels);
      const ciusJ:[]=JSON.parse(cius);
  
      const emailF= this.formG.controls.email as UntypedFormControl;
      const celsF = this.formG.controls.cels as UntypedFormArray;
      const ciusF = this.formG.controls.cius as UntypedFormArray;
      this.formG.reset();
      this.btl.controls.ciu.patchValue(r.row.ciiu_0_id)
      this.btl.controls.cel.patchValue(r.row.num_tele_0)
      emailF.patchValue(r.row.email);
      ciusF.patchValue(ciusJ);
      celsF.patchValue(celsJ);
      this.verCiiuF.patchValue(r.row.ver_ciiu);
      this.verNumF.patchValue(r.row.ver_num_tele);
      //this.loadForm();
    }
  }

  previewSave(r){
    //console.log(r,this.data);
    delete r.nom_cli;
    this.data={...this.data,...r};
  }

  save(){
    const params={...this.data,...this.formG.getRawValue()}
    const report='UPD_CLI_01';
    this.selected=0;
    //console.log({json:this.formG.getRawValue()})
    //console.log(JSON.stringify(params))
    this.cs.postRegularUpdate(report,{json:JSON.stringify(params)})
    .subscribe(r=>{
      this.refresh$.next(true);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

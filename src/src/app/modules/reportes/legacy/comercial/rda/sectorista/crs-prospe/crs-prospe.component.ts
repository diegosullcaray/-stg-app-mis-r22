import { Component,ChangeDetectorRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { TableMHService} from '../../../../support/services/table.service';
import { ComercialService } from '../../../../comercial/comercial.service';
import { ReplaySubject, Subject,combineLatest, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReportT } from '../../../../support/services/report';
import { crs } from '../crs-map';
import { SelectService } from '../../../../support/services/select.service';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from 'app/system/admin/services/user.service';
import { isNull, isNullOrUndefined } from 'app/core/shared/functions.util';
import { MatDialogConfig } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { AddProspecomponent } from './add-prospe.component'; 
//import { RegistrarVisitaService } from '../../../../../services/registrar-visita.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-crs-prospe',
  templateUrl: './crs-prospe.component.html',
  styleUrls: ['./crs-prospe.component.scss']
}) 
export class CrsProspeComponent implements OnDestroy,OnInit {
  @ViewChild('closebutton') closebutton;
  show: boolean = false;
  matDialogRef: MatDialogRef<AddProspecomponent>; 
  name: string = "";
  public deploymentName: any;
  title_module:string='';
  tUser: number = this.us.get('profile').tip_use;
  report:ReportT=new ReportT(crs('LIS_PROSPE')); //RES_SEC_CLI_ACT
  //report:ReportT=new ReportT(crs('LIS_CAPRET')); //RES_SEC_CLI_ACT
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
  afec_neg:any={
    label:'Se ha visto afectado por el estado de emergencia establecido por el COVID-19?',
    selected:null,
    variable:'afec_neg',
    data:[
      {id:'Total',desc:'Total'},
      {id:'Parcial',desc:'Parcial'},
      {id:'Ninguno',desc:'Ninguno'}
    ]
  }
  fun_neg:any={
    label:'Actualmente su negocio esta funcionando?',
    selected:null,
    variable:'fun_neg',
    data:[
      {id:'Si',desc:'Si'},
      {id:'Cambio Giro',desc:'Cambio Giro'},
      {id:'No presenta Negocio',desc:'No presenta Negocio'}
    ]
  }
  sit_neg:any={
    label:'Situación de su nivel de ventas/Ingresos después de la declaratoria de emergencia?',
    selected:null,
    hidden:true,
    variable:'sit_neg',
    data:[
      {id:'Son más altos',desc:'Son más altos'},
      {id:'Se mantiene igual',desc:'Se mantiene igual'},
      {id:'Se redujo',desc:'Se redujo'}
    ]
  }
  red_neg:any={
    label:'En que % se redujo su nivel de ventas?',
    selected:null,
    hidden:true,
    variable:'red_neg',
    data:[
      {id:'0 -10%',desc:'0 -10%'},
      {id:'11% - 20%',desc:'11% - 20%'},
      {id:'21% -30%',desc:'21% -30%'},
      {id:'31% - 40%',desc:'31% - 40%'},
      {id:'41% - 50%',desc:'41% - 50%'},
      {id:'51% - 60%',desc:'51% - 60%'},
      {id:'61% - 70%',desc:'61% - 70%'},
      {id:'71% - 80%',desc:'71% - 80%'},
      {id:'81% - 90%',desc:'81% - 90%'},
      {id:'> 90%',desc:'> 90%'}
    ]
  }
  sec_eco:any={
    label:'Seleccione Sector Economico:',
    selected:null,
    hidden:true,
    variable:'cam_gi',
    data:[
      {id:'COMERCIO',desc:'Comercio'},
      {id:'PRODUCCION',desc:'Producción'},
      {id:'SERVICIO',desc:'Servicio'},
      {id:'AGRICOLA',desc:'Agrícola'}
    ]
  }
  gir_neg:any={
    label:'Seleccione Giro de negocio actual:',
    selected:null,
    hidden:true,
    variable:'gir_neg',
    data:[
    ]
  }
  dynamic_ciiu=[]
  txt_numero = new UntypedFormControl('');
  txt_email = new UntypedFormControl('');
  formG: UntypedFormGroup;
  
  constructor(private cdr:ChangeDetectorRef,
              private cs:ComercialService,
              private us:UserService,
              private fb:UntypedFormBuilder,
              public dialog: MatDialog, /*,
              private route:ActivatedRoute,
              private registro: RegistrarVisitaService*/) {


               // registro.registrar('Analista/'+this.route.snapshot.url.join(''));
              }
              OpenModal() {
                this.matDialogRef = this.dialog.open(AddProspecomponent, {
                  data: { name: this.name },
                  disableClose: true
                });
            
                this.matDialogRef.afterClosed().subscribe(res => {
                  if ((res == true)) {
                    this.name = "";
                  }
                });
              }
   
  private renderSlcCiu(): void {
    let report = 'SEL_CIU_02';
    this.cs.getRegularData(report, {}).subscribe(
      (data) => {
        let result = data.body['result'];
        this.dynamic_ciiu=result.body; 
      })
  }
   

  public onSave() {
    this.closebutton.nativeElement.click();
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

  public opened = false;
    public dataSaved = false;
    nn = { "desc" : "", priority: "", dueDate : "", owner : "" };
    public close() {
      this.opened = false;
    }

    public open() {
      this.opened = true;
    }

    public submit() {
        this.dataSaved = true;
        console.log(this.nn.desc);
        this.close();
    }
   
  ngOnInit(){
    this.renderSlcCiu();
    this.mergeParams(); 
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
      HAPENOMB:['',Validators.required]/*,
      fun_neg:['',Validators.required],
      sit_neg:'',
      red_neg:'',
      sec_eco:'',
      gir_neg:''*/
    });
     
  }
  
  get funNegF(){ return this.formG.controls.formG as UntypedFormControl  } 

  private setValidador(fControl:UntypedFormControl,validate:Boolean){
    fControl.setValidators(validate ? [Validators.required] : null)
    fControl.updateValueAndValidity()
  }
  // loadForm(){
  //   const AconfS=[];
  //   this.form.forEach(f=>{
  //     const confS=new SelectService();
  //     confS.labelName(f.label);
  //     confS.getVariable(f.variable);
  //     confS.selectedVAlue(f.selected);
  //     confS.adddata(f.data);
  //     AconfS.push(confS);
  //   })
  //   this.config_select_multiple_form=AconfS;
  // }

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
    console.log(p);
    let v = p.tip_use;
    let n = p.num_doc;
    if(1==1 || this.tUser==0 || (v===1 && n == r.row.num_doc_sec)){
      this.cliente=r.row.nom_cli;
      delete r.row.nom_cli;
      this.data={...r.row};
      console.log(this.data)
      this.selected=1;

      //const emailF= this.formG.controls.email as FormControl;
      let reaccion=isNullOrUndefined(r.row.reaccion)?'{}':r.row.reaccion;
      const reaccionJ:{}=JSON.parse(reaccion);
      console.log(reaccionJ)
      //const reaccion:{}=JSON.parse(r.row.reaccion);
      this.formG.reset();
      this.formG.patchValue(reaccionJ)
      //this.btl.controls.ciu.patchValue(r.row.ciiu_0_id)
     // this.btl.controls.cel.patchValue(r.row.num_tele_0)
      //emailF.patchValue(r.row.email);

      //this.verCiiuF.patchValue(r.row.ver_ciiu);
      //this.verNumF.patchValue(r.row.ver_num_tele);
      //this.loadForm();
    }
  }

  previewSave(r){
    //console.log(r,this.data);
    delete r.nom_cli;
    this.data={...this.data,...r};
  }

  // save(){
  //   const params={...this.data,...{reaccion:this.formG.getRawValue()}}
  //   const report='ADD_PROS_CORRE_01';
  //   this.selected=0; 
  //   console.log(JSON.stringify(params)) 
  //   this.cs.postRegularUpdate(report,{json:JSON.stringify(params)})
  //   .subscribe(r=>{
  //     this.refresh$.next(true);
  //   })
  // }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

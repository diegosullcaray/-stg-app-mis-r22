import { Component, Input, Inject, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"; 
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder, FormArray, Validators } from '@angular/forms';
 
import { ComercialService } from '../../../comercial.service';
import { BehaviorSubject, ReplaySubject, Subject,combineLatest } from 'rxjs';
import { UserService } from '../../../../../../../system/admin/services/user.service';
import { SelectService } from '../../../../support/services/select.service';
import * as moment from 'moment'; 
import { ReportT } from '../../../../support/services/report';
import { crs } from '../crs-map';
import { TableMHService } from '../../../../support/services/table.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: "hello",
  templateUrl: './add-prospe.component.html',
  styleUrls: ['./crs-prospe.component.scss']
   
})

export class AddProspecomponent implements OnDestroy,OnInit {
  tUser: number = this.us.get('profile').tip_use;
  formG: UntypedFormGroup; 
  data:{};
  isInputShown: boolean = false;
  isHidden: boolean = true;
  filter$=new Subject<{}>();
  level$=new Subject<{}>();
  today = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  polling: any;
  config_select_multiple_form:SelectService[]=[];
  cliente:string='';
  config_table:TableMHService[]=[];
  report:ReportT=new ReportT(crs('LIS_PROSPE'));
  config:string[]=this.report.getCount();
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  refresh$=new BehaviorSubject(true);
  selected:number = 0;
  rowSource: any;
  dynamic_ciiu=[]
    
  HAPERTCTA:any={
    label:'Apertura de Cuenta',
    selected:null,
    variable:'HAPERTCTA',
    data:[
      {id:'SI',desc:'SI'},
      {id:'NO',desc:'NO'}
    ]
  }
  HCTALICEF:any={
    label:'Cuenta con Licencia Funcionamiento',
    selected:null,
    variable:'HCTALICEF',
    data:[
      {id:'SI',desc:'SI'},
      {id:'NO',desc:'NO'}
    ]
  }
  HTIPAGENT:any={
    label:'Tipo Agente',
    selected:null,
    variable:'HTIPAGENT',
    data:[
      {id:'Agente Confianza',desc:'Agente Confianza'},
      {id:'Agente Satelital',desc:'Agente Satelital'},
      {id:'Tambillo',desc:'Tambillo'}
    ]
  }
  HCANACAP:any={
    label:'Canal Captación',
    selected:null,
    variable:'HCANACAP',
    data:[
      {id:' Financiera Confianza',desc:' Financiera Confianza'},
      {id:'Woccu',desc:'Woccu'},
      {id:'Alianza Cacao',desc:'Alianza Cacao'}
    ]
  }
  HINSTALAD:any={
    label:'Instalado',
    selected:null,
    variable:'HINSTALAD',
    data:[
      {id:'SI',desc:'SI'},
      {id:'NO',desc:'NO'}
    ]
  }
  HPROSPEC:any={
    label:'Prospecto',
    selected:null,
    variable:'HPROSPEC',
    data:[
      {id:'APLICA',desc:'APLICA'},
      {id:'NO APLICA',desc:'NO APLICA'}
    ]
  }
  HVINFAMI:any={
    label:'Vinculo Familiar',
    selected:null,
    variable:'HVINFAMI',
    data:[
      {id:'SI',desc:'SI'},
      {id:'NO',desc:'NO'}
    ]
  }
  HTIPVINC:any={
    label:'Tipo Vinculo',
    selected:null,
    variable:'HTIPVINC',
    data:[
      {id:'NINGUNO',desc:'NINGUNO'},
      {id:'PADRE',desc:'PADRE'},
      {id:'MADRE',desc:'MADRE'},
      {id:'HERMANO',desc:'HERMANO'},
      {id:'HERMANA',desc:'HERMANA'},
      {id:'VIVIENTE',desc:'VIVIENTE'},
      {id:'CONYUGE',desc:'CONYUGE'}
    ]
  }
  HZONA:any={
    label:'Zona',
    selected:null,
    variable:'HZONA',
    data:[
      {id:'URBANA',desc:'URBANA'},
      {id:'RURAL',desc:'RURAL'}
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
  HDESAGE:any={
    label:'Seleccione la agencia:',
    selected:null,
    hidden:true,
    variable:'HDESAGE',
    data:[
    ]
  }
  HDESTER:any={
    label:'Seleccione el territorio:',
    selected:null,
    hidden:true,
    variable:'HDESTER',
    data:[
    ]
  }
  HDESCOR:any={
    label:'Seleccione el corredor:',
    selected:null,
    hidden:true,
    variable:'HDESCOR',
    data:[
    ]
  }
  HDEPA:any={
    label:'Seleccione el departamento:',
    selected:null,
    hidden:true,
    variable:'HDEPA',
    data:[
    ]
  }
  HPROV:any={
    label:'Seleccione la Provincia:',
    selected:null,
    hidden:true,
    variable:'HPROV',
    data:[
    ]
  }
  HDISTR:any={
    label:'Seleccione el Distrito:',
    selected:null,
    hidden:true,
    variable:'HDISTR',
    data:[
    ]
  }
  HESTDCORE:any={
    label:'Seleccione el estado:',
    selected:null,
    hidden:true,
    variable:'HESTDCORE',
    data:[
    ]
  }
  // HNOMCOM:any={
  //   label:'Seleccione el nombre comercial:',
  //   selected:null,
  //   hidden:true,
  //   variable:'HNOMCOM',
  //   data:[
  //   ]
  // }
  HDCIIU:any={
    label:'Seleccione el ciiu:',
    selected:null,
    hidden:true,
    variable:'HDCIIU',
    data:[
    ]
  }

  public itemForm: UntypedFormGroup;
   
  name: string;
  constructor(
    private cs:ComercialService,
    private fb:UntypedFormBuilder,
    private us:UserService,
    private cdr:ChangeDetectorRef,
    private _mdr: MatDialogRef<AddProspecomponent>, 
    @Inject(MAT_DIALOG_DATA) public data2: any,
  ) {
    this.rowSource = data2.data1;
  } 

   
  ngOnInit(){
    this.renderSlcAgencia();
    //this.renderSlcTerritorio();
    /*this.renderSlcCorredor();
    this.renderSlcDepartamento();
    this.renderSlcProvincia();
    this.renderSlcDistrito();
    this.renderSlcEstadoCorresponsal();*/
    this.initForm();  
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  private refreshData() {
    window.location.reload();
    // this.polling = setInterval(() => {
    //   this.today = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    // }, 30 * 1000)
  }
 
  save(){
    let p = this.us.get('profile');
    let cod_bt = p.cod_bt;
    //console.log(JSON.stringify(cod_bt))
    this.data = ({HCODSEC: JSON.stringify(cod_bt)})
    console.log({params: JSON.stringify(cod_bt)});
    const params={...this.data,...this.formG.getRawValue()}
    const report='ADD_PROS_CORRE_01';
    this.selected=0;
    console.log(params)
    console.log(JSON.stringify(params)) 
  console.log(this.formG.getRawValue());
  console.log(this.formG.value['HAPENOMB']);
  console.log(this.data2)
     

     this.cs.postRegularUpdate(report,{json:JSON.stringify(params)})
     .subscribe(r=>{
       this.refresh$.next(true); //this.mergeParams();
     })
     this.refreshData();
  }
  private initForm(){
    this.formG = this.fb.group({ 
      HAPENOMB :['',Validators.required],
      HNUMDOC :['',Validators.required],
      HNUMRUC :['',Validators.required],
      HCONSRUC :['',Validators.required],
      HCELULAR :['',Validators.required],
      HDIREC :['',Validators.required],
      HDISTR :['',Validators.required],
      HPROV :['',Validators.required],
      HDEPA :['',Validators.required],
      HDCIIU :['',Validators.required], 
      HDESCOR :['',Validators.required],
      HDESAGE :['',Validators.required],
      HGEOLATI :['',Validators.required],//,Validators.pattern('^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$')
      HGEOLON :['',Validators.required],//,Validators.pattern('^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$')
      HNOMCOM :['',Validators.required],
      HDESTER :['',Validators.required],
      //HAPERTCTA :['',Validators.required],
      HAPERTCTA :[''],
      //HESTDCORE :['',Validators.required],
      HESTDCORE :[''],
      //HINSTALAD :['',Validators.required],
      HINSTALAD :[''],
      //HFECINSTAL :['',Validators.required],
      HFECINSTAL :[''],
      //HZONA :['',Validators.required],
      HZONA :[''],
      //HPROSPEC :['',Validators.required],
      HPROSPEC :[''],
      //HFIRMADN :['',Validators.required],
      HFIRMADN :[''],
      HTAPERCC: ['',Validators.required],
      HCONSRCC:['',Validators.required],
      HCTALICEF:['',Validators.required],
      HCANACAP:['',Validators.required],
      HTIPAGENT:['',Validators.required],
      HCODSECASIG:['',Validators.required],
      HASEASIG:['',Validators.required],
      HMESINST:[''],
      HCONSLNE:[''],
      HFOTNEGO:[''],
     HLICFUNCI:[''],
      HVINFAMI:[''],
      HTIPVINC:[''],
      HIDCORRES:[''],
    });   
    this.ctaLicenciaF.valueChanges
     .subscribe((r)=>{
       console.log(r)
       if(r =='SI'){ 
         this.isInputShown=true;
         this.setValidador(this.LicenciaF,true);
        //this.itemForm.get('HLICFUNCI'));
     }
       if(r =='NO'){ 
        this.isInputShown=false;
        this.setValidador(this.LicenciaF,false);
        
        //this.itemForm.get('HLICFUNCI').req();
     }
     
      
   }) 
  }

  get ctaLicenciaF(){ return this.formG.controls.HCTALICEF as UntypedFormControl  }
  get LicenciaF(){ return this.formG.controls.HLICFUNCI as UntypedFormControl  }

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

   
  get CboAgencia(){ return this.formG.controls.HDESAGE as UntypedFormControl  }
  CloseDialog() {
    this._mdr.close(false)
  }
  private setValidador(fControl:UntypedFormControl,validate:Boolean){
    fControl.setValidators(validate ? [Validators.required] : null)
    fControl.updateValueAndValidity()
  }
  private renderSlcAgencia(): void {
    let report = 'SEL_JER_01';
    this.cs.getRegularData(report, {}).subscribe(
      (data) => {
        let result = data.body['result'];
        this.dynamic_ciiu=result.body;  
        this.HDESAGE.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Agencia")
        this.HDESTER.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Territorio")
        this.HDESCOR.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Corredor")
        this.HDEPA.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Departamento")
        this.HPROV.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Provincia")
        this.HDISTR.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Distrito")
        this.HESTDCORE.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="ESTCOR")
        //this.HNOMCOM.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="NombCom")
        this.HDCIIU.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="ciiu")
      })
  }

 
   
    
}

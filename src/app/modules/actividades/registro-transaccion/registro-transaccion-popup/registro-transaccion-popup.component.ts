import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
//import { ModActividadesService } from '../../servicios/mod-actividades.service';
import moment, { Moment } from 'moment';
import { ModCorresponsalService } from '../../../corresponsales/servicio/mod-corresponsal.service';
import { UserService } from '../../../../system/admin/services/user.service';
import { ComercialService } from '../../../reportes/legacy/comercial/comercial.service';
import { isNull } from 'util';
import { BehaviorSubject } from 'rxjs';
//import { ModCorresponsalService } from '../../servicio/mod-corresponsal.service';

@Component({
  selector: 'app-registro-transaccion-popup',
  templateUrl: './registro-transaccion-popup.component.html',
  styleUrls: ['./registro-transaccion-popup.component.scss']
})
export class RegistroTransaccionPopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  rowSource: any;
  payload: any;
  isInputShown: boolean = false;
  selected:number = 0;
  isHidden: boolean = true;
  refresh$=new BehaviorSubject(true);
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
  // HNOMCOM:any={
  //   label:'Seleccione el nombre comercial:',
  //   selected:null,
  //   hidden:true,
  //   variable:'HNOMCOM',
  //   data:[
  //   ]
  // }
  HTIPAGENT:any={
    label:'Tipo Agente',
    selected:null,
    variable:'HCTALICEF',
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
  HZONA:any={
    label:'Zona',
    selected:null,
    variable:'HZONA',
    data:[
      {id:'URBANA',desc:'URBANA'},
      {id:'RURAL',desc:'RURAL'}
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
  HDCIIU:any={
    label:'Seleccione el ciiu:',
    selected:null,
    hidden:true,
    variable:'HDCIIU',
    data:[
    ]
  }
  HESTDCORE:any={
    label:'Seleccione el estado corresponsal:',
    selected:null,
    hidden:true,
    variable:'HESTDCORE',
    data:[
    ]
  }

  HPROV:any={
    label:'Seleccione la provincia:',
    selected:null,
    hidden:true,
    variable:'HPROV',
    data:[
    ]
  }

  HDISTR:any={
    label:'Seleccione el distrito:',
    selected:null,
    hidden:true,
    variable:'HDISTR',
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistroTransaccionPopupComponent>,
    private fb: UntypedFormBuilder,
    private us:UserService,
    private antApp: ModCorresponsalService,
    private cs:ComercialService,
  ) {
    this.rowSource = data.data1;
  }

  ngOnInit() {
    this.renderSlcAgencia();
    this.initForm();
    //this.buildItemForm(this.data.data1)
    
  }
  private setValidador(fControl:UntypedFormControl,validate:Boolean){
    fControl.setValidators(validate ? [Validators.required] : null)
    fControl.updateValueAndValidity()
  }
  private initForm(){
    this.itemForm = this.fb.group({ 
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
        HGEOLATI :['',Validators.required],
        HGEOLON :['',Validators.required],
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
        HIDCORRES:[''] 

         
         
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
   get ctaLicenciaF(){ return this.itemForm.controls.HCTALICEF as UntypedFormControl  }
   get LicenciaF(){ return this.itemForm.controls.HLICFUNCI as UntypedFormControl  }



//   buildItemForm(item) {
    
    
//     this.itemForm = this.fb.group({
       
//       nom_cli: new FormControl({ value: [item.HAPENOMB || ''], disabled: false }),
//       dni: new FormControl({ value: [item.HNUMDOC || ''], disabled: true }),
//       HTIPAGENT:new FormControl({ value: [item.HTIPAGENT || ''], disabled: true }),
//       ruc: new FormControl({ value: [item.HNUMRUC || ''], disabled: false }),
//       consultaruc: new FormControl({ value: [item.HCONSRUC || ''], disabled: true }),
//       direc: new FormControl({ value: [item.HDIREC || ''], disabled: true }),
//       nomcomercial: new FormControl({ value: [item.HNOMCOM || ''], disabled: false }),
//       celular: new FormControl({ value: [item.HCELULAR || ''], disabled: true }),
//       idcorresponsal: new FormControl({ value: [item.HIDCORRES || ''], disabled: false }),
//       HESTDCORE: new FormControl({   value: [item.HESTDCORE || '',Validators.required], disabled: false }),
//       //estcorresponsal: new FormControl({ value: [item.HESTDCORE || ''], disabled: true }),
//       HZONA: new FormControl({ value: [item.HZONA || ''], disabled: false }),
//       HDESAGE: new FormControl({   value: [item.HDESAGE || '',Validators.required], disabled: false }),
//       HDESCOR: new FormControl({   value: [item.HDESCOR || '',Validators.required], disabled: false }),
//       HDEPA: new FormControl({   value: [item.HDEPA ,Validators.required], disabled: false }),
//       HPROV: new FormControl({   value: [item.HPROV || '',Validators.required], disabled: false }),
//       HDISTR: new FormControl({   value: [item.HDISTR || '',Validators.required], disabled: false }),
//       HDESTER: new FormControl({   value: [item.HDESTER || '',Validators.required], disabled: false }),
//       HVINFAMI: new FormControl({   value: [item.HVINFAMI || '',Validators.required], disabled: false }),
//       HTIPVINC: new FormControl({   value: [item.HTIPVINC || '',Validators.required], disabled: false }),
//       HMESINST: ['',Validators.required], //new FormControl({ value: [item.HMESINST || ''], disabled: false }),
//       lat: new FormControl({ value: [item.HGEOLATI || ''], disabled: false }),
//       log: new FormControl({ value: [item.HGEOLON || ''], disabled: false }),
//        fecinstalado:new FormControl({ value: [item.HFECINSTAL], disabled: false }), 
//        codasesorasignado:new FormControl({ value: [item.HCODSECASIG || ''], disabled: false }), 
//        asesorasignado:new FormControl({ value: [item.HASEASIG || ''], disabled: false }), 
//         HINSTALAD :['',Validators.required],
//         HAPERTCTA :['',Validators.required],
//         HPROSPEC :['',Validators.required] 
//     })

   
    
//   }
  

  
  private resObs() {
    console.log(this.payload);
    return this.antApp.postRegResultadosProsp(this.payload);
  }

  formatString(v: any): boolean {
    if (v == 'Si') {
      return true;
    }
    else if (v == 'No') {
      return false;
    }
    else return null;
  }

  private refreshData() {
    window.location.reload();
    // this.polling = setInterval(() => {
    //   this.today = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    // }, 30 * 1000)
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
        // this.HNOMCOM.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="NombCom") 
         this.HDCIIU.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="ciiu")
         
      })
  }
 
  submit(){
    let p = this.us.get('profile');
    let cod_bt = p.cod_bt;
    //console.log(JSON.stringify(cod_bt))
    this.data = ({HCODSEC: JSON.stringify(cod_bt)})
    console.log({params: JSON.stringify(cod_bt)});
    const params={...this.data,...this.itemForm.getRawValue()}
    const report='ADD_PROS_CORRE_01';
    this.selected=0;
    console.log(params)
    console.log(JSON.stringify(params)) 
  console.log(this.itemForm.getRawValue());
  //console.log(this.itemForm.value['HAPENOMB']);
  console.log(this.itemForm)
     

     this.cs.postRegularUpdate(report,{json:JSON.stringify(params)})
     .subscribe(r=>{
       this.refresh$.next(true); //this.mergeParams();
     })
     this.refreshData();
  }
 
}



import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
//import { ModActividadesService } from '../../servicios/mod-actividades.service';
import moment, { Moment } from 'moment';
import { ModCorresponsalService } from '../../../corresponsales/servicio/mod-corresponsal.service';
import { UserService } from '../../../../system/admin/services/user.service';
import { ComercialService } from '../../../reportes/legacy/comercial/comercial.service';
import { isNull, isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs';
//import { ModCorresponsalService } from '../../servicio/mod-corresponsal.service';

@Component({
  selector: 'app-transaccion-popup',
  templateUrl: './transaccion-popup.component.html',
  styleUrls: ['./transaccion-popup.component.scss']
})
export class TransaccionPopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  isHidden: boolean = true;
  rowSource: any; 
  payload: any;
  isInputShown: boolean = false;
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
  // HDESAGE:any={
  //   label:'HDESAGE',
  //   selected:null,
  //   variable:'HDESAGE',
  //   data:[
  //     {id:true,desc:'OK'},
  //     {id:false,desc:'NO OK'}
  //   ]
  // }
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
  HIDCORRES:any={
    label:'Seleccione el corresponsal:',
    selected:null,
    hidden:true,
    variable:'HIDCORRES',
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
  
  HNOMCOM:any={
    label:'Seleccione el nombre comercial:',
    selected:null,
    hidden:true,
    variable:'HNOMCOM',
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
      {id:'SUEGRO',desc:'SUEGRO'},
      {id:'SUEGRA',desc:'SUEGRA'},
      {id:'ABUELO',desc:'ABUELO'},
      {id:'ABUELA',desc:'ABUELA'}
    ]
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransaccionPopupComponent>,
    private fb: UntypedFormBuilder,
    private us:UserService,
    private antApp: ModCorresponsalService,
    private cs:ComercialService,
  ) {
    this.rowSource = data.data1;
    
  }

  ngOnInit() {
    this.renderSlcAgencia(); 
    this.buildItemForm(this.data.data1); 
    console.log(this.data.data1)
    
  }
  buildItemForm(item) {
    // console.log(item.HDESAGE);
    // console.log(item.HDEPA);
    // console.log(item.HPROV);
    // console.log(item.HDISTR);
    // console.log(item.HDESCOR);
    // console.log(item.HDESTER);
    // console.log(item.HESTDCORE);
      
     
    this.itemForm = this.fb.group({
       
      nom_cli: new UntypedFormControl({value:[item.HAPENOMB || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HAPENOMB || ''], disabled: false }),
      dni: new UntypedFormControl({ value: [item.HNUMDOC || ''], disabled: true }),
      HTIPAGENT:new UntypedFormControl({ value: [item.HTIPAGENT || ''], disabled: false }),

       
      ruc: new UntypedFormControl({value:[item.HNUMRUC || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HNUMRUC || ''], disabled: false }),
      consultaruc: new UntypedFormControl({ value: [item.HCONSRUC || ''], disabled: true }),
      consultarcc: new UntypedFormControl({ value: [item.HCONSRCC || ''], disabled: true }),
      consultaLn: new UntypedFormControl({ value: [item.HCONSLNE || ''], disabled: true }),
      consultaLF: new UntypedFormControl({ value: [item.HLICFUNCI || ''], disabled: true }),
      direc: new UntypedFormControl({value:[item.HDIREC || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HDIREC || ''], disabled: true }),
      nomComerc: new UntypedFormControl({value:[item.HNOMCOM || ''], disabled: false}, Validators.required),
      feccance: new UntypedFormControl({value:[item.HFECCANCE || ''], disabled: false}),
      HNOMCOM: new UntypedFormControl({value:[item.HNOMCOM || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HNOMCOM || ''], disabled: false }),
      celular: new UntypedFormControl({ value: [item.HCELULAR || ''], disabled: true }),
      HIDCORRES: new UntypedFormControl({value:[item.HIDCORRES || 0], disabled: false}, Validators.required),//new FormControl({ value: [item.HIDCORRES || ''], disabled: false }),
      HESTDCORE: new UntypedFormControl({value:[item.HESTDCORE || ''], disabled: false}, Validators.required),//new FormControl({   value: [item.HESTDCORE || '',Validators.required], disabled: false }),
      
      HZONA: new UntypedFormControl({value:[item.HZONA || ''], disabled: false}, Validators.required),
      HDESAGE: new UntypedFormControl({value:[item.HDESAGE || ''], disabled: false}, Validators.required),//new FormControl({  value: [item.HDESAGE || '',Validators.required], disabled: false }),
      
      HDESCOR: new UntypedFormControl({value:[item.HDESCOR || ''], disabled: false}, Validators.required),//new FormControl({   value: [item.HDESCOR || '',Validators.required], disabled: false }),
      HDEPA: new UntypedFormControl({value:[item.HDEPA || ''], disabled: false}, Validators.required),//new FormControl({   value: [item.HDEPA ,Validators.required], disabled: false }),
      HPROV: new UntypedFormControl({value:[item.HPROV || ''], disabled: false}, Validators.required),//new FormControl({   value: [item.HPROV || '',Validators.required], disabled: false }),
      HDISTR:  new UntypedFormControl({value:[item.HDISTR || ''], disabled: false}, Validators.required),//new FormControl({   value: [item.HDISTR || '',Validators.required], disabled: false }),
      HDESTER: new UntypedFormControl({value:[item.HDESTER || ''], disabled: false}, Validators.required),//new FormControl({   value: [item.HDESTER || '',Validators.required], disabled: false }),
      HVINFAMI: new UntypedFormControl({value:[item.HVINFAMI || ''], disabled: false}, Validators.required),
      HTIPVINC: new UntypedFormControl({value:[item.HTIPVINC || ''], disabled: false}, Validators.required), 
      //HMESINST: new FormControl({value:[item.HMESINST || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HMESINST || ''], disabled: false }),
      lat: new UntypedFormControl({value:[item.HGEOLATI || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HGEOLATI || ''], disabled: false }),
      log: new UntypedFormControl({value:[item.HGEOLON || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HGEOLON || ''], disabled: false }),
       fecinstalado: new UntypedFormControl({value:[item.HFECINSTAL || ''], disabled: false}, Validators.required),//new FormControl({ value: [item.HFECINSTAL], disabled: false }), 
       codasesorasignado:new UntypedFormControl({ value: [item.HCODSECASIG || ''], disabled: false }), 
       asesorasignado:new UntypedFormControl({ value: [item.HASEASIG || ''], disabled: false }), 
        HINSTALAD :['',Validators.required],
        HAPERTCTA :['',Validators.required],
        HPROSPEC :['',Validators.required] 
 
    });

    
    this.itemForm.controls.HIDCORRES.setValue(item.HIDCORRES)
    this.itemForm.controls.HTIPAGENT.setValue(item.HTIPAGENT)

    this.itemForm.controls.HNOMCOM.setValue(item.HNOMCOM)

     this.itemForm.controls.HDESAGE.setValue(item.HDESAGE)
     this.itemForm.controls.HDESCOR.setValue(item.HDESCOR)
     this.itemForm.controls.HDEPA.setValue(item.HDEPA)
     this.itemForm.controls.HPROV.setValue(item.HPROV)
     this.itemForm.controls.HDISTR.setValue(item.HDISTR)

     this.itemForm.controls.HZONA.setValue(item.HZONA)
     this.itemForm.controls.HVINFAMI.setValue(item.HVINFAMI)
     this.itemForm.controls.HTIPVINC.setValue(item.HTIPVINC)
     this.itemForm.controls.HESTDCORE.setValue(item.HESTDCORE)
     this.itemForm.controls.HDESTER.setValue(item.HDESTER)

     this.itemForm.controls.HAPERTCTA.setValue(item.HAPERTCTA)
     this.itemForm.controls.HPROSPEC.setValue(item.HPROSPEC)
     this.itemForm.controls.HINSTALAD.setValue(item.HINSTALAD)

     this.getEstadoCorr.valueChanges
     .subscribe((r)=>{
       console.log(r)
       if(r =='Solicito cancelacion'){ 
         this.isInputShown=true;
         this.setValidador(this.getFecCancelac,true);
        //this.itemForm.get('HLICFUNCI'));
     }
     
       
     
      
   }) 
     
 
  }
  get agenciaF(){ 
    let respuesta = this.itemForm.controls.HDESAGE as UntypedFormControl 
    console.log(respuesta); 
    return respuesta
  }
  get getEstadoCorr(){ return this.itemForm.controls.HESTDCORE as UntypedFormControl  }
  get getFecCancelac(){ return this.itemForm.controls.feccance as UntypedFormControl  }
     

  
  private resObs() {
    //console.log(this.payload);
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
       // console.log(this.dynamic_ciiu.filter(d=>d.sec_eco=="Agencia"));
        this.HDESAGE.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Agencia")
        this.HDESTER.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Territorio")
        this.HDESCOR.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Corredor")
        this.HDEPA.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Departamento")
        this.HPROV.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Provincia")
        this.HDISTR.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Distrito")
        this.HESTDCORE.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="ESTCOR")
        this.HESTDCORE.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="ESTCOR")
        this.HNOMCOM.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="NombCom")
        this.HDCIIU.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="ciiu")
        this.HIDCORRES.data=this.dynamic_ciiu.filter(d=>d.sec_eco=="Corresponsales")
         
      })
  }

  submit() {
    let p = this.us.get('profile');
    let cod_bt = p.cod_bt;
    this.data = ({HCODSEC: JSON.stringify(cod_bt)})
    this.dialogRef.afterClosed().subscribe(v => {
      let dni = this.rowSource['HNUMDOC'];//
      let latitud = JSON.parse(this.itemForm.value['lat']); //this.itemForm.value['HGEOLATI'];//
      //console.log(latitud);
      let longitud = JSON.parse(this.itemForm.value['log']);//this.itemForm.value['HGEOLON']; //
      //let nomcomercial = this.itemForm.value['HNOMCOM']; //this.rowSource['HNOMCOM'];//this.itemForm.value['HNOMCOM'];//
      let aperturacta = this.itemForm.value['HAPERTCTA'];//
     // let estcorresponsal = this.rowSource['HESTDCORE'];// this.itemForm.value['HESTDCORE']; //
      let instalado = this.itemForm.value['HINSTALAD'];//
      let zona = this.itemForm.value['HZONA'];
      let prospecto = this.itemForm.value['HPROSPEC'];
      //
  

      let ruc =  JSON.parse(this.itemForm.value['ruc']);
      let celular=  this.rowSource['HCELULAR']; 
      let direccion= this.rowSource['HDIREC'];//this.itemForm.value['direc'];
      //let nomcomercial = this.itemForm.value['nomComerc']

      console.log(nomcomercial);

      if(Array.isArray(this.itemForm.value['nomComerc'])) {
        var nomcomercial = this.itemForm.value['nomComerc'][0]
      } else {
        var nomcomercial = this.itemForm.value['nomComerc']
      }

       if(Array.isArray(this.itemForm.value['HDEPA'])) {
        var departamento = this.itemForm.value['HDEPA'][0]
      } else {
        var departamento = this.itemForm.value['HDEPA']
      }
     if(Array.isArray(this.itemForm.value['HPROV'])) {
       var provincia = this.itemForm.value['HPROV'][0]
     } else {
       var provincia = this.itemForm.value['HPROV']
     }
     if(Array.isArray(this.itemForm.value['HDISTR'])) {
       var distrito = this.itemForm.value['HDISTR'][0]
     } else {
       var distrito = this.itemForm.value['HDISTR']
     }

     if(Array.isArray(this.itemForm.value['HDESCOR'])) {
       var corredor = this.itemForm.value['HDESCOR'][0]
     } else {
       var corredor = this.itemForm.value['HDESCOR']
     }

     if(Array.isArray(this.itemForm.value['HDESAGE'])) {
       var agencia = this.itemForm.value['HDESAGE'][0]
     } else {
       var agencia = this.itemForm.value['HDESAGE']
     }

     if(Array.isArray(this.itemForm.value['HDESTER'])) {
       var territorio = this.itemForm.value['HDESTER'][0]
     } else {
       var territorio = this.itemForm.value['HDESTER']
     }
    
    /*if(this.itemForm.value['feccance']=''){
      var fecCancelado= new Date().toLocaleDateString();
    }
    else{
      var fecCancelado =  (JSON.parse(JSON.stringify(new Date(this.itemForm.value['feccance']).toISOString().slice(0, 10))));
    }*/
 
      let fecinstalado=  JSON.parse(JSON.stringify(new Date(this.itemForm.value['fecinstalado']).toISOString().slice(0, 10)))
      let fecCancelado=  this.itemForm.value['feccance'] == '' ? new Date() : JSON.parse(JSON.stringify(new Date(this.itemForm.value['feccance']).toISOString().slice(0, 10)));
      let mesinstalado= '';
      //let tipoagent= this.rowSource['HTIPAGENT'];

      if(Array.isArray(this.itemForm.value['HTIPAGENT'])) {
        var tipoagent = this.itemForm.value['HTIPAGENT'][0]
      } else {
        var tipoagent = this.itemForm.value['HTIPAGENT']
      }
      
      let codasesorasign= (this.itemForm.value['codasesorasignado']).toString()
      let asesorasign= (this.itemForm.value['asesorasignado']).toString() 
      
       if(Array.isArray(this.itemForm.value['HVINFAMI'])) {
         var vinculofamiliar = this.itemForm.value['HVINFAMI'][0]
       } else {
         var vinculofamiliar = this.itemForm.value['HVINFAMI']
       }
       if(Array.isArray(this.itemForm.value['HTIPVINC'])) {
         var tipovinculofamiliar = this.itemForm.value['HTIPVINC'][0]
       } else {
         var tipovinculofamiliar = this.itemForm.value['HTIPVINC']
       }
      // let estcorresponsal = this.rowSource['HESTDCORE'];
       if(Array.isArray(this.itemForm.value['HESTDCORE'])) {
        var estcorresponsal = this.itemForm.value['HESTDCORE'][0]
      } else {
        var estcorresponsal = this.itemForm.value['HESTDCORE']
      }
    

      if(Array.isArray(this.itemForm.value['HIDCORRES'])) {
        var idcorresponsal = this.itemForm.value['HIDCORRES'][0]
      } else {
        var idcorresponsal = this.itemForm.value['HIDCORRES']
      }
       
      //let idcorresponsal= JSON.parse(this.itemForm.value['idcorresponsal']);
       
      //console.log(departamento[0]);
     
      if (v) {
        this.payload = { dni: dni, instalado: instalado, prospecto: prospecto,
          aperturacta: aperturacta,latitud:latitud, longitud:longitud, 
          HCODSEC: JSON.stringify(cod_bt) , nomcomercial: nomcomercial, 
          estcorresponsal: estcorresponsal,
          zona: zona,ruc:ruc,celular:celular,direccion:direccion,distrito:distrito,
          provincia:provincia,departamento:departamento,corredor:corredor,agencia:agencia,
          territorio:territorio,fecinstalado:fecinstalado,mesinstalado:mesinstalado,tipoagent:tipoagent,
          codasesorasign:codasesorasign,asesorasign:asesorasign,vinculofamiliar:vinculofamiliar,
          tipovinculofamiliar:tipovinculofamiliar,idcorresponsal:idcorresponsal,fecCancelado:fecCancelado
        };
        console.log(this.payload);
        this.resObs().subscribe(x => {
          this.refresh$.next(true);
           
        })
        this.refreshData();
      }
    });
    this.dialogRef.close(this.data)
     
  }
}



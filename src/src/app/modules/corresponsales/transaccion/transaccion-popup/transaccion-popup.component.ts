import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
//import { ModActividadesService } from '../../servicios/mod-actividades.service';
import moment, { Moment } from 'moment';
import { ModCorresponsalService } from '../../servicio/mod-corresponsal.service';

@Component({
  selector: 'app-transaccion-popup',
  templateUrl: './transaccion-popup.component.html',
  styleUrls: ['./transaccion-popup.component.scss']
})
export class TransaccionPopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  rowSource: any;
  payload: any;
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransaccionPopupComponent>,
    private fb: UntypedFormBuilder,
    private antApp: ModCorresponsalService
  ) {
    this.rowSource = data.data1;
  }

  ngOnInit() {
    this.buildItemForm(this.data.data1)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      nom_cli: new UntypedFormControl({ value: [item.HAPENOMB || ''], disabled: true }),
      dni: new UntypedFormControl({ value: [item.HNUMDOC || ''], disabled: true }),
      ruc: new UntypedFormControl({ value: [item.HNUMRUC || ''], disabled: true }),
      direc: new UntypedFormControl({ value: [item.HDIREC || ''], disabled: true }),
      agencia: new UntypedFormControl({ value: [item.HDESAGE || ''], disabled: true }),
      lat: new UntypedFormControl({ value: [item.HGEOLATI || ''], disabled: false }),
      log: new UntypedFormControl({ value: [item.HGEOLON || ''], disabled: false }),
      HINSTALAD :['',Validators.required],
      HAPERTCTA :['',Validators.required],
      HPROSPEC :['',Validators.required]
      //instalado: new FormControl({ value: [item.HINSTALAD || ''], disabled: false }),
      //apercta: new FormControl({ value: [item.HAPERTCTA || ''], disabled: false }),  
      //HPROSPEC: new FormControl({ value: [item.HPROSPEC || ''], disabled: false })
    })
    
  }
  //get girProspecto(){ return this.itemForm.controls.HPROSPEC as FormControl  }

  private resObs() {
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

  submit() {
    
    this.dialogRef.afterClosed().subscribe(v => {
      let dni = this.rowSource['HNUMDOC'];
      let instalado = this.itemForm.value['HINSTALAD'];
      let prospecto = this.itemForm.value['HPROSPEC'];
      let aperturacta = this.itemForm.value['HAPERTCTA'];
      let latitud = this.itemForm.value['lat'];
      let longitud = this.itemForm.value['log']; 

      if (v) {
        this.payload = { dni: dni, instalado: instalado, prospecto: prospecto,aperturacta: aperturacta,latitud:latitud, longitud:longitud };
        console.log(this.payload);
        this.resObs().subscribe(x => {
          // this.data.data1['HFECVIS'] = moment(fec_vis).format("yyyy-MM-DD");
          // this.data.data1['HCUMPLDC'] = is_valid;
        });
      }
    });
    this.dialogRef.close(this.data)
  }
}



import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ModActividadesService } from '../../servicios/mod-actividades.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-destino-credito-popup',
  templateUrl: './destino-credito-popup.component.html',
  styleUrls: ['./destino-credito-popup.component.scss']
})
export class DestinoCreditoPopupComponent implements OnInit {
  public itemForm: UntypedFormGroup;
  rowSource: any;
  payload: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DestinoCreditoPopupComponent>,
    private fb: UntypedFormBuilder,
    private antApp: ModActividadesService
  ) {
    this.rowSource = data.data1;
  }

  ngOnInit() {
    this.buildItemForm(this.data.data1)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      asesor: new UntypedFormControl({ value: [item.HDESSEC || ''], disabled: true }),
      cod_asesor: new UntypedFormControl({ value: [item.HCODSEC || ''], disabled: true }),
      fec_vis: new UntypedFormControl({ value: [item.HFECVIS || ''] }),
      fec_des: new UntypedFormControl({ value: [item.HFECDES || ''], disabled: true }),
      mon_des: new UntypedFormControl({ value: [item.HMONDES || ''], disabled: true }),
      des_cli: new UntypedFormControl({ value: [item.HDESCLI || ''], disabled: true }),
      cta_cli: new UntypedFormControl({ value: [item.HCTACLI || ''], disabled: true }),
      cod_ope: new UntypedFormControl({ value: [item.HCODOPE || ''], disabled: true }),
      is_valid: [this.formatString(item.HCUMPLDC) || false]
    })

  }

  private resObs() {
    return this.antApp.postRegResultadosDestCred(this.payload);
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
      let cod_ope = this.rowSource['HCODOPE'];
      let fec_vis = this.itemForm.value['fec_vis'];
      let is_valid = this.itemForm.value['is_valid'] == true ? 'Si' : 'No';

      if (v) {
        this.payload = { cod_ope: cod_ope, fec_vis: fec_vis, is_valid: is_valid };
        console.log(this.payload);
        this.resObs().subscribe(x => {
          this.data.data1['HFECVIS'] = moment(fec_vis).format("yyyy-MM-DD");
          this.data.data1['HCUMPLDC'] = is_valid;
        });
      }
    });
    this.dialogRef.close(this.data)
  }
}



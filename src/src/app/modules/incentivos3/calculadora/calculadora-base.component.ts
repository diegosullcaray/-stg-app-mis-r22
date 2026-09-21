import { cloneObject, isNullOrUndefined, round } from 'app/core/shared/functions.util';
import { Incentivos3Service } from '../compartido/servicios/incentivos3.service';
import { formatNumber } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const compoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const p1 = control.get('tp1').value;
    const p2 = control.get('tp2').value;
    const p3 = control.get('tp3').value;
    return !isNullOrUndefined(p1) 
    && !isNullOrUndefined(p2) 
    && !isNullOrUndefined(p3) 
    && round((p1 + p2 + p3) * 100, 0) == 100 ? null : { compoImcomplete: true };
};

export abstract class CalculadoraBaseComponent {
    simForm: FormGroup;
    config: any;
    back_controls: any;
    diffTasa: number;
    compoError: boolean;

    constructor(public inc3: Incentivos3Service, public formBuilder: FormBuilder) { }

    init(): void {
        this.config = this.inc3.calculadora;
        this.compoError = false;

        let controls: any;

        if (this.config.cla == 1) {
            let idx = this.config.vars.findIndex((obj: any) => obj.id === "efec1" && obj.show);
            if (idx != -1) {
                controls = {
                    tp1: new FormControl(this.config.vars[idx].tp1, Validators.required),
                    tp2: new FormControl(this.config.vars[idx].tp2, Validators.required),
                    tp3: new FormControl(this.config.vars[idx].tp3, Validators.required),
                };
            }

            let idx2 = this.config.plus.findIndex((obj: any) => obj.id === "tas" && obj.show);
            if (idx2 != -1) {
                controls['p_tas2'] = new FormControl(this.config.plus[idx2].val1);
                let t = this.config.plus[idx2].val;
                let t1 = this.config.plus[idx2].val1;
                this.diffTasa = round((t - t1) * 10000, 0);
            }
        }else{
            controls = {};
        }

        this.config.vars.forEach((x: any) => {
            if (x.show) {
                controls[x.key] = new FormControl(x.val)
            }
        });
        this.config.plus.forEach((x: any) => {
            if (x.show) {
                controls[x.key] = new FormControl({ value: x.val, disabled: !x.enab });//, { validators: Validators.required }
            }
        });


        this.back_controls = cloneObject(controls);
        if(this.config.cla == 1){
            this.simForm = this.formBuilder.group(controls, { validators: compoValidator });
        }else{
            this.simForm = this.formBuilder.group(controls);
        }
    }

    abstract navMain(): void;

    calc() {
        let rs = {};
        let ctrs = this.simForm.controls;

        this.config.vars.forEach((x: any) => {
            if (x.show) {
                rs[x.key] = ctrs[x.key].value;
            }
        });
        this.config.plus.forEach((x: any) => {
            if(x.show){
                rs[x.key] = ctrs[x.key].value
            }
        });
        if (this.config.cla == 1) {
            let idx = this.config.vars.findIndex((obj: any) => obj.id === "efec1" && obj.show);
            if (idx != -1) {
                rs['tp1'] = ctrs['tp1'].value;
                rs['tp2'] = ctrs['tp2'].value;
                rs['tp3'] = ctrs['tp3'].value;

            }
            let idx2 = this.config.plus.findIndex((obj: any) => obj.id === "tas" && obj.show);
            if (idx2 != -1) {
                rs['p_tas2'] = ctrs['p_tas2'].value;
                let t = ctrs['p_tas'].value;
                let t1 = ctrs['p_tas2'].value;
                this.diffTasa = round((t - t1) * 10000, 0);
            }
            rs['mar_ren'] = this.config.mar_ren;
        }

        //console.log(this.simForm.errors);
        if (this.simForm.errors && this.simForm.errors.compoImcomplete) {
            this.compoError = true;
        } else {
            this.compoError = false;
            this.inc3.simulate(rs);
        }
    }


    reset() {
        this.simForm.reset(this.back_controls);
        let t = this.back_controls['p_tas'].value;
        let t1 = this.back_controls['p_tas2'].value;
        this.diffTasa = round((t - t1) * 10000, 0);
    }

    getT1(id: string) {
        switch (id) {
            case "clib": return "Clientes Banc.:";
            case "tas": return "Tasa Mes:";
            default: return "Valor:";
        }
    }

    getT2(id: string) {
        switch (id) {
            case "prod": return "Meta:";
            case "tas": return "Tasa Min:";
            default: return "";
        }
    }

    getForm1(v: number, f: string) {
        if (f == 'number') {
            return formatNumber(v, 'en-US', '.0-2');
        } else if (f == 'percent') {
            return formatNumber(v * 100, 'en-US', '.0-2') + '%';
        } else if (f == 'pen') {
            return 'S/. ' + formatNumber(v, 'en-US', '.0-2');
        }
        return v;
    }

    getBoxFlex(i: any) {
        if (i.key == 'v_efec1') {
            return 100;
        }
        return 50;
    }

    getInputFlex(i: any) {
        if (i.key == 'v_efec1') {
            return 20;
        }
        return 50;
    }

    getCom() {
        return this.config.act == 0 ? '(No Comisiona)' : '(Comisiona)';
    }

    getComCls() {
        return this.config.act == 0 ? { 'color': '#E3005B' } : { 'color': '#3fe91e' };
    }

    getT2Cls(item:any){
        return item.sum ? 't2':'t2d';
    }

    getE2Cls(item:any){
        return item.sum ? 'e2':'e2d';
    }
}
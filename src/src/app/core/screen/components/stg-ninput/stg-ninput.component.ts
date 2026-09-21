import { formatNumber } from "@angular/common";
import { Input, OnDestroy, OnInit } from "@angular/core";
import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { isNullOrUndefined, round } from "app/core/shared/functions.util";

@Component({
    selector: 'stg-ninput',
    templateUrl: './stg-ninput.component.html',
    styleUrls: ['./stg-ninput.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StgNinputComponent),
            multi: true
        }
    ]
})
export class StgNinputComponent implements OnInit, OnDestroy, ControlValueAccessor {

    value: number;
    textValue: string;


    isDisabled: boolean;
    touched: boolean;
    onChange = (_: any) => { }
    onTouch = () => { }



    @Input() decimalLength: number;
    @Input() styleCfg: string;
    @Input() maxValue: number;
    @Input() minValue: number;

    constructor() {
        this.touched = false;
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        if (isNullOrUndefined(this.decimalLength)) {
            this.decimalLength = 2;
        }
        if (isNullOrUndefined(this.maxValue)) {
            this.maxValue = 100;
        }
        if (isNullOrUndefined(this.minValue)) {
            this.minValue = 0;
        }
    }


    getStyle() {
        if(isNullOrUndefined(this.styleCfg)){
            return "";
        }
        return this.styleCfg;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouch();
            this.touched = true;
        }
    }


    end(e: any) {
        // console.log(/^[0-9.]*$/.test(e.target.value));
        if (!/^-?[0-9.]*$/.test(e.target.value)) {
            e.target.value = e.target.value.replaceAll(/-?[^0-9.]/g, '').trim();
        }
        //add ' %' at the end
        if (e.target.value.length) {
            let n = round(Number(e.target.value),this.decimalLength);
            //n = n>this.maxValue?this.maxValue:n;
            //n = n<this.minValue?this.minValue:n;
            this.onChange(n);
            let sr = '.0-'+this.decimalLength;
            e.target.value = formatNumber(n, 'en-US', sr);
        }
        //this part is needed when working with angular form validation (ngForm required 
        //or formGroup Validators.required), else null value won't trigger the validation
        else {
            e.target.value = '0';
            this.onChange(0);
        }
    }

    start(e: any) {
        let n = e.target.value.replace(',','').trim();
        //e.target.value = Number(n)/100;
        e.target.value = n;
    }

    /*******************************/

    writeValue(value: any): void {
        if (value) {
            this.value = value || 0;
        } else {
            this.value = 0;
        }
        let sr = '.0-'+this.decimalLength;
        this.textValue = formatNumber(value, 'en-US', sr);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

}
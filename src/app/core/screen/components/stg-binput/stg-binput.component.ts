import { Input, OnInit } from "@angular/core";
import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { StgWindowConfig } from "../stg-window/stg-window.config";
import { StgBinputDialogComponent } from "./dialog/stg-binput-dialog.component";

@Component({
    selector: 'stg-binput',
    templateUrl: './stg-binput.component.html',
    styleUrls: ['./stg-binput.component.scss'],
    providers: [
        { 
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => StgBinputComponent),
          multi: true
        }
      ]
})
export class StgBinputComponent implements OnInit, ControlValueAccessor {

    value: string;
    isDisabled: boolean;
    onChange = (_: any) => { }
    onTouch = () => { }

    @Input() truncateLimit:number;

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        if(isNullOrUndefined(this.truncateLimit)){
            this.truncateLimit=30;
        }
    }

    showDialog() {
        const dialogConfig = new StgWindowConfig();
        dialogConfig.width = '400px';
        dialogConfig.height = '450px';
        dialogConfig.data = { value: this.value,enabled: !this.isDisabled };
        const dialogRef = this.dialog.open(StgBinputDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(v => {
            this.onInput(v);
        });
    }

    getStyle(){
        let s = {
            'height':'28px'
        };
        if(this.isDisabled){
            s['color']='rgba(48, 65, 86, 0.38)';
        }
        return s;
    }

    onInput(value: string) {
        this.value = value;
        this.onTouch();
        this.onChange(this.value);
    }

    writeValue(value: any): void {
        if (value) {
            this.value = value || '';
        } else {
            this.value = '';
        }
        // if (value !== undefined) {
        //     this.value = value;
        // }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn:any): void {
        this.onTouch = fn;
    }

     setDisabledState(isDisabled: boolean): void {
         this.isDisabled = isDisabled;
     }



}
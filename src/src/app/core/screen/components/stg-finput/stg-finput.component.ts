import { ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { isNullOrUndefined, onNullOrUndefined } from "app/core/shared/functions.util";
import * as uuid from 'uuid';
import { StgFInputService } from "./stg-finput.service";
import {saveAs} from 'file-saver';

@Component({
    selector: 'stg-finput',
    templateUrl: './stg-finput.component.html',
    styleUrls: ['./stg-finput.component.scss'],
    providers: [
        { 
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => StgFinputComponent),
          multi: true
        }
      ]
})
export class StgFinputComponent implements OnInit,OnDestroy, ControlValueAccessor {

    @Input() disableDownload: boolean;
    @Input() disableUpload: boolean;

    @ViewChild("hstgf") inputFile : ElementRef;


    value: string;
    isDisabled: boolean;
    onChange = (_: any) => { }
    onTouch = () => { }

    

    @Input() truncateLimit:number;
    @Input() fileName: string;


    constructor(private fService:StgFInputService) { }

    ngOnDestroy(): void {
        //this.fService.remove(this.value);
    }

    ngOnInit(): void {
        this.disableDownload = onNullOrUndefined(this.disableDownload,true);
        this.disableUpload = onNullOrUndefined(this.disableUpload,false);
        if(isNullOrUndefined(this.truncateLimit)){
            this.truncateLimit=30;
        }
        this.fileName=onNullOrUndefined(this.fileName,'');
    }

    download(evt:any){
        this.fService.download(this.value).subscribe(x=>{
            saveAs(x,this.fileName);
        });
    }

    openFileChooser(){
        this.inputFile.nativeElement.click(); 
    }

    file(evt:any){
        let file = evt.target.files[0];
        const fId = uuid.v4();
        this.fileName=file.name;
        this.onInput(fId);
        this.fService.register(fId,file);
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
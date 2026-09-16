import { Component, EventEmitter, Input, Output } from "@angular/core";
import { OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { cloneObject, mergeObjects } from "app/core/shared/functions.util";
import { Subject } from "rxjs";
import { stgDefaultFormConfig } from "./stg-form.util";

@Component({
    selector: 'stg-form',
    templateUrl: './stg-form.component.html',
    styleUrls: ['./stg-form.component.scss']
})
export class StgFormComponent implements OnInit {
    @Input() options: any;
    @Input() fields: any[];
    @Input() dataSource: any[];
    @Input() fieldWidth:any;

    @Input() optionsObserver: Subject<any>;
    config: any;

    localForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.config = mergeObjects(cloneObject(stgDefaultFormConfig), this.options ? this.options : {});
        let controls = {};
        this.fields.forEach(x => controls[x.key] = this.dataSource?this.dataSource[x.key]:undefined);
        this.localForm = this.formBuilder.group(controls);
    }

    public getControls():any{
        return this.localForm.controls;
    }

    globalStyle(){
        let r = {};
        let grid = this.config.grid;
        if (grid.enabled) {
            r['--border'] = grid.border;
            r['--border-radius'] = grid['border-radius'];
        }
        let s = this.config.style;
        if(s && s.background){
            r['--global-background']=s.background;
        }
        //else if(grid.enabled && grid.mode=='bottom'){
        //r['--border']=grid.border;
        //r['--border-radius']=grid['border-radius'];
        //}
        return r;
    }

    getFieldLabelStyle(){
        return {
            width: this.fieldWidth
        };
    }

    getBodyFieldStyle(tr:any,r:number,rl:number){
        let field = this.config.field;
        let grid = this.config.grid;
        let fStyle = {};
        fStyle = mergeObjects(fStyle, field.style);
        if (field.styleFn) {
            fStyle = mergeObjects(fStyle, field.styleFn(tr));
        }
        if(tr.style){
            fStyle = mergeObjects(fStyle, tr.style);
        }
        if(tr.styleFn){
            let v = this.dataSource[tr.key];
            fStyle = mergeObjects(fStyle, tr.styleFn(v,tr.key,this.dataSource));
        }
        if (grid.enabled) {
            let gS = {};
            if (r < rl - 1) {
                gS['border-bottom'] = grid.border;
            }
            fStyle = mergeObjects(fStyle, gS);
        }
        return fStyle;
    }

}
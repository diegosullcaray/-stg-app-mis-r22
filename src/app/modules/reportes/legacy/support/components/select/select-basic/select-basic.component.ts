import { Component, OnInit,Output,Input,EventEmitter,SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { startWith } from 'rxjs/operators';
@Component({
  selector: 'app-select-basic',
  templateUrl: './select-basic.component.html',
  styleUrls: ['./select-basic.component.scss']
})
export class SelectBasicComponent implements OnInit {
  @Output() refresh = new EventEmitter<Object>();
  @Input() config_select;
  select:UntypedFormControl;
  data:any[]=[];
  isLoadingSelect=false;
  fgroupSelect:UntypedFormGroup=new UntypedFormGroup({});
  row;
  constructor(private cdr:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if (changes.config_select && !isNullOrUndefined(this.config_select)
      //&& !changes.config_select.isFirstChange()
    ) {
      let select=this.config_select;
      this.data=select.data;
      this.fgroupSelect.addControl(select.variable,new UntypedFormControl(select.selected))
      //this.select=new FormControl(this.config_select.selected);
      this.isLoadingSelect=true;
    }
  }


  ngOnInit() {
    const filter_$=this.fgroupSelect.valueChanges.pipe(startWith(this.fgroupSelect.value))
    filter_$.subscribe(val =>{
      for (let k in val) {
        if(!isNullOrUndefined(val[k]))
          this.refresh.emit(val);
      }
    });
  }

}

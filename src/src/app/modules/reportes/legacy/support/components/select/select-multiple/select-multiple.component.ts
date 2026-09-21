import { Component, OnInit, Output,EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { first, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss']
})
export class SelectMultipleComponent implements OnInit,OnChanges {
  @Output() refresh = new EventEmitter<Object>();
  @Input() config_select_multiple:any[];
  fgroupSelect:UntypedFormGroup=new UntypedFormGroup({});
  data:any[]=[];
  isLoadingSelect=false;
  row;

  constructor() { }

  ngOnChanges(changes: SimpleChanges){
    if (changes.config_select_multiple //&& !changes.config_select.isFirstChange()
    ) {
      if(this.config_select_multiple.length>0 && !isNullOrUndefined(this.config_select_multiple))
      this.renderSelects(this.config_select_multiple);
    }
  }

  renderSelects(selects){
    this.data=selects;
    selects.forEach(s =>{
      this.fgroupSelect.addControl(s.variable,new UntypedFormControl(s.selected));
      this.fgroupSelect.get(s.variable).setValue(s.selected);
    });
      
    this.isLoadingSelect=true
  }

  ngOnInit() {
    const filter_$=this.fgroupSelect.valueChanges.pipe(startWith(this.fgroupSelect.value))
    filter_$.subscribe(val =>this.refresh.emit(val));
  }

}

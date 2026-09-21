import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-sec',
  templateUrl: './search-sec.component.html',
  styleUrls: ['./search-sec.component.scss']
})

export class SearchSecComponent implements OnInit, OnChanges{
  @Input() data
  @Output() refresh = new EventEmitter<Object>();
  myControl = new UntypedFormControl();
  filtered: Observable<any[]>;
  constructor() {
  }

  ngOnInit() {      
    this.filtered = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(r =>r ? this._filterStates(r) : this.data.result.slice())
    );
  }

  ngOnChanges(changes:SimpleChanges){

    
  }

  private _filterStates(value: string){
    const filterValue = value.toLowerCase();
    return this.data.result.filter(r => r.name.toLowerCase().includes(filterValue));
    return this.data.result.filter(r => r.name.toLowerCase().indexOf(filterValue) === 0);
  }
  onRefresh(evt,data){
    if (evt.source.selected) {
      this.refresh.emit(data);
    }
  }
  clear(){this.myControl.patchValue(null)}

}

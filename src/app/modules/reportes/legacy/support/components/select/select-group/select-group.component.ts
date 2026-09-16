import { Component, OnInit,Output,Input,EventEmitter,SimpleChanges,OnChanges,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, FormBuilder } from '@angular/forms';
import { of, Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import { ComercialService } from 'app/modules/reportes/legacy/comercial/comercial.service';
import { CacheService } from '../../../services/cache.service';
@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss']
})
export class SelectGroupComponent implements OnInit,OnChanges,OnDestroy {
  @Output() refresh = new EventEmitter<Object>();
  @Input() config_select_group;
  data_select;
  fgroupSelect:UntypedFormGroup=new UntypedFormGroup({});
  isLoadingSelect=false;
  data=[];
  row;
  flag_auto:boolean=false;
  secuency=[];
  secuency2=[];
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private ca:CacheService,
              private cdr:ChangeDetectorRef,
              private cs:ComercialService) { }

  ngOnInit() {
    //this.locally({tip_cod:undefined,cod_rel:undefined,level_load:undefined,jerar:this.config_select_group});
  }

  ngOnChanges(changes: SimpleChanges){
    //console.log(this.config_select_group);
    if (changes.config_select_group && !changes.config_select_group.isFirstChange()
      && this.config_select_group
    ) {
      //console.log(this.config_select_group);
      
    }
    if(changes.config_select_group && changes.config_select_group.isFirstChange()){
      //console.log(this.config_select_group);
      this.secuency=[];
      this.secuency2=[];
      this.locally({tip_cod:undefined,cod_rel:undefined,level_load:undefined,jerar:this.config_select_group});
    }
  }

  exec(row,cbo, event) {
    if (event.source.selected && this.row!=row) {
      this.secuency=this.secuency.filter(f=>f.level<cbo.level);
      this.secuency.push({tip_cod:cbo.tip_cod,cod_rel:row.cod_rel,level:cbo.level})
      this.row=row;
      let params={ tip_cod:cbo.tip_cod,
        cod_rel:row.cod_rel,
        level_load:cbo.level_load,
        jerar:this.config_select_group,
        ext:cbo.ext}
      
      if(this.ca.isResult(params)){
        this.flag_auto=true;
      }
      if(this.flag_auto){
        this.ca.selected(params);
        
        this.secuency2=this.secuency.reverse().map((r,i)=>{
          return {tip_cod:r.tip_cod,cod_rel:r.cod_rel,order:i}
        })
        this.secuency.reverse()
        //console.log(this.secuency2);
        this.refresh.emit({ secuency:JSON.stringify(this.secuency2),tip_cod:cbo.tip_cod,cod_rel:row.cod_rel});
        //,jerar:this.config_select_group
      }
      cbo.ext?this.locally(params):null;                   
    }
  }

  cleaner(cs){
    this.data=this.data.filter(r=>r.level_load<cs.level_load);
    this.fgroupSelect.patchValue({[cs.label]:null})
  }

  locally(r?:{}){    
    !this.ca.isCache(r)?this.external(r):this.internal(r);
  }

  external(math?:{}){
    //console.log("external");
    this.cs.getHierarchy(this.config_select_group,math['tip_cod'],math['cod_rel'],math['level_load'])
    .pipe(takeUntil(this.destroy$))
    .subscribe((r)=>{
      this.data_select=r.body['result'];
      this.data_select.level_load=this.data_select.level+1;
      this.data_select.flag=false;

      if(this.data_select.sel==1){
        this.data_select.sel=this.data_select.data[0].cod_rel;
        this.data_select.flag=true;
      }
      this.auxChange(this.data_select);
      let mathv2={...math,jerar:this.config_select_group}
      let dataCache={math:mathv2,data:this.data_select}
      this.ca.saveFilterv2(dataCache);
      
      this.cdr.detectChanges();
    });
  }

  internal(math:{}){
    //console.log("internal");
    this.data_select=this.ca.loadCache(math);
    this.auxChange(this.data_select);
    this.cdr.detectChanges();
  }


  auxChange(r){
    this.cleaner(r);
    this.data.push(r);
    this.fgroupSelect.addControl(r.label,new UntypedFormControl(r.sel));
    this.isLoadingSelect=true;
    this.cdr.detectChanges();
  }

  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}

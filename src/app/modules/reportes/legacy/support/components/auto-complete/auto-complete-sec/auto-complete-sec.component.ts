import { Component, OnInit, ChangeDetectorRef ,EventEmitter, Output, OnDestroy} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { tap, startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { UserService } from 'app/system/admin/services/user.service';
import { ModSecService } from '../../../data/ant-mod-sec.service';

@Component({
  selector: 'app-auto-complete-sec',
  templateUrl: './auto-complete-sec.component.html',
  styleUrls: ['./auto-complete-sec.component.scss']
})
export class AutoCompleteSecComponent implements OnInit,OnDestroy {
  public isSectorista:Boolean=this.us.get('profile').tip_use===1;
  profile:any;
  private destroy$:ReplaySubject<boolean>=new ReplaySubject(1);
  data
  @Output() refresh = new EventEmitter<Object>();
  myControl = new UntypedFormControl();
  filtered: Observable<any[]>;
  constructor(private fb: UntypedFormBuilder,
              private ant:ModSecService,
              private us:UserService,
              private cdr: ChangeDetectorRef) { }

  private renderAsesores():void{

    let email=this.us.email;
    this.ant.getSecList(email)
    .pipe(
      takeUntil(this.destroy$),
      tap(
        data =>{
          let result=[]
          let dataG=data.body["result_sectorista"];
          dataG.forEach(e => {
            result.push({name:e.nombre_sec,dni:e.num_doc});
          });
          this.data={isResult:1,placeholder:"Asesores",result:result};
          this.cdr.detectChanges();
        },
        () => {
        }
      )
    )
    .subscribe((red)=>{
      //this.renderAsesores();   
      this.filtered = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(r =>r ? this._filterStates(r) : this.data.result.slice())
      );
    })
    //console.log(this.$asesores);
  }
  ngOnInit() {
    this.profile==this.us.get('profile');
    if(this.isSectorista){
      let params={tip_cod:2,cod_rel:this.us.get('profile').num_doc}
      setTimeout(() =>this.refresh.emit(params), 1000);
    }else{
      this.renderAsesores();
    }   
    
  }

 
  private _filterStates(value: string){
    const filterValue = value.toLowerCase();
    return this.data.result.filter(r => r.name.toLowerCase().includes(filterValue));
  }

  onRefresh(evt,data){
    if (evt.source.selected) {
      let params={tip_cod:2,cod_rel:data.dni}
      this.refresh.emit(params);
    }
  }

  clear(){this.myControl.patchValue(null)}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /*render(){
    console.log(this.myControl);
    this.myControl.patchValue('MORAN RAMIREZ NANCY CATALINA')
  }*/

}

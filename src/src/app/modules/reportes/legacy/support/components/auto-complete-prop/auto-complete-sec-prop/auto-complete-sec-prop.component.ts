import { Component, OnInit, ChangeDetectorRef ,EventEmitter, Output, OnDestroy} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { tap, startWith, map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { UserService } from 'app/system/admin/services/user.service';
import { ModSecService } from '../../../data/ant-mod-sec.service';

@Component({
  selector: 'app-auto-complete-sec-prop',
  templateUrl: './auto-complete-sec-prop.component.html',
  styleUrls: ['./auto-complete-sec-prop.component.scss']
})
export class AutoCompleteSecPropComponent implements OnInit,OnDestroy {
  
  public isSectorista:Boolean=this.us.get('profile').tip_use===1;
  public isAdministrador:Boolean=this.us.get('profile').tip_use===2;
  
  profile:any;
  public tipusuario: Boolean;
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
    console.log(this.us.get('profile').tip_use)
    //console.log("hola")
    this.ant.getSecListMov(email)
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
    console.log(this.us.get('profile').tip_use);
    this.profile==this.us.get('profile');
     

    if(this.us.get('profile').tip_use ==0 && this.isAdministrador==false){
      this.tipusuario=true
    }
    if((this.us.get('profile').tip_use ==1 && this.isAdministrador==false)||
    (this.us.get('profile').tip_use ==1 && this.isSectorista==true)){
      this.tipusuario=false
    }
    if((this.us.get('profile').tip_use ==2 && this.isAdministrador==true)||
    (this.us.get('profile').tip_use ==2 && this.isSectorista==false)){
      this.tipusuario=false
    }

    //console.log(this.profile);
    console.log(this.isSectorista);
    console.log(this.isAdministrador);
    if(this.isSectorista || this.isAdministrador){
      let params={tip_cod:2,cod_rel:this.us.get('profile').num_doc}
      setTimeout(() =>this.refresh.emit(params), 1000);
    }else{
      this.renderAsesores();
    }   
    
  }

 
  private _filterStates(value: string){
    const filterValue = value.toLowerCase();
    console.log(filterValue);
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

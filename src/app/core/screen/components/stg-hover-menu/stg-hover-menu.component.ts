import { Component, Input, Renderer2 } from '@angular/core';
import { IChildItem } from '../../../../system/admin/services/navigation.service';

@Component({
  selector: 'stg-hover-menu',
  templateUrl: './stg-hover-menu.component.html',
  styleUrls:['./stg-hover-menu.component.scss']
})
export class StgHoverMenuComponent {
  //private timedOutCloser;
  @Input("childs") menuChilds: IChildItem[];

  repoIn:boolean[]=[];
  repoLvl:string[]=[];
  repoReIn:boolean[]=[];
  enteredBase;

  constructor() {
   }

  baseLeave(trigger) {
    setTimeout(() => {
      let v = this.repoIn[0];
      if(!v){
        trigger.closeMenu();
      }
    }, 100)
  }

  levelEnter(lvl:string){
    if(!this.repoLvl.includes(lvl)){
      this.repoLvl.push(lvl);
      this.repoIn.push(true);
      this.repoReIn.push(false);
    }else{
      let idx = this.repoLvl.indexOf(lvl);
      let v = this.repoIn[idx];
      if(v){
        this.repoReIn[idx]=true;
      }
      this.repoIn[idx]=true;
      for(var i=idx+1;i<this.repoLvl.length;i++){
        this.repoIn[i]=false;
        this.repoReIn[i]=false;
      }
    }
  }

  levelLeave(lvl:string,...trigger){
    let idx = this.repoLvl.indexOf(lvl);
    setTimeout(() => {
      
      let nm = this.repoIn[idx+1];
      if(nm){
        this.repoReIn[idx]=false;
      }else{
        let ri = this.repoReIn[idx-1];
        if(ri){
          trigger[idx].closeMenu();
          this.repoReIn[idx-1]=false;
        }else{
          for(var i=idx;i>=0;i--){
            trigger[i].closeMenu();
            this.repoReIn[i]=false;
            this.repoIn[i]=false;
          }
        }
      }
      //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
      //this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
    },100)
  }

  /*
    mouseEnter(trigger,lvl) {
      if (this.timedOutCloser) {
        clearTimeout(this.timedOutCloser);
      }
 
      trigger.openMenu();
    }
  
    mouseLeave(trigger,lvl) {
      this.timedOutCloser = setTimeout(() => {
 
        trigger.closeMenu();
      }, 10);
    }*/
}
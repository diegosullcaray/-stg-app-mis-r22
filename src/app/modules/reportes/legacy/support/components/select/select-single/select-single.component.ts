import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { ModSecService } from '../../../data/ant-mod-sec.service';
import { IStrategosSelectBody, IStrategosSelectRemoteConfig } from './select-single-bearer.interface';

/*@Component({
  selector: 'stg-select-single',
  templateUrl: './select-single.component.html',
  styleUrls: ['./select-single.component.scss']
})*/
export class SelectSingleComponent implements OnInit {
  @Input("body") dataBody:IStrategosSelectBody;
  @Input("remote") remoteConfig:IStrategosSelectRemoteConfig;  

  constructor(private antModSec:ModSecService) { }

  ngOnInit() {
    this.render();
  }

  private render(){
    if(!isNullOrUndefined(this.remoteConfig)){
      
    }
  }

}

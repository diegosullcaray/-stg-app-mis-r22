import { Component, Input, OnInit } from '@angular/core';
import { formatNumber } from "@angular/common";
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { Incentivos2Service } from '../compartido/servicio/incentivos2.service';
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-variable-incentivos2',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss', './circle-pie.scss', '../incentivos2-util.component.scss']
})
export class VariableComponent implements OnInit {
  @Input() config: any;

  clsPiePer: string;

  constructor(private incentivos2: Incentivos2Service, public layout: LayoutService, 
    private router: Router, private activatedRoute: ActivatedRoute,
    private incentivos:Incentivos2Service) { }

  ngOnInit(): void {
    if (isNullOrUndefined(this.config)) {
      this.config = this.incentivos2.currCardData;
    }
  }

  getPerVal(){
    return this.config.percentr;
  }

  pieCls(){
    return this.clsPiePer = "pie p" + this.config.percent;
  }

  clsCardState() {
    let r ="";
    let x = this.config.state;
    if (x==1) {
      r = "material-icons state-1 var-state";
    } else if(x==2) {
      r = "material-icons state-3 var-state";
    }
    else{
      r = "material-icons state-2 var-state";
    }
    if (this.layout.isMobile) {
      r += '-short';
    }
    return r;
  }

  clsChip(i: number): string {
    let t = this.config.chips[i].type;
    let v = 'var-chip'
    if (t == 'g') {
      t+=(this.config.state+1);
    }
    if (this.layout.isMobile) {
      v += "-short"
    }
    return v + ' ' + t;
  }

  clsChipM() {
    if (this.layout.isMobile) {
      return 'var-chip-short m';
    }
    return 'var-chip m';
  }

  getFormatVal(i: number): string {
    let val = this.config.chips[i].value;
    let format = this.config.chips[i].format;
    if (format == 'number') {
      return formatNumber(val, 'en-US', '.0-2');
    } else if (format == 'percent') {
      return formatNumber(val * 100, 'en-US', '.2-2') + '%';
    } else {
      return val;
    }
  }

  navBefore() {
    this.config = this.incentivos2.prevCardData();
  }

  navNext() {
    this.config = this.incentivos2.nextCardData();
  }

  navMain() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
}

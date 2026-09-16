import { Component, Input, OnInit } from '@angular/core';
import { formatNumber } from "@angular/common";
import { isNullOrUndefined } from 'app/core/shared/functions.util'; 
import { LayoutService } from 'app/system/admin/services/layout.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  @Input() config: any;

  clsPiePer: string;

  constructor(  public layout: LayoutService, 
    private router: Router, private activatedRoute: ActivatedRoute,
     ) { }

  ngOnInit(): void {
     console.log("rankign")
  }

   
   
  
}

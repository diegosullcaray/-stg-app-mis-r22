import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'blank-loader',
  templateUrl: './blank-loader.component.html',
  styleUrls: ['./blank-loader.component.scss']
})
export class BlankLoaderComponent implements OnInit, OnDestroy {


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  constructor() {
  }
}
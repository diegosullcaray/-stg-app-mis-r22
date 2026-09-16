import { Component, OnDestroy, OnInit } from "@angular/core";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { ClientSummaryService } from "./client-summary.service";

@Component({
  selector: 'client-summary',
  templateUrl: './client-summary.component.html',
  styleUrls: ['./client-summary.component.scss']
})
export class ClientSummaryComponent implements OnInit, OnDestroy {
  config: any;
  activeTab: number = 0;
  geo_options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    //mapId: "DEMO_MAP_ID"
  };
  geo_zoom = 15;

  constructor(
    private cliSum: ClientSummaryService,
    private loader: StgAppLoaderService
  ) {

  }

  ngOnInit(): void {
    this.config = this.cliSum.config;
    console.log(this.config);
    this.cliSum.loadData();
  }

  ngOnDestroy(): void {
    this.cliSum.clean();
  }



  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
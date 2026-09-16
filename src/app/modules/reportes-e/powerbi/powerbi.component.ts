import { Component, OnDestroy, OnInit } from '@angular/core';
import { models } from 'powerbi-client';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-powerbi-reportes-e',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.scss']
})
export class PowerbiComponent implements OnInit,OnDestroy {

  reportConfig = {
    type: "report",
    id: "",
    embedUrl: "https://app.powerbi.com/reportEmbed",
    accessToken: "",
    tokenType: models.TokenType.Embed,
    settings: {
      localeSettings: {
        language: "en-us"
      },
      panes: {
        filters: {
          expanded: false,
          visible: false
        },
        //pageNavigation: {
        //visible: false
        //}
      },
      bars: {
        statusBar: {
          visible: true
        }
      },
      layoutType: models.LayoutType.Custom,
      customLayout: {
        displayOption: models.DisplayOption.FitToPage
      },
      background: models.BackgroundType.Transparent,
    }
  };

  reportClass = "pbi-report-container";

  loading = true;

  reportTitle = "--"

  private subs:Subscription;

  constructor(
    private antRepE: ReportesEService,
    private antService: ModReportesEService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs=this.antRepE.selectedReportObs$.subscribe(x => {
      this.reportTitle = x.name;
      this.reportConfig.id = x.id;
      if (x.reportType == 'PowerBIReport') {
        this.antService.getPowerBIReportToken(x.id, x.datasetId).subscribe(x => {
          let br: any = x.body.resultado;
          this.reportConfig.accessToken = br.token;
          this.loading = false;
        });
      }
    });
  }

  backToList() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute, skipLocationChange: true });
  }
}

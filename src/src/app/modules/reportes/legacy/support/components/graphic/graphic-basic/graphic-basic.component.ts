import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_venn from 'highcharts/modules/venn';
import HC_annotations from 'highcharts/modules/annotations'
import { LayoutService } from 'app/system/admin/services/layout.service';
import { isNull, isUndefined } from 'app/core/shared/functions.util';
import { baseAnimations } from 'app/core/screen/animations/animations.util';
HC_venn(Highcharts);
HC_annotations(Highcharts);

@Component({
  selector: 'app-graphic-basic',
  templateUrl: './graphic-basic.component.html',
  styleUrls: ['./graphic-basic.component.scss'],
  animations: baseAnimations
})
export class GraphicBasicComponent implements OnInit, OnChanges {
  @Input() config_graphic: [];
  carousel=[];
  Highcharts=Highcharts;
  grilla:number=50;
  position:number=0;
 
  update: boolean[] = [];
  co:any=[];
  isLoadingGraphic=false;
  graphicFinal;
  constructor(private layout: LayoutService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.config_graphic)
    if (changes.config_graphic && !changes.config_graphic.isFirstChange()) {
      this.isLoadingGraphic = false;
      let part1 = this.config_graphic.slice(0, 3);
      let part2 = this.config_graphic.slice(3, 6);
      let graphics = [{
        title: "Primer bloque",
        graphic: part1
      }, {
        title: "Segundo bloque",
        graphic: part2
      }]
      this.graphicFinal = graphics;
      this.renderCarousel(this.config_graphic);
      this.renderGraficov1(this.config_graphic);
      this.isLoadingGraphic = true;
    }
  }

  ngOnInit() {
    this.renderGraphicLayout();
  }

  private renderGraficov1(conf) {
    var seriesFake = [{
      type: 'venn',
      name: 'The Unattainable Triangle',
      data: [{
        sets: ['Good'],
        value: 2
      }, {
        sets: ['Fast'],
        value: 2
      }, {
        sets: ['Cheap'],
        value: 2
      }, {
        sets: ['Good', 'Fast'],
        value: 1,
        name: 'More expensive'
      }, {
        sets: ['Good', 'Cheap'],
        value: 1,
        name: 'Will take time to deliver'
      }, {
        sets: ['Fast', 'Cheap'],
        value: 1,
        name: 'Not the best quality'
      }, {
        sets: ['Fast', 'Cheap', 'Good'],
        value: 1,
        name: 'They\'re dreaming'
      }]
    }];
    conf.forEach((conf, index) => {
      this.co[index] = {
        annotations: [
          //{ labels: [
          //{
          //  point: "point1",
          //  text: "label"
          //}
        //] }
      ],
        title: {
          text: '',
        },
        subtitle: {
          useHTML: true,
          text: '',
          align: 'right'
        },
        xAxis: {
          categories: [],
          type: null

        },
        yAxis: {
          title: {
            text: ''
          }
        },
        series: [],
        plotOptions: {
          column: {
            stacking: 'stream'
          }
        }
      };
      if (!isUndefined(conf.theme)) {
        this.Highcharts.setOptions(conf.theme);
      }
      this.co[index].series = conf.series;
      this.co[index].title.text = conf.title;
      if (conf.subtitle.state) {
        this.co[index].subtitle.text = conf.subtitle.text;
      }
      if (conf.categories[0] == null) {
        this.co[index].xAxis.categories = null;
        this.co[index].xAxis.type = 'datetime';

      } else {
        this.co[index].xAxis.categories = conf.categories;
      }


      this.co[index].xAxis.plotBands = conf.plotBands;
      this.co[index].xAxis.plotOptions = conf.plotOptions;
      this.co[index].annotations = conf.annotations;
      this.co[index].yAxis = conf.yAxis;
      this.update[index] = true;
    });
    setTimeout(() => {
      //window.dispatchEvent(new Event('resize'));
      let loadingAc = conf[0].conf.isLoadingResults ? true : false;
      this.loading(loadingAc);
    }, 100);


  }

  private loading(active: boolean) {
    var c = Highcharts.charts.filter((n) => n != undefined);
    for (var i = 0; i < c.length; i++) {
      if (active) {
        c[i].showLoading('Cargando ...');
      } else {
        c[i].hideLoading();
      }
    }
  }

  public red() {
    let grid: number[] = [50, 33, 25, 100]
    this.position < 3 ? this.position++ : this.position = 0;
    let pos = this.position
    this.grilla = grid[pos];
    this.reflow();
  }


  private renderGraphicLayout(): void {
    let state$ = this.layout.layoutConf$
    state$.subscribe(() => this.reflow())
  }

  private reflow() {
    setTimeout(() => {
      var c = Highcharts.charts.filter((n) => n != undefined);
      for (var i = 0; i < c.length; i++) {
        //c[i].reflow();
        c[i].redraw();
        c[i].setSize(null, null);
        //c[i]['hasUserSize'] = null;
      }
    }, 500);
  }

  private renderCarousel(grafica: []) {
    this.carousel = [];
    grafica.forEach((e: any, i) => {
      if (!isNull(e.carousel.value) && e.carousel.value != 0)
        if (this.carousel.length < 8)
          this.carousel.push(e.carousel);
    });
  }


}

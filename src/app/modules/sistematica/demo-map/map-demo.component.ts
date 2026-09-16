import * as Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
Map(Highcharts);
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-map-demo-sistematica',
    templateUrl: './map-demo.component.html',
    styleUrls: ['./map-demo.component.scss']
})
export class MapDemoComponent implements OnInit {
    Highcharts: typeof Highcharts = Highcharts;
    private MAP_URL = '../../../../assets/maps/peru_departamental_simple.json';

    opts: any;
    f1: boolean = false;
    f2: boolean = false;
    datos: any;
    constructor(@Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {
        this.datos = data;
    }

    ngOnInit(): void {
        //this.http.get(this.MAP_URL).subscribe(console.log);

        let topology;
        this.http.get('https://code.highcharts.com/mapdata/countries/us/us-all.topo.json').subscribe((x: any) => {

            topology = x;
            console.log(x)
            this.f1 = true;
        });

        let data;
        this.http.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json').subscribe((x: any) => {
            data = x;
            console.log(x)
            data.forEach(function (p) {
                p.code = p.code.toUpperCase();
            });
            this.f2 = true;
        })

        // Make codes uppercase to match the map data
        /*data.forEach(function (p) {
            p.code = p.code.toUpperCase();
        });*/

        this.opts = {
            chart: {
                map: topology
            },

            title: {
                text: 'US population density (/km²)'
            },

            exporting: {
                sourceWidth: 600,
                sourceHeight: 500
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.67, '#4444FF'],
                    [1, '#000022']
                ]
            },

            series: [{
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{xDescription}, {point.value} people per square kilometer.'
                    }
                },
                animation: {
                    duration: 1000
                },
                data: data,
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.code}'
                },
                name: 'Population density',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}/km²'
                }
            }]
        };
    }


}
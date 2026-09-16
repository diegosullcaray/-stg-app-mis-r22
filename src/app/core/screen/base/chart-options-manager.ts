import * as Highcharts from 'highcharts';
import { copyFields, isNullOrUndefined } from "app/core/shared/functions.util";

export class ChartOptionsManager {
    
    private defaultOptions = {
        colors: [
            "#0191CE",
            "#164D90",
            "green",
            "orange",
            "red",
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        ],
        chart: {
            backgroundColor: "whitesmoke",
            borderColor: "#efefef",
            borderWidth: 2,
            reflow: true,
        },
        credits: {
            enabled: false
        },
        title: {
            text: undefined
        }
    }

    private currOptions: Highcharts.Options;

    private backupOpts: any;

    constructor(numberAxies: any = { x: 1, y: 1, z: 0 }) {
        
        this.currOptions = { ...this.defaultOptions };
        this.backupOpts = {};
        this.initAxies('x', numberAxies['x']);
        this.initAxies('y', numberAxies['y']);
        this.initAxies('z', numberAxies['z']);
    }

    public setSeries(series:any):void{
        this.currOptions.series=series;
    }

    public initAxies(axis: string, length: number): void {
        if (length > 0) {
            let r = [];
            let i = 0;
            while (i < length) {
                r.push({});
                i++;
            }
            this.setOption(axis + 'Axis', r);
        }
    }

    public getOptions(): Highcharts.Options {
        return this.currOptions;
    }

    public setColors(colors: string[]): void {
        this.currOptions.colors = colors;
    }

    public setColor(idx: number, color: string): void {
        this.currOptions.colors[idx] = color;
    }

    public setOption(option: string, value: any): void {
        let co = this.currOptions[option];
        if (value instanceof Object && !Array.isArray(value)) {
            if (isNullOrUndefined(co)) {
                co = {};
            }
            copyFields(co, value);
            this.currOptions[option] = co;
        } else {
            this.currOptions[option] = value;

        }
    }

    public replaceOption(option: string, value: any): void {
        this.currOptions[option] = value;
    }


    public setChartBackgroundColor(color: string): void {
        this.setOption('chart', { backgroundColor: color });
    }

    public setChartBorderColor(color: string): void {
        this.setOption('chart', { borderColor: color });
    }

    public setChartTile(title: string): void {
        this.setOption('title', { text: title });
    }

    public showLegend(show: boolean): void {
        this.setOption('legend', { enabled: show });
    }

    public showAxisTitle(axis: string, show: boolean, index: number = 0): void {
        let ct = this.currOptions[axis + 'Axis'][index]['title'];
        let bt: string = this.backupOpts[axis + 'AxisTitle' + index];
        if(isNullOrUndefined(ct)){
            ct= {text:undefined};
            this.setAxisOption(axis,'title',ct,index);
        }
        let ctt = ct['text'];
        if(show && isNullOrUndefined(ctt) && !isNullOrUndefined(bt)){
            this.setAxisOption(axis,'title',{text:bt},index);
        }
        if(!show && !isNullOrUndefined(ctt)){
            this.backupOpts[axis + 'AxisTitle' + index] = ctt;
            this.setAxisOption(axis,'title',{text:undefined},index);
        }
    }

    public setAxisOption(axis: string, option: string, value: any, index: number = 0): void {
        let co = this.currOptions[axis + 'Axis'][index][option];
        if (value instanceof Object && !Array.isArray(value)) {
            if (isNullOrUndefined(co)) {
                co = {};
            }
            copyFields(co, value);
            this.currOptions[axis + 'Axis'][index][option] = co;
        } else {
            this.currOptions[axis + 'Axis'][index][option] = value;

        }
    }

    public clone(): ChartOptionsManager{
        let r = new ChartOptionsManager();
        let a={};
        copyFields(a,this.currOptions);
        r.currOptions=a;
        return r;
    }

    public static fromOptions(series: any, options?: any): Highcharts.Options {
        let co = new ChartOptionsManager(series).getOptions();
        if (!isNullOrUndefined(options)) {
            copyFields(co, options);
        }
        return co;
    }
}
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import {LocalNumberPipe} from '../pipes/local-number.pipe';

export class GraphicService {
  private title:string;
  private subtitle={
    text:"",
    state:true
  }
  private theme:{};
  private carousel={
    desc:'',
    value:0,
    unit:'',
    format:'',
    avance:{
      value:0,
      color:''
    }
  }
  private conf={
    isLoadingResults:false,
    isErrorResults:false,
    isInit:true,
  }
  private categories:[]=[];
  private plotBands:[]=[];
  private plotOptions:[]=[];
  private annotations:[]=[];
  private series:[]=[];
  private yAxis=[{ 
    max: 0,
    min: 0,
    name:"",
    title: {
      text: ""
    },
    
  },
  { 
    max: 0,
    min: 0,
    name:"",
    title: {
      text: ""
    },
    opposite: true
  }
];
  
  private paramsAdd={};

  constructor(conf?:any) {
    if(conf!=undefined)
      this.setConfInitv2(conf)
  }

  private setConfInitv2(conf:any){
    let graphic=conf
    if(graphic!=undefined){
      graphic.theme!=undefined?this.theme=graphic.theme:null;
      graphic.params!=undefined?this.paramsAdd=graphic.params:null;
      if(!isNullOrUndefined(graphic.config)){
        if(!graphic.config.isSubtitle){
          this.subtitle.state=false;
        }
      }
    }else{
      console.log('Register Config Graphic');
    }
  }

  results(init:boolean,loading:boolean,error:boolean){
    this.conf.isErrorResults=error;
    this.conf.isLoadingResults=loading;
    this.conf.isInit=init;
  }

  getFinished():boolean{
    return this.conf.isInit && !this.conf.isErrorResults && !this.conf.isLoadingResults
  }

  getParamsAdd():{}{
    return this.paramsAdd
  }

  public setSerie(series){
    this.series=series;
    let ser=series[0];
    let series2=series[0];
    series2=  series2.data;
    this.yAxis[1].max= Math.max(...series2)+(Math.max(...series2)*0.03);
    this.yAxis[1].min= Math.min(...series2)-(Math.min(...series2)*0.03);
    
    if(series[0].color!="#0191CE"){
      this.setRangeyaxis(series);
    }else{
      this.yAxis[0].max=null;
      this.yAxis[0].min=null;
      this.yAxis[1].max=null;
      this.yAxis[1].min=null;
    }
   
    
  }

  private setRangeyaxis(series:[]){
    var data=[];  
    
    series.forEach((s:any)=>data=data.concat(s.data).filter(Boolean));   
    
   // console.log(data1);
    this.yAxis[0].max= Math.max(...data)+(Math.max(...data)*0.03);
    this.yAxis[0].min= Math.min(...data)-(Math.min(...data)*0.03);
    

  }

  public setCategorie(categories:[]){
    this.categories=categories;
  }
  public setPlotBands(plotBands:[]){
    this.plotBands=plotBands;
  }
  public setAnnotations(annotations:[]){
    this.annotations=annotations;
  }
  public setPlotOptions(plotOptions:[]){
    this.plotOptions=plotOptions;
  }

  public setTitle(title:string){
    this.title=title;
    this.carousel.desc=title;
  }

  public setsubTitle(subtitle:string){
    if(!isNullOrUndefined(subtitle)){
      this.subtitle.text=subtitle;
    }else{
      this.setsubTitleDynamic();
    }
  }

  public setTitleyAxis(title){
   // console.log(title);
    this.yAxis[0].title.text=title;
    this.yAxis[0].name = title;
    this.yAxis[1].title.text=title;
    this.yAxis[1].name = title;
    this.carousel.unit=title;
  }

  private setsubTitleDynamic(){
    let size:number=0;
    let n1:number;let n2:number;
    let html:string= '<table>';
    var format

    this.series.forEach((e:any,i)=> {
      format=e.format
      const  value = LocalNumberPipe.prototype.transform(e.data[e.data.length-1],format);
  
      html+='<tr style="color:green">';
      html+='<td>'+e.name+': </td>';
      html+='<td style="text-align: right"><b>'+value+'</b></td>';
      html+='</tr>';
      size++;
      if(i==0 && e.name=='Real'){n1=e.data[e.data.length-1]}
      if(i==1 && e.name=='Meta'){n2=e.data[e.data.length-1]}
    });
    if(size==2 && !isNullOrUndefined(n1) && !isNullOrUndefined(n2)){
      const variacion= LocalNumberPipe.prototype.transform((n1-n2),format);
      html+='<tr style="color:green">';
      html+='<td>Var:</td>';
      html+='<td style="text-align: right"><b>'+variacion+'</b></td>';
      html+='</tr>'; 

      this.carousel.value=n1;
      this.carousel.format=format;
      this.carousel.avance.value=n1/n2;
      this.carousel.avance.color=(n1/n2)<1?'red':'green';
    }
    if(size==1){
      this.carousel.value=n1;
      this.carousel.format=format;
      this.carousel.avance.value=n1/n2;
      this.carousel.avance.color=(n1/n2)<1?'red':'green';
    }

    html+='</table>';
    this.subtitle.text=html;
  }

}

import { Injectable } from '@angular/core';
import { SessionNames, } from '../names/session.names';
import { IStrategosCache, } from '../names/session-bearer.interface';
import { StorageService } from './storage.service';

@Injectable()
export class CacheService {
    private sNames = SessionNames.STRATEGOS;

    constructor(private storageService:StorageService){}

    public removeFilter01(){
        this.storageService.removeLocalItem(this.sNames.FILTER_01);
    }

    public saveFilterv2(data){
        //console.log("Cacheado:",data);
        let dataG=this.Load(data);
        this.setFilter01v2(dataG);
    }

    private Load(d:IStrategosCache):IStrategosCache[]{
        let read=this.storageService.getLocalItem<IStrategosCache[]>(this.sNames.FILTER_01);
        let read2=read===null?[]:read;
        let read3=read2.filter(r=>  r.math.tip_cod!==d.math.tip_cod ||
                                    r.math.cod_rel!==d.math.cod_rel ||
                                    r.math.level_load!==d.math.level_load ||
                                    r.math.jerar!==d.math.jerar );
        read3.push(d);
        return read3;
    }

    private setFilter01v2(r:IStrategosCache[]){
        this.storageService.setLocalItem(this.sNames.FILTER_01,r);
    }

    public isCache(d):boolean{
        let read=this.storageService.getLocalItem<IStrategosCache[]>(this.sNames.FILTER_01);
        let read2=read===null?[]:read;
        let read3=read2.filter(r=>  r.math.tip_cod==d.tip_cod &&
                                    r.math.cod_rel==d.cod_rel &&
                                    r.math.level_load==d.level_load &&
                                    r.math.jerar==d.jerar);
        return read3.length==1?true:false
    }

    public loadCache(d):{}{
        let read=this.storageService.getLocalItem<IStrategosCache[]>(this.sNames.FILTER_01);
        let read2=read===null?[]:read;
        let read3=read2.filter(r=>  r.math.tip_cod==d.tip_cod &&
                                    r.math.cod_rel==d.cod_rel &&
                                    r.math.level_load==d.level_load &&
                                    r.math.jerar==d.jerar)[0]['data'];
        return read3
    }


    public selected(d){
        //console.log(d);
        let read=this.storageService.getLocalItem<IStrategosCache[]>(this.sNames.FILTER_01);
        let read2=read.filter(r=>r.data.level==d.level_load-1 &&
                                 r.data.tip_cod==d.tip_cod &&
                                 r.math.jerar==d.jerar );
   
        if(read2.length==1){
            var readG=read2[0];
            //console.log('lenght 1',readG);
        }else if(read2.length>1){
            var readG=read2.find(r=>{
                let data=r.data.data.map(r=>r['cod_rel']);
                let value=data.find(r=>r==d.cod_rel);
                if(value!=undefined)
                {return true}
                else{
                    return false;
                }
            })
            //console.log('lenght > 1',readG);
        }

        if(read2!=undefined){
            /*************Clear Levels******* */
            let read3=read.filter(r=>r.data.level>=d.level_load-1 && r.math.jerar==d.jerar); //==
            let read4=read.filter(r=>r.data.level<d.level_load-1 && r.math.jerar==d.jerar); //!=
            let read5=read.filter(r=>r.math.jerar!=d.jerar);
            read4.forEach((g,i)=>{
                read4[i].data.flag=false;
            })
            read3.forEach((g,i)=>{
                read3[i].data.sel=0;
                read3[i].data.flag=false;
            })
            let final=read3.concat(read4).concat(read5);
            //console.log(read4);
            this.setFilter01v2(final);
            /*********************************** */
            readG.data.sel=d.cod_rel;
            readG.data.flag=true;
            //console.log(readG);
            this.saveFilterv2(readG);
        }       
        
    }

    public isResult(d){
        let read=this.storageService.getLocalItem<IStrategosCache[]>(this.sNames.FILTER_01);
        let read2=read.filter(r=>r.data.flag && r.data.level==d.level_load-1
                                 && r.math.jerar==d.jerar);                         
        return (read2.length==1)?true:false;
        
    }
}
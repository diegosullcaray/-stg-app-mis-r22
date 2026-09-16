import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModRepService, ReportType } from '../support/data/ant-mod-rep.service';
import { ModSecService } from '../support/data/ant-mod-sec.service';
import { ComercialNames } from './comercial.names';
import { LoggerService } from '../support/services/logger.service';
import { IWinderResponse } from 'app/core/data/remote/winder/winder.interface';


@Injectable()
export class ComercialService {
    
    private cNames = ComercialNames;

    constructor(
        private datosReporte: ModRepService,
        private updateReporte:ModSecService,
        private logger:LoggerService
    ) { }

    /*public downloadSimpleStoredReportData(params: {}):Observable<any>{
        return this.datosReporte.getFile(DownloadType.STORED_01,params);
    }*/

    public getHierarchy(jerar: string, tipCod?: number, codRel?: string, level?: number): Observable<IWinderResponse> {
        return this.datosReporte.getHierarchy(jerar,tipCod,codRel,level);
    }

    public getMixData(repCod: string,repType:ReportType, params?: {}): Observable<IWinderResponse> {
        return this.datosReporte.getData(repType,repCod,params);
    }

    public getReportData(repCod: string, params?: {}): Observable<IWinderResponse> {
        this.logger.warn("El reporte "+repCod+" esta usando un metodo depreciado para obtener su data. Considere actualizarlo.");
        return this.datosReporte.getData(ReportType.DEPRECATED,repCod,params);
    }

    public getRegularData(repCod: string, params?: {}):Observable<IWinderResponse> {
        return this.datosReporte.getData(ReportType.REGULAR,repCod,params);
    }

    public getGraphicData(repCod: string, params?: {}): Observable<IWinderResponse> {
        return this.datosReporte.getData(ReportType.GRAPHIC,repCod,params);
    } 

    public postRegularUpdate(repCod: string, params?: {}): Observable<IWinderResponse> {
        return this.updateReporte.updateData(repCod,params);
    }
    /*public postRegularInsetReport(repCod: string,params?: {}):Observable<IWinderResponse>{
         return this.updateReporte.insertData(repCod,params);
    }*/
    
}
import { ChangeDetectorRef, OnInit, ViewChild } from "@angular/core";
import { Component } from "@angular/core";
import { StgPaginatorComponent } from "app/core/screen/components/stg-paginator/stg-paginator.component";
import { IStgTableHeader } from "app/core/screen/components/stg-table/stg-table.interface";
import { prepareDataForPagination } from "app/core/screen/components/stg-table/stg-table.util";
import { UserService } from "app/system/admin/services/user.service";
import { ModRepService } from "../../compartido/servicios/mod-rep.service";
import { tableConf, loadingConf /*, tableHeaders*/ } from "./captacion-canal-comercial.util";
import { isNullOrUndefined } from '../../../../core/shared/functions.util';
import { ReportT } from '../../legacy/support/services/report';
import { cra } from '../../legacy/comercial/rda/administracion/cra-map';
import { UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-captacion-canal-comercial-rep',
    templateUrl: './captacion-canal-comercial.component.html',
    styleUrls: ['./captacion-canal-comercial.component.scss']
})
export class CaptacionCanalComercialComponent implements OnInit {
    report: ReportT;
    activeHier: boolean;
    confHier: any;

    mainTitle: string;
    currentDate_:any;
    loadingObs: boolean;
    headerDefs: IStgTableHeader[]; 
    loadingConf: {};
    tableConf: {};
    dataSource: any[];
    showPaginator: boolean;
    dataSourceLenght: number;
    formG: UntypedFormGroup;
    currLvl: any;
    dataLvls: any;
    public  producto:any;
    private currentDataSource: any[];
    private originalDataSource: any[];
    private pageSize = 25;

    @ViewChild('paginator', { static: false }) paginator: StgPaginatorComponent;

    constructor(private antRep: ModRepService, private user: UserService, private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.dataLvls = [{
            prod: 'AHORRO',
            des_lvl: 'AHORRO'
            }, {
                prod: 'DPF',
            des_lvl: 'DPF'
        }, {
            prod: 'CTS',
            des_lvl: 'CTS'
        } 
        ];
        this.currLvl = this.dataLvls[0];

        this.producto=''
        this.mainTitle = "Captación por Canal"
        this.activeHier = false;
        let currentDate = this.user.get('profile').curr_fec;
        
        //this.headerDefs = tableHeaders;
        this.loadingObs = true;
        //this.report = new ReportT(cra('LST_AUT'));

        this.antRep.getBaseHierarchy(10).subscribe(
            x => {
                let bh: any = x.body.base_hierarchy;
                this.confHier = {
                    roots: bh,
                    cod_hier: 9,
                    params_hier: { key: "fec", val: currentDate },
                    max_lvl: 6,
                    dlg_tlt: "JERARQUIA"
                }
                this.activeHier = true;
            }
        );
         

        this.loadingConf = loadingConf;
        this.tableConf = tableConf;


    } 
    
      
    public onSelectItem(evt: any) {
        if (evt.isUserInput) {
           let t= evt.source.value
           let s = t.prod
            this.producto=s;
            this.currLvl=evt.source.value
           //console.log(this.prod); 
            //this.selectItem(evt.source.value);
        }
    }
    public selectHier(evt: any) {  
        this.onSelectItem("")
        console.log(this.currLvl.prod)
        let lv: any = evt[0];
        this.currentDate_ = this.user.get('profile').curr_fec;
        this.loadingObs = true;
        this.showPaginator = false;
        this.antRep.getRegularTableResult("CARACT_CARTERA_01", { tip_cod: lv.tip_cod, cod_rel: lv.cod_rel, fec: this.currentDate_ }).subscribe(
            x => { 
                // this.dataSource = x.body.result.data; 
                // let h = x.body.result.headers;  
                  
                
                 
                //console.log(d)
               
                let d = x.body.resultado.data;
                let h = x.body.resultado.headers;
                
                this.headerDefs =JSON.parse(h);
                
                this.dataSource = d 
                //let ds = x.body.result.body;
                // this.dataSourceLenght = ds.length;
                // this.originalDataSource = ds;
                // this.currentDataSource = ds;
                // this.prepPagination();
                 this.loadingObs = false;
            }
        );
    }

    private prepPagination() {
        let l = this.currentDataSource.length;
        if (l > this.pageSize) {
            this.showPaginator = true;
            this.changeDetectorRef.detectChanges();
            prepareDataForPagination(this.pageSize, this.currentDataSource, 'pk');
            this.dataSourceLenght = l;
            this.paginator.toFirstPage();
            this.page(1);
        } else {
            this.showPaginator = false;
            this.dataSource = this.currentDataSource;
        }
    }

    changePage(evt: any) {
        this.page(evt.page);
    }

    page(p: number) {
        this.dataSource = this.currentDataSource.filter(x => x.pk === p);
    }

    filter(evt: any) {
        let v = evt.target.value.toLowerCase();
        if (v === "") {
            this.currentDataSource = this.originalDataSource;
        } else {
            this.currentDataSource = this.originalDataSource.filter(x => x.des_sec.toLowerCase().includes(v));
        }
        this.prepPagination();
    }

    customStyler(v:any,k:any,r:any,cfg:any){
       
        if(k.startsWith('8')){
        if(v<0){  
              cfg['background-color']='#b80f0f';
              cfg['width']='10px'
              cfg['height']='10px'
              cfg['border-radius']='50%' 
               
            
                
        }
        if(v==0){
            cfg['background-color']='orange';
            cfg['width']='10px'
            cfg['height']='10px'
            cfg['border-radius']='50%'
            
        }
          
          if(v>0){
            cfg['background-color']='#0b8a0b';
            cfg['width']='10px'
            cfg['height']='10px'
            cfg['border-radius']='50%'
            
        }
        }

        if(k.startsWith('9')){
            if(v<0){
                    cfg['background-color']='#b80f0f';
                    cfg['width']='10px'
                  cfg['height']='10px'
                    cfg['border-radius']='50%'
                    
            }
            if(v==0){
                cfg['background-color']='orange';
                cfg['width']='10px'
                  cfg['height']='10px'
                cfg['border-radius']='50%'
                
            }
              
              if(v>0){
                cfg['background-color']='#0b8a0b';
                cfg['width']='10px'
                cfg['height']='10px'
                cfg['border-radius']='50%'
                
            }
            }

            if(k.startsWith('10')){
                if(v<0){
                        cfg['background-color']='#b80f0f';
                        cfg['width']='10px'
                        cfg['height']='10px'
                        cfg['border-radius']='50%'
                        
                }
                if(v==0){
                    cfg['background-color']='orange';
                    cfg['width']='10px'
                  cfg['height']='10px'
                    cfg['border-radius']='50%'
                    
                }
                  
                  if(v>0){
                    cfg['background-color']='#0b8a0b';
                    cfg['width']='10px'
                    cfg['height']='10px'
                    cfg['border-radius']='50%'
                    
                }
                }
                if(k.startsWith('11')){
                    if(v<0){
                            cfg['background-color']='#b80f0f';
                            cfg['width']='10px'
                            cfg['height']='10px'
                            cfg['border-radius']='50%'
                            
                    }
                    if(v==0){
                        cfg['background-color']='#0b8a0b';
                        cfg['width']='10px'
                  cfg['height']='10px'
                        cfg['border-radius']='50%'
                        
                    }
                      
                      if(v>0){
                        cfg['background-color']='#0b8a0b';
                        cfg['width']='10px'
                        cfg['height']='10px'
                        cfg['border-radius']='50%'
                        
                    }
                    }
         
        return cfg;
    }
}
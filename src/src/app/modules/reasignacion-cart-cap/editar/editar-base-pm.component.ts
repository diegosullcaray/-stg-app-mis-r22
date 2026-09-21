 
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { disable } from '@rxweb/reactive-form-validators';

 

export abstract class EditarBasePmComponent { 
    public itemForm: FormGroup;
    alertState = "closed";
    dynamic_ciiu=[]
    alertHide = true;
    editMode:boolean;
    title:string;  
    canal:any;
    constructor(public antService: ModReportesEService,  public esgService: ReportesEService, public formBuilder: FormBuilder ) { }
    
    init(): void { 
        this.editMode=this.esgService.editMode;
        let row = this.esgService.selectedRow;  
        let controls = {
          RNUMDOC: row.RNUMDOC, 
          RTIPDOC: row.RTIPDOC,
          RDTIPDOC: row.RDTIPDOC,
          RDPAIS: row.RDPAIS,
          RPAIS: row.RPAIS,
          RFININI: row.RFININI,
          RFECFIN: row.RFECFIN,
          RCODSECO: row.RCODSECO,
          RCODSECD: row.RCODSECD,
          RDESCAN: row.RDESCAN,
          RCODCAN: row.RCODCAN,
          RSBSUC: row.RSBSUC
          
       }; 
       this.canal = row.RCODCAN;
       this.itemForm =this.formBuilder.group(controls);      
       if(!this.editMode){
        this.itemForm.disable();
        this.title="Detalle Panel Marcas";
    }else{
        this.title="Editar Panel Marcas";
    }
    
       
         
    }

    private refreshData() {
        window.location.reload(); 
      }
     
    abstract navMain(): void; 
    openAlert(): void {
        this.alertState = 'open';
        this.alertHide = false;
        setTimeout(()=>{
            this.alertState = 'closed';
        },2500);
    }
      onOptionsSelected(value:string) {
        let ctrs = this.itemForm.controls;
        console.log(ctrs.RCODCAN.value )
   }
   selectCat(evt:any){
    if(evt.isUserInput){
        this.canal = evt.source.value
        console.log(evt.source.value)
       // this.loadDs(evt.source.value);
    }
}
   changePage(evt: any) {
       console.log(evt)
    //this.page(evt.page);
  }

     submitForm() {
         let row = this.esgService.selectedRow;
         let hk = this.esgService.histEditKeys;
         let ak = this.esgService.attributesCfg;
         let ctrs = this.itemForm.controls;
          let sd = {
  
          RNUMDOC: ctrs.RNUMDOC.value,
          RTIPDOC: row.RTIPDOC,
          RPAIS:ctrs.RPAIS.value ,
          RCODSECD:  ctrs.RCODSECD.value  ,
          RDESCAN:  ctrs.RDESCAN.value  ,
          RCODCAN:  ctrs.RCODCAN.value ,
          RSBSUC:  ctrs.RSBSUC.value
              
          }; 

         
         //console.log(ctrs)
         console.log(sd)
         this.antService.postActualizaPM(row.RNUMDOC, row.RTIPDOC,row.RPAIS,row.RCODSECD,row.RCODCAN,row.RSBSUC).subscribe(x => { 
           
              let res = x.body.result; 
              if(res.code==200){
                this.itemForm.reset();
                  this.navMain();  
                
                 this.esgService.refreshTable$.next(row.RowID);
                 
                 this.refreshData();
              }else{
                  this.openAlert();
               }
          });       
     }
}
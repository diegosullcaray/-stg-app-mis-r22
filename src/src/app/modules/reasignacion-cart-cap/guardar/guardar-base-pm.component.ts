 
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl, FormControl } from '@angular/forms';
 
import { ViewChild, ElementRef, Component } from '@angular/core';
//import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ModReportesEService } from '../compartido/servicios/mod-reportes-e.service';
import { ReportesEService } from '../compartido/servicios/reportes-e.service';
import { startWith, map } from 'rxjs/operators';
 
export abstract class GuardarBasePmComponent { 
    public itemForm: FormGroup;
    alertState = "closed";
    dynamic_ciiu=[]
    alertHide = true;
    addMode:boolean;
    title:string; 
     file: any; 
     dataSource:any;
     myfilename = 'Select File';
     canal:any;
     respuesta: any;
     resultState: string;
    constructor(public antService: ModReportesEService,  public esgService: ReportesEService, public formBuilder: FormBuilder ) { }
    
    getFile(event: any){
    this.file= event.target.files[0]
    //console.log(this.file)
    } 
      
    init(): void { 
      this.dataSource = this.esgService.selectedRow;

        this.addMode=true; 
     
             
        this.itemForm = new FormGroup({   
           // RNUMDOC: new FormControl('',RxwebValidators.minLength({value:8})), 
           RNUMDOC: new FormControl(), 
            RTIPDOC: new FormControl(), 
            RPAIS: new FormControl(), 
            RCODCAN: new FormControl(), 
            RCODSECD: new FormControl(), 
            RSBSUC: new FormControl(), 
            RFININI: new FormControl(), 
            RFECFIN: new FormControl(),
            RCOMEN: new FormControl() 
        } ); 

        
 
    }
      
    abstract navMain(): void; 
    openAlert(): void {
        this.alertState = 'open';
        this.alertHide = false;
        setTimeout(()=>{
            this.alertState = 'closed';
        },3000);
    }

      
    selectCat(evt:any){
      if(evt.isUserInput){
          this.canal = evt.source.value
          console.log(evt.source.value)
         // this.loadDs(evt.source.value);
      }
    }

    private refreshData() {
        //console.log("reload")
        window.location.reload(); 
      }
    
      onFileChange($event) {
        let file = $event.target.files[0]; // <--- File Object for future use.
        //console.log(file)
        this.itemForm.controls['HCONSRUC'].setValue(file ? file.name : ''); // <-- Set Value for Validation
   }
     
    submitForm() {
      let ctrs1 = this.itemForm.controls; 
          
        let row = this.esgService.selectedRow;
        let hk = this.esgService.histEditKeys;
        let ak = this.esgService.attributesCfg;
        let ctrs = this.itemForm.controls;
       // console.log(ctrs)
         let sd = {
          RNUMDOC: ctrs.RNUMDOC.value, 
          RTIPDOC:  ctrs.RTIPDOC.value,
          RPAIS: ctrs.RPAIS.value,
          RCODCAN: ctrs.RCODCAN.value,
          RCODSECD: ctrs.RCODSECD.value,
          RSBSUC: ctrs.RSBSUC.value,
          RFININI: ctrs.RFININI.value,
          RFECFIN: ctrs.RFECFIN.value,
          RCOMEN: ctrs.RCOMEN.value

         };  
         //console.log(ctrs.RNUMDOC.value)
         this.antService.postADDPM(ctrs.RNUMDOC.value,ctrs.RTIPDOC.value,ctrs.RPAIS.value,ctrs.RCODSECD.value,ctrs.RCODCAN.value,ctrs.RSBSUC.value,ctrs.RFININI.value,ctrs.RFECFIN.value,ctrs.RCOMEN.value).subscribe(x => {
           
          let res = x.body.result; 
             this.respuesta= res.respuesta.Result 
              if(this.respuesta=='Se Registro Correctamente'){
               this.refreshData(); 
             }else{
                this.openAlert();
              }
              
         });   
         
    } 
}
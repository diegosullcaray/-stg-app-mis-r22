 
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl, FormControl } from '@angular/forms';
import { ModProspectoCorService } from '../compartido/servicios/mod-prospecto-cor.service';
import { ProspectoCorService } from '../compartido/servicios/prospecto-cor.service'; 
import { ViewChild, ElementRef, Component } from '@angular/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
 
export abstract class GuardarBaseCorComponent {
    public itemForm: FormGroup;
    alertState = "closed";
    dynamic_ciiu=[]
    alertHide = true;
    addMode:boolean;
    title:string; 
     file: any; 
     dataSource:any;
     myfilename = 'Select File';
    constructor(public antService: ModProspectoCorService,  public esgService: ProspectoCorService, public formBuilder: FormBuilder ) { }
    
    getFile(event: any){
    this.file= event.target.files[0]
    //console.log(this.file)
    } 
      
    init(): void {
      this.dataSource = this.esgService.selectedRow;

        this.addMode=true; 
     
             
        this.itemForm = new FormGroup({  
            HAPENOMB:new FormControl(), 
            HNUMDOC: new FormControl('',RxwebValidators.minLength({value:8})), 
            HDIREC: new FormControl(), 
            HCELULAR: new FormControl('',RxwebValidators.minLength({value:9})), 
            HNUMRUC: new FormControl('',RxwebValidators.minLength({value:11})), 
            HDCIIU: new FormControl(), 
            HDEPA: new FormControl(), 
            HPROV: new FormControl(), 
            HDISTR: new FormControl(), 
            HNOMCOM: new FormControl(), 
            HCTALICEF: new FormControl(), 
            HLICFUNCI: new FormControl(), 
            HGEOLATI: new FormControl(), 
            HGEOLON: new FormControl(), 
            HDESTER: new FormControl(), 
            HDESCOR: new FormControl(), 
            HDESAGE: new FormControl(), 
            HCANACAP: new FormControl(), 
            HCODSECASIG: new FormControl(),
            HTCLIAPER: new FormControl(), 
            HCONSRUC: new FormControl(),
            HCONPREV: new FormControl(),
            HCONSLNE: new FormControl(),
            HFOTNEGO: new FormControl(),
            HASESOR: new FormControl() ,
            file_id: new FormControl() ,
            file_des: new FormControl(),
            file_des2: new FormControl(),
            file_des3: new FormControl(),
            file_des4: new FormControl()
        } ); 
 
    }

     
    abstract navMain(): void; 
    openAlert(): void {
        this.alertState = 'open';
        this.alertHide = false;
        setTimeout(()=>{
            this.alertState = 'closed';
        },2500);
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
       if (this.itemForm.invalid) {
            for (const control of Object.keys(this.itemForm.controls)) {  
              this.itemForm.controls[control].markAsTouched();
            }
            this.openAlert();
            return;
          }
       
          
        let row = this.esgService.selectedRow;
        let hk = this.esgService.histEditKeys;
        let ak = this.esgService.attributesCfg;
        let ctrs = this.itemForm.controls;
        //console.log(ctrs)
         let sd = {
            HAPENOMB: ctrs.HAPENOMB.value,
           HNUMDOC:ctrs.HNUMDOC.value,
           HDIREC:ctrs.HDIREC.value,
           HCELULAR: ctrs.HCELULAR.value,
           HNUMRUC: ctrs.HNUMRUC.value, 
           HDEPA: ctrs.HDEPA.value,
           HPROV: ctrs.HPROV.value,
           HDISTR: ctrs.HDISTR.value,
           HNOMCOM:ctrs.HNOMCOM.value,
           HDCIIU: ctrs.HDCIIU.value,
           HCTALICEF: ctrs.HCTALICEF.value,
           HLICFUNCI:  ctrs.HLICFUNCI.value,
           HGEOLATI: ctrs.HGEOLATI.value,
           HGEOLON:  ctrs.HGEOLON.value,
           HDESTER:  ctrs.HDESTER.value,
           HDESCOR: ctrs.HDESCOR.value, 
           HDESAGE:   ctrs.HDESAGE.value,
           HCANACAP:  ctrs.HCANACAP.value,
           HTCLIAPER:  ctrs.HTCLIAPER.value, 
           HCONSRUC:  ctrs.HCONSRUC.value,       
           HCONPREV:  ctrs.HCONPREV.value,      
           HCONSLNE:  ctrs.HCONSLNE.value,       
           HFOTNEGO:  ctrs.HFOTNEGO.value, 
           HASESOR:  ctrs.HASESOR.value 
         }; 
        //console.log(sd) 
         this.antService.postAddUsuarioCor(ctrs.HNUMDOC.value, sd).subscribe(x => {
             let res = x.body.result;
             //console.log(sd)
             //console.log(res.code)
             if(res.code==200){
                this.refreshData();
                 this.navMain();
                // console.log(row.cod_cat)  
                this.esgService.refreshTable$.next(1);
                 this.refreshData();
             }else{
                 this.openAlert();
              }
              
         });  
         this.esgService.uploadFiles();
         
    } 
}
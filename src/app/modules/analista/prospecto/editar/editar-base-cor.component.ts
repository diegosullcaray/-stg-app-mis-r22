 
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModProspectoCorService } from '../compartido/servicios/mod-prospecto-cor.service';
import { ProspectoCorService } from '../compartido/servicios/prospecto-cor.service'; 

export abstract class EditarBaseCorComponent {
    public itemForm: FormGroup;
    alertState = "closed";
    dynamic_ciiu=[]
    alertHide = true;
    editMode:boolean;
    title:string; 
    file_des:string;
    file_des2:string;
    file_des3:string;
    file_des4:string;
    constructor(public antService: ModProspectoCorService,  public esgService: ProspectoCorService, public formBuilder: FormBuilder ) { }
    
    init(): void { 
        this.editMode=this.esgService.editMode;
        let row = this.esgService.selectedRow; 
        //console.log(row)
        this.file_des=row.DHCONSRUC;
        this.file_des2=row.DHCONPREV;
        this.file_des3=row.DHCONSLNE;
        this.file_des4=row.DHFOTNEGO;
        
        /*row.HAPERTCTA=row.HAPERTCTA
        row.HESTDCORE=row.HESTDCORE
        row.HFECESTA=row.HFECESTA
        row.HNOMFINAL=row.HNOMFINAL
        row.HINSTALAD=row.HINSTALAD
        row.HFECINSTAL=row.HFECINSTAL
        row.HZONA=row.HZONA
        row.HPROSPEC=row.HPROSPEC
        row.HFIRMADN=row.HFIRMADN
        row.HTIPAGENT=row.HTIPAGENT
        row.HCODASEBT =  row.HCODASEBT, 
        row.HTIPVINC = row.HTIPVINC,
        row.HVINFAMI =  row.HVINFAMI,
        row.HIDCORRES =  row.HIDCORRES,
        row.HCODSECASIG=row.HCODSECASIG 
        console.log(row)
         */
          let controls = {
           HAPENOMB: row.HAPENOMB, 
            HNUMDOC: row.HNUMDOC,
            HDIREC: row.HDIREC,
            HCELULAR: row.HCELULAR,
            HNUMRUC: row.HNUMRUC,
            HDCIIU: row.HDCIIU,
            HDEPA: row.HDEPA,
            HPROV: row.HPROV,
            HDISTR: row.HDISTR,
            HNOMCOM: row.HNOMCOM,
            HCTALICEF: row.HCTALICEF,
            HLICFUNCI: row.HLICFUNCI,
            HGEOLATI: row.HGEOLATI,
            HGEOLON: row.HGEOLON,
            HDESTER: row.HDESTER,
            HDESCOR: row.HDESCOR,
            HDESAGE: row.HDESAGE,
            HCANACAP: row.HCANACAP,
            HCODSECASIG: row.HCODSECASIG,
            HCONSRUC:  row.HCONSRUC,
            HCONPREV:  row.HCONPREV,
            HCONSLNE:  row.HCONSLNE,
            HFOTNEGO:  row.HFOTNEGO,  
            HAPERTCTA :  row.HAPERTCTA,   
            HESTDCORE :  row.HESTDCORE,
            HNOMFINAL :  row.HNOMFINAL,
            HINSTALAD :  row.HINSTALAD,
            HFECINSTAL :  row.HFECINSTAL,
            HZONA :  row.HZONA,
            HPROSPEC :  row.HPROSPEC,
            HFIRMADN :  row.HFIRMADN,
            HTIPAGENT :  row.HTIPAGENT,
            HCODASEBT :  row.HCODASEBT, 
            HTIPVINC :  row.HTIPVINC,
            HVINFAMI :  row.HVINFAMI,
            HIDCORRES :  row.HIDCORRES, 
            HFECESTA: row.HFECESTA
           
        };
       // console.log(controls)
       this.itemForm =this.formBuilder.group(controls);
       //this.itemForm =this.formBuilder.group(row);
       if(!this.editMode){
        this.itemForm.disable();
        this.title="Detalle Prospección";
    }else{
        this.title="Editar Prospección";
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

     submitForm() {
         let row = this.esgService.selectedRow;
         let hk = this.esgService.histEditKeys;
         let ak = this.esgService.attributesCfg;
         let ctrs = this.itemForm.controls;
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
            HAPERTCTA :  ctrs.HAPERTCTA.value,
            HESTDCORE :  ctrs.HESTDCORE.value,
            HNOMFINAL :  ctrs.HNOMFINAL.value,
            HINSTALAD :  ctrs.HINSTALAD.value,
            HFECINSTAL :  ctrs.HFECINSTAL.value,
            HZONA :  ctrs.HZONA.value,
            HPROSPEC :  ctrs.HPROSPEC.value,
            HFIRMADN :  ctrs.HFIRMADN.value,
            HTIPAGENT :  ctrs.HTIPAGENT.value,
            HCODASEBT :  ctrs.HCODASEBT.value,
            HCODSECASIG :  ctrs.HCODSECASIG.value,
            HTIPVINC :  ctrs.HTIPVINC.value,
            HVINFAMI :  ctrs.HVINFAMI.value,
            HIDCORRES :  ctrs.HIDCORRES.value,
            HFECESTA:  ctrs.HFECESTA.value,
            HCONSRUC:  ctrs.HCONSRUC.value, 
            HCONPREV:  ctrs.HCONPREV.value,
            HCONSLNE:  ctrs.HCONSLNE.value,
            HFOTNEGO:  ctrs.HFOTNEGO.value  
              
          }; 
         //console.log(ctrs)
         //console.log(sd)
         this.antService.postActualizaCor(row.HNUMDOC, sd).subscribe(x => { 
           
              let res = x.body.result;
              //console.log(res.code)
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
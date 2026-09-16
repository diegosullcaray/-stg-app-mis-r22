import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { StgAppConfirmService } from "app/core/screen/components/stg-app-confirm/stg-app-confirm.service";
import { StgAppLoaderService } from "app/core/screen/components/stg-app-loader/stg-app-loader.service";
import { isNullOrUndefined, mergeObjects } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { UserService } from "app/system/admin/services/user.service";
import { Subscription } from "rxjs";
import { AnalistaService } from "../compartido/servicios/analista.service";
import { ModSecService } from "../compartido/servicios/mod-sec.service";

@Component({
  selector: 'app-categorizacion-analista',
  templateUrl: './categorizacion.component.html',
  styleUrls: ['./categorizacion.component.scss']
})
export class CategorizacionComponent implements OnInit, OnDestroy {

  dsComision: any;
  dsRequisitos: any;
  dsProfile: any;
  dsIcons: any;
  showPic: boolean;
  subsRedirect: Subscription;
  codgru: number = 0;

  constructor(private antSec: ModSecService, private loader: StgAppLoaderService, private antAdmin: ModSysAdminService,
    private confirm: StgAppConfirmService,
    public analista: AnalistaService, public user: UserService, public layout: LayoutService, private sanitizer: DomSanitizer) { }

  ngOnDestroy(): void {
    this.subsRedirect.unsubscribe();
  }

  ngOnInit(): void {
    this.dsIcons = ['work', 'groups', 'battery_6_bar', 'battery_3_bar'];

    this.dsProfile = {
      name: '--',
      position: '--',
      genre: '--',
      category: '--',
      hier1: '--',
      hier2: '--',
      hier3: '--'
    };

    this.dsRequisitos = [
      { des: 'Disciplina', val: '--', sit: 0 },
      { des: 'Calificación', val: '--', sit: 0 },
      { des: 'Permanencia', val: '--', sit: 0 },
      {
        des: 'Formación',
        val: '--',
        sit: 0,
        com: '<span>Si no eres apto, ingresa <a href="https://mfbbva.csod.com/client/mfbbva/default.aspx" target="_blank" style="font-weight:bold;font-size:14px;color:#0966FF">aquí</a></span>',
        com2: '<span>Guía para desarrollar el catálogo: <a href="https://docs.google.com/presentation/d/1tJrj2KN3KXtQVLU0OCBS4n4NUsR1BwVykEa1SUV6kCs/edit#slide=id.p1" target="_blank" style="font-weight:bold;font-size:14px;color:#0966FF">Link</a></span>'
      }
    ];

    this.dsComision = [
      { mon: '--', val: '--', sit: 0, val1: '--', val2: '--', val3: '--', val4: '--', val5: '--', val6: '--' },
      { mon: '--', val: '--', sit: 0, val1: '--', val2: '--', val3: '--', val4: '--', val5: '--', val6: '--' },
      { mon: '--', val: '--', sit: 0, val1: '--', val2: '--', val3: '--', val4: '--', val5: '--', val6: '--' },
      { mon: '--', val: '--', sit: 0, val1: '--', val2: '--', val3: '--', val4: '--', val5: '--', val6: '--' },
      { mon: '--', val: '--', sit: 0, val1: '--', val2: '--', val3: '--', val4: '--', val5: '--', val6: '--' },
      { mon: '--', val: '--', sit: 0, val1: '--', val2: '--', val3: '--', val4: '--', val5: '--', val6: '--' }
    ];

    let profile = this.user.get('profile');
    this.analista.tip_use = profile.tip_use;

    this.subsRedirect = this.analista.selectedSec$.subscribe(x => {
      this.analista.cod_bt = x.cod_sec;
      this.analista.nom_sec = x.des_sec;
      this.loadData();
    });
    
    if (profile.tip_use === 1) {
      this.analista.cla_user = profile.cla_use;
      this.analista.cod_bt = profile.cod_bt;
      this.analista.nom_sec = profile.nombre;
      this.loadData();
    } else {
      this.baseHierObs().subscribe(x => {
        let br: any = x.body;
        let h = br.base_hierarchy;
        if (!isNullOrUndefined(h)) {
          let hf = h.filter((x: any) => x.flag_1 == 0 || x.flag_1 == 1 || x.flag_1 == 2)[0];
          this.analista.tip_cod = hf.tip_cod;
          this.analista.cod_rel = hf.cod_rel;
          this.analista.showSecPickerDialog(false);
        }
      });
    }
  }

  loadData() {
    this.loader.open();
    this.antSec.getDetalleCategorizacion(this.analista.cod_bt).subscribe(x => {
      let res = x.body.resultado.data;
      let per = x.body.resultado.per;
      
      if (res.length == 0) {
        this.confirm.open("No se encontraron datos para el usuario: "+this.analista.cod_bt).subscribe(x=>{
          this.loader.close();
        });
      } else {
        this.codgru = res.codgru;

        this.dsProfile = {
          name: res.nom,
          position: res.car,
          genre: res.gen,
          category: res.cat,
          hier1: res.uni,
          hier2: res.corr,
          hier3: res.terr
        };

        this.dsRequisitos = mergeObjects(this.dsRequisitos, [
          { val: res.r1, sit: res.ri1 },
          { val: res.r2, sit: res.ri2 },
          { val: res.r3, sit: res.ri3 },
          { val: res.r4, sit: res.ri4 }
        ]);

        this.dsComision = mergeObjects(this.dsComision, [
          { val: res.c1, sit: res.ci1, val1: res.c1_1, val2: res.c1_2, val3: res.c1_3, val4: res.c1_4, val5: res.c1_5, val6: res.c1_6 },
          { val: res.c2, sit: res.ci2, val1: res.c2_1, val2: res.c2_2, val3: res.c2_3, val4: res.c2_4, val5: res.c2_5, val6: res.c2_6 },
          { val: res.c3, sit: res.ci3, val1: res.c3_1, val2: res.c3_2, val3: res.c3_3, val4: res.c3_4, val5: res.c3_5, val6: res.c3_6 },
          { val: res.c4, sit: res.ci4, val1: res.c4_1, val2: res.c4_2, val3: res.c4_3, val4: res.c4_4, val5: res.c4_5, val6: res.c4_6 },
          { val: res.c5, sit: res.ci5, val1: res.c5_1, val2: res.c5_2, val3: res.c5_3, val4: res.c5_4, val5: res.c5_5, val6: res.c5_6 },
          { val: res.c6, sit: res.ci6, val1: res.c6_1, val2: res.c6_2, val3: res.c6_3, val4: res.c6_4, val5: res.c6_5, val6: res.c6_6 }
        ]);

        this.dsComision = mergeObjects(this.dsComision, [ 
          { mon: per[0].nom }, { mon: per[1].nom }, { mon: per[2].nom },
          { mon: per[3].nom }, { mon: per[4].nom }, { mon: per[5].nom }
        ]);

        this.loader.close();
      }
    });
  }

  private baseHierObs() {
    return this.antAdmin.getBaseHierarchy(this.user.email, 9);
  }

  openSecPicker() {
    this.analista.showSecPickerDialog(true);
  }

  getCom(a: string) {
    if (isNullOrUndefined(a)) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(a);
  }
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {RevaComponent} from './../sectorista/reva/reva.component'
import { ReportCrsV1Component } from '../../../support/components/template/crs/report-crs-v1/report-crs-v1.component';
import { ReportCrsV2Component } from '../../../support/components/template/crs/report-crs-v2/report-crs-v2.component';
import { CrsReproComponent } from './crs-repro/crs-repro.component';
import { CrsCliActComponent } from './crs-cli-act/crs-cli-act.component';
import { CrsReproPdmComponent } from './crs-repro-pdm/crs-repro-pdm.component';
import { CrsCapRetComponent } from './crs-cap-ret/crs-cap-ret.component';
import { ReportCraV1p1Component } from '../../../support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component';
import { ReportCrsV3Component } from '../../../support/components/template/crs/report-crs-v3/report-crs-v3.component';
import { ReportCrsV4Component } from '../../../support/components/template/crs/report-crs-v4/report-crs-v4.component';
import { CrsProspeComponent } from './crs-prospe/crs-prospe.component';
import { ReportCrsv5Component } from '../../../support/components/template/crs/report-crs-v5/report-crs-v5.component';
import { ReportCrsV6Component } from '../../../support/components/template/crs/report-crs-v6/report-crs-v6.component';
const routes: Routes = [
  {
    path: "",
    children: [
      /*{
        path: 'reva',
        component: RevaComponent,
        data: { title: "REVA Comercial" }
      },*/
      {
        path: "cartera", 
        component: ReportCrsV1Component,
        data: { title: "Cartera",
                report:"rda/sectorista/cartera/cartera_sec" }
      },
      {
        path: "cli-prod", 
        component: ReportCrsV1Component,
        data: { title: "Clientes Producto",
                report:"rda/sectorista/cliente_producto/cliente_producto_sec"  }
      },
      {
        path: "seg", 
        component: ReportCrsV1Component,
        data: { title: "Seguros",
                report:"rda/sectorista/seguros/seguros_sec" }
      },
      {
        path: "mon-desem", 
        component: ReportCrsV1Component,
        data: { title: "Monitor de Desembolsos",
                report:"rda/sectorista/monitor_metas_desembolsos/monitor_metas_desem_sec" }
      },
      {
        path: "cli-nue-rec", 
        component: ReportCrsV1Component,
        data: { title: "Clientes Nuevos y Recurrentes",
                report:"rda/sectorista/clientes_nuevos_recurrente/cliente_nuevo_rec" }
      },
      {
        path: "capta", 
        component: ReportCrsV1Component,
        data: { title: "Captaciones",
                report:"rda/sectorista/captaciones/captacion_sec" }
      },
      {
        path: "rec-prev", 
        component: ReportCrsV1Component,
        data: { title: "Recuperación Preventiva",
                report:"rda/sectorista/recuperacion_preventiva/recuperacion_preventiva" }
      },
      {
        path: "zu-cuo", 
        component: ReportCrsV1Component,
        data: { title: "Cero y Una Cuota",
                report:"rda/sectorista/cero_cuota/cero_cuota_sec" }
      },
      {
        path: "ret", 
        component: ReportCrsV1Component,
        data: { title: "Retanqueo",
                report:"rda/sectorista/retanqueo/retanqueo_sec" }
      },
      {
        path: "pdm", 
        component: ReportCrsV1Component,
        data: { title: "Grupos por Vencer",
                report:"rda/sectorista/grupo_pdm/grupo_pdm_sec" }
      },
      {
        path: "aut-tasa", 
        component: ReportCrsV1Component,
        data: { title: "Reporte de Autonomía de Tasas",
                report:"rda/sectorista/Reporte_Autonomia_Tasas/reporte_autonomia_tasa_sec" }
      },
      {
        path: "inv-stk", 
        component: ReportCrsV2Component,
        data: { title: "Inversión y Stock de Mora",
                report:"rda/sectorista/brecha/brecha_inversion_sec" }
      },
      {
        path: "cam-agl", 
        component: ReportCrsV1Component,
        data: { title: "Campaña Ágil",
                report:"rda/sectorista/campania_agil/campana_agil_sec" }
      },
      {
        path: "canal_alt", 
        component: ReportCrsV1Component,
        data: { title: "Canal Alterno",
                report:"rda/sectorista/canal_alt/canal_alt_sec" }
      },
      {
        path: "cli_pot", 
        component: ReportCrsV1Component,
        data: { title: "Clientes Potenciales",
                report:"rda/sectorista/cli_pot/cli_pot_sec" }
      },
      {
        path: "mon_efec_sec", 
        component: ReportCrsV3Component, 
        data: { title: "Detalle Monitor de efectividades Asesor",
                report:"RS_MON_EFEC_SEC" }
      },
      {
        path: "repro", 
        component: CrsReproComponent,
        data: { title: "Clientes Reprogramados"}
      },
      {
        path: "repro-pdm", 
        component: CrsReproPdmComponent,
        data: { title: "Clientes Reprogramados PDM"}
      },
      {
        path: "cli-act", 
        component: CrsCliActComponent
      },
      {
        path: "aut", 
        component: ReportCrsV1Component,
        data: { title: "Autonomías",
                report:"LST_AUT" }
      },
      {
        path: "cap-ret", 
        component: CrsCapRetComponent,
        data: { title: "Capacidad de Minorista",
                report:"LST_AUT" }
      },
      {
        path: "sec-prosp", 
        component: CrsProspeComponent, 
        data: { title: "Prospectos Corresponsales",
                report:"LIS_PROSPE" }
      },
      {
        path: "plan-mov-sec", 
        component: ReportCrsv5Component,//ReportCrsV4Component,
        data: { title: "Planilla de Movilidad",
                report:"PLANMOV" }
      },
      {
        path: "res-mov-sec", 
        component: ReportCrsV1Component,//ReportCrsV4Component,
        data: { title: "Resumen de Movilidad",
                report:"RESNMOV" }
      },
      {
        path: "plan-datos-sec", 
        component: ReportCrsV1Component,//ReportCrsV4Component,
        data: { title: "Plan de datos",
                report:"P_Datos" }
      },
      {
        path: "plan-mov-perf", 
        component: ReportCrsV4Component,//ReportCrsV4Component,
        data: { title: "Planilla de Movilidad",
                report:"PLANMOVPERFIL" }
      }      ,
      {
        path: "mon-rep", 
        component: ReportCrsV1Component,
        data: { title: "Monitor de Reprogramados",
                report:"RS_MON_REP_SEC" }
      },
      {
        path: "sect-ciiu-sec", 
        component: ReportCrsV1Component,
        data: { title: "Seguimiento Sector",
                report:"Sec_ciiu" }
      },
      {
        path: "proy_M6", 
        component: ReportCrsV1Component,
        data: { title: "Colocaciones diaria Operacion, Monto y recuperacion",
                report:"PROYEC_DIACOLREC_AS" }
      },
      {
        path: "desempeno-social-as", 
        component: ReportCrsV1Component,
        data: { title: "Desempeño Social",
                report:"DESE_SOC_AS" }
      },
      {
        path: "cliente-vulnerable", 
        component: ReportCrsV6Component,
        data: { title: "",
                report:"CLI_VULNERABLE" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RDASectoristaRoutingModule { }

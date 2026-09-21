
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCraV1p1Component } from '../../../support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component';

import { CraPanSupComponent } from './cra-pan-sup/cra-pan-sup.component';
import { CraAutComponent } from './cra-aut/cra-aut.component';

import { CraAutTasaComponent } from './cra-aut-tasa/cra-aut-tasa.component';
import { ReportCraV4Component } from '../../../support/components/template/cra/report-cra-v4/report-cra-v4.component';
import { ReportCraV7Component } from '../../../support/components/template/cra/report-cra-v7/report-cra-v7.component';
import { ReportCraV10Component } from '../../../support/components/template/cra/report-cra-V10/report-cra-v10.component';
import { ReportCraV6Component } from '../../../support/components/template/cra/report-cra-v6/report-cra-v6.component';
import { ReportCraV5Component } from '../../../support/components/template/cra/report-cra-v5/report-cra-v5.component';
import { ReportCraV1p2Component } from '../../../support/components/template/cra/report-cra-v1p2/report-cra-v1p2.component';
import { ReportCraV1p3Component } from '../../../support/components/template/cra/report-cra-v1p3/report-cra-v1p3.component';
import { ReportCraV1p4Component } from '../../../support/components/template/cra/report-cra-v1p4/report-cra-v1p4.component';
import { ReportCraV1p9Component } from '../../../support/components/template/cra/report-cra-v1p9/report-cra-v1p9.component';
import { ReportCraV1p5Component } from '../../../support/components/template/cra/report-cra-v1p5/report-cra-v1p5.component';
import { ReportCraV1p6Component } from '../../../support/components/template/cra/report-cra-v1p6/report-cra-v1p6.component';
import { ReportCraV1p7Component } from '../../../support/components/template/cra/report-cra-v1p7/report-cra-v1p7.component';
import { ReportCraV8Component } from '../../../support/components/template/cra/report-cra-v8/report-cra-v8.component';
import { ReportCraV11Component } from '../../../support/components/template/cra/report-cra-v11/report-cra-v11.component';
import { ReportCraV12Component } from '../../../support/components/template/cra/report-cra-v12/report-cra-v12.component'; 
import { ReportCraV1p10Component } from '../../../support/components/template/cra/report-cra-v1p10/report-cra-v1p10.component';
import { ReportCraV1p11Component } from '../../../support/components/template/cra/report-cra-v1p11/report-cra-v1p11.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: 'saldo',
        //component: ReportCraV1p1Component,
        component: ReportCraV1p10Component,
        data: { title: "Saldo Cartera",
                report:"RS_SAL_CAR" }
      },
      {
        path: 'act-tasa',
        component: ReportCraV1p1Component,
        data: { title: "Actividad y Tasas",
                report: "actividadtasas"}// report:"rda/administracion/cartera/actividad_tasas" }
      },
      {
        path: 'port-agro',
        component: ReportCraV1p1Component,
        data: { title: "Portafolio Agro",
                report:"PortafolioAgro" }//"rda/administracion/cartera/portafolio_agro" }
      },
      {
        path: 'dat-prod',
        component: ReportCraV1p1Component,
        data: { title: "Datos Producto",
                report:"RS_DAT_PRO" }
      },
      {
        path: 'desem-dia',
        component: ReportCraV1p2Component,
        data: { title: "Desembolsos Diarios",
                report:"DesemDiario" }//"rda/administracion/cartera/desembolso_diario" }
      },
      {
        path: 'aut-tasa',
        component: CraAutTasaComponent,
        data: { title: "Autonomía de Tasas",
                report: "GST_ACTIVAS" }
      },
      {
        path: 'cam-agl',
        component: ReportCraV1p1Component,
        data: { title: "Campaña Ágil",
                report: "GSCAMP" }
      },
      {
        path: 'cam-pah',
        component: ReportCraV1p1Component,
        data: { title: "Campaña Plan Ahorro",
                report: "rda/administracion/campanas/plan_ahorro" }
      },
      {
        path: 'cam-apa',
        component: ReportCraV1p1Component,
        data: { title: "Apadrinamiento",
                report: "R_APADRINA" }  //"rda/administracion/campanas/apadrinamiento" }
      },
      {
        path: 'cal-cart',
        component: ReportCraV1p1Component,
        data: { title: "Calidad de Cartera",
                report:"RS_CAL_CAR" }
      },
      {
        path: 'zu-cuo',
        component: ReportCraV1p1Component,
        data: { title: "Cero y una Cuota",
                report:"CEROYCUOTA"} //"rda/administracion/mora/cero_cuota" }
      },
      {
        path: 'port-sup',
        component: ReportCraV1p1Component, 
        data: { title: "Portafolios Y Supervisión",
                report:"PORTSUPE" }//"rda/administracion/mora/portafolio_supervision" }
      },
      {
        path: 'efec-rec',
        component: ReportCraV1p1Component,
        data: { title: "Efectividad Recuperaciones",
                report:"EfecRecTramos"  }//"rda/administracion/mora/efectividad_recuperacion" }
      },
      {
        path: 'cap-sec',
        component: ReportCraV1p1Component,
        data: { title: "Captaciones por Asesor",
                report:"rda/administracion/captaciones/captaciones_asesor" }
      },
      {
        path: 'cap-age',
        component: ReportCraV1p1Component,
        data: { title: "Captaciones por Canal",
                report:"rda/administracion/captaciones/captacion_canal" }
      },
      {
        path: 'seg',
        component: ReportCraV1p1Component,
        data: { title: "Seguros",
                report:"rda/administracion/seguros/seguros" }
      },
      {
        path: 'cap-teso',
        component: ReportCraV1p1Component,
        data: { title: "Captaciones Tesoreria",
                report:"rda/administracion/captaciones/captacion_tesoreria"  }
      },
      {
        path: 'tasa-pas', 
        component: ReportCraV1p1Component,
        data: { title: "Gestión de Tasas Pasivas",
        report:"GST_PASIVA"  }
                //report:"rda/administracion/captaciones/gestion_tasas_pasivas"  }
      },
      {
        path: 'cli-ope',
        component: ReportCraV1p1Component,
        data: { title: "Clientes y Operaciones",
                report: "Clientes_Ope"  }//"rda/administracion/clientes/cli_ope"  }
      },
      {
        path: 'cli-nue-rec',
        component: ReportCraV1p1Component,
        data: { title: "Clientes Nuevos y Recurrentes",
                report:"Clientes_nuevoRec"}//"rda/administracion/clientes/cli_nu_rec" }
      },
      {
        path: 'banc-pref',
        component: ReportCraV1p1Component,
        data: { title: "Captaciones Banca Preferente",
                report:"CaptaBP" }//rda/administracion/captaciones/captacion_BP" }
      },
      {
        path: 'cmg-cart',
        component: ReportCraV1p1Component,
        data: { title: "CMG Cartera" ,
                report: "rda/administracion/cartera/cmg_cartera" }
      },
      {
        path: 'cmg-mora',
        component: ReportCraV1p1Component,
        data: { title: "CMG Mora" ,
                report: "cuadro_Variable_Riesgo"} //"rda/administracion/mora/cmg_mora" }
      },
      {
        path: 'cmg-mora-simp',
        component: ReportCraV1p1Component,
        data: { title: "CMG Mora Sin Impulsa" ,
                report: "cmg_mora_simp"} //"rda/administracion/mora/cmg_mora" }
      },
      {
        path: 'cmg-cli',
        component: ReportCraV1p1Component,
        data: { title: "CMG Clientes",
                report: "rda/administracion/clientes/cmg_cliente" }
      },
      /*{
        path: 'cmg-capta',
        component: ReportCraV1p1Component,
        data: { title: "CMG Captaciones",
                report: "rda/administracion/captaciones/cmg_captacion" }
      },*/
      {
        path: 'cmg-seg',
        component: ReportCraV1p1Component,
        data: { title: "CMG Seguros",
                report: "rda/administracion/seguros/cmg_seguros" }
      },
      {
        path: 'not-asig',
        component: ReportCraV1p1Component,
        data: { title: "Cartera No Asignada",
                report: "rda/administracion/cartera/cartera_noasignada" }
      },
      {
        path: 'mon-desem',
        component: ReportCraV1p1Component,
        data: { title: "Monitor Metas Desembolso",
                //report: "avance/monitor_metas_desembolso" }
                report: "Monitor_Dese"}
      },
      {
        path: 'mon-desem-misi',
        component: ReportCraV1p1Component,
        data: { title: "Monitor Metas Desembolso Misionales",
                //report: "avance/monitor_metas_desembolso" }
                report: "Monitor_Dese_misi"}
      },
      {
        path: 'mon-rep',
        component: ReportCraV1p1Component,
        data: { title: "Monitor Reprogramados",
                report: "RS_MON_REP" }
      },

      {
        path: 'mon-efec',
        component: ReportCraV4Component,
        data: { title: "Monitor Efectividades",
                report: "RS_MON_EFEC" }
      },
      {
        path: 'mon-efec-reasig',
        component: ReportCraV12Component,
        data: { title: "Monitor Efectividades Reasigadas",
                report: "RS_MON_EFECREASIG" }
      },
      {
        path: 'gest_cart_her',
        component:  ReportCraV11Component, //ReportCraV1p5Component
        data: { title: "Gestión de Cartera Reasignada",
                report: "RS_AGE_COM_CR" } 
       },
       {
        path: 'gest_cart_her-flujo',
        component:  ReportCraV11Component, //ReportCraV1p5Component
        data: { title: "Gestión de Cartera Reasignada FLujo",
                report: "RS_AGE_COM_CRM_F" } 
       },
       {
        path: 'gest_cart_stock',
        component:  ReportCraV11Component, //ReportCraV1p5Component
        data: { title: "Gestión de Cartera Reasignada Stock",
                report: "RS_AGE_COM_CRM_S" } 
       },
      {
        path: 'mon-efectramoscomer',
        component: ReportCraV7Component,
        data: { title: "Seguimiento Cartera por Tramos Comercial",
                report: "RS_MON_EFECTRAMOSC" }
      },
      {
        path: 'mon-efecrepro',
        component: ReportCraV7Component,
        data: { title: "Seguimiento Cartera de reprogramados",
                report: "RS_MON_EFECREPRO" }
      },
      {
        path: 'mon-efec-sinasig',
        component: ReportCraV10Component, //ReportCraV1p1Component,
        data: { title: "Seguimiento Efectividades Sin Asignar",
                report: "RMESA" }
       },
      /*{
        path: 'rev-agr',
        component: RevaTempComponent,
        data: { title: "Reva Agropecuario",
                report: "GSREVA" }
      },
	  {
        path: 'rev-inc',
        component: RevaTempComponent,
        data: { title: "Reva Inclusion",
                report: "GSREVA1" }
      },
	  {
        path: 'rev-bp',
        component: RevaTempComponent,
        data: { title: "Reva Banca",
                report: "GSREVA2" }
      },*/
      {
        path: 'top-efec',
        component: ReportCraV1p1Component, //CraTopEfecComponent,
        data: { title: "Monitor de Efectividades - TOP",
        report: "RSRTOPV"}
      },
      {
        path: 'sup-pan',
        component: CraPanSupComponent,
        data: { title: "Panel de Supervisión"}
      },
      {
        path: 'age-com',
        component:  ReportCraV1p1Component,//ReportCraV9Component, //ReportCraV1p9Component,
        data: { title: "Agendamiento Comercial",
                report: "RS_AGE_COM"}
      },
      {
        path: 'mod-agen',
        component: ReportCraV1p1Component,
        data: { title: "Módulo de Agendamiento",
                report: "GSMODAGEN" }
      },
      {
        path: 'seg-cam-seg',
                component: ReportCraV1p1Component,
                data: { title: "Campaña de Seguros",
                        report: "GSCASEG" }
      },
      /*{
        path: 'camp-imp',
        component: CraCamImpComponent,
        data: { title: "Módulo de Repro" }
      },*/
      {
        path: 'cam-condona',
        component: ReportCraV1p1Component,
        data: { title: "Reporte de Condonaciones",
                report: "GRESCONDO"}//"rda/administracion/campanas/condonaciones" }
      },
      {
        path: 'cam-seguros',
        component: ReportCraV1p6Component,
        data: { title: "Reporte de Resumen Seguro",
                report: "GRSCMIS"} //"rda/administracion/campanas/condonaciones" }
      },
      {
        path: 'aut',
        component: CraAutComponent,
        data: { title: "Reporte de Autonomias" }
      },
      {
        path: 'cap-segui-red',
        component: ReportCraV1p1Component,
        data: { title: "Reporte de Pasivos",
                report:"CAP_SEGUI_RED" }
      },
      {
        path: 'cap-segui-bp',
        component: ReportCraV1p1Component,
        data: { title: "Reporte de Pasivos",
                report:"CAP_SEGUI_BP" }
      },
      {
        path: 'gest-red-ag',
        component: ReportCraV1p1Component,
        data: { title: "Gestión Red de Agencias",
                report:"CAP_SEGUI_FC_BP" }
      },
      {
        path: 'pan_zu_cuo',
        component: ReportCraV1p1Component,
        data: { title: "Reporte",
                report:"PAN_CEUN_CUO" }
      },
      {
        path: 'cmg-capta01',
        component: ReportCraV1p1Component,
        data: { title: "CMG Captaciones - Agencias",
                report: "GCMGCAP"}
      },
      {
        path: 'cmg-capta',
        component: ReportCraV1p1Component,
        data: { title: "CMG Captaciones",
                // report: "rma/administracion/Captaciones/cmg_captaciones_rma" }
                report: "GCMGCAP"}
      },
      {
        path: 'ava-port',
        component: ReportCraV1p1Component,
        data: { title: "Avance de Portafolio",
                report: "RS_AVA_POR"}
      },
       {
         path: 'desem-reacfae',
         component: ReportCraV1p1Component,
         data: { title: "DESEMBOLSOS SIN FAE NI REACTIVA",
                 report: "DESEMBOLSOS" }
       },
       {
         path: 'seg-agro',
         component: ReportCraV1p1Component,
         data: { title: "SEGURO AGRO",
                 report: "SEG_AGRO" }
       },
       {
        path: 'agro',
        component: ReportCraV1p1Component,
        data: { title: "AGRO",
                report: "AGRO" }
       },
       {
        path: 'cli',
        component: ReportCraV1p1Component,
        data: { title: "Clientes",
                report: "Clientes" }
       },
       {
        path: 'pdm',
        component: ReportCraV1p1Component,
        data: { title: "PDM",
                report: "PDM" }
       },
       {
        path: 'pas',
        component: ReportCraV1p1Component,
        data: { title: "Pasivo",
                report: "Pasivo" }
       },
       {
        path: 'pre-cosechas',
        component: ReportCraV5Component,
        data: { title: "Pre Cosechas",
                report: "PRECOSELISTADO" }
       },
       {
        path: 'pre-cuadro',
        component: ReportCraV1p1Component,//ReportCraV1p1Component,
        data: { title: "Pre Cuadro Cosechas",
                report: "PRECOSECUADRO" }
       },
       {
        path: 'cmd-cerocuotanueva',
        component: ReportCraV1p1Component,//ReportCraV1p1Component,
        data: { title: "Cuadro de Mando",
                report: "CMCUONUEV" }
       },
       {
        path: 'plan-mov',
        component: ReportCraV6Component,//ReportCraV1p2Component,
        data: { title: "PLANILLA DE MOVILIDAD",
                report: "PLANMOV" }
       },
       {
        path: 'enr-dese',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Desembolso",
                report: "enrolamiento_desembolso" }
       },
       {
        path: 'enr-pasivo',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Pasivo",
                report: "enrolamiento_Pasivo" }
       },
       {
        path: 'enr-pasivo-pas',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Pasivo",
                report: "enrolamiento_Pasivo_pas" }
       }
       ,
       {
        path: 'enr-colab',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Colaboradores",
                report: "enrolamiento_colaboradores" }
       },
       {
        path: 'enr-ope',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Operaciones",
                report: "enrolamiento_Ope" }
       },
       {
        path: 'sect-ciiu',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Seguimiento Sector",
                report: "Sec_ciiu" }
       },
       {
        path: 'com-dia',
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Comite de Créditos",
                report: "GCOMCRE" }
       },
       {
        path: 'res-mov',
        component: ReportCraV10Component, //ReportCraV1p1Component,
        data: { title: "Resumen de Movilidad Comercial",
                report: "RESNMOV" } 
       },
       {
        path: 'res-mov-rec',
        component: ReportCraV6Component, //ReportCraV1p1Component,
        data: { title: "Resumen de Movilidad Recuperador",
                report: "RESNMOVR" } 
       },
       {
        path: 'proy_M1',
        component: ReportCraV11Component, //ReportCraV1p5Component
        data: { title: "Colocaciones Operacion y Monto",
                report: "PROYEC_COLREC" } 
       },
       {
        path: 'proy_M2',
        component: ReportCraV1p1Component, //ReportCraV1p1Component,component: ReportCraV7Component,
        data: { title: "Colocaciones diaria Operacion, Monto y recuperacion",
                report: "PROYEC_DIACOLREC" } 
       },
       {
        path: 'seg_pdm',
        component: ReportCraV1p1Component, //ReportCraV1p1Component,component: ReportCraV7Component,
        data: { title: "Seguimiento PDM",
                report: "SEG_PDM" } 
       },
       {
        path: 'app_uso',
        component: ReportCraV1p1Component, //ReportCraV1p1Component,component: ReportCraV7Component,
        data: { title: "Uso del App",
                report: "APP_USO" } 
       },
       {
        path: 'graf-dashboard',
        component: ReportCraV1p1Component,//ReportCraV3Component,
        //component: ReportCraV3Component,
        data: { title: "Cero Cuotas Nuevas" ,
                report: "rda/administracion/mora/Dashboard_rda" }
      }, 
      {
        path: 'RMentoring',
        component: ReportCraV1p7Component, 
        data: { title: "Reporte Mentoring",
                report: "RMENTORIN" } 
       },
       {
        path: 'Top-CeroCuota',
        component: ReportCraV1p1Component, 
        data: { title: "Reporte Top Cero Cuota Nuevas",
                report: "CEROCUOTA_TOPCNUEVA" } 
       },
       {
        path: 'pro-gob',
        component: ReportCraV1p3Component,
        data: { title: "Programas del Gobierno",
                report: "RPROGOB" } 
       },
       {
        path: 'list-cero-cuotas',
        component: ReportCraV10Component, //ReportCraV1p1Component,
        data: { title: "BASE DE GESTION CERO CUOTAS NUEVO INGRESO",
                report: "LCCUOTANUEVA" }
       },
       {
        path: 'tab-digital', 
        component: ReportCraV1p4Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "TABLERO DIGITAL - CORRESPONSALES",
                report: "TABDIG" }    
       },
       {
        path: 'des-cred',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Seguimiento de Destino de Crédito",
                report: "DESCRED" }    
       },
       {
        path: 'cmg_cliente_flujo',
        component: ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Clientes Flujo",
                report: "CMG_CLIF" }    
       },
       {
        path: 'desemp-social',
        component: ReportCraV1p1Component,
        data: { title: "Desempeño Social",
                report: "DESEMP_SOC" }    
       },
       {
        path: 'desempeno-social-pas',
        component: ReportCraV1p1Component,
        data: { title: "Desempeño Social Pasivo",
                report: "DESEMP_SOC_PAS" }    
       },
       {
        path: 'res-inc_pdm',
        component: ReportCraV10Component, //ReportCraV1p1Component,
        data: { title: "Incentivos PDM",
                report: "RESINCGRUP" } 
       },
       {
        path: 'act-pdm',
        component: ReportCraV1p1Component,
        data: { title: "Activas PDM" ,
                report: "RACTGP" }
      },
      {
        path: 'mora-pdm',
        component: ReportCraV1p1Component,
        data: { title: "Activas PDM" ,
                report: "RESMORAGP" }
      },
      {
        path: 'ranking-diar',
        component: ReportCraV1p1Component,
        data: { title: "Ranking de Autonomías",
                report: "reporte_autonomia_newdiaria" }      
       },
       {
        path: 'res-plan-mov-rec',
        component: ReportCraV8Component, //ReportCraV1p1Component,
        data: { title: "Planilla Movilidad Recuperador",
                report: "PLANMOVR" } 
       },
       {
        path: 'ince-pdm',
        component: ReportCraV1p1Component,
        data: { title: "Resumen Incentivos PDM",
                report: "INCEN_PDM" }
      }, 
      {
        path: 'det-ince-pdm',
        component: ReportCraV10Component,
        data: { title: "Desembolsos PDM",
                report: "DET_INCEN_PDM" }
      },
      {
        path: 'capta-caract-canal-comercial',
        component: ReportCraV1p1Component,
        data: { title: "",
                report:"CARACT_CARTERA" }
                
      },
      {
        path: 'capta-caract-canal-operacional',
        component: ReportCraV1p1Component,
        data: { title: "",
                report:"CARACT_pas" } 
      },
      {
        path: 'panel-operaciones',
        component: ReportCraV1p11Component,
        data: { title: "",
                report:"TB_PANEL_OPE" } 
      }, 
      {
        path: 'recaudo-serv-pas',
        component: ReportCraV1p1Component,
        data: { title: "",
                report:"RECSERV_PAS" } 
      },
      {
        path: 'huella-carbono',
        component: ReportCraV10Component, 
        data: { title: "Planilla Movilidad Recuperador",
                report: "HCARBONO" } 
       },
       {
        path: 'tab-digital_vr2-ope', 
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "TABLERO DIGITAL",
                report: "TABDIG_VR2" }    
       },
       {
        path: 'tab-digital_vr2-com', 
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "TABLERO DIGITAL",
                report: "TABDIG_VR2_COM" }    
       },
       {
        path: 'GC-tab-digital_vr2-ope',  
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Gestión Canal Tablero Digital",
                report: "GCTABDIG_VR2_OPE" }     
       },
       {
        path: 'GC-tab-digital_vr2-come',  
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Gestión Canal Tablero Digital",
                report: "GCTABDIG_VR2_COM" }    
       },
       {
        path: 'v-general-cor', 
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Vista General - CORRESPONSALES",
                report: "RVIUWGCOR" }    
       },
       {
        path: 'v-gestion-cor', 
        component: ReportCraV1p1Component,//ReportCraV1p1Component,//ReportCraV1p2Component,
        data: { title: "Vista Gestión - CORRESPONSALES",
                report: "RVIUWGCORE" }    
       },
       {
        path: 'cmg-cli-pas',
        component: ReportCraV1p1Component,
        data: { title: "CMG Clientes Pasivo",
                report: "CMG_CLI_PAS" }    
       } ,
       {
        path: 'cmg-cli-pas-stock',
        component: ReportCraV1p1Component,
        data: { title: "CMG Clientes Pasivo Stock",
                report: "CMG_CLI_PAS_STOCK" }    
       } ,
       {
        path: 'cmg-cli-pas-detalle',
        component: ReportCraV1p1Component,
        data: { title: "CMG Clientes Pasivo Detalle",
                report: "CMG_CLI_PAS_DETA" }    
       } ,
       {
        path: 'det_correspon',
        component: ReportCraV10Component, //ReportCraV1p1Component,
        data: { title: "Detalle Corresponsales",
                report: "RDETCORR" }
       }
       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RdaAdministracionRoutingModule { }
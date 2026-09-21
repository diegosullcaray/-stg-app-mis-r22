import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportCraV1p1Component } from '../../../support/components/template/cra/report-cra-v1p1/report-cra-v1p1.component';
import { ReportCraV1p3Component } from '../../../support/components/template/cra/report-cra-v1p3/report-cra-v1p3.component';
import { ReportCraV1p8Component } from '../../../support/components/template/cra/report-cra-v1p8/report-cra-v1p8.component';
import { ReportCraV2Component } from '../../../support/components/template/cra/report-cra-v2/report-cra-v2.component';
import { ReportCraV3Component } from '../../../support/components/template/cra/report-cra-v3/report-cra-v3.component';
import { ReportCraV4Component } from '../../../support/components/template/cra/report-cra-v4/report-cra-v4.component';
import { ReportCraV5Component } from '../../../support/components/template/cra/report-cra-v5/report-cra-v5.component';
import { CraAutTasaComponent } from './cra-aut-tasa/cra-aut-tasa.component';
//import { CraSegAseComponent } from './cra-seg-ase/cra-seg-ase.component';
import { ReportCraV8Component } from '../../../support/components/template/cra/report-cra-v8/report-cra-v8.component';
import { ReportCraV10Component } from '../../../support/components/template/cra/report-cra-V10/report-cra-v10.component';
import { ReportCraV12Component } from '../../../support/components/template/cra/report-cra-v12/report-cra-v12.component';
import { ReportCraV11Component } from '../../../support/components/template/cra/report-cra-v11/report-cra-v11.component';

const routes: Routes = [
  {
    path: "",
    children: [
      
      {
        path: 'ingr-seg',
        component: ReportCraV3Component,
        data: { title: "Ingresos por Venta Seguros" ,
                report: "rma/administracion/Seguros/ingreso_ventas_rma" }
      },
      {
        path: 'inv-mora',
        component: ReportCraV3Component,
        data: { title: "Brecha" ,
                report: "rma/administracion/Mora/brecha_inversion_mora_rma" }
      },
      {
        path: 'graf-cosechas',
        component: ReportCraV3Component,
        data: { title: "Cosechas" ,
                report: "rma/administracion/Riesgos/grafico_cosechas" }
      }, 
      {
        path: 'graf-dashboard-CN',
        component: ReportCraV3Component,
        data: { title: "Cosechas" ,
                report: "rma/administracion/mora/Dashboard_rma" }
      },
      {
        path: 'ren',
        component: ReportCraV3Component,
        data: { title: "Rentabilidad" ,
                report: "rma/administracion/Rentabilidad/rentabilidad_rma" }
      },
      {
        path: 'ges-per',
        component: ReportCraV3Component,
        data: { title: "Gestión Personas y R." ,
                report: "rma/Administracion/GestionPersonas/gestion_personas_rma" }
      },
      {
        path: 'seg-pol',
        component: ReportCraV3Component,
        data: { title: "Seguros Polizas" ,
                report: "rma/administracion/Seguros/seguros_polizas_rma" }
      },
      {
        path: 'capta',
        component: ReportCraV3Component,
        data: { title: "Captaciones" ,
                report: "rma/administracion/Captaciones/captacion_rma" }
      },
      {
        path: 'mor-efe',
        component: ReportCraV3Component,
        data: { title: "Mora Efectividad por Tramos" ,
                report: "rma/administracion/Mora/mora_efectividad_tramos_rma" }
      },
      {
        path: 'tp-mes',
        component: ReportCraV3Component,
        data: { title: "Tasas Mes por Producto" ,
                report: "rma/administracion/Cartera/tasa_producto_rma" }
      },
      {
        path: 'cli',
        component: ReportCraV3Component,
        data: { title: "Clientes" ,
                report: "rma/administracion/Clientes/clientes_rma" }
      },
      {
        path: 'canc',
        component: ReportCraV3Component,
        data: { title: "Cancelaciones" ,
                report: "rma/administracion/Cartera/cancelaciones_rma" }
      },
      {
        path: 'cart-prod',
        component: ReportCraV3Component,
        data: { title: "Cartera por Producto" ,
                report: "rma/administracion/Cartera/cartera_producto_rma" }
      },
      {
        path: 'mon-efec',
        component: ReportCraV4Component,
        data: { title: "Monitor Efectividades" ,
                report: "RS_MON_EFECM" }//"rma/administracion/Mora/monitor_efectividad_rma"
      },
      {
        path: 'mon-efec-reasig',
        component: ReportCraV12Component,
        data: { title: "Monitor Efectividades" ,
                report: "RS_MON_EFECREASIGM" }
      },
      {
        path: 'gest_cart_her',
        component: ReportCraV11Component,
        data: { title: "Gestión de Cartera Reasignada" ,
                report: "RS_AGE_COM_CRM" }
      },
      {
        path: 'gest_cart_her-flujo',
        component:  ReportCraV11Component, //ReportCraV1p5Component
        data: { title: "Gestión de Cartera Reasignada Flujo",
                report: "RS_AGE_COM_CRM_F" } 
       },
       {
        path: 'gest_cart_stock',
        component:  ReportCraV11Component, //ReportCraV1p5Component
        data: { title: "Gestión de Cartera Reasignada Stock",
                report: "RS_AGE_COM_CRM_S" } 
       },
      {
        path: 'prod-crit',
        component: ReportCraV2Component,
        data: { title: "Productividad Crítica" ,
                report: "rma/administracion/Cartera/productividad_critica_rma" }
      },
      {
        path: 'res-un',
        component: ReportCraV1p1Component, //ReportCraV2Component,
        data: { title: "Resultados por Unidad de Negocio" ,
                report: "resultado_unidad_negocio_rma" }
      },
      {
        path: 'res-un-ope',
        component: ReportCraV1p1Component, //ReportCraV2Component,
        data: { title: "Resultados por Unidad de Negocio" ,
                report: "resultado_unidad_negocio_rma_ope" }
      },
      {
        path: 'rep-aut-tas',
        component: ReportCraV1p1Component, //ReportCraV2Component,
        data: { title: "Ranking de Autonomia de Tasas" ,
                report: "reporte_autonomia_new" }
      },      
      {
        path: 'hor-ext',
        component: ReportCraV2Component,
        data: { title: "Horas Extras" ,
                report: "rma/Administracion/GestionPersonas/horas_extras_rma" }
      },
      /*{
        path: 'seg-ase',
        component: CraSegAseComponent,
        data: { title: "Seguimiento de Asesores" ,
                report: "rma/administracion/Cartera/seguimiento_asesores_rma" }
      },*/
      {
        path: 'cmg-cart',
        component: ReportCraV2Component,
        data: { title: "CMG Cartera" ,
                report: "rma/administracion/Cartera/cmg_cartera_rma" }
      },
      {
        path: 'cmg-mora',
        //component: ReportCraV2Component,
        component: ReportCraV1p1Component,
        data: { title: "CMG Mora" ,
        report: "cuadro_Variable_M"} //"rda/administracion/mora/cmg_mora" }
      },
      {
        path: 'cmg-mora-simp-m',
        component: ReportCraV1p1Component,
        data: { title: "CMG Mora Sin Impulsa" ,
                report: "cmg_mora_simp_m"} //"rda/administracion/mora/cmg_mora" }
      },
      {
        path: 'cmg-cli',
        component: ReportCraV2Component,
        data: { title: "CMG Clientes",
                report: "rma/administracion/Clientes/cmg_clientes_rma" }
      },
      {
        path: 'cmg-capta',
        component: ReportCraV3Component,
        data: { title: "CMG Captaciones",
                // report: "rma/administracion/Captaciones/cmg_captaciones_rma" }
                report: "GCMGCAP"}
      },
      {
        path: 'cmg_cliente_flujo',
        component: ReportCraV3Component,
        data: { title: "CMG Clientes Flujo",
                report: "CMG_CLIF"}
      },
      {
        path: 'desemp-social',
        component: ReportCraV3Component,
        data: { title: "Desempeno Social",
                report: "DESEMP_SOC"}
      },
      {
        path: 'seg_comite',
        component: ReportCraV3Component,
        data: { title: "Seguimiento Comite",
                report: "SEGUI_COMITE"}
      },
      {
        path: 'cmg-seg',
        component: ReportCraV2Component,
        data: { title: "CMG Seguros",
                report: "rma/administracion/Seguros/cmg_seguros_rma" }
      },
      {
        path: 'cam-apa',
        component: ReportCraV2Component,
        data: { title: "Apadrinamiento",
                report: "rma/administracion/Campanas/campanas_rma" }
      },
      {
        path: 'desem-prod',
        component: ReportCraV3Component,
        data: { title: "Desembolsos y Productividad",
                report: "rma/administracion/Cartera/desembolsos_productividad_rma" }
      },
      {
        path: 'fn/cart',
        component: ReportCraV3Component,
        data: { title: "CMG Cartera" ,
                report: "finanzas/cartera/cartera_finanzas" }
      },
      {
        path: 'fn/mora',
        //component: ReportCraV3Component,
        component: ReportCraV1p1Component,
        data: { title: "CMG Mora" ,                
        report: "cuadro_Variable_Riesgo_F"} //report: "finanzas/mora/mora_finanzas" }
      },
      {
        path: 'fn/cli',
        component: ReportCraV3Component,
        data: { title: "CMG Clientes",
                report: "finanzas/clientes/clientes_finanzas" }
      },
      {
        path: 'fn/capta',
        component: ReportCraV3Component,
        data: { title: "CMG Captaciones",
                report: "finanzas/captaciones/captacion_finanzas" }
      },
      {
        path: 'fn/seg',
        component: ReportCraV3Component,
        data: { title: "CMG Seguros",
                report: "finanzas/seguros/seguros_finanzas" }
      },
      {
        path: 'cam-condona',
        component: ReportCraV3Component,
        data: { title: "Reporte de Condonaciones",
                report: "GRESCONDO"}
      },
      {
       path: 'cosechas',
       component: ReportCraV5Component,//ReportCraV1p1Component,
       data: { title: "cosechas",
               report: "COSELISTADO" }
      },
      {
       path: 'sema-cosechas',
       component: ReportCraV1p1Component,
       data: { title: "Semaforo cosechas",
               report: "COSESEMAFORO" }
      },
      {
        path: 'list-autonomia',
        component: ReportCraV1p1Component,//ReportCraV1p1Component,
        data: { title: "AUTONOMIAS",
                report: "GLISAUTRO" }
       },
       {
        path: 'aut-tasa-m',
        component: CraAutTasaComponent,
        data: { title: "Autonomía de Tasas",
                report:"GST_ACTIVAS_M" }
      },
      {
        path: 'gest-tasa-m',
        component: ReportCraV1p1Component,//ReportCraV2Component,
        data: { title: "Gestion de Tasas",
                //report:"rma/administracion/captaciones/gestion_tasas_pasivas_rma" 
                report:"GST_PASIVA_M" 
              }
      },
      {
        path: 'pro-gob-m',
        component: ReportCraV1p3Component,//ReportCraV2Component,
        data: { title: "Programas del Gobierno",
                report:"RPROGOB_M" 
              }
      },
      {
        path: 'Top-CeroCuota-m',
        component: ReportCraV1p1Component,//ReportCraV2Component,
        data: { title: "TOP CERO CUOTAS NUEVAS",
                report:"CEROCUOTA_TOPCNUEVA_M" 
              }
      },
      {
        path: 'cont-elect-m',
        component: ReportCraV1p1Component,//ReportCraV2Component,
        data: { title: "Contratatación Electrónica",
                report:"CONT_ELECT_M" 
              }
      },
      {
        path: 'app_uso_m',
        component: ReportCraV1p1Component, //ReportCraV2Component,
        data: { title: "Reporte plan de datos" ,
                report: "P_Datos" }
      }, 
      {
        path: 'rank-kay',
        component: ReportCraV1p8Component, //ReportCraV2Component,
        data: { title: "Ranking Kaypacha" ,
                report: "rankKay" }
      }, 
      {
        path: 'rank-kay-ope',
        component: ReportCraV1p8Component, //ReportCraV2Component,
        data: { title: "Ranking Kaypacha Operaciones" ,
                report: "rankKayOpe" }
      }, 
      {
        path: 'rank-kay-recu',
        component: ReportCraV1p8Component, //ReportCraV2Component,
        data: { title: "Ranking Kaypacha Recuperaciones" ,
                report: "rankKayrecu" }
      }, 
      {
        path: 'huella-carbono-m',
        component: ReportCraV3Component,  
        data: { title: "Huella Carbono" ,
                report: "HCARBONO" }
      }, 
      {
        path: 'dat-prod-men',
        component: ReportCraV3Component,
        data: { title: "Datos Producto",
                report:"RS_DAT_PRO" }
      },
      {
        path: 'seg-bp-men',
        component: ReportCraV3Component,
        data: { title: "Seguimiento BP",
                report:"CAP_SEGUI_BP" }
      },
      {
        path: 'capta-caract-canal-operacional-m',
        component: ReportCraV1p1Component, //ReportCraV2Component,
        data: { title: "Captación por Canal Operaciones" ,
                report: "CARACT_pas_M" }
      },
      {
        path: 'capta-caract-canal-comercial-m',
        component: ReportCraV1p1Component,
        data: { title: "",
                report:"CARACT_CARTERA_M" }
                
      }, //proyect_david
      {
        path: 'proyect',
        component: ReportCraV1p1Component,
        data: { title: "",
                report:"proyect_david" }
                
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmaAdministracionRoutingModule { }

import * as Moments from 'moment';
import { Boolean01, Producto01, renderDates_1, Tramo01, TramoVenc01,Mostrar_por,  precosecha01,Tipo_asesor } from '../support/common/filter-locale.module';
import { theme_tb1, theme_tb3 } from '../support/common/theme.module';
import { fileSize } from '@rxweb/reactive-form-validators';

const fec_day_ult = Moments().add(-1, 'days').format("YYYYMMDD");

export function com(module: string) {
  let conf = [
    {
      module: 'RS_MON_EFEC',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          params: { fecha:fec_day_ult },
          theme: theme_tb1(),
          width:'7600px',
          style:{
            width_gt_xs_v:'1%'
          }
        },
        {
          id: '_02',
          filter:[Tramo01(),Producto01(),
            {...Boolean01(),...{variable:'comp_r',label:'Compromiso Roto'}},
            {...Boolean01(),...{variable:'zcuo',label:'0 Cuota'}},
            {...Boolean01(),...{variable:'ucuo',label:'1 Cuota'}},
            TramoVenc01(),precosecha01()
          ],
          params: { fecha:fec_day_ult},
          theme: theme_tb3(),
          style:{
            width_gt_xs_v:'100px'
          }
        },
        {
          id: '_03',
          params: { fecha:fec_day_ult,tram:'1. -30-0' },
          content:{
            higher:'<h2 class="title-module">Resumen de Gestiones Ingresadas en Tramo -30-0: Operaciones Deterioradas</h2>',
            lower: `<b>a:</b> Número de clientes de riesgo alto y medio alto en el tramo de -30-0.<br>
                    <b>b:</b> Número de Gestiones realizadas entre Número de Clientes Gestionados.<br>`
          },
          theme: theme_tb1()
        },
        {
          id: '_03',
          params: { fecha:fec_day_ult,tram:'2. 1-30' },
          content:{
            higher:'<h2 class="title-module">Resumen de Gestiones Ingresadas<br>en Tramo 1-30</h2>',
            lower: `<b>a:</b> Número de clientes de riesgo alto y medio alto en el tramo de 1-30.<br>
                    <b>b:</b> Número de Gestiones realizadas entre Número de Clientes Gestionados.<br>`
          },
          theme: theme_tb1()
        }
      ]
    },
    {
      module: 'RS_MON_EFECTRAMOSC',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          params: { fecha:fec_day_ult },
          content:{
            higher:'<h2 class="title-module">REPORTE DE PAGO PUNTUAL</h2><br>.<br>',
            lower: '<b></b>'
          },
          theme: theme_tb1(),
          //width:'3500px',
          style:{
            width_gt_xs_v:'1%'
          }
        }
      ]
    },
    {
      module: 'RS_MON_EFECREPRO',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          params: { fecha:fec_day_ult },
          content:{
            higher:'<h2 class="title-module">SEGUIMIENTO CARTERA DE REPROGRAMADOS</h2><br>.<br>',
            lower: '<b></b>'
          },
          theme: theme_tb1(),
          width:'3500px',
          style:{
            width_gt_xs_v:'1%'
          }
        }
      ]
    },
    {
      module: 'RS_MON_EFECM',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fecha'}}],
      table: [
        { 
          id: '_01',
          params: { fecha:fec_day_ult },
          theme: theme_tb1(),
          width:'7600px',
          style:{
            width_gt_xs_v:'1%'
          }
        },
        {
          id: '_02',
          filter:[Tramo01(),Producto01(),
            {...Boolean01(),...{variable:'comp_r',label:'Compromiso Roto'}},
            {...Boolean01(),...{variable:'zcuo',label:'0 Cuota'}},
            {...Boolean01(),...{variable:'ucuo',label:'1 Cuota'}},
            TramoVenc01(),precosecha01()
          ],
          params: { fecha:fec_day_ult},
          theme: theme_tb3(),
          style:{
            width_gt_xs_v:'100px'
          }
        },
        {
          id: '_03',
          params: { fecha:fec_day_ult,tram:'1. -30-0' },
          content:{
            higher:'<h2 class="title-module">Resumen de Gestiones Ingresadas en Tramo -30-0: Operaciones Deterioradas</h2>',
            lower: `<b>a:</b> Número de clientes de riesgo alto y medio alto en el tramo de -30-0.<br>
                    <b>b:</b> Número de Gestiones realizadas entre Número de Clientes Gestionados.<br>`
          },
          theme: theme_tb1()
        },
        {
          id: '_03',
          params: { fecha:fec_day_ult,tram:'2. 1-30' },
          content:{
            higher:'<h2 class="title-module">Resumen de Gestiones Ingresadas<br>en Tramo 1-30</h2>',
            lower: `<b>a:</b> Número de clientes de riesgo alto y medio alto en el tramo de 1-30.<br>
                    <b>b:</b> Número de Gestiones realizadas entre Número de Clientes Gestionados.<br>`
          },
          theme: theme_tb1()
        }
      ]
    },

    {
      module: 'RS_MON_EFECREASIG',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          params: { fecha:fec_day_ult },
          theme: theme_tb1(),
          width:'7600px',
          style:{
            width_gt_xs_v:'1%'
          }
        },
        {
          id: '_02',
          filter:[Tramo01(),Producto01(),
            {...Boolean01(),...{variable:'comp_r',label:'Compromiso Roto'}},
            {...Boolean01(),...{variable:'zcuo',label:'0 Cuota'}},
            {...Boolean01(),...{variable:'ucuo',label:'1 Cuota'}},
            TramoVenc01()
          ],
          params: { fecha:fec_day_ult},
          theme: theme_tb3(),
          style:{
            width_gt_xs_v:'100px'
          }
        },
      ]
    },
    {
      module: 'RS_MON_EFECREASIGM',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fecha'}}],
      table: [
        {
          id: '_01',
          params: { fecha:fec_day_ult },
          theme: theme_tb1(),
          width:'7600px',
          style:{
            width_gt_xs_v:'1%'
          }
        },
        {
          id: '_02',
          filter:[Tramo01(),Producto01(),
            {...Boolean01(),...{variable:'comp_r',label:'Compromiso Roto'}},
            {...Boolean01(),...{variable:'zcuo',label:'0 Cuota'}},
            {...Boolean01(),...{variable:'ucuo',label:'1 Cuota'}},
            TramoVenc01()
          ],
          params: { fecha:fec_day_ult},
          theme: theme_tb3(),
          style:{
            width_gt_xs_v:'100px'
          }
        }
      ]
    },










    {
      module: 'rma/administracion/Mora/monitor_efectividad_rma',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fecha'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          width:'7600px',
          style:{
            width_gt_xs_v:'1%'
          }
        },
        {
          id: '_02',
          filter:[Tramo01(),Producto01(),
                  {...Boolean01(),...{variable:'comp_r',label:'Compromiso Roto'}},
                  {...Boolean01(),...{variable:'zcuo',label:'0 Cuota'}},
                  {...Boolean01(),...{variable:'ucuo',label:'1 Cuota'}},
                  TramoVenc01()
                ],
          theme: theme_tb3(),
        },
        {
          id: '_03',
          params: { fecha:fec_day_ult,tram:'1. -30-0' },
          content:{
            higher:'<h2 class="title-module">Resumen de Gestiones Ingresadas en Tramo -30-0: Operaciones Deterioradas</h2>',
            lower: `<b>a:</b> Número de clientes de riesgo alto y medio alto en el tramo de -30-0.<br>
                    <b>b:</b> Número de Gestiones realizadas entre Número de Clientes Gestionados.<br>`
          },
          theme: theme_tb1()
        },
        {
          id: '_03',
          params: { fecha:fec_day_ult,tram:'2. 1-30' },
          content:{
            higher:'<h2 class="title-module">Resumen de Gestiones Ingresadas en Tramo 1-30</h2>',
            lower: `<b>a:</b> Número de clientes de riesgo alto y medio alto en el tramo de 1-30.<br>
                    <b>b:</b> Número de Gestiones realizadas entre Número de Clientes Gestionados.<br>`
          },
          theme: theme_tb1()
        }
      ]
    },
    {
      module: 'PROYEC_COLREC',
      jerar: 'UNI_1',
      //reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params:{fec:fec_day_ult},
          content: {
            higher: '<h2 class="title-module">COLOCACIONES ( NÚMERO DE OPERACIONES Y MONTOS DE DESEMBOLSO)</h2><br>.<br>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>Total de Proyecciones</b> → Cli. Evaluado + Listo para comite + Listo para desembolso <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        }, 
        {
          id: '_03',
          theme: theme_tb3(),
          content: {
            higher: '<h2 class="title-module">COLOCACIONES ( NÚMERO DE OPERACIONES Y MONTOS DE DESEMBOLSO)</h2>'
          }
        } 
      ]
    },
    {
      module: 'RS_AGE_COM_CR',
      jerar: 'UNI_1', 
      filter: [Mostrar_por()], 
      table: [
        {
          id: '_01',
          params: { fecha:fec_day_ult },
          theme: theme_tb1(),
          content: {  
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA</h2><br>.<br>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        }, 
        {
          id: '_02',
          params: { fecha:fec_day_ult },
          theme: theme_tb3(),
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA</h2>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        } 
      ]
    },
    {
      module: 'RS_AGE_COM_CRM',
      jerar: 'UNI_1',
      //reportType: ReportType.REGULAR,
      //filter: [Mostrar_por()],
      filter:[Mostrar_por(),{...renderDates_1(),...{variable:'fecha'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          //params:{fec:fec_day_ult},
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA</h2><br>.<br>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        }, 
        {
          id: '_02',
          theme: theme_tb3(),
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA</h2>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        } 
      ]
    },  

    {
      module: 'RS_AGE_COM_CRM_S',
      jerar: 'UNI_1',
      //reportType: ReportType.REGULAR,
      //filter: [Mostrar_por()],
      filter:[Mostrar_por(),{...renderDates_1(),...{variable:'fecha'}},Tipo_asesor()],
      table: [
        {
          id: '_03',
          theme: theme_tb1(),
          //params:{fec:fec_day_ult},
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA STOCK</h2><br>.<br>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        }, 
        {
          id: '_04',
          theme: theme_tb3(),
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA STOCK</h2>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        } 
      ]
    },
    {
      module: 'RS_AGE_COM_CRM_F',
      jerar: 'UNI_1',
      //reportType: ReportType.REGULAR,
      //filter: [Mostrar_por()],
      filter:[Mostrar_por(),{...renderDates_1(),...{variable:'fecha'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          //params:{fec:fec_day_ult},
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA BASE FLUJO</h2><br>.<br>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        }, 
        {
          id: '_02',
          theme: theme_tb3(),
          content: {
            higher: '<h2 class="title-module">GESTIÓN DE CARTERA REASIGNADA BASE FLUJO</h2>'+
            '<b> </b>',
            lower: '<b></b>'+
            '<b>* Mide la distancia entre la geolocalización de la reacción de visita al cliente versus la geolocalización del domicilio legal registrada en el " Alta de persona" <br>'+
            '<b> </b>'+
            '<b> </b>' 
          }
        } 
      ]
    }
    /* {
       module: 'PLANMOV',
       jerar: 'F,CT,CC,CG,CA',
       table: [
         { 
           id: '_01',
           params: { fecha:fec_day_ult },
           theme: theme_tb3(),
           width:'7600px',
           style:{
             width_gt_xs_v:'1%'
           }
         }
       ]
     }*/
  ]

  return conf.find(r => r.module == module);
}




import * as Moments from 'moment';
import { Autonomia, Canal01, CargoAutonomia, FAE_OPT01, GCOVID_OPT01, Maduracion01, Productos01, renderDates_1, renderDates_3, SCANALOPE, SCANALRED, Semana01, SubProducto01, Tipo01, Tipo02, Tipo03, VariableMontoMotivo, VariableStock, GRUPCIIU, VariableProductNIngreso, VariableNIngreso, renderDate_Hoy, VariableNIngresoD, NivelFuga, NivelProp, Terr01, renderDates_4, SPRODUCTO, TIPOAgenteC, TipoVariable, TipoTransaccion, TipoGrupo, Segmento, SPRODUCTOMISI, varProducto, SPRODUCTO_ } from '../../../support/common/filter-locale.module';
import { theme_gp1, theme_tb1, theme_tb3, theme_tb4 } from '../../../support/common/theme.module';
import { ReportType } from '../../../support/data/ant-mod-rep.service';

const fec_day_ult = Moments().add(-1, 'days').format("YYYYMMDD");

export function cra(module: string) {
  let conf = [
    {
      module: 'rda/administracion/cartera/cartera_noasignada',
      jerar: 'OFI_3',
      table: [
        {
          id: '_01',
          params: { var: 31, sem: 1 },
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">DETALLE DE CARTERA NO ASIGNADA</h2>',
          },
        }
      ]
    },
    {
      module: 'RS_AVA_POR',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult, mode: 1 },
          content: {
            higher: '<h2 class="title-module">PORTAFOLIO CON POTENCIAL INGRESO A MORA > 1</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult, mode: 2 },
          content: {
            higher: '<h2 class="title-module">PORTAFOLIO POR GRUPO</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult, mode: 3 },
          content: {
            higher: '<h2 class="title-module">CREDITOS CUOTA BALLON Y NO MINORISTA</h2>'
          }
        }
      ]
    },
    {
      //module: 'rda/administracion/cartera/actividad_tasas',
      module: 'actividadtasas',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">ACTIVIDAD Y TASAS</h2>',
            lower: '<b>a:</b> Variación de la TAPP Stock con respecto al cierre del mes anterior en puntos básicos.<br><b>b:</b> Variación de la TAPP Mes con respecto al cierre del mes anterior en puntos básicos.'
          }
        }
      ]
    },
    {
      // module: 'rda/administracion/cartera/portafolio_agro',
      //jerar: 'F,T,R,M,C',
      module: 'PortafolioAgro',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PORTAFOLIO AGROPECUARIO</h2><b>Expresado en PEN y %</b>'
          }
        }
      ]
    },
    {
      module: 'RS_SAL_CAR',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_04',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">SALDO PUNTUAL DE CARTERA VIGENTE</h2>',
            lower: '<b><h4 class="subtitle-warn-module" style="font-size:10px">*Considerar que los saldos de cartera no incluyen los ajustes de traslados GECO que se realizarán para el pago del REVA.</h4></b>'
          }
        },
        {
          id: '_05',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CARTERA POR PRODUCTO VIGENTE</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">SALDO PUNTUAL DE CARTERA</h2>',
            lower: '<b><h4 class="subtitle-warn-module" style="font-size:10px">*Considerar que los saldos de cartera no incluyen los ajustes de traslados GECO que se realizarán para el pago del REVA.</h4></b>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CARTERA POR PRODUCTO</h2>'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">PRODUCTIVIDAD</h2>'
          }
        } 
        
        
        
      ]
    },
    {
      module: 'RS_AGE_COM',
      jerar: 'UNI_1', 
      filter: [NivelFuga(), NivelProp()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult, mode: 1 },
          content: {
            higher: '<h2 class="title-module">AGENDAMIENTO COMERCIAL TOTAL</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult, mode: 2 },
          content: {
            higher: '<h2 class="title-module">BASE AGENDAMIENTO COMERCIAL</h2>'
          }
        },
         {
          id: '_03',
          theme: theme_tb3(),
          params: { fecha: fec_day_ult,pagen:1, mode: 1},
          content: {
            higher: '<h2 class="title-module">DETALLE AGENDAMIENTO COMERCIAL</h2>'
          }
        } 
      ]
    }, 
    {
     // module: 'rda/administracion/captaciones/gestion_tasas_pasivas',
     module: 'GST_PASIVA',
     jerar: 'OFI_1',
      
      filter: [{ ...Tipo01(), ...{ variable: 'agr' } }, { ...Canal01(), ...{ variable: 'var' } }],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          //params: { calc: 1,fec: fec_day_ult },
          params: { calc: 2,fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Depósitos a Plazo Fijo - Número de Aperturas por Tipo de Persona y Moneda</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          //params: { calc: 2,fec: fec_day_ult },
          params: { calc: 1,fec: fec_day_ult },
          content: {
           // higher: '<h2 class="title-module">% de Aperturas por Tipo de Persona y Moneda</h2>'
            higher: '<h2 class="title-module">TPPP Mes Aperturas por Tipo de Persona y Moneda</h2>'
          }
        }
        /*,
        {
          id: '_03',
          theme: theme_tb1(),
          params: { calc: 3,fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">TPPP Mes Aperturas por Tipo de Persona y Moneda</h2>'
          }
        }
        */
      ]
    },
    {
      // module: 'rma/administracion/captaciones/gestion_tasas_pasivas_rma',
      module: 'GST_PASIVA_M',
       jerar: 'OFI_1',
       filter: [{ ...Tipo01(), ...{ variable: 'agr' } }, { ...Canal01(), ...{ variable: 'var' } },{...renderDates_3(),...{variable:'fec'}}],
       reportType: ReportType.REGULAR,
       table: [
         {
           id: '_01',
           theme: theme_tb1(),
           //params: { calc: 1},
           params: { calc: 2},
           content: {
             higher: '<h2 class="title-module">Depósitos a Plazo Fijo - Número de Aperturas por Tipo de Persona y Moneda</h2>'
           }
         },
         {
           id: '_02',
           theme: theme_tb1(),
           //params: { calc: 2 },
           params: { calc: 1 },
           content: {
            // higher: '<h2 class="title-module">% de Aperturas por Tipo de Persona y Moneda</h2>'
             higher: '<h2 class="title-module">TPPP Mes Aperturas por Tipo de Persona y Moneda</h2>'
           }
         }
         /*,
         {
           id: '_03',
           theme: theme_tb1(),
           params: { calc: 3 },
           content: {
             higher: '<h2 class="title-module">TPPP Mes Aperturas por Tipo de Persona y Moneda</h2>'
           }
         }*/
       ]
     },
    {
      module: 'RS_DAT_PRO',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">DATOS POR PRODUCTO</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            lower: '<b>a:</b> Variación con respecto al cierre del mes anterior.'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            lower: '<b>b:</b> Variación de la TAPP con respecto al cierre al cierre del mes anterior en Puntos Básicos.'
          }
        }
      ]
    },
    {
      // module: 'rda/administracion/cartera/desembolso_diario',
      //jerar: 'F,T,R,M,C',
      module: 'DesemDiario',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Desembolsos diarios</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Desembolsos habilitados para posible contratación electrónica*</h2>',
            lower: '<b>* Créditos individuales hasta S/. 20 mil</b>'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Desembolsos por contratación electrónica</h2>'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Participación de contratación electrónica en  desembolsos habilitados.</h2>'
          }
        }, 
        {
          id: '_05',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Participación de contratación electrónica en  desembolsos totales.</h2>'
          }
        }
      ]
    },
    {
      module: 'GST_ACTIVAS',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      //filter: [{ ...Tipo02(), ...{ variable: 'var' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { var: 1, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">Número de Operaciones Desembolsadas por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '9.5%'
          },
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { var: 2, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">% Operaciones con Autonomia Desembolsada por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '11%'
          },
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { var: 3, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">TAPP Mes de Operaciones Desembolsadas por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_04',
          theme: theme_tb1(),
          params: { var: 4, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">Evolución de Operaciones Desembolsadas por Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_05',
          theme: theme_tb1(),
          params: { var: 5, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">Evolución de Monto Desembolsado por Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_06',
          theme: theme_tb1(),
          params: { var: 6, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">Evolución de TAPP Mes (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_07',
          theme: theme_tb1(),
          params: { var: 7, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">Número de Operaciones Desembolsadas por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_08',
          theme: theme_tb1(),
          params: { var: 8, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">TAPP Mes de Operaciones Desembolsadas por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_10',
          theme: theme_tb1(),
          params: { var: 10, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">TAPP Mes de Operaciones Desembolsadas por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_09',
          theme: theme_tb1(),
          params: { var: 9, fec: fec_day_ult, diario: 1 },
          content: {
            higher: '<h2 class="title-module">Número de Operaciones Desembolsadas por Producto y Nivel de Tasas (días habiles)</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '9.5%'
          },
        }

      ]
    },
    {
      module: 'GSCAMP',
      jerar: 'F,T,R,M,C',
      filter: [Semana01()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { ind: 1 },
          style: {
            width_gt_xs_v: '100px'
          },
          content: {
            higher: '<h2 class="title-module">CAMPAÑA ÁGIL</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { ind: 2 },
          style: {
            width_gt_xs_v: '100px'
          },
        }
      ]
    },
    {
      module: 'rda/administracion/campanas/plan_ahorro',
      jerar: 'UNI_1',//'F,T,R,M,C',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { var: 21, sem: 0 },
          style: {
            width_gt_xs_v: '9%'
          },
          content: {
            higher: '<h2 class="title-module">CAMPAÑA PLAN AHORRO</h2>'
          }
        }
      ]
    },
    {
      module: 'R_APADRINA', //'rda/administracion/campanas/apadrinamiento',
      //jerar: 'F,T,R',
      jerar: 'UNI_1', //'F,CT,CC',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: {fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Apadrinamiento Tramo 1-30</h2>' 
          }
        }
      ]
    },
    {
      module: 'RS_CAL_CAR',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CALIDAD DE CARTERA</h2><b>Expresado en PEN</b>'
          }
        },
        {
          id: '_02',
          width: '140%',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<b>Expresado en PEN y %</b>'
          }
        }
      ],
      graphic: [
        {
          id: '_03',
          theme: theme_gp1(),
          config: {
            isSubtitle: false
          }
        }
      ]
    },
    {
      /*module: 'rda/administracion/mora/cero_cuota',
      jerar: 'F,T,R,M,C',*/
      module: 'CEROYCUOTA',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CERO CUOTA</h2>'
          },
          style: {
            width_gt_xs_v: '8%'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">UNA CUOTA</h2>',
            lower: '<b>a: </b>Var. del número de operaciones, respecto al cierre del mes anterior.<br><b>b: </b>Var. del porcentaje de participación del total de créditos, respecto al cierre del mes anterior.'
          },
          style: {
            width_gt_xs_v: '14.5%'
          }
        }
      ]
    },
    {
      /*module: 'rda/administracion/mora/portafolio_supervision',
      jerar: 'F,T,R,M,C',*/
      module: 'PORTSUPE',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PORTAFOLIOS Y SUPERVISIÓN</h2><b>Expresado en PEN y %</b>',
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<b>Expresado en PEN y %</b>',
          }
        }
      ]
    },
    {
      //module: 'rda/administracion/mora/efectividad_recuperacion',
      //jerar: 'F,T,R,M,C',
      module: 'EfecRecTramos',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">EFECTIVIDAD DE RECUPERACION POR TRAMOS</h2><b>Expresado en PEN y %</b>',
            lower: '<b>* Ingresos de Gestión: Clientes con registro de gestiones en el tramo de 1 a 30 días</b><br>' +
              '<b>** Cobertura: Cobertura de clientes gestionados en el tramo de 1 a 30 días</b>'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/captaciones/captacion_canal',
      //jerar: 'F,T,R,M,C',
      jerar:'OFI_1',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CAPTACIONES RED</h2><b>Expresado en PEN y %</b>',
            lower: '<b>a:</b> Variación con respecto al cierre del mes anterior.<br>' +
              '<b>b:</b> Variación fecha actual con respecto al mismo día del mes anterior.<br>' +
              '<b>c:</b> Variación de la TAPP Mes con respecto al cierre del mes anterior en puntos básicos.<br>' +
              '<b>d:</b> Variación de la TAPP Stock con respecto al cierre del mes anterior en puntos básicos.'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/seguros/seguros',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">POLIZAS DE SEGUROS</h2>',
          }
        }
      ]
    },
    {
      module: 'rda/administracion/captaciones/captaciones_asesor',
      //jerar: 'F,T,R,M,C',
      //jerar: 'UNI_1',
      jerar: 'OFI_1',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CAPTACIONES</h2><b>Expresado en PEN y %</b>',
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<b>Saldo Medio de Ahorros</b>',
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">AHORRO PROGRAMADO</h2>',
          }
        }
      ]
    },
    {
      module: 'rda/administracion/captaciones/captacion_tesoreria',
      jerar: 'F,T,R,M,C',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CAPTACIONES TESORERIA</h2><b>Expresado en PEN y %</b>',
            lower: '<b>a:</b> Variación con respecto al cierre del mes anterior.<br><b>b:</b> Variación fecha actual con respecto al mismo día del mes anterior.<br><b>c:</b> Variación de la TAPP Mes con respecto al cierre del mes anterior en puntos básicos.<br><b>d:</b> Variación de la TAPP Stock con respecto al cierre del mes anterior en puntos básicos.'
          }
        }
      ]
    },
    {
      //module: 'rda/administracion/clientes/cli_ope',
      module: 'Clientes_Ope',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES Y OPERACIONES</h2>'
          },
          style: {
            width_gt_xs_v: '10.5%'
          }
        }
      ]
    },
    {
      //module: 'rda/administracion/clientes/cli_nu_rec',
      module: 'Clientes_nuevoRec',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES NUEVOS Y RECURRENTES</h2>',
            lower: '<b>Cliente Nuevo:</b> Cliente que desde Enero 2007 no registra ninguna operación de crédito en FC.<br><b>Cliente Recurrente:</b> Cliente que ya ha tenido una operación de crédito en FC.'
          }
        }
      ]
    },
    {
     // module: 'avance/monitor_metas_desembolso',
      module:'Monitor_Dese',
      //jerar: 'F,T,R,M,C',
      //jerar: 'F,CT,CC,CA',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { tipmet: 1 },
          content: {
            higher: '<h1><b class="hidden" > Fecha: :$fecha :$hora </b></h1>' +
              '<div class="wrap">' +
              '<div class="box"><h2><b>Operaciones Desembolsadas</b></h2></div>' +
              '<div class="box"><h2><b>Cumplimiento de Meta:</b></h2></div>' +
              '<div class="box"><h1 class=":$style_cumpl_des_acum hidden"><b>:$cumpl_des_acum</b></h1></div>' +
              '</div>'
          },
          style: {
            width_gt_xs_v: '11%'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { tipmet: 1 },
          content: {
            higher: '<div class="wrap">' +
              '<div class="box"><h2><b>Monto Desembolsado</b></h2></div>' +
              '<div class="box"><h2><b>Cumplimiento de Meta:</b></h2></div>' +
              '<div class="box"><h1 class=":$style_cumpl_ope_acum hidden"><b>:$cumpl_ope_acum</b></h1></div>' +
              '</div>'
          },
          style: {
            width_gt_xs_v: '11%'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { tipmet: 1 },
          style: {
            width_gt_xs_v: '34%'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          style: {
            width_gt_xs_v: '17%'
          }
        }
      ]
    },
    {
      // module: 'avance/monitor_metas_desembolso',
       module:'Monitor_Dese_misi',
       //jerar: 'F,T,R,M,C',
       //jerar: 'F,CT,CC,CA',
       jerar: 'UNI_1',
       reportType: ReportType.REGULAR,
       filter: [{ ...SPRODUCTOMISI(), ...{ variable: 'prod' } }],
       table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { tipmet: 1 },
           
          style: {
            width_gt_xs_v: '11%'
          }
        }  
        ,{
           id: '_01',
           theme: theme_tb1(),
           params: { tipmet: 1 },
           content: {
             higher: '<h1><b class="hidden" > Fecha: :$fecha :$hora </b></h1>' +
               '<div class="wrap">' +
               '<div class="box"><h2><b>Operaciones Desembolsadas</b></h2></div>' +
               '<div class="box"><h2><b>Cumplimiento de Meta:</b></h2></div>' +
               '<div class="box"><h1 class=":$style_cumpl_des_acum hidden"><b>:$cumpl_des_acum</b></h1></div>' +
               '</div>'
           },
           style: {
             width_gt_xs_v: '11%'
           }
         } 
       ]
     },
    {
      module: 'RS_MON_REP',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      filter: [{ ...GCOVID_OPT01(), ...{ variable: 'car' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<div class="wrap">' +
              '</div>'
          },
          style: {
            width_gt_xs_v: '11%'
          }
        }
      ]
    },

    {
      //module: 'rda/administracion/captaciones/captacion_BP',
      //jerar: 'F,B,T,R,M',
      module: 'CaptaBP',
      jerar: 'F,B,CT,CC,AH',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">BANCA PREFERENTE</h2><b>Expresado en PEN y %</b>',
            lower: '<b>a:</b> Variación con respecto al cierre del mes anterior.<br><b>b:</b> Variación de la TAPP Mes con respecto al cierre del mes anterior en puntos básicos.<br><b>c:</b> Variación de la TAPP Stock con respecto al cierre del mes anterior en puntos básicos.'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/cartera/cmg_cartera',
      //jerar: 'F,T,R,M',
      //jerar: 'F,CT,CC,CA',
      jerar: 'UNI_1',
      filter: [{ ...FAE_OPT01(), ...{ variable: 'car' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CARTERA</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>'
          }
        }
      ]
    },
    {
      module: 'cmg_mora_simp',//'rda/administracion/mora/cmg_mora',
      //jerar: 'F,T,R,M',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">MORA SIN IMPULSO</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>' +
              '<b>El gasto de provisión no incluye provisiones voluntarias.</b>'
          }
        }
      ]
    },
    
    {
      module: 'cuadro_Variable_Riesgo',//'rda/administracion/mora/cmg_mora',
      //jerar: 'F,T,R,M',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">MORA</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>' +
              '<b>El gasto de provisión no incluye provisiones voluntarias.</b>'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/clientes/cmg_cliente',
      //jerar: 'F,T,R,M',
      //module: 'CMGCLIENTES',
      jerar: 'UNI_1',
      //reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">STOCK DE CLIENTES</h2>',
            lower: '<b>El mes en curso se compara con el último RCC disponible.</b><br>'+
              '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/captaciones/cmg_captacion',
      //jerar: 'F,T,R,M',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CAPTACIONES</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil &rarr;</b> Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil &rarr;</b> Var. fecha actual vs. mismo día del año anterior.'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/seguros/cmg_seguros',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">SEGUROS</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>* Total Seguros &rarr;</b> Seguros Multiriesgo Pyme + Protección de Cuota + Múltiple Crédito; no incluye desgravamen.<br>' +
              '<b>TMM - Tasa Mensual Móvil &rarr;</b> Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil &rarr;</b> Var. fecha actual vs. mismo día del año anterior.'
          }
        }
      ]
    },
    {
      module: 'GSREVA',
      table: [
        {
          id: '01',
          theme: theme_tb1(),
          params: { Fecha: fec_day_ult, tipcod: 11, codmod: 3 },
          content: {
            higher: '<h2 class="title-module">REMUNERACIÓN VARIABLE AL ' + Moments().add(-1, 'days').format("YYYY/MM/DD") + '</h2>',
            lower: '"Esta es una herramienta de apoyo para el seguimiento de las variables, no define la comisión a pagar."'
          },
          style: {
            width_gt_xs_v: '15.5%'
          }
        }
      ]
    },
    {
      module: 'GSREVA1',
      table: [
        {
          id: '01',
          theme: theme_tb1(),
          params: { Fecha: fec_day_ult, tipcod: 12, codmod: 4 },
          content: {
            higher: '<h2 class="title-module">REMUNERACIÓN VARIABLE AL ' + Moments().add(-1, 'days').format("YYYY/MM/DD") + '</h2>',
            lower: '"Esta es una herramienta de apoyo para el seguimiento de las variables, no define la comisión a pagar."'
          },
          style: {
            width_gt_xs_v: '15.5%'
          }
        }
      ]
    },
    {
      module: 'GSREVA2',
      table: [
        {
          id: '01',
          theme: theme_tb1(),
          params: { Fecha: fec_day_ult, tipcod: 9, codmod: 5 },
          content: {
            higher: '<h2 class="title-module">REMUNERACIÓN VARIABLE AL ' + Moments().add(-1, 'days').format("YYYY/MM/DD") + '</h2>',
            lower: '"Esta es una herramienta de apoyo para el seguimiento de las variables, no define la comisión a pagar."'
          },
          style: {
            width_gt_xs_v: '15.5%'
          }
        }
      ]
    }
    ,
    {
      module: 'RSRTOPV',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        { 
          id: '01',
          theme: theme_tb1(),
          params: { tip_cod2: '7', level: '2' },
          content: {
            higher: '<h2 class="title-module">RANKING VARIABLES DE RIESGOS AL <span class="hidden">:$fecha</span></h2>' +
              '<h2 class="title-module">TOP GRUPO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '01',
          theme: theme_tb1(),
          params: { tip_cod2: '20', level: '1' },
          content: {
            higher: '<h2 class="title-module">TOP CORREDORES</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '01',
          theme: theme_tb1(),
          params: { tip_cod2: '18', level: '1' },
          content: {
            higher: '<h2 class="title-module">TOP UNIDADES</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }
      ]
    },
    {
      module: 'PANEL_SUP',
      jerar: 'UNI_1',
      table: [
        {
          id: '_01',
          theme: theme_tb1()
        },
        {
          id: '_01',
          theme: theme_tb1()
        },
        {
          id: '_02',
          theme: theme_tb1()
        },
        {
          id: '_04',
          theme: theme_tb1(),
          content: {
            lower: '<b>Operación pendiente de supervisión </b><br>- Operaciones >= 50 mil (Nuevo y recurrente) </b> <br>- Operaciones >= 30  y < 50 mil (Nuevos).'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          content: {
            lower: '<b>Operación pendiente de supervisión </b><br>- Operaciones >= 50 mil (Nuevo y recurrente) </b> <br>- Operaciones >= 30  y < 50 mil (Nuevos).'
          }
        },
        {
          id: '_05',
          theme: theme_tb1(),
          content: {
            lower: '<b>Operación pendiente de supervisión </b><br>- Operaciones >= 50 mil (Nuevo y recurrente) </b> <br>- Operaciones >= 30  y < 50 mil (Nuevos).'
          }
        }
      ]
    },
    {
      module: 'GSCASEG',
      jerar: 'F,T,R,M,C',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Seguimiento Campaña de Seguros</h2>'
          }
        }

      ]
    },
    {
      module: 'GSMODAGEN',
      jerar: 'F,T,R,M,C',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Módulo de Agendamiento</h2>'
          }
        }

      ]
    },
    {
      module: 'GRESCAMIMP',
      jerar: 'F,T,R,M',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Campaña Imparables</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">RANKING DE AGENCIAS</h2>'
          }
        }

      ]
    },
    {
      module: 'GREPORCORRE',
      jerar: 'OFI_2',
      reportType: ReportType.REGULAR,
      graphic: [
        {
          id: '_01',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        }
        ,
        {
          id: '_02',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        },
        {
          id: '_03',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        },
        {
          id: '_04',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        }
      ],
      table: [
        {
          id: '_01',
          params: { fecha: fec_day_ult },
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module"></h2>'
          }
        }
        ,
        {
          id: '_05',
          params: { fecha: fec_day_ult },
          theme: theme_tb1(),
        }
      ]
    },
    {
      module: 'GCORRETTER',
      jerar: 'OFI_1',
      reportType: ReportType.REGULAR,
      graphic: [
        {
          id: '_02',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        }
      ],
      table: [
        {
          id: '_01',
          params: { fecha: fec_day_ult },
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module"></h2>'
          }
        }
      ]
    },
    {
      module: 'GRESCONDO',
      //jerar: 'F,T,R,M',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      filter: [VariableMontoMotivo(), VariableStock()],
      table: [
        {
          id: '_03',
          theme: theme_tb1(),
          params: {  fec: fec_day_ult,niveles: 1 },
          content: {
            higher: '<h2 class="title-module">REPORTE DE CONDONACIONES DIARIO</h2>'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { fec: fec_day_ult,niveles: 3 }
        }
      ]
    },
    {
      module: 'CAP_SEGUI_RED',
      jerar: 'F,T,R,M',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">SEGUIMIENTO CAPTACIONES RED</h2>'
          }
        }
      ]
    },
    {
      module: 'CAP_SEGUI_BP',
      jerar: 'OFI_3',//'F,B,CT,CC,CG,CA', //'F,B,T,R,M',
      reportType: ReportType.REGULAR,
      filter: [varProducto()],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: {  fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">SEGUIMIENTO CAPTACIONES BANCA PREFERENTE</h2>'
          }
        }
      ]
    },
    {
      module: 'CAP_SEGUI_FC_BP',
      jerar: 'OFI_3',//'F,B,CT,CC,CG,CA', //'F,B,T,R,M',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: {  fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">Gestión Red de Agencias</h2>'
          }
        }
      ]
    },
    {
      module: 'LST_AUT',
      jerar: 'OFI_2',
      reportType: ReportType.REGULAR,
      filter: [Autonomia()],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { c_aut: 0 },
          content: {
            higher: '<h2 class="title-module">AUTONOMÍAS GERENTE</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { c_aut: 1 },
          content: {
            higher: '<h2 class="title-module">AUTONOMÍAS ADMINISTRADOR</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { c_aut: 2 },
          content: {
            higher: '<h2 class="title-module">AUTONOMÍAS COORDINADOR</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { c_aut: 3 },
          content: {
            higher: '<h2 class="title-module">AUTONOMÍAS ASESORES</h2>'
          }
        }
      ]
    },
    {
      module: 'GRSCMIS',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Resumen</h2>'
          }
        }
        ,
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Detalle por asesor</h2>',
            lower: '<b> * No se incluyen desembolsos FAE</b><br>'

          }
        }
        /*,
        {
          id: '_03',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Resumen Pasivos</h2>'
          }
        } */
        ,
        {
          id: '_04',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Meta Por Producto</h2>'
          }
        },
        {
          id: '_05',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Detalle</h2>'
          }
        }

      ]
    },
    {
      module: 'PAN_CEUN_CUO',
      jerar: 'F,T,R,M',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Cero Cuotas</h2>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Una Cuota</h2>'
          }
        }
      ]
    },
    {
      module: 'GCMGCAP',
      jerar: 'OFI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CMG Captaciones - Agencias</h2>'
          }
        }
      ]
    },
    {
      module: 'DESEMBOLSOS',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">DESEMBOLSOS SIN FAE NI REACTIVA</h2>'
          }
        }
      ]
    },
    {
      module: 'SEG_AGRO',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">SEGUROS</h2>'
          }
        }
      ]
    },
    {
      module: 'AGRO',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">AGRO</h2>'
          }
        }
      ]
    },
    {
      module: 'Clientes',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES</h2>'
          }
        }
      ]
    },
    {
      module: 'PDM',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PDM</h2>'
          }
        }
      ]
    },
    {
      module: 'Pasivo',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PASIVOS</h2>'
          }
        }
      ]
    },
    {
      module: 'COSELISTADO',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_3(), ...{ variable: 'fec' } }, Productos01(), SubProducto01(), Maduracion01()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">LISTADO DE COSECHAS</h2>'
          }
        }
      ]
    },
    {
      module: 'COSESEMAFORO',
      jerar: 'UNI_1',
      filter: [Productos01(), SubProducto01(), Maduracion01(), Tipo03()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">SEMAFORO COSECHAS</h2>'
          }
        }
      ]
    },
    {
      module: 'PRECOSELISTADO',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_3(), ...{ variable: 'fec' } }, Productos01(), SubProducto01()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">LISTADO DE PRE COSECHAS</h2>'
          }
        }
      ]
    },
    {
      module: 'PRECOSECUADRO',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_3(), ...{ variable: 'fec' } }, Productos01(), SubProducto01()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_03',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CUADRO PRE COSECHAS</h2>'
          }
        }
      ]
    },
    {
      module: 'GLISAUTRO',
      jerar: 'F',
      filter: [CargoAutonomia()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_04',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">AUTONOMIAS</h2>'
          }
        }
      ]
    },
    {
      module: 'cmg_mora_simp_m',//'rda/administracion/mora/cmg_mora',
      //jerar: 'F,T,R,M',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(), 
          content: {
            higher: '<h2 class="title-module">MORA SIN IMPULSO</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>' +
              '<b>El gasto de provisión no incluye provisiones voluntarias.</b>'
          }
        }
      ]
    },
    {
      module: 'cuadro_Variable_M',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">MORA</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>' +
              '<b>El gasto de provisión no incluye provisiones voluntarias.</b>'
          }
        }
      ]
    },
    {
      module: 'PLANMOV',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher:'<b>Cascada de filtros aplicados</b></br><b> Periodo: <b>:$Fecha</b>',
            lower: '<b>Fecha de Emisión: <b>:$HFECEMI</b>'
          }
        },
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher:'<b>Planilla de Gastos por movilidad - Asesores</b></br><b> Periodo: <b>:$Fecha</b>',
            lower: '<b>Fecha de Emisión: <b>:$HFECEMI</b>'
          }
        }
      ]
    },
    {
      module: 'resultado_unidad_negocio_rma',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }, SCANALRED()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Estado de Resultados por Unidad de Negocio (PEN Miles)</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'resultado_unidad_negocio_rma_ope',
      //jerar: 'UNI_1',
      jerar: 'OFI_1',
      filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }, SCANALOPE()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Estado de Resultados por Unidad de Negocio (PEN Miles)</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'enrolamiento_desembolso',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">AVANCE APP CLIENTES - CARTERA </h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'enrolamiento_Pasivo',  
      jerar: 'OFI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">AVANCE APP CLIENTES - PASIVOS BP</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'enrolamiento_Pasivo_pas',
      jerar: 'OFI_1',  
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">AVANCE APP CLIENTES - PASIVOS</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    }
    ,
    {
      module: 'enrolamiento_colaboradores',
      jerar: 'OFI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">AVANCE APP CLIENTES - COLABORADORES</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'enrolamiento_Ope',
      jerar: 'OFI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">AVANCE APP CLIENTES - OPERACIONES</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'CMCUONUEV', 
      jerar: 'UNI_1',
      filter: [ VariableProductNIngreso(), VariableNIngreso()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CUADRO DE MANDO</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Cuadro de Mando Tipo Reprogramado vs Producto</h2>'
          }
        }
      ]
    },
    {
      module: 'cuadro_Variable_Riesgo_F',//'rda/administracion/mora/cmg_mora',
      jerar: 'F,CT,CC,CG,CSC,CA',
      filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">MORA</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>' +
              '<b>El gasto de provisión no incluye provisiones voluntarias.</b>'
          }
        }
      ]
    },
    {
      module: 'RMESA',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(),
          content: {
            higher: '<h4 class="title-module">SEGUIMIENTO EFECTIVIDADES SIN ASIGNAR</h4><br>.<br>',
            lower: '<b></b>'
          }
        }
      ]
    },
    {
      module: 'Sec_ciiu',
     jerar: 'UNI_1',
     filter:[GRUPCIIU()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params:{fec:fec_day_ult},
          content:{
            higher:'<h2 class="title-module">Seguimiento Sector </h2>'
          }/*,
          style:{
            width_gt_xs_v:'10%'
          }*/
        }
      ]
    },

    {
      module: 'GCOMCRE',
     jerar: 'UNI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_02',
          theme: theme_tb1(), 
          content:{
            higher:'<h2 class="title-module">Comite de Créditos</h2>'
          }
        }
      ]
    },

    {
      module: 'RESNMOV',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(),
          content: {
            higher: '<h4 class="title-module">RESUMEN DE MOVILIDAD COMERCIAL</h4><br>.<br>',
            lower: '<b></b>' 
          }
        }
      ]
    },
    {
      module: 'RESNMOVR',
      jerar: 'OFI_3', //'UNI_1'
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(), //theme_tb1
          params: { fec: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">RESUMEN DE MOVILIDAD RECUPERACIONES</h4><br>.<br>',
            lower: '<b></b>' 
          }
        }
      ]
    },
    
    {
      module: 'PLANMOVR',
      jerar: 'OFI_3', //'UNI_1'
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(), //theme_tb1
          params: { fec: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">Cascada</h4><br>.<br>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_03',
          theme: theme_tb3(), //theme_tb1
          params: { fec: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">Validos</h4><br>.<br>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_04',
          theme: theme_tb3(), //theme_tb1
          params: { fec: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">Depurados</h4><br>.<br>',
            lower: '<b></b>' 
          }
        }
      ]
    },
     

    {
      module: 'PROYEC_DIACOLREC',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PROYECCION DIARIA POR OPERACIONES</h2><br>.<br>'+
            '<b></b>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PROYECCION DIARIA POR COLOCACIONES</h2>',
            lower: '<b></b>' 
          }
        }/*,
        {
          id: '_03',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">PROYECCION DIARIA POR EFECTIVIDADES</h2>',
          }
        } */
      ]
    },
    {
      module: 'APP_USO',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">USO DEL APP</h2><br>.<br>'+
            '<b>* Toda la información presentada en el siguiente cuadro considera solo las instancias y etapas de flujo de credito </b><br>'+
            '<b>incluyendo comite de crédito por el aplicativo móvil (excluye Bantotal).</b><br>'+
            '<b>** El reporte considera las instancias ingresadas en el mes en curso vs el total de cada etapa del flujo crediticio ingresadas.</b><br>'+
            '<br>',
            lower: '<br>' +
              '<b>Efect Solicitud: Nro. solictudes ingresadas por el app que llegaron a desembolsar.</b><br>' +
              '<b>Efect E/P: Instancias que se envian a E/P por el APP.</b><br>' +
              '<b>Efect envio a Aprob: Instancias que se envian a aprobación por el APP.</b><br>' +
              '<b>Efec Comite: Total de desembolsos Vs instancias ingresadas por el APP con comite cerrados y aprobados.</b><br>' +
              '<b>Efect Firma Electr: Total de solicitudes con marca contratacion Electrónica vs el total de solicitudes ingresadas por el APP.</b><br>'+
              '<b>Desem por Firma Electrónica: Instancias ingresadas por el App con marca contratacion Electrónica Vs total de desembolsos'
          }
        }
      ]
    },
    {
      module: 'SEG_PDM',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          params: { fec: fec_day_ult }, 
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">SEGUIMIENTO PDM</h2><br>.<br>',
            lower: '<br>'
          }
        }
      ]
    },
    {
      module: 'rda/administracion/mora/Dashboard_rda',
      //reportType: ReportType.GRAPHIC,
      jerar: 'UNI_1',
     // params:{fec:fec_day_ult},
     // filter:[{fec:fec_day_ult}],
     //renderDate_Hoy filter:[{fec_day_ult,...{variable:'fec':fec_day_ult}}],
     filter:[{...renderDate_Hoy(),...{variable:'fec'}}],
      graphic: [
        {
          id: '_01',
          //params: { fec: fec_day_ult },
          theme: theme_gp1()         
        }
      ]
    },
    {
      module: 'RMENTORIN',
      jerar: 'UNI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          params: { fec: fec_day_ult }, 
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Mentoring</h2><br>.<br>',
            lower: '<b></b>' 
          }
        }/*,
        {
          id: '_02',
          params: { fec: fec_day_ult}, 
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Creditos Grupales</h2>',
            lower: '<b></b>' 
          }
        }*/
      ]
    },
    {
      module: 'CEROCUOTA_TOPCNUEVA',
      jerar: 'UNI_1', //jerar: 'F,CT,CC',
      filter: [VariableNIngreso()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { tip_cod2: '20',fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">TOP 10 TERRITORIO CON MAYOR SALDO CERO CUOTAS</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_01',
          theme: theme_tb1(),
          params: { tip_cod2: '18', fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">TOP 10  UNIDAD CON MAYOR SALDO CERO CUOTAS</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { tip_cod2: '20',fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO NRO CERO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_02',
          theme: theme_tb1(),
          params: { tip_cod2: '18', fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD NRO CERO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { tip_cod2: '20',fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO SALDO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_03',
          theme: theme_tb1(),
          params: { tip_cod2: '18', fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD SALDO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          params: { tip_cod2: '20',fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO SALDO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_04',
          theme: theme_tb1(),
          params: { tip_cod2: '18', fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD SALDO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_05',
          theme: theme_tb1(),
          params: { tip_cod2: '20',fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO NUMERO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_05',
          theme: theme_tb1(),
          params: { tip_cod2: '18', fec: fec_day_ult},
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD NUMERO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }
      ]
    },
    {
      module: 'RPROGOB',
      jerar: 'UNI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          params: { fec: fec_day_ult,var:1}, 
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Cartera Programas del Gobierno</h2>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_02',
          params: { fec: fec_day_ult,var:2}, 
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Última Calificación RCC - Clientes Programas del Gobierno*</h2>',
            lower: '<b></b>*La fecha de Clasificación RCC tiene un desfase de un mes' 
          }
        },
        {
          id: '_03',
          params: { fec: fec_day_ult,var:1},           
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Cartera sin Programas del Gobierno</h2>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_04',
          params: { fec: fec_day_ult,var:2},           
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Última Calificación RCC - Clientes sin Programas del Gobierno*</h2>',
            lower: '<b></b>*La fecha de Clasificación RCC tiene un desfase de un mes'
          }
        }
      ]
    }, {
      module: 'RPROGOB_M',
      jerar: 'UNI_1',      
      filter: [{...renderDates_3(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          params: { var:1},           
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Cartera Programas del Gobierno</h2>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_02',
          params: { var:2},           
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Última Calificación RCC - Clientes Programas del Gobierno*</h2>',
            lower: '<b></b>*La fecha de Clasificación RCC tiene un desfase de un mes'
          }
        },
        {
          id: '_03',
          params: { var:1},           
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Cartera sin Programas del Gobierno</h2>',
            lower: '<b></b>' 
          }
        },
        {
          id: '_04',
          params: { var:2},           
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Última Calificación RCC - Clientes sin Programas del Gobierno*</h2>',
            lower: '<b></b>*La fecha de Clasificación RCC tiene un desfase de un mes'
          }
        }
      ]
    },
    {
      module: 'LCCUOTANUEVA',
      jerar: 'UNI_1',
      filter: [VariableNIngresoD()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(),
          content: {
            higher: '<h4 class="title-module">BASE DE GESTION CERO CUOTAS NUEVO INGRESO</h4><br>.<br>',
            lower: '<b></b>'
          }
        }
      ]
    },
    {
      module: 'TABDIG', 
      jerar: 'OFI_1',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'DESCRED', 
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Seguimiento de Destino de Crédito</h2>',
            lower: '<b>1. Crédito mayor o igual a S/ 30,000</br>2. Créditos Agrícolas a una sola cuota mayor o igual a S/.20,000. </br> 3. Todos los productos construyendo confianza </br> 4. No aplica a Créditos destinados a Compra de Deuda o Créditos Grupales</b>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'CEROCUOTA_TOPCNUEVA_M',
      jerar: 'UNI_1',//jerar: 'F,CT,CC',
      filter: [{...renderDates_3(),...{variable:'fec'}},VariableNIngreso()],
//      filter: [{...VariableNIngreso(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { tip_cod2: '20' },
          content: {
            higher: '<h2 class="title-module">TOP 10 TERRITORIO CON MAYOR SALDO CERO CUOTAS</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_01',
          theme: theme_tb1(),
          params: { tip_cod2: '18'},
          content: {
            higher: '<h2 class="title-module">TOP 10  UNIDAD CON MAYOR SALDO CERO CUOTAS</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { tip_cod2: '20'},
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO NRO CERO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_02',
          theme: theme_tb1(),
          params: { tip_cod2: '18' },
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD NRO CERO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { tip_cod2: '20' },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO SALDO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_03',
          theme: theme_tb1(),
          params: { tip_cod2: '18' },
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD SALDO CUOTAS NUEVO INGRESO - TIPO PRODUCTO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          params: { tip_cod2: '20'  },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO SALDO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_04',
          theme: theme_tb1(),
          params: { tip_cod2: '18' },
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD SALDO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        },
        {
          id: '_05',
          theme: theme_tb1(),
          params: { tip_cod2: '20' },
          content: {
            higher: '<h2 class="title-module">TOP 5 TERRITORIO NUMERO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }, {
          id: '_05',
          theme: theme_tb1(),
          params: { tip_cod2: '18' },
          content: {
            higher: '<h2 class="title-module">TOP 5  UNIDAD NUMERO CUOTAS NUEVO INGRESO - TIPO REPRO</h2>'
          },
          style: {
            width_gt_xs_v: '80px'
          }
        }
      ]
    },
    {
      module: 'GREPROSPCORRE',
      jerar: 'OFI_2',
      reportType: ReportType.REGULAR,
      graphic: [
        {
          id: '_01',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        }
        ,
        {
          id: '_02',
          params: { fecha: fec_day_ult },
          theme: theme_tb1(),//theme_gp1(),
        },
         {
           id: '_03',
           params: { fecha: fec_day_ult },
           theme: theme_tb1(),
         },
        {
          id: '_04',
          params: { fecha: fec_day_ult },
          theme: theme_gp1(),
        }
      ],
      table: [
        {
          id: '_01',
          params: { fecha: fec_day_ult },
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module"></h2>'
          }
        } 
        ,
        {
          id: '_05',
          params: { fecha: fec_day_ult },
          theme: theme_tb1(),
        }
      ]
    },
    //
    {
      module: 'GRAFSEGPAS',
      jerar: 'OFI_2',
      //filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }],
      reportType: ReportType.REGULAR,
      graphic: [
        {
          id: '_01',
          params: { fec: fec_day_ult },
          theme: theme_gp1(),
        }
         
      ] 
    },
    //
    {
      module: 'reporte_autonomia_new',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(), 
          //params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Reporte de Autonomías por Tasas</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'reporte_autonomia_newdiaria',    
      jerar: 'UNI_1',
      //filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(), 
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Reporte de Autonomías por Tasas</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    }
    ,
    {
      module: 'CONT_ELECT_M',
      jerar: 'UNI_1',
      filter: [{...renderDates_3(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Desembolsos habilitados para posible contratación electrónica*</h2>',
            lower: '<b>* Créditos individuales hasta S/. 20 mil</b>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Desembolsos por contratación electrónica</h2>'
          }
        },
        {
          id: '_03',
          theme: theme_tb1(),
          content: {  
            higher: '<h2 class="title-module">Participación de contratación electrónica en  desembolsos habilitados de CE</h2>'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Participación de contratación electrónica en desembolsos totales</h2>'
          }
        }
      ]
    },
    {
      module: 'P_Datos',
      jerar: 'UNI_1',
      filter: [{...renderDates_3(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01',
          theme: theme_tb1(),
           
        }
      ]
    },
    {
      module: 'CMG_CLIF',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          params: { fec: fec_day_ult },
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES FLUJO</h2>',
            lower: '<b>Los datos de Bancarización se compara con el último RCC disponible a la fecha.</b><br>'+
            '<b>Los datos de Vulnerabilidad se muestran de acuerdo a las cargas enviadas por FMBBVA.</b><br>'+
              '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' 
          }
        }
      ]
    },
    {
      module: 'DESEMP_SOC',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">DESEMPEÑO SOCIAL</h2>',
            lower: '<b>Los datos de Bancarización se compara con el último RCC disponible a la fecha.</b><br>'
          }
        }
      ]
    },
    {
      module: 'DESEMP_SOC_PAS',
      jerar: 'OFI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">DESEMPEÑO SOCIAL PASIVO</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'RESINCGRUP',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(),
          content: {
            higher: '<h4 class="title-module">Incentivos PDM</h4><br>.<br>',
            lower: '<b></b>' 
          }
        }
      ]
    },
    {
      module: 'RACTGP',
      jerar: 'UNI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Activas PDM</h2>' 
          }
        }
      ]
    },
    {
      module: 'RESMORAGP',
      jerar: 'UNI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Mora PDM</h2>' 
          }
        }
      ]
    },
    {
      module: 'rankKay',
      jerar: 'UNI_1',//'OFI_3',//jerar: 'UNI_1',
      filter: [{...renderDates_4(),...{variable:'fec'}},{...Terr01(), ...{ variable: 'Ter' }}],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01', 
          theme: theme_tb1(),
           
        }
      ]
    },
    {
      module: 'rankKayOpe',
      jerar: 'UNI_1',//'OFI_3',//jerar: 'UNI_1',
      filter: [{...renderDates_4(),...{variable:'fec'}},{...Terr01(), ...{ variable: 'Ter' }}],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01', 
          theme: theme_tb1(),
           
        }
      ]
    },
    {
      module: 'rankKayrecu',
      jerar: 'UNI_1',//'OFI_3',//jerar: 'UNI_1',
      filter: [{...renderDates_4(),...{variable:'fec'}},{...Terr01(), ...{ variable: 'Ter' }}],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01', 
          theme: theme_tb1(),
           
        }
      ]
    },
    {
      module: 'INCEN_PDM',
      jerar: 'UNI_1', 
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Resumen Incentivos PDM</h2>' 
          }
        } 
      ]
    },
    {
      module: 'DET_INCEN_PDM',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(),
          params: { fecha: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">Desembolsos PDM</h4><br>.<br>',
            lower: '<b></b>'
          }
        }
      ]
    },
    {
      module: 'CARACT_CARTERA',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      filter: [{ ...SPRODUCTO(), ...{ variable: 'prod' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(), 
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Captación por Canal Comercial</h2>',
            lower: '<b></b><br>' +
            '<b>TFM - Tendencia de Frecuencia Mensual &rarr;</b> Var. fecha actual vs. fin de mes anterior.<br>' +
            '<b>VAR. Clientes - Variación Clientes &rarr;</b> Var. fecha actual vs. fin de mes anterior.'
          }
        } 
      ]
    },
    {
      module: 'CARACT_pas',
      jerar: 'MAC_2',
      reportType: ReportType.REGULAR,
      filter: [{ ...SPRODUCTO(), ...{ variable: 'prod' } },Segmento()],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: { 
            higher: '<h2 class="title-module">Captación por Canal Operaciones</h2>',
            lower: '<b></b><br>' +
            '<b>TFM - Tendencia de Frecuencia Mensual &rarr;</b> Var. fecha actual vs. fin de mes anterior.<br>' +
            '<b>VAR. Clientes - Variación Clientes &rarr;</b> Var. fecha actual vs. fin de mes anterior.'
          }
        } 
      ]

    },
    {
      module: 'TB_PANEL_OPE',
      jerar: 'MAC_2',
      reportType: ReportType.REGULAR,
      filter: [{ ...SPRODUCTO_(), ...{ variable: 'prod' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: { 
            higher: '<h2 class="title-module">Panel Operaciones</h2>',
            lower: '<b></b><br>' +
           '<b>Panel Gestión RED ( Excluido JP).<br>'+
            '<b>TPPP Mes DPF ( Excluido Renovaciones Automáticas).' 
          }
        } ,
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: { 
            higher: '<h2 class="title-module">Panel Operaciones</h2>',
            lower: '<b></b><br>' +
           '<b>Panel Gestión RED ( Excluido JP).<br>'+
            '<b>TPPP Mes DPF ( Excluido Renovaciones Automáticas).' 
          }
        } 
      ]

    },
    {
      module: 'RECSERV_PAS',
      jerar: 'MAC_2',
      reportType: ReportType.REGULAR,
      //filter: [{ ...SPRODUCTO(), ...{ variable: 'prod' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: { 
            higher: '<h2 class="title-module">Recaudo de servicios</h2>',
            
          }
        } 
      ]

    },
    {
      module: 'HCARBONO',
      jerar: 'OFI_2',  
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(), //theme_tb1
          params: { fec: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">Huella Carbono</h4><br>.<br>',
            lower: '<b></b>' 
          }
        } 
      ]
    },
    {
      module: 'CARACT_pas_M',
      jerar: 'MAC_2',
      reportType: ReportType.REGULAR,
      filter: [{...renderDates_1(),...{variable:'fec'}},{ ...SPRODUCTO(), ...{ variable: 'prod' } },Segmento()],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          //params: { fec: fec_day_ult },
          content: { 
            higher: '<h2 class="title-module">Captación por Canal Operaciones</h2>',
            lower: '<b></b><br>' +
            '<b>TFM - Tendencia de Frecuencia Mensual &rarr;</b> Var. fecha actual vs. fin de mes anterior.<br>' +
            '<b>VAR. Clientes - Variación Clientes &rarr;</b> Var. fecha actual vs. fin de mes anterior.'
          }
        } 
      ]

    },
    {
      module: 'CARACT_CARTERA_M',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      filter: [{...renderDates_1(),...{variable:'fec'}},{ ...SPRODUCTO(), ...{ variable: 'prod' } }],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          //params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">Captación por Canal Comercial</h2>',
            lower: '<b></b><br>' +
            '<b>TFM - Tendencia de Frecuencia Mensual &rarr;</b> Var. fecha actual vs. fin de mes anterior.<br>' +
            '<b>VAR. Clientes - Variación Clientes &rarr;</b> Var. fecha actual vs. fin de mes anterior.'
          }
        } 
      ]

    },
    {
      module: 'TABDIG_VR2', 
      jerar: 'MAC_2',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    },
    {
      module: 'TABDIG_VR2_COM', 
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    },  
    {
      module: 'GCTABDIG_VR2_OPE',  
      jerar: 'MAC_2',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    },
    {
      module: 'GCTABDIG_VR2_COM', 
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_03',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    },
    {
      module: 'RVIUWGCOR', 
      jerar: 'OFI_1',
      filter: [TIPOAgenteC()],
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    },
    {
      module: 'RVIUWGCORE', 
      jerar: 'OFI_1',
      filter: [TIPOAgenteC()],
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    },
    {
      module: 'CMG_CLI_PAS',  
      jerar: 'OFI_1',
      filter: [TipoVariable()],  
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CMG CLIENTES PASIVO</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'CMG_CLI_PAS_STOCK',  
      jerar: 'OFI_1',
      //filter: [TipoVariable()],  
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CMG CLIENTES PASIVO STOCK</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'CMG_CLI_PAS_DETA',  
      jerar: 'OFI_1',
      filter: [TipoVariable(),TipoGrupo()],  
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module">CMG CLIENTES PASIVO DETALLE</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },
    {
      module: 'RDETCORR',
      jerar: 'OFI_1',
      filter: [TipoTransaccion()],  
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb3(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h4 class="title-module">Detalle Corresponsal</h4><br>.<br>',
            lower: '<b></b>'
          }
        }
      ]
    },
    {
      module: 'RS_RETE', 
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR, 
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { fec: fec_day_ult },
          content: {
            higher: '<h2 class="title-module"></h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        } 
      ]
    }
  ]


  return conf.find(r => r.module == module);
}



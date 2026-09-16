import { theme_tb1, theme_tb2, theme_gp1, theme_gp2,theme_gp3 } from '../../../support/common/theme.module';
import { renderDates_1, Variable01, Categoria01, VariableMontoMotivo, VariableStock, FAE_OPT01, renderDates_3, Productos01, SubProducto01, Maduracion01, Tipo03, PREMaduracion01, CargoAutonomia, SCANALRED, SCANALOPE, Tipo02, Tipo01, Canal01, VariableNIngreso, renderDates_4, renderDates_2, SCARGAAMBIENTAL, SPRODUCTO, Segmento, varProducto } from '../../../support/common/filter-locale.module';
import { ReportType } from '../../../support/data/ant-mod-rep.service';

export function cra(module: string) {
  let conf = [
    {
      module: 'rma/administracion/Seguros/ingreso_ventas_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Mora/brecha_inversion_mora_rma',
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Riesgos/grafico_cosechas',
      jerar: 'UNI_1',
      filter:[Productos01(),SubProducto01(),Maduracion01(),Tipo03()],
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/mora/Dashboard_rma',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Rentabilidad/rentabilidad_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp2(),
        }
      ]
    },
    {
      module: 'rma/Administracion/GestionPersonas/gestion_personas_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Seguros/seguros_polizas_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Captaciones/captacion_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_1',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Mora/mora_efectividad_tramos_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'UNI_1',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Cartera/tasa_producto_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Clientes/clientes_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'UNI_1',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Cartera/cancelaciones_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      jerar: 'OFI_2',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ],
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          content:{
            higher:'<h2 class="title-module">CARTERA POR SECTOR ECONÓMICO</h2><b>EXPRESADO EN MILLONES PEN:</b>'
          }
        },
      ]
    },
    {
      module: 'rma/administracion/Cartera/cartera_producto_rma',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      //jerar: 'OFI_2',
      jerar: 'UNI_1',
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ],
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          content:{
            higher:'<h2 class="title-module">CARTERA POR PRODUCTO</h2><b>EXPRESADO EN MILLONES PEN:</b>'
          }
        },
      ]
    },
    {
      module: 'resultado_unidad_negocio_rma', 
     jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}},SCANALRED()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content:{
            higher:'<h2 class="title-module">Estado de Resultados por Unidad de Negocio (PEN Miles)</h2>'
          },
          style:{
            width_gt_xs_v:'10%'
          }
        }
      ]
    },

    {
      module: 'reporte_autonomia_new',
      jerar: 'UNI_1',
      filter: [{ ...renderDates_1(), ...{ variable: 'fec' } }],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Ranking de Autonomía de Tasas</h2>'
          },
          style: {
            width_gt_xs_v: '10%'
          }
        }
      ]
    },

    {
      module: 'resultado_unidad_negocio_rma_ope',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}},SCANALOPE()],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content:{
            higher:'<h2 class="title-module">Estado de Resultados por Unidad de Negocio (PEN Miles)</h2>'
          },
          style:{
            width_gt_xs_v:'10%'
          }
        }
      ]
    },
    {
      module: 'rma/administracion/Cartera/productividad_critica_rma',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content:{
            higher:'<h2 class="title-module">PRODUCTIVIDAD CRÍTICA</h2><b>RESUMEN NRO. ASESORES CON PRODUCTIVIDAD CRÍTICA</b>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          content:{
            higher:'<b>EVOLUTIVO DE ASESORES CON PRODUCTIVIDAD CRÍTICA</b>',
            lower:'La productividad es crítica cuando el cumplimiento de la meta es menor o igual al 70%<br>'+
                  '<b>a: </b>Asesores con Productividad Crítica en los últimos 6 meses (Periodo Evaluado)<br>'+
                  '<b>b: </b>Asesores con Productividad Crítica en los 5 meses durante el periodo evaluado<br>'+
                  '<b>c: </b>Asesores con Productividad Crítica en los 4 meses durante el periodo evaluado<br>'+
                  '<b>d: </b>Asesores con Productividad Crítica en los 3 meses durante el periodo evaluado',
          }
        }
      ]
    },
    {
      module: 'rma/Administracion/GestionPersonas/horas_extras_rma',
      jerar: 'OFI_2',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Cartera/seguimiento_asesores_rma',
      jerar: 'OFI_2',
      filter:[Variable01(),Categoria01()],
      table: [
        {
          id: '_01',
          theme: theme_tb2(),
        }
      ],
      graphic: [
        {
          id: '_02',
          theme: theme_gp3(),
        }
      ]
    },
    {
      module: 'rma/administracion/Cartera/desembolsos_productividad_rma',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      graphic: [
        {
          id: '_01',
          theme: theme_gp1(),
        }
      ]
    },
    {
      module: 'rma/administracion/Campanas/campanas_rma',
      jerar: 'F,T,R',
      filter:[{...renderDates_1(),...{variable:'sem'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { var: 11},
          content: {
            higher: '<h2 class="title-module">APADRINAMIENTO</h2>'
          }
        }
      ]
    },
    {
      module: 'rma/administracion/Cartera/cmg_cartera_rma',
      jerar: 'UNI_1',
      filter:[{...FAE_OPT01(),...{variable:'car'}},{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
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
      //module: 'rma/administracion/Mora/cmg_mora_rma',
      module: 'cuadro_Variable_M',//'rda/administracion/mora/cmg_mora',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
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
      module: 'rma/administracion/Clientes/cmg_clientes_rma',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>'
          }
        }
      ]
    },
    {
     // module: 'rma/administracion/Captaciones/cmg_captaciones_rma',
     module: 'GCMGCAP', 
     //jerar: 'F,CT,CC,M,AH',
     jerar: 'OFI_1',
      reportType: ReportType.REGULAR,
      //jerar: 'F,CT,CC,M,AH',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
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
     // module: 'rma/administracion/Captaciones/cmg_captaciones_rma',
     module: 'CMG_CLIF',  
     jerar: 'UNI_1',
      reportType: ReportType.REGULAR, 
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES FLUJO</h2>',
            lower: '<b>Los datos de Bancarización se compara con el último RCC disponible a la fecha.</b><br>' +
            '<b>Los datos de Vulnerabilidad se muestran de acuerdo a las cargas enviadas por FMBBVA.</b><br>'+
              '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.'
          }
        }
      ]
    },
    {
      // module: 'rma/administracion/Captaciones/cmg_captaciones_rma',
      module: 'DESEMP_SOC',  
      jerar: 'UNI_1',
       reportType: ReportType.REGULAR, 
       filter:[{...renderDates_1(),...{variable:'fec'}}],
       table: [
         {
           id: '_01',
           theme: theme_tb1(),
           content: {
             higher: '<h2 class="title-module">DESEMPEÑO SOCIAL</h2>',
             lower: '<b>Los datos de Bancarización se compara con el último RCC disponible a la fecha.</b><br>'
           }
         }
       ]
     },
     {
      module: 'SEGUI_COMITE',  
      jerar: 'UNI_1',
       reportType: ReportType.REGULAR, 
       filter:[{...renderDates_1(),...{variable:'fec'}}],
       table: [
         {
           id: '_01',
           theme: theme_tb1(),
           content: {
             higher: '<h2 class="title-module">SEGUIMIENTO  DE COMITE DE CREDITOS</h2>',
             lower: '<b></b><br>'
           }
         }
       ]
     },
    {
      module: 'rma/administracion/Seguros/cmg_seguros_rma',
      jerar: 'UNI_1',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
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
      module: 'finanzas/cartera/cartera_finanzas',
      jerar: 'F,CT,CC,CG,CSC,CA',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
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
      module: 'cuadro_Variable_Riesgo_F',//module: 'finanzas/mora/mora_finanzas',
      jerar: 'F,CT,CC,CG,CSC,CA',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
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
      module: 'finanzas/clientes/clientes_finanzas',
      jerar: 'F,CT,CC,CG,CSC,CA',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">CLIENTES</h2>',
            lower: '<b>A partir del día 15 calendario se comparan días hábiles faltantes para el cierre.</b><br>' +
              '<b>TMM - Tasa Mensual Móvil</b> → Var. fecha actual vs. mismo día del mes anterior.<br>' +
              '<b>TAM - Tasa Anual Móvil</b> → Var. fecha actual vs. mismo día del año anterior.<br>'
          }
        }
      ]
    },
    {
      module: 'finanzas/captaciones/captacion_finanzas',
      jerar: 'F,CT,CC,CG,CSC,CA',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
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
      module: 'finanzas/seguros/seguros_finanzas',
      jerar: 'F,CT,CC,CG,CSC,CA',
      filter:[{...renderDates_1(),...{variable:'fec'}}],
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
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
      module:'GRESCONDO' ,
      jerar: 'UNI_1',
      reportType:ReportType.REGULAR,
      filter: [VariableMontoMotivo(),VariableStock()],
      table: [
        {
          id: '_02',
          theme: theme_tb1(),
          params: { diariomes: '',niveles: 1},
          content: {
            higher: '<h2 class="title-module">REPORTE DE CONDONACIONES MENSUAL</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { diariomes: '',niveles: 3}
        }
      ]
    },
    {
      module: 'COSELISTADO',
      jerar: 'UNI_1',
      reportType: ReportType.REGULAR,
      filter:[{...renderDates_3(),...{variable:'fec'}},Productos01(),SubProducto01(),Maduracion01()],
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
      reportType: ReportType.REGULAR,
      filter:[Productos01(),SubProducto01(),Maduracion01(),Tipo03()],      
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
      module: 'GLISAUTRO',
      jerar: 'F',
      filter:[CargoAutonomia()],
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
      module: 'GST_ACTIVAS_M',
      jerar: 'UNI_1',      
      filter: [{...renderDates_3(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { var: 1, diario: 0 },
          content: {
            higher: '<h2 class="title-module">Número de Operaciones Desembolsadas por Producto y Nivel de Tasas</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '9.5%'
          },
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { var: 2, diario: 0 },
          content: {
            higher: '<h2 class="title-module">% Operaciones Desembolsadas por Producto y Nivel de Tasas</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '11%'
          },
        },
        {
          id: '_03',
          theme: theme_tb1(),
          params: { var: 3, diario: 0 },
          content: {
            higher: '<h2 class="title-module">TAPP Mes de Operaciones Desembolsadas por Producto y Nivel de Tasas</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_04',
          theme: theme_tb1(),
          params: { var: 4,  diario: 0 },
          content: {
            higher: '<h2 class="title-module">Evolución de Operaciones Desembolsadas por Nivel de Tasas</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_05',
          theme: theme_tb1(),
          params: { var: 5,  diario: 0 },
          content: {
            higher: '<h2 class="title-module">Evolución de Monto Desembolsado por Nivel de Tasas</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        },
        {
          id: '_06',
          theme: theme_tb1(),
          params: { var: 6, diario: 0 },
          content: {
            higher: '<h2 class="title-module">Evolución de TAPP Mes</h2>',
            lower: '<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
          },
          style: {
            width_gt_xs_v: '8.5%'
          },
        }
      ]
    },
    {
     // module: 'rma/administracion/captaciones/gestion_tasas_pasivas_rma',
     module: 'GST_PASIVA_M',
     jerar: 'F,CT,CC,M,AH',
      filter: [{ ...Tipo01(), ...{ variable: 'agr' } }, { ...Canal01(), ...{ variable: 'var' } },{...renderDates_3(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [
        {
          id: '_01',
          theme: theme_tb1(),
          params: { calc: 2},
          content: {
            higher: '<h2 class="title-module">Depósitos a Plazo Fijo - Número de Aperturas por Tipo de Persona y Moneda</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(),
          params: { calc: 1 },
          content: {
            //higher: '<h2 class="title-module">% de Aperturas por Tipo de Persona y Moneda</h2>'
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
        }
        */
      ]
    },
    {
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
      module: 'CEROCUOTA_TOPCNUEVA_M',
      jerar: 'UNI_1',   //jerar: 'F,CT,CC',
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
      module: 'CONT_ELECT_M',
      jerar: 'UNI_1',
      filter: [{...renderDates_3(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [
        /*{
          id: '_01',
          theme: theme_tb1(),
          content: {
            higher: '<h2 class="title-module">Desembolsos diarios</h2>'
          }
        },*/
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
            higher: '<h2 class="title-module">Participación de contratación electrónica</h2>'
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
      module: 'rankKay',
      jerar: 'OFI_3',//jerar: 'UNI_1',
      filter: [{...renderDates_4(),...{variable:'fec'}}],
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
      filter: [{...renderDates_4(),...{variable:'fec'}}],
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
      filter: [{...renderDates_4(),...{variable:'fec'}}],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01', 
          theme: theme_tb1(),
           
        }
      ]
    },
    {
      module: 'HCARBONO',
      jerar: 'OFI_1', 
      filter: [{...renderDates_1(),...{variable:'fec'}},SCARGAAMBIENTAL()],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01',
          theme: theme_tb2(),
           
        }
      ]
    },
    {
      module: 'RS_DAT_PRO',
      jerar: 'UNI_1', 
      filter: [{...renderDates_1(),...{variable:'fecha'}}],
      reportType: ReportType.REGULAR,
      table: [   
        {
          id: '_01',
          theme: theme_tb1(), 
          content: {
            higher: '<h2 class="title-module">DATOS POR PRODUCTO</h2>'
          }
        },
        {
          id: '_02',
          theme: theme_tb1(), 
        },
        {
          id: '_03',
          theme: theme_tb1(), 
          content: {
            lower: '<b>a:</b> Variación con respecto al cierre del mes anterior.'
          }
        },
        {
          id: '_04',
          theme: theme_tb1(), 
          content: {
            lower: '<b>b:</b> Variación de la TAPP con respecto al cierre al cierre del mes anterior en Puntos Básicos.'
          }
        }
      ]
    },
    {
      module: 'CAP_SEGUI_BP',
      jerar: 'OFI_3', 
      filter: [{...renderDates_1(),...{variable:'fec'}},varProducto()],
      reportType: ReportType.REGULAR,
      table: [   
        {
          id: '_01',
          theme: theme_tb1(), 
          content: {
            higher: '<h2 class="title-module">Seguimiento BP</h2>'
          }
        }
      ]
    },
    {
      module: 'CARACT_pas_M',
      jerar: 'UNI_1',//'OFI_3',//jerar: 'UNI_1',
      filter: [{...renderDates_1(),...{variable:'fec'}},{ ...SPRODUCTO(), ...{ variable: 'prod' } },Segmento()],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01', 
          theme: theme_tb1(),
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
      module: 'proyect_david',
      jerar: 'UNI_1', 
      filter: [{...renderDates_1(),...{variable:'fec'}} ],
      reportType: ReportType.REGULAR,
      table: [       
        {
          id: '_01', 
          theme: theme_tb1(),
          content: {  }
           
        }
      ]
    }
  ]


  return conf.find(r => r.module == module);
}

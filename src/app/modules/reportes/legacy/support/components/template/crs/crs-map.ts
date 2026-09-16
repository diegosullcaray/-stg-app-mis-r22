import { theme_tb1, theme_gp1, theme_tb4, theme_tb3 } from '../../../../support/common/theme.module';
import { GCOVID_OPT01, Semana01, Tipbase, Tramo01, Boolean01, TramoVenc01, Producto01 } from '../../../../support/common/filter-locale.module';
import { ReportType } from '../../../../support/data/ant-mod-rep.service';
import * as Moments from 'moment';
const fec_day_ult = Moments().add(-1, 'days').format("YYYYMMDD");
export function crs(module: string) {
  let conf = [
  {
    module: 'rda/sectorista/campania_agil/campana_agil_sec',
    filter:[Semana01()],
    table: [
      { 
        id: '_01',
        theme: theme_tb1(),
        style:{
          width_gt_xs_v:'90px'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/brecha/brecha_inversion_sec',
    graphic:[
      { id:'_01',
        theme:theme_gp1()
      }
    ]
  },
  {
    //module:'rda/sectorista/cartera/cartera_sec',
    module: 'RS_MON_EFEC_SEC',
    reportType: ReportType.REGULAR, 
    filter:[Tramo01(),Producto01(),
      {...Boolean01(),...{variable:'comp_r',label:'Compromiso Roto'}},
      {...Boolean01(),...{variable:'zcuo',label:'0 Cuota'}},
      {...Boolean01(),...{variable:'ucuo',label:'1 Cuota'}},
      TramoVenc01()
    ],
    table:[
      { id:'_01',
        theme:theme_tb3(),        
        content:{
          higher:'<b>Expresado en PEN y %</b>',
        },
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'18%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/cartera/cartera_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        content:{
          higher:'<b>Expresado en PEN y %</b>',
        },
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'18%'
        }
      },
      { id:'_02',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'18%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/seguros/seguros_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        content:{
          higher:'<b>Expresado en PEN y %</b>',
        },
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/monitor_metas_desembolsos/monitor_metas_desem_sec',
    table:[
      { id:'_01',
        //width:'1050px',
        theme:theme_tb1(),
        params:{tipmet:1},
        content: {
            higher:'<b class="hidden">Fecha: :$fecha :$hora </b>'+
                    '<div class="wrap">'+
                      '<div class="box"><h2><b>Operaciones Desembolsadas</b></h2></div>'+
                      '<div class="box"><h2><b>Cumplimiento de Meta:</b></h2></div>'+
                      '<div class="box"><h1 class=":$style_cumpl_des_acum hidden"><b>:$cumpl_des_acum</b></h1></div>'+
                    '</div>'
        },
        style:{
          width_gt_xs_v:'11%'
        }
      },
      { id:'_02',
        theme:theme_tb1(),
        params:{tipmet:1},
        content: {
            higher:'<div class="wrap">'+
                      '<div class="box"><h2><b>Monto Desembolsado</b></h2></div>'+
                      '<div class="box"><h2><b>Cumplimiento de Meta:</b></h2></div>'+
                      '<div class="box"><h1 class=":$style_cumpl_ope_acum hidden"><b>:$cumpl_ope_acum</b></h1></div>'+
                    '</div>'
        },
        style:{
          width_gt_xs_v:'11%'
        }
      },
      { id:'_03',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'20%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/cliente_producto/cliente_producto_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      },
      { id:'_02',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      },
      { id:'_03',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/clientes_nuevos_recurrente/cliente_nuevo_rec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/captaciones/captacion_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      },
      { id:'_02',
        theme:theme_tb1(),
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      },
      { id:'_03',
        theme:theme_tb1(),
        content: {
          higher: '<b>AHORRO PROGRAMADO</b>'
        },
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'20%'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/recuperacion_preventiva/recuperacion_preventiva',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        content:{
          nodata:'Sin Recuperación Preventiva',
          lower:'<b>Esta es la lista de tus créditos que vencen en los próximos días; 30 días para créditos agro y 5 días para los otros productos. Programa tus gestiones con tiempo</b>'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/cero_cuota/cero_cuota_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        content:{
          lower:'<b>Urgente gestión! estos son los clientes de tu cartera que no han pagado ni una cuota.</b>'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/retanqueo/retanqueo_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        content:{
          lower:'<b>Estos son tus clientes con los que puedes gestionar un représtamo, vamos con Confianza</b>'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/canal_alt/canal_alt_sec',
    table:[
      { id:'_01',
        filter_input:true,
        theme:theme_tb1(),
        content:{
          lower:'<b>Estos son los canales alternativos para la atención de tus clientes.</b>'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/cli_pot/cli_pot_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        content:{
          lower:'<b>Estos son los clientes potenciales.</b>'
        }
      }
    ]
  },
  {
    module:'rda/sectorista/grupo_pdm/grupo_pdm_sec',
    table:[
      { id:'_01',
        theme:theme_tb4()
      }
    ]
  },
  {
    module:'RES_SEC_REP',
    table:[
      { id:'_01',
        filter_input:true,
        theme:theme_tb4()
      }
    ]
  },
  {
    module:'DET_CLI',
    table:[
      { id:'_01',
        filter_input:true,
        theme:theme_tb4()
      }
    ]
  },
  {
    module:'LIS_CAPRET',
    table:[
      { id:'_01',
        theme:theme_tb4()
      }
    ]
  },
  {
    module:'REACT_PDM',
    filter:[Tipbase()],
    table:[
      { id:'_01',
        filter_input:true,
        theme:theme_tb4()
      }
    ]
  },
  {
    module:'LST_AUT',
    reportType:ReportType.REGULAR,
    table:[
      { id:'_01',
        params:{c_aut:3,aut:2},  
        theme:theme_tb4()
      }
    ]
  },
  {
    module:'rda/sectorista/Reporte_Autonomia_Tasas/reporte_autonomia_tasa_sec',
    table:[
      { id:'_01',
        theme:theme_tb1(),
        params:{var:"4"},
        content: {
            higher:'<h2 class="title-module">Resumen Gestión de Tasas</h2>',
            lower:'<b>1. TAPP Mes: Tasa Activa Promedio Ponderadas de las operaciones desembolsadas en el mes</b><br>'+
                  '<b>2. TAPP Mínima: Tasa de interés de tarifario (por mercado) +/- PBS por segmentación comercial + PBS por factores de riesgo</b><br>'+
                  '<b>3. PBS: puntos básicos. 100 puntos básicos corresponde a punto porcentual (1%).</b>'
        },
        style:{
          width_gt_xs_v:'10.3%'
        }
      },
      { id:'_02',
        theme:theme_tb1(),
        params:{var:"1"},
        content: {
          higher:'<h2 class="title-module">Número de Operaciones Desembolsadas por Producto</h2>',
          lower:'<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
        },
        style:{
          width_gt_xs_v:'9%'
        }
      },
      { id:'_03',
        theme:theme_tb1(),
        params:{var:"3"},
        content: {
          higher:'<h2 class="title-module">Monto Desembolsado por Producto</h2>',
          lower:'<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
        },
        style:{
          width_gt_xs_v:'10.3%'
        }
      },
      { id:'_04',
        theme:theme_tb1(),
        params:{var:"2"},
        content: {
          higher:'<h2 class="title-module">TAPP Mes de Operaciones Desembolsadas por Producto</h2>',
          lower:'<b>Tasa Mínima: Tasa Base en función de Mercado +/- Segmentación Comercial (en pbs) + Factores de Riesgo (en pbs).</b>'
        },
        style:{
          width_gt_xs_v:'8%'
        }
      }
    ]
  },
  {
    module:'PLANMOV',
    reportType: ReportType.REGULAR,
    table:[
      { id:'_01',
        theme:theme_tb1(),
        params: { fec: fec_day_ult },
        content:{
          higher:'<b>Planilla de Gastos por movilidad - Asesores</b></br><b> Periodo: <b>:$Fecha</b>',
        },
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'18%'
        }
      }
    ]
  },
  {
    module:'RS_MON_REP_SEC',
    reportType: ReportType.REGULAR,
    filter: [{ ...GCOVID_OPT01(), ...{ variable: 'car' } }],
    table:[
      { id:'_01',
        theme:theme_tb1(),
        params: { fec: fec_day_ult },
        content:{
          higher:'<b>Monitor de Reprogamados</b></br><b> Periodo: <b>:$Fecha</b>',
        },
        style:{
          width_gt_xs_v:'25%',
          width_gt_xs_tl:'18%'
        }
      }
    ]
  }
]


  return conf.find(r => r.module == module);
}



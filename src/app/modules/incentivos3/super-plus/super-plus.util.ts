import { incentivos3IconSet } from "../incentivos3.util";

export const superPlusConfig={
    loading: true,
    data: [
      {
        id: 'prod',
        des: 'Productividad',
        icon: incentivos3IconSet.prod,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{
          comp:1,
          req:'getProd',
          card:true,
          typ:'sp'
        }
      },
      {
        id:  'rop',
        des: 'Riesgo Ope.',
        icon: incentivos3IconSet.rop,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{}
      },
      {
        id: 'clim',
        des: 'Clima',
        icon: incentivos3IconSet.clim,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{}
      },
      {
        id: 'clib',
        des: 'Bancarización',
        icon: incentivos3IconSet.clib,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{comp:2,req:'getCliBanc'}
      },
      {
        id: 'ret',
        des: 'Retención',
        icon: incentivos3IconSet.ret,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 0,
        params:{
          comp:1,
          req:'getRet',
          card:false,
          typ:'sp'
        }
      },
      {
        id: 'tas',
        des: 'Tasas',
        icon: incentivos3IconSet.tas,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{
          comp:1,
          req:'getTasa',
          card:false,
          typ:'sp'
        }
      },
      {
        id: 'rot',
        des: 'Rotación',
        icon: incentivos3IconSet.rot,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{}
      },
      {
        id: 'sis',
        des: 'Sistemática',
        icon: incentivos3IconSet.sis,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{}
      },
      {
        id: 'tgru',
        des: 'Tamaño Grupos',
        icon: incentivos3IconSet.tgru,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,
        params:{}
      },
      {
        id:  'areu',
        des: 'Asis. Reuniones',
        icon: incentivos3IconSet.areu,
        val: 0,
        flex: 33.33,
        show: false,
        enab:false,
        state: 1,     
        params:{}
      }
    ]
  }
import { incentivos3IconSet } from "../incentivos3.util";

export const perfilConfig = {
  loading: true,
  usu: {
    nom: '--',
    niv: '--',
    des_niv: '--',
    img_url: '--',
    tip_cod: 0,
    cod_rel: '--',
    cla_usu: 0
  },
  comi: {
    val: 0,
    sit: '--'
  },
  change_btn: false,
  sem: [
    {
      id: 'car',
      des: 'Cartera',
      icon: incentivos3IconSet.car,
      val: 0,
      show: false
    },
    {
      id: 'gru',
      des: 'Grupos',
      icon: incentivos3IconSet.gru,
      val: 0,
      show: false
    },
    {
      id: 'cli',
      des: 'Clientes',
      icon: incentivos3IconSet.cli,
      val: 0,
      show: false
    },
    {
      id: 'pagop',
      des: 'Pago Puntual',
      icon: incentivos3IconSet.pagop,
      val: 0,
      show: false
    },
    {
      id: 'efec1',
      des: 'Efect. -30 a 0 días',
      icon: incentivos3IconSet.efec1,
      val: 0,
      show: false
    },
    {
      id: 'efec2',
      des: 'Efect. 1 a 30 días',
      icon: incentivos3IconSet.efec2,
      val: 0,
      show: false
    },
    {
      id: 'efec3',
      des: 'Efect. 31 a 60 días',
      icon: incentivos3IconSet.efec3,
      val: 0,
      show: false
    },
    {
      id: 'sc1',
      des: 'Supervision C1',
      icon: incentivos3IconSet.sc1,
      val: 0,
      show: false
    },
    {
      id: 'acom',
      des: '% Asesores Comisionan',
      icon: incentivos3IconSet.acom,
      val: 0,
      show: false
    }
  ]
};
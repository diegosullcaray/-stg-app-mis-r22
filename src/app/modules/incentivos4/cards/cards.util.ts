import { incentivos4IconSet } from '../incentivos4.util';

export const cardsConfig = {
    cards: [
        {
            show: true,
            val: -1,
            lbl: 'Saldo Cartera Vigente',
            icon: incentivos4IconSet.car,
            tot_m: 1000,
            bon_bas: 600,
            bon_plus: 400
        },
        {
            show: true,
            val: -1,
            lbl: 'Stock Clientes',
            icon: incentivos4IconSet.cli,
            tot_m: 1000,
            bon_bas: 600,
            bon_plus: 400
        },
        {
            show: false,
            val: -1,
            lbl: 'Supervisión Capa 1',
            icon: incentivos4IconSet.sc1,
            tot_m: 1000,
            bon_bas: 600,
            bon_plus: 400
        },
        {
            show: true,
            val: -1,
            lbl: 'Efectividad -30 a 0',
            icon: incentivos4IconSet.efec1,
            tot_m: 1000,
            bon_bas: 600,
            bon_plus: 400
        },
        {
            show: true,
            val: -1,
            lbl: 'Efectividad 1 a 30',
            icon: incentivos4IconSet.efec2,
            tot_m: 1000,
            bon_bas: 600,
            bon_plus: 400
        },
        {
            show: true,
            val: -1,
            lbl: 'Efectividad 31 a 60',
            icon: incentivos4IconSet.efec3,
            tot_m: 1000,
            bon_bas: 600,
            bon_plus: 400
        }
    ]
};
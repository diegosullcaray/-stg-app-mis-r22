
export const tableHeaders = [
    {
        label: 'Fecha',
        key: 'fec_pro',
        sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Multiriesgo',
        key: 'a1', //'seg_com_mul_rie',
        type: 'comp_f'
    },
    {
        label: 'Multicrédito',
        key: 'a2', //'seg_com_mul_cre',
        type: 'comp_f'
    },
    {
        label: 'Protección Cuotas',
        key: 'a3', //'seg_com_pro_cuo',
        type: 'comp_f'
    },
    {
        label: 'Agrícola',
        key: 'a4', //'seg_com_agro',
        type: 'comp_f'
    },
    {
        label: 'OncoCréditos',
        key: 'a5', //'seg_com_oncoCre',
        type: 'comp_f'
    },
    {
        label: 'Protección Total',
        key: 'a6', //'seg_com_pro_total',
        type: 'comp_f'
    }
]
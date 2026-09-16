export const headers = [
    {
        label: 'Campaña',
        subs: [
            {
                key: 'cod_evt',
                label: 'Codigo Campaña',
                style:{
                    'max-width':'100px',
                    'min-width':'100px',
                    'width':'100px'
                }
            },
            {
                key: 'des_evt',
                label: 'Nombre Campaña'
            }
        ]
    },
    {
        label: 'Cliente',
        subs: [
            {
                key: 'tip_doc',
                label: 'Tipo Documento',
                style:{
                    'max-width':'120px',
                    'min-width':'120px',
                    'width':'120px'
                }
            },
            {
                key: 'num_doc',
                label: 'Nro. Documento',
                style:{
                    'max-width':'120px',
                    'min-width':'120px',
                    'width':'120px'
                }
            },
            {
                key: 'des_cli',
                label: 'Nombre'
            }
        ]
    },
    {
        label: 'Gestión',
        subs: [
            {
                key: 'ord_ges',
                label: 'Orden',
                style:{
                    'max-width':'80px',
                    'min-width':'80px',
                    'width':'80px'
                }
            },
            {
                key: 'fec_ges',
                label: 'Fecha',
                style:{
                    'max-width':'120px',
                    'min-width':'120px',
                    'width':'120px'
                }
            }
        ]
    }
];
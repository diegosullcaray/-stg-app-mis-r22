export const loadingConf = {
    height: '550px'
};

export const tableConf = {
    table: {
        height: '550px',
        //grid: '1px solid red'
        grid: '1px solid rgb(216, 216, 216)'
    },
    header: {
        'text-align': 'center',
        'min-width': '100px',
        'color': 'white',
        //grid:'1px solid rgb(216, 216, 216)'
    }
};

export const tableHeaders = [
    {
        label: 'Cod. Asesor',
        key: 'HCODSEC',
        //sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Nombre Asesor',
        key: 'HDESSEC',
        type: 'string'
    },
    {
        label: 'Cuenta Cli.',
        key: 'HCTACLI',
        type: 'string'
    },
    {
        label: 'Nombre Cli.',
        key: 'HDESCLI',
        type: 'string'
    },
    {
        label: 'Operación',
        key: 'HCODOPE',
        type: 'string'
    },
    {
        label: 'Fecha de Desembolso',
        key: 'HFECDES',
        type: 'string'
    },
    {
        label: 'Monto Desembolso',
        key: 'HMONDES',
        type: 'number'
    },
    {
        label: 'Ind. Cartera',
        key: 'HINDCAR',
        type: 'string'
    },
    {
        label: 'Producto Comercial',
        key: 'RDESPROD',
        type: 'string'
    },
    {
        label: 'Destino Crédito',
        key: 'HDESCRE',
        type: 'string'
    },
    {
        label: 'Fecha de Visita',
        key: 'HFECVIS',
        type: 'string'
    },
    {
        label: 'Cumple Destino Cred.',
        key: 'HCUMPLDC',
        type: 'string',
    },
    {
        label: 'Actualizar',
        key: 'OPTION1',
        type: 'string',
        actions: [
            {
                key: 'res_real_det',
                style: {
                    icon: 'edit',
                    width: '20px'
                }
            }
        ]
    }
]

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
        label: 'Fecha',
        key: 'HFECPRO',
        //sticky: true,
        style: {
            'min-width': '150px'
        }
    },
    {
        label: 'Nombre Cliente',
        key: 'HAPENOMB',
        type: 'string'
    },
    {
        label: 'DNI',
        key: 'HNUMDOC',
        type: 'string'
    },
    {
        label: 'Ruc',
        key: 'HNUMRUC',
        type: 'string'
    },
    {
        label: 'Dirección',
        key: 'HDIREC',
        type: 'string'
    },
    {
        label: 'Agencia',
        key: 'HDESAGE',
        type: 'string'
    },
    {
        label: 'Apertura de Cta',
        key: 'HAPERTCTA',
        type: 'string'
    },
    {
        label: 'Latitud',
        key: 'HGEOLATI',
        type: 'string'
    },
    {
        label: 'Longitud',
        key: 'HGEOLON',
        type: 'string'
    },
    {
        label: 'Instalado',
        key: 'HINSTALAD',
        type: 'string'
    },
    {
        label: 'Zona',
        key: 'HZONA',
        type: 'string'
    },
    {
        label: 'Prospecto',
        key: 'HPROSPEC',
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

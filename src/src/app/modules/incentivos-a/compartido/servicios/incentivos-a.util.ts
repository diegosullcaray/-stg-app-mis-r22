export const chooserOpts = {
    headers1: [
        {
            key: 'tip_rel',
            label: 'Tipo'
        },
        {
            key: 'des_rel',
            label: 'Descripción'
        }
    ],
    headers2: [
        {
            key: 'des_rel',
            label: 'Unidad'
        }
    ],
    tableOptions: {
        body:{
            loading:{
                rows:8
            }
        }
    },
    dialogOptions: {
        panel: {
            modal: true,
            //clearDataSourceOnClose:true
        },
        searchBox: {
            enabled: true,
            style: {
                'font-size': '12px'
            },
            keys:['des_rel']
        },
        title: {
            text: "Equipo",
            enabled: true
        },
        closeButton: {
            enabled: false
        }
    }
}

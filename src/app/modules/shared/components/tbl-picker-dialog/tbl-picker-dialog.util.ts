export const defaultTblPickerDialogOptions = {
    panel: {
        width: '400px',
        height: '500px',
        modal: false,
        allowNullSelection:false,
        clearDataSourceOnClose:false,
        showPaginator:false
    },
    paginator:{
        enabled: false,
        pageLenght:10
    },
    refreshButton:{
        enabled: false
    },
    closeButton: {
        enabled: true,
        label: "Cerrar"
    },
    selectButton:{
        label:'Seleccionar',
        enabled: false
    },
    title: {
        text: "",
        enabled: false
    },
    searchBox: {
        enabled: false,
        placeholder: 'Buscar',
        style: {},
        keys:[]
    }
}

export const defaultTblPickerTableOptions = {
    header: {
        style: {
            'height': '32px'
        }
    },
    body: {
        style: {
            'font-size': '12px'
        },
        hover: {
            enabled: true
        },
        selection: {
            enabled: true
        }
    }
}
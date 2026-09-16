export const indSecCfg = {
    prof:['car','cli','efec1','efec2','efec3'],
    avan_s:['car','cli','efec1','efec2','efec3'],
    avan_e:['car','cli','efec1','efec2','efec3'],
    avan_flex: 20,
    sup_s:['prod','clib','ret','tas'],//super plus show (muestra el card)
    sup_e:['prod','clib','tas'],//super plus enable (lanza detalle)
    cal_e:['prod','clib','ret','tas'],//calculadora enable (editable en calculadora)
    cal_s:['prod','clib','tas']//calculadora sumariza (participa en las sumas del bono total)
}
export const indUniCfg = {
    prof:['car','cli','sc1','efec1','efec2','efec3'],
    avan_s:['car','cli','sc1','efec1','efec2','efec3'],
    avan_e:['car','cli','efec1','efec2','efec3'],
    avan_flex: 16.66,
    sup_s:['prod','clib','ret','tas'],
    sup_e:['prod','clib','tas'],
    cal_e:['prod','clib','ret','tas'],
    cal_s: ['prod','clib','tas']
}
export const indCorCfg = {
    prof:['car','cli','sc1','efec1','efec2','efec3'],
    avan_s:['car','cli','sc1','efec1','efec2','efec3'],
    avan_e:['car','cli','efec1','efec2','efec3'],
    avan_flex: 16.66,
    sup_s:['prod','ret','tas','rop','clim','rot'],
    sup_e:['prod','tas'],
    cal_e:['prod','ret','tas'],
    cal_s:['prod','tas','rop','clim','rot'],
}
export const gruSecCfg = {
    prof:['car','cli','pagop','efec2'],
    avan_s:['car','cli','pagop','efec2'],
    avan_e:['car','cli','efec2'],
    avan_flex: 20,
    sup_s:['tgru','areu','ret'],
    sup_e:[],
    cal_e:['tgru','areu','ret'],
    cal_s:['tgru','areu']
}
export const gruUniCfg = {
    prof:['car','cli','pagop','efec2','sc1','acom'],
    avan_s:['car','cli','pagop','efec2','sc1','acom'],
    avan_e:['car','cli','efec2'],
    avan_flex: 20,
    sup_s:['tgru','areu','ret'],
    sup_e:[],
    cal_e:['tgru','areu','ret'],
    cal_s:['tgru','areu']
}

export const dlgFromHierOpts = {
    headers1: [
        {
            key: 'des_gru',
            label: 'Grupo',
            style:{
                'width':'95px',
                'min-width':'95px'
            }
        },
        {
            key: 'tip_rel',
            label: 'Nivel',
            style:{
                'width':'90px',
                'min-width':'90px'
            }
        },
        {
            key: 'des_rel',
            label: 'Descripción'
        }
    ],
    headers2: [
        {
            key: 'des_gru',
            label: 'Grupo',
            style:{
                'width':'95px',
                'min-width':'95px'
            }
        },
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
            width: '500px',
            height: '550px',
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
            text: "Detalle del Nivel",
            enabled: true
        },
        closeButton: {
            enabled: false
        }
    }
}

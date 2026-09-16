export const usuariosTblOpts={
    style:{
        'font-size':'12px'
    },
    body:{
        selection:{
            enabled: true
        },
        hover: {
            enabled: true
        }
    },
    header:{
        /* style:{
            'background':'white',
            'color':'rgb(79, 129, 189)'
        },*/
        cellStyle:{
            'height':'32px',
            //'width':'85px',
            //'min-width':'85px',
            //'max-width':'85px'
        } 
    }
};

export const usuariosHd=[
    {
        key:'cod_bt',
        label:'Usuario BT'
    },
    {
        key:'nom',
        label:'Nombre'
    },
    {
        key:'email',
        label:'Correo FC'
    },
    {
        key:'des_niv',
        label:'Grupo'
    }
]
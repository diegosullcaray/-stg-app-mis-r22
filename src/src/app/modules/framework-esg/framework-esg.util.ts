export const tblOpts1 = {
    style:{
        'font-size':'12px'
    },
    header: {
        style: {
            'background': '#5b9bd5',
            'color': 'white'
        }
    },
    grid:{
        enabled:true
    }
};

export const headOpt1 = [
    {
        key: 'des',
        label: 'Estado'
    },
    {
        key: 'c1',
        label: 'Medio Ambiente',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px'
        }
    },
    {
        key: 'c3',
        label: 'Social Empleados',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px'
        }
    },
    {
        key: 'c2',
        label: 'Social Clientes',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px'
        }
    },
    {
        key: 'c4',
        label: 'Gobierno',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px'
        }
    },
    {
        key: 'c99',
        label: 'Total',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px'
        },
        cellStyle:{
            'font-weight':'bold',
            'text-align':'center'
        }
    }
];

const rsFn1=function(row:any){
    if(row.is_nod){
        return {
            'color':'#008080',
            'background':'#f2f2f2'
        };
    }
    return {};
}

export const tblOpts2 = {
    style:{
        'font-size':'12px'
    },
    header: {
        style: {
            'background': '#4472c4',
            'color': 'white'
        }
    },
    body:{
        hover: {
            enabled: true
        },
        selection: {
            enabled: true
        },
        rowStyleFn:rsFn1
    }
};

const iconFn=function(value:any){
    if(value==1){
        return 'edit';
    }
    return "";
}

export const headOpt2=[
    {
        key:'is_edit',
        label:'<span class="material-icons-outlined" style="font-size:18px !important;vertical-align:middle;">edit</span>',
        style:{
            'max-width':'50px',
            'min-width':'50px',
            'width':'50px',
            'background': '#008080'
        },
        format:{
            type:'icon',
            params:{
                size:'14px',
                convertFn:iconFn
            }
        }
    },
    {
        key: 'des_met',
        label: 'Metrica',
        style:{
            'background': '#008080'
        }
    },
    {
        key:'des_med',
        label:'Medida',
        style:{
            'background': '#008080'
        }
    },
    {
        key:'des_dis',
        label:'Esta disponible?',
        style:{
            'background':'#4472c4'
        }
    }
];
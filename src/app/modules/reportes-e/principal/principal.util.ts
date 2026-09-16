export const tableOptions={
    style:{
        'font-size':'12px'
    },
    header:{
        style:{
            'background':'white',
            'color':'#304156'
        },
        cellStyle:{
            'height':'40px',
            'text-align':'left'
        }
    },
    body:{
        hover: {
            enabled: true,
            // style: {
            //     'background': '#f6f7f8'
            // }
        },
    },
    grid: {
        mode:'bottom'
    }
};

const cvtFn=function(value:any){
    if(value=='PowerBIReport'){
        return 'PowerBILogo16';
    }
    return value;
}

export const tableHeaders=[
    {
        key:'reportType',
        label:'<span class="material-icons-outlined">description</span>',
        style:{
            'max-width':'50px',
            'min-width':'50px',
            'width':'50px'
        },
        format:{
            type:'icon',
            params:{
                size:'20px',
                src:'microsoft',
                convertFn:cvtFn
            }
        }
    },
    {
        key:'name',
        label:'Nombre',
        style:{
            'min-width':'200px'
        },
        format:{
            type:'link',
            params:{
                actionFn:'actionLink'
            }
        }
    },
    {
        key:'reportType',
        label:'Tipo',
        style:{
            'max-width':'120px',
            'min-width':'120px',
            'width':'120px' 
        }
    },
    
];
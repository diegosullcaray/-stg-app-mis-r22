export const tableOptions={
    style:{
        'font-size':'12px'
    },
    header:{
        style: {
            'background': '#5b9bd5',
            'color': 'white',
            'height':'40px',
        },
        
        // cellStyle:{
        //     'height':'40px',
        //     'text-align':'left',
        //     'width':'85px',
        //     'min-width':'85px',
        //     'max-width':'85px'
        // } 
         
    },
    // body:{
    //     hover: {
    //         enabled: true 
    //     },
    // },
    grid: {
       // mode:'bottom'
       enabled:true
    }
};

const cvtFn=function(value:any){
    if(value=='PowerBIReport'){
        return 'PowerBILogo16';
    }
    return value;
}
 
const csFn=function(params:any){
    let r ={};
    //console.log(params)
    if (params.rowData.col_tip == 1 && params.rowData.ROWNUMBER>=1 && params.rowData.ROWNUMBER<=8 ){
      
        r['color']='#030202';
        r['background']='#A9EFFD';
         
    } 
    if (params.rowData.col_tip == 3 && params.rowData.ROWNUMBER>=1 && params.rowData.ROWNUMBER<=2 ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }
    if (params.rowData.col_tip == 5 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }

    if (params.rowData.col_tip == 2 && params.rowData.ROWNUMBER>=1 && params.rowData.ROWNUMBER<=5  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }
    if (params.rowData.col_tip == 4 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }
    if (params.rowData.col_tip == 6 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }
    if (params.rowData.col_tip == 7 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }
    if (params.rowData.col_tip == 13 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }
    if (params.rowData.col_tip == 14 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }

    if (params.rowData.col_tip == 9 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }

    if (params.rowData.col_tip == 11 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }

    if (params.rowData.col_tip == 12 && params.rowData.ROWNUMBER ==1  ){
       
        r['color']='#030202';
        r['background']='#A9EFFD';
    }


    // if(params.rowData.ROWNUMBER>=1 && params.rowData.ROWNUMBER<=10){
    //     r['color']='#030202';
    //     r['background']='#A9EFFD';
    // }else{
    //     r['color']='#030202';
    // }
    return r;
};
export const tableHeaders=[
    {
        key:'ROWNUMBER',
        label:'N°',
        style:{
            'min-width':'30px',
            'max-width':'30px',
            'width':'30px'
        },
        cellStyleFn:csFn,
        
    },
   /* {
        key:'HCOLBT',
        label:'Usuario BT',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px'
        },
        cellStyleFn:csFn
    },*/
    {
        key:'HCOLNOM',
        label:'Usuario',
        style:{
            'min-width':'180px',
            'max-width':'180px',
            'width':'180px' 
            
        },
         
        cellStyleFn:csFn,
        cellStyle:{ 
           
            'min-height':'35px',
            'max-height':'35px',
            'height':'35px' 
        }
    }
    /*,
    {
        key:'hdester',
        label:'Territorio',
        style:{
            'min-width':'200px'
        } 
    }
    */,
    {
        key:'TOTAL_MES',
        label:'Puntos',
        style:{
            'min-width':'90px',
            'max-width':'90px',
            'width':'90px',
            'text-align':'center'
        },
        cellStyleFn:csFn,
        cellStyle:{ 
            'text-align':'center'
        }
    }
  
    
];

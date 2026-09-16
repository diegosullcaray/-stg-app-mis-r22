export const stgDefaultTable4Config = {
    style: {
        //'border-collapse':'collapse',
        'background': 'white',
        'font-size': '14px'
    },
    grid: {
        enabled: true,
        mode: 'full',//only_headers,bottom
        border: '1px solid #e9e9ef',
        'border-radius': '5px'
    },
    header: {
        sticky: true,
        style: {
            'background': '#035096',
            'font-weight': 'bold',
            'text-align': 'center',
            'color': 'white',
            'padding': '0px'
        },
        cellStyle: {
            'min-width': '150px'
        }
    },
    body: {
        style: {},
        stickyCols: [],
        loading: {
            enabled: true,
            rows: 4
        },
        hover: {
            enabled: false,
            style: {
                'background': '#bbdefb'
            }
        },
        selection: {
            enabled: false,
            style: {
                'background': '#2196f3',
                'color': 'white'
            }
        },
        cellStyle: {
            'height': '25px',
            'padding': '3px 5px'
        }
        //rowStyleFn
    },
    /* header: {
        key: string,
        label: string,
        sticky: boolean,
        style: object,
        styleFn: function(params),
        iconFn:function(params),
        cellStyle:object,
        cellStyleFn:function(params)

        //actionBtns:[{icon:'',fn:function(key,value,row,me)}]
        //sort:{order:1,fn:function(key,value,row,me)}
        //filter:{top:20,fn:function(key,value,row,me)}
    }
    pagination:{
        enabled:false,
        mode:'local',
        totalLenght:0,
        pageLenght:0,
        
    }*/

}
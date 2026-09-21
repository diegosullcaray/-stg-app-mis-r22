export const stgDefaultListConfig = {
    style: {
        //'border-collapse':'collapse',
        'background': 'white',
        'font-size': '14px'
    },
    grid: {
        enabled: true,
        border: '1px solid #e9e9ef',
        'border-radius': '5px'
    },
    item: {
        //styleFn:
        style: {
            'height': '25px',
            'padding': '3px 5px'
        },
        //format
    },
    body: {

        style: {},

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
        }
    }
}

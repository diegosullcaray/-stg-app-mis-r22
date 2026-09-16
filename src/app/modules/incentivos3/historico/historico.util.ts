const historicoGraphOpts = {
    chart: {
        type: 'area'
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'Histórico de Monetización por Variable',
        align: 'left',
        style: {
            'font-size': '12px'
        }
    },
    yAxis: {
        title: {
            text: 'Monto (S/.)',
            style: {
                'font-size': '10px'
            }
        },
        tickInterval:200
    },
    xAxis:{
        labels:{
            style:{
                'font-size': '10px'
            }
        },
        categories:[]
    },
    legend:{
        
        itemStyle:{
            'font-size': '8px'
            //color:'red'
        }
    },
    tooltip: {
        format: 'aaaaaa'
    },
    colors:['#E49240','#F8B754','#48B2AF','#03969E','#006A6A','#034041','#2B1335','#362D5D','#495293','#427CAD','#38C0CE','#33E3D5'],
    plotOptions: {
        /*series: {
            pointStart: 1
        },*/
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: []
};

export const historicoConfig = {
    loading: true,
    series:[],
    opts: historicoGraphOpts
}
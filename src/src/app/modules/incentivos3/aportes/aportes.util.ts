export const aportesGraphOpts = {
    chart: {
        type: 'bar',
    },
    legend:{
        reversed:true
    },
    title: {
        text: 'Aportes al Incentivo Actual'
    },
    xAxis: {
        categories:['Saldo Cartera','Desembolso','Clientes','Efec. -30 a 0','Efec. 1 a 30','Efec. 31 a 60'],
    },
    yAxis: {
        min: 0,
        max:1,
        ceiling:1,
        tickInterval:0.2,
        title: {
            text: 'Aporte (%)'
        },
        stackLabels: {
            enabled: true
        }
    },
    tooltip: {
        format: '<b>{key} xxxxx</b>' 
    },
    credits: {
        enabled: false
    },
    //colors:['#E49240','#F8B754','#48B2AF','#03969E','#006A6A','#034041','#2B1335','#362D5D','#495293','#427CAD','#38C0CE','#33E3D5']
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        //colorByPoint: true,
        name: 'No Aporta',
        color:'#e4858d',
        data: []
    }, {
        //colorByPoint: true,
        name: 'Aporta',
        color:'#64ef5f',
        data: []
    }]
}

export const aportesConfig = {
    loading: true,
    data1:[],
    data2:[],
    opts: aportesGraphOpts
};
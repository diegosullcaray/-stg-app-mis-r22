const composicionGraphOpts = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Composición de la Monetización Actual',
        style: {
            'font-size': '12px'
        }
    },
    xAxis: {
        type: 'category',
        top: 60,
        lineWidth: 0,
        labels: {
            formatter: function (e) {
                let v = e.chart.series[0].data[e.pos];
                if (v === undefined) {
                    return "";
                }
                return '<span class="material-icons" style="font-size:18px">' + v.icon + '</span>';
            }
        }
    },
    yAxis: {
        title: {
            text: 'Monto (S/.)',
            style: {
                'font-size': '10px'
            }
        },
        tickInterval: 50
    },
    credits: {
        enabled: false
    },
    tooltip: {
        format: '<b> xxxxx</b>' 
    },
    //colors:['#E49240','#F8B754','#48B2AF','#03969E','#006A6A','#034041','#2B1335','#362D5D','#495293','#427CAD','#38C0CE','#33E3D5'],
    plotOptions: {
        
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Mes Actual',
        //colorByPoint: true,
        //categories: ['Saldo', 'Clientes', 'E. -30 a 0', 'E. 1 a 30', 'E. 31 a 60', 'Productividad', 'Bancarizacion', 'Tasas'],
        data: []
        //data: [8.07, 0, 0, 0, 0, 0, -4.53,0]
    }]
}

export const composicionConfig = {
    loading: true,
    data:[],
    opts: composicionGraphOpts
}
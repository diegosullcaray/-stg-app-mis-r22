export const cabeceraCfg={
    showPic:false,
    name:'--',
    position:'--',
    des_rel:'--',
    showButtons:[false,false],
    enableButtons:false
}

export const monetizacionCfg={
    state:0,
    vars_comp:0,
    icons:[
        {
            t:'Saldo Cartera',
            i:'work',
            a:false
        },
        {
            t:'Stock Clientes',
            i:'groups',
            a:false
        },
        {
            t:'Efectividad -30-0 días',
            i:'battery_6_bar',
            a:false
        },
        {
            t:'Efectividad 1-30 días',
            i:'battery_3_bar',
            a:false
        },
        {
            t:'Supervisión Capa 1',
            i:'reviews',
            a:false
        },
        {
            t:'% Asesores Comisionan',
            i:'percent',
            a:false
        }
    ],
    detVars: [
        {
            n: "Saldo Cartera (var)",
            r: 0,
            m: 0,
            c: 0,
            f: 'n'
        },
        {
            n: "Stock Clientes (var)",
            r: 0,
            m: 0,
            c: 0,
            f: 'n'
        },
        {
            n: "Efectividad -30 a 0 días",
            r: 0,
            m: 0,
            c: 0,
            f: 'p'
        },
        {
            n: "Efectividad 1 a 30 días",
            r: 0,
            m: 0,
            c: 0,
            f: 'p'
        },
        {
            n: "Supervisión Capa 1",
            r: 0,
            m: 0,
            c: 0,
            f: 'n'
        },
        {
            n: "% Asesores Comisionan",
            r: 0,
            m: 0,
            c: 0,
            f: 'p'
        }
    ],
    detBon:[
        {
            t:'Bono Base',
            v:0
        },
        {
            t:'Bono Plus',
            v:0
        },
        {
            t:'Bono Super Plus',
            v:0
        },
        {
            t:'Total Monetizado',
            v:0,
            sv:0,
            u:true,
            f:false
        }
    ],
    options: {
        credits: {
            enabled: false
        },
        title: {
            text: undefined,
        },
        chart: {
            backgroundColor: "white",
            borderColor: "#30c9d",
            //borderWidth: 2,
            reflow: true,
            allowMutatingData: false,

            spacingTop: 0,
            spacingRight: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            plotBorderWidth: 0,
            margin: [0,0,0,0]
        },
        colors:['red'],
        tooltip:{
            enabled:false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            visible: false,
        },
        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            plotLines:[
                {
                    value:undefined,
                    color:'rgba(0,0,0,0.3)'
                }
            ]
        },
        series: [
            {
                type: "line",
                marker:{
                    enabled:false
                },
                lineWidth:1,
                data: []
            }
        ]
    }
}
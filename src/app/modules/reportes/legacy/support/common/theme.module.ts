import * as Highcharts from "highcharts";
export function theme_tb2() {
  let theme={ 
    class:'mat-table-1',
    width:'100%',
    edit:false,
    paginator:true,
    paginator_size:10}
  return theme
}

export function theme_tb3() {
  let theme={ 
    class:'mat-table-1',
    width:'100%',
    edit:false,
    paginator:true,
    paginator_size:30}
  return theme
}

export function theme_tb5() {
  let theme={ 
    class:'mat-table-1',
    width:'100%',
    edit:false,
    paginator:true,
    paginator_size:30}
  return theme
}

export function theme_tb4() {
  let theme={ 
    class:'mat-table-1',
    width:'100%',
    edit:false,
    paginator:true,
    paginator_size:10}
  return theme
}

export function theme_tb1(){
  let theme={ 
    class:'mat-table-1',
    width:'100%',
    edit:false,
    paginator:false,
    paginator_size:0}
  return theme
}

export function theme_gp1(){
  let chartTheme = {
    colors: [
      "#0191CE",
      "#164D90",
      "green",
      "orange",
      "red"
    ],
    xAxis: {
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'En número',
        style: {
          fontWeight: 'bold'
        },
      },
    },
    chart: {
      backgroundColor: "#efefef",
      borderColor: "#efefef",
      border: 2,
      reflow:true,
    },
    title: {
      style: {
        color: "#164D90",
        font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: "green",
        //font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,
      //pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      //valueSuffix: '%'
    },
    legend: {
      symbolRadius: 0,

    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1
          }
        },
        connectNulls: true
      },
      area: {},
       
    }
  };
  return chartTheme
}
 

export function theme_gp2(){
  let chartTheme = {
    colors: [
      "#0191CE",
      "#164D90",
      "green",
      "orange",
      "red"
    ],
    xAxis: {
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'En número',
        style: {
          fontWeight: 'bold'
        },
      },
    },
    chart: {
      backgroundColor: "#efefef",
      borderColor: "#efefef",
      border: 2,
      reflow:true,
    },
    title: {
      style: {
        color: "#164D90",
        font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: "green",
        //font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,

      //valueSuffix: '%'
    },
    legend: {
      symbolRadius: 0
    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1
          }
        },
        connectNulls: true
      },
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    }
  };
  return chartTheme
}
export function theme_gp3(){

  let chartTheme = {
    lang: {
      months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      weekdays: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
      shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
      resetZoom: "<b>Restablecer Zoom</b>",
      resetZoomTitle: "restablece el nivel de zoom 1: 1",
      printChart: 'Aaaa',
      thousandsSep: ','
  },
    xAxis: {
      minTickInterval: 365 * 24 * 36e5,
      type: 'datetime',
      plotBands:[],
      labels: {
        align: 'left'
      },
      plotOptions:{
        column:{
          stacking:''
        }
      }
    },
    yAxis: {
      startOnTick: true,
      endOnTick: false,
      maxPadding: 0.35,
      title: {
        text: ''
      }
    },
    chart: {
      type: 'area',
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
      /*scrollablePlotArea: {
        minWidth: 600
      }*/
    },
    accessibility: {
      description: 'Annotated line graph.'
    },
    title: {
      style: {
        color: '#164D90',
        fontWeight: 'bold'
      }
    },
    subtitle: {
      style: {
        color: 'green',
      }
    },
    credits: {
      enabled: false
    },
    tooltip: { 
      style: {
        width: '250px'
      }
    },
    legend: {
      enabled: false
    },
    
    area: {}
  };
  
  return chartTheme
}

export function theme_gp4(){
  let chartTheme = {
    colors: [
      "#0191CE",
      "#164D90",
      "green",
      "orange",
      "red"
    ],
    xAxis: {
      crosshair: true
    },
    yAxis: {
      title: {
        text: 'En número',
        style: {
          fontWeight: 'bold'
        },
      },
    },
    chart: {
      backgroundColor: "#efefef",
      borderColor: "#efefef",
      border: 2,
      reflow:true,
    },
    title: {
      style: {
        color: "#164D90",
        font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: "green",
        //font: 'bold 13px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,
      //valueSuffix: '%'
    },
    legend: {
      symbolRadius: 0
    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1
          }
        },
        connectNulls: true
      },
      showInLegend : true,
      area: {}
    }
  };
  return chartTheme
}
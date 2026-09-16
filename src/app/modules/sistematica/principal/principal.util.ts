export const varsIconSet=['work','groups','visibility','battery_6_bar','battery_3_bar','battery_1_bar','grade','assignment_late','sunny','assignment_ind','group_work','difference'];

export const dsMainCards = [
    {
        des: 'Var. Cartera (M)',
        val: '-155000.585',
        ico: varsIconSet[0],
        pre_v: 'S/.',
        post_v: '',
        format:{type:'decimal'},
        meta:'12500',
        avan:'0'
    },
    {
        des: 'Var. Clientes',
        val: '-2500',
        ico: varsIconSet[1],
        pre_mv: '',
        post_v: '',
        format:{type:'integer'},
        meta:'1000',
        avan:'0'
    },
    {
        des: 'Efectividad -30 a 0',
        val: '72.36',
        ico: varsIconSet[3],
        pre_mv: '',
        post_v: '%',
        format:{type:'decimal'},
        meta:'78',
        avan:'92.76'
    },
    {
        des: 'Efectividad 1 a 30',
        val: '92.34',
        ico: varsIconSet[4],
        pre_mv: '',
        post_v: '%',
        format:{type:'decimal'},
        meta:'98.8',
        avan:'93.46'
    }
];

export const dsGraphDesem = {
    credits: {
      enabled: false
    },
    title: {
      text: undefined
    },
    colors: ["#8E6765", "#E35B56", "lightgrey"],
    yAxis: {
      title: {
        text: 'Cumplimiento (%)'
      }
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        },
        marker: {
          enabled: false
        }
        //pointStart: 1
      }
    },
    legend: {
      itemStyle: {
        'font-size': '10px'
      }
    },
    series: [
      {
        name: 'Monto',
        data: []
      },
      {
        name: 'Operaciones',
        data: []
      },
      {
        name: 'Dias',
        data: []
      }
    ]
  };
export const detalle2Config = {
    loading: true,
    items: [
      {
        title:''
      },
      {
        title:''
      },
      {
        title:''
      },
      {
        title:'Clientes Bancarizados'
      },
      {
        title:''
      },
      {
        title:''
      }
    ],
    opts: {
      style: {
        'font-size': '10px'
      },
      header: {
        style: {
          background: '#0098E0',
          color: 'white'
        },
        cellStyle: {
          //'height': '32px',
          'min-width': '85px',
          'font-size': '10px'
        }
      },
      body: {
        cellStyle: {
          'height': '20px',
          'padding': '3px'
        }
      }
    },
    header1: [
      {
        key: 'des_var',
        label: 'Variable'
      },
      {
        label: 'Cierre',
        subs: [
          {
            key: 'f1',
            label: 'Anterior',
            style: {
              'min-width': '80px',
              'width': '80px'
            },
            cellStyle: {
              'text-align': 'right'
            },
            format: {
              type: 'decimal'
            }
          },
          {
            key: 'f2',
            label: 'Actual',
            style: {
              'min-width': '80px',
              'width': '80px'
            },
            cellStyle: {
              'text-align': 'right'
            },
            format: {
              type: 'decimal'
            }
          },
          {
            key: 'diff',
            label: 'Variación',
            style: {
              'min-width': '80px',
              'width': '80px'
            },
            cellStyle: {
              'text-align': 'right'
            },
            format: {
              type: 'decimal'
            }
          }
        ]
      }
    ]
  }
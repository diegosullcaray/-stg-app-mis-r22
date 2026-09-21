export const cabeceraConfig = {
    nombre: '--',
    cargo:'--',
    puntaje:'--',
    posicion: '--',
    boton: false
}; 
export const preguntasConfig = {
    p1: { desc: '', val: '--' },
    p2: { desc: '', val: '--' },
    p3: { desc: '', val: '--' },
    p4: { desc: '', val: '--' },
    p5: { desc: '', val: '--' },
    p6: { desc: '', val: '--' },
};
export const bonosConfig = {
    a1: { desc: '', sub: '', val: '--' },
    a2: { desc: '', sub: '', val: '--' },
};
export const historicoConfig = {
    data:[],
    anio: ['', '', '', '', '', '', '', '', '', '', '', '', ''], 
    amones: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    cab: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    cabvar: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    puntFinal:'',
    posicion:'',
    datavar:[],
    Desc1:'',
    Desc2:'',
    cabstyle: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
    datavarCab:[],
};
export const desempenioConfig = {
    i1: {
        title: 'Puntaje Base',
        type: 'line',
        options: {
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            chart: {
                backgroundColor: "whitesmoke",
                borderColor: "#efefef",
                borderWidth: 2,
                reflow: true,
                allowMutatingData: false
            },
            legend: {
                enabled: false
            },
            colors: ["green"],
            yAxis: {
                title: {
                    text: undefined
                },
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickPixelInterval: 40
            },
            xAxis: {
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickInterval: 1000 * 3600 * 24 * 30,
                type: 'datetime'
            }
        },
        hist: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    },
    i2: {
        title: 'Puntos Extras',
        type: 'column',
        options: {
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            chart: {
                backgroundColor: "whitesmoke",
                borderColor: "#efefef",
                borderWidth: 2,
                reflow: true,
                allowMutatingData: false
            },
            legend: {
                enabled: false
            },
            colors: ["#fbc02d"],
            yAxis: {
                title: {
                    text: undefined
                },
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickPixelInterval: 40
            },
            xAxis: {
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickInterval: 1000 * 3600 * 24 * 30,
                type: 'datetime'
            }
        },
        hist: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    },
    i3: {
        title: 'Candado',
        hist: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};
export const baseDinamizadoresConfig = {
    line: {
        title: '--',
        type: 'line',
        options: {
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            chart: {
                backgroundColor: "whitesmoke",
                borderColor: "#30c9d",
                borderWidth: 2,
                reflow: true,
                allowMutatingData: false
            },
            legend: {
                enabled: false
            },
            colors: ["green"],
            yAxis: {
                title: {
                    text: undefined
                },
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickPixelInterval: 40
            },
            xAxis: {
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickInterval: 1000 * 3600 * 24 * 30,
                type: 'datetime'
            }
        },
        hist: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    },
    column: {
        title: '--',
        type: 'column',
        options: {
            credits: {
                enabled: false
            },
            title: {
                text: undefined
            },
            chart: {
                backgroundColor: "whitesmoke",
                borderColor: "#efefef",
                borderWidth: 2,
                reflow: true,
                allowMutatingData: false
            },
            legend: {
                enabled: false
            },
            colors: ["green"],
            yAxis: {
                title: {
                    text: undefined
                },
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickPixelInterval: 40
            },
            xAxis: {
                labels: {
                    style: {
                        'font-size': '8px'
                    }
                },
                tickInterval: 1000 * 3600 * 24 * 30,
                type: 'datetime'
            }
        },
        hist: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
    }
};
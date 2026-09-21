export const tableOpts = {
    style: {
        'font-size': '12px'
    },
    header: {
        style: {
            //'background': '#0081FF',
            //'color': 'white',
            //'background': 'white',
            'font-size': '12px',
            //'opacity': '0.6'
        }
    },
    body: {
        //stickyCols:[80],
        style: {
            'color': '#004481'
        }
    }
}

export const tableHeaders = [
    {
        label: 'Cuenta',
        key: 'cod_cli',
        cellStyle: {
            'position': 'sticky',
            'z-index': '90',
            'min-width': '60px',
            'width': '60px',
            'max-width': '60px',
            'left': '0px',
            'background': 'white'
        },
        style: {
            'position': 'sticky',
            'min-width': '60px',
            'width': '60px',
            'max-width': '60px',
            'z-index': '90',
            'left': '0px',
            'background': '#035096'
        }
    },
    {
        label: "Nombre",
        key: "nom_cli",
        style: {
            'left': '70.8px',
            'position': 'sticky',
            'z-index': '90',
            'background': '#035096',
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        cellStyle: {
            'left': '70.8px',
            'position': 'sticky',
            'z-index': '90',
            'background': 'white',
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        format: {
            type: 'truncate',
            params: {
                limit: 10
            }
        }
    },
    {
        label: "Asesor",
        key: "nom_sec",
        style: {
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        format: {
            type: 'truncate',
            params: {
                limit: 10
            }
        }
    },
    {
        label: "Unidad",
        key: "uni",
        style: {
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        format: {
            type: 'truncate',
            params: {
                limit: 10
            }
        }
    },
    {
        label: "Corredor",
        key: "corr",
        style: {
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        format: {
            type: 'truncate',
            params: {
                limit: 10
            }
        }
    },
    {
        label: "Territorio",
        key: "terr",
        style: {
            'min-width': '87px',
            'width': '87px',
            'max-width': '87px'
        },
        format: {
            type: 'truncate',
            params: {
                limit: 10
            }
        }
    },
    {
        label: "Oferta Máxima",
        key: "ofer_max",
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Gestionado",
        key: "gest",
        style: {
            'min-width': '70px',
            'width': '70px'
        }
    },
    {
        label: "Estado",
        key: "est_soli",
        style: {
            'min-width': '70px',
            'width': '70px'
        }
    },
    {
        label: "Saldo SF Mes Anterior",
        key: "sal_sf_ant_t",
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Saldo SF Mes Anterior Pyme",
        key: "sal_sf_ant_pym",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Max. Deuda SF 12m",
        key: "max_sal_sf_12m",
        style: {
            'min-width': '80px',
            'width': '80px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Saldo Mes Anterior FC",
        key: "sal_ant",
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Max. Deuda 12m FC",
        key: "max_sal_12m",
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Potencial Referencial",
        key: "pot_ref",
        style: {
            'min-width': '70px',
            'width': '70px'
        },
        format: {
            type: 'integer',
        }
    },
    {
        label: "Calificación SBS",
        key: "cla_sbs",
        style: {
            'min-width': '80px',
            'width': '80px'
        }
    },
    {
        label: "Nivel de Riesgo",
        key: "niv_rie",
        style: {
            'min-width': '70px',
            'width': '70px'
        }
    },
    {
        label:"Base",
        key: "desc_evento",
        style: {
            'min-width': '70px',
            'width': '70px'
        }
    }
]
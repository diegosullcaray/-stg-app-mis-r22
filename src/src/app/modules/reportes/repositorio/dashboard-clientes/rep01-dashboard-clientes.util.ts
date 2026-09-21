import { STG_GRID_STYLE } from "app/core/screen/components/stg-table/stg-table.util";

export const loadingConf = {
    height: '307px'
};

export const tableConf = {
    table: {
        height: '550px',
        //grid: '1px solid rgb(31, 73, 125)'
        //grid: '1px solid rgb(216, 216, 216)'
        grid: STG_GRID_STYLE
    },
    header: {
        'min-width': '100px'
    }
};

export const selUniData = [
    /*{
        "cod_rel":0,
        "des_rel":"TOTAL",
    },*/
    {
        "cod_rel":1,
        "des_rel":"CREDITOS",
    },
    /*{
        "cod_rel":2,
        "des_rel":"CAPTACIONES",
    },
    {
        "cod_rel":3,
        "des_rel":"SEGUROS",
    }*/
];

export const selGenData = [
    {
        "cod_rel":"T",
        "des_rel":"TOTAL"
    },
    {
        "cod_rel":"M",
        "des_rel":"MASCULINO"
    },
    {
        "cod_rel":"F",
        "des_rel":"FEMENINO"
    },
    {
        "cod_rel":"-",
        "des_rel":"VACIO"
    }
];

export const selPaisData = [
    {
        "cod_rel":-1,
        "des_rel":"TOTAL"
    },
    {
        "cod_rel":604,
        "des_rel":"PERU"
    },
    {
        "cod_rel":218,
        "des_rel":"ECUADOR"
    },
    {
        "cod_rel":170,
        "des_rel":"COLOMBIA"
    },
    {
        "cod_rel":862,
        "des_rel":"VENEZUELA"
    },
    {
        "cod_rel":32,
        "des_rel":"ARGENTINA"
    },
    {
        "cod_rel":152,
        "des_rel":"CHILE"
    },
    {
        "cod_rel":76,
        "des_rel":"BRASIL"
    },
    {
        "cod_rel":858,
        "des_rel":"URUGUAY"
    },
    {
        "cod_rel":68,
        "des_rel":"BOLIVIA"
    },
    {
        "cod_rel":600,
        "des_rel":"PARAGUAY"
    }
];

export const selEdadData = [
    {
        "cod_rel":0,
        "des_rel":"TOTAL"
    },
    {
        "cod_rel":1,
        "des_rel":"<=30"
    },
    {
        "cod_rel":2,
        "des_rel":">30 y <=35"
    },
    {
        "cod_rel":3,
        "des_rel":">35 y <=50"
    },
    {
        "cod_rel":4,
        "des_rel":">50 y <=60"
    },
    {
        "cod_rel":5,
        "des_rel":">60"
    }
];

export const selEntData = [
    {
        "cod_rel":0,
        "des_rel":"TOTAL"
    },
    {
        "cod_rel":1,
        "des_rel":"URBANO"
    },
    {
        "cod_rel":2,
        "des_rel":"RURAL"
    }
];
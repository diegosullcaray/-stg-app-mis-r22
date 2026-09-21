const tableStyleFn = function (row: any) {
    if (row.style == 1) {
        return {
            "background": "#E9E8E8",
            "font-weight": "bold",
            "font-color": "#164d90"
        };
    }
    return { "font-color": "#164d90" };
}

export const tableConfOPTS = { 
    body: {
        rowStyleFn: tableStyleFn

    }

};
 
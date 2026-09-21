import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { UserService } from "app/system/admin/services/user.service";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MonSalidasAntService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    isAdmin: boolean;

    constructor(private winderService: WinderService, private user: UserService, private antAdmin: ModSysAdminService) {
        super({
            port: 6304,
            secret: "8982D9BA889F825E1360E0C594653C68",
            appId: "rep2"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = profile.email;
        this.isAdmin = profile.tip_use === 0;
    }

    public getDataSources(tip_cod: number, cod_rel: string, fec: string): Observable<IWinderResponse> {
        return this.getSimpleResponseString("mon_sali_ret.resultados", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec }, "resultado");
        // let r;
        // if (tip_cod == 7) {
        //     r = this.ds1;
        // } else {
        //     r = this.ds2;
        // }
        // return timer(1000).pipe(map(() => (r)));
    }

    public getDetail(tip_cod: number, cod_rel: string, fec: string, tip: number,top:number): Observable<IWinderResponse> {
        // if (tip == 1) {
        //     return timer(1000).pipe(map(() => (this.dd1)));
        // } else {
        //     return timer(1000).pipe(map(() => (this.dd2)));
        // }
        return this.getSimpleResponseString("mon_sali_ret.detalle", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec,tip: tip, top: top }, "resultado");
    }































    ds2 = {
        code: "200",
        headers: [],
        body: {
            resultado: {
                cards: [
                    {
                        lbl: "Card 1",
                        val: 12365,
                        typ: "number",
                        lbl2: "Var Mes:",
                        val2: "12365",
                    },
                    {
                        lbl: "Card 2",
                        val: 65465,
                        typ: "number"
                    },
                    {
                        lbl: "Card 3",
                        val: 35466,
                        typ: "number"
                    },
                    {
                        lbl: "Card 4",
                        val: 0.966,
                        tl: -1,//-1 / 0 / 1 ------- -99
                        typ: "percent",
                        lbl2: "Meta:",
                        val2: 0.95
                    },
                    {
                        lbl: "Card 5",
                        val: 12310,
                        typ: "number"
                    }
                ],
                tbl: [
                    { "tip_cod": 20, "cod_rel": 1, "desc": "CORREDOR 1", "sali1": 1526, "sali3": 3215, "ret": 0.9963, "clive": 3365 },
                    { "tip_cod": 20, "cod_rel": 2, "desc": "CORREDOR 2", "sali1": 554, "sali3": 1325, "ret": 0.852, "clive": 1238 },
                    { "tip_cod": 20, "cod_rel": 3, "desc": "CORREDOR 3", "sali1": 845, "sali3": 8425, "ret": 0.9102, "clive": 2159 },
                    { "tip_cod": 20, "cod_rel": 4, "desc": "CORREDOR 4", "sali1": 741, "sali3": 3268, "ret": 0.8745, "clive": 6524 }
                ]
            }
        }
    };


    ds1 = {
        code: "200",
        headers: [],
        body: {
            resultado: {
                cards: [
                    {
                        lbl: "Stock de clientes",
                        val: 12365,
                        typ: "number",
                        lbl2: "Var Mes:",
                        val2: "12365",
                    },
                    {
                        lbl: "Salidas en el mes",
                        val: 65465,
                        typ: "number"
                    },
                    {
                        lbl: "Salidas el los últimos 3 meses",
                        val: 35466,
                        typ: "number"
                    },
                    {
                        lbl: "Retención de clientes 3 meses",
                        val: 0.966,
                        tl: 0,//-1 / 0 / 1 ------- -99
                        typ: "percent",
                        lbl2: "Meta:",
                        val2: 0.95
                    },
                    {
                        lbl: "Clientes por vencer al cierre de mes",
                        val: 12310,
                        typ: "number"
                    }
                ],
                tbl: [
                    { "tip_cod": 21, "cod_rel": 1, "desc": "INDIVIDUAL", "sali1": 23333, "sali3": 213555, "ret": 0.95, "clive": 4500 },
                    { "tip_cod": 21, "cod_rel": 2, "desc": "GRUPAL", "sali1": 11111, "sali3": 22222, "ret": 0.98, "clive": 5500 },
                    { "tip_cod": -99, "cod_rel": -99, "desc": "SIN ASIGNAR", "sali1": 2222, "sali3": 3333, "ret": 0.99, "clive": 6500 }
                ]
            }
        }
    };

    dd1 = {
        code: "200",
        headers: [],
        body: {
            resultado: [
                { "ndoc": 456218, "nom": "CLIENTE NUMERO CON NOMBRE LARGO 1", "pri": 1, "mon_desem": 10000, "nrie": "BAJO", "fec_sali": "2025-01-31", "uni": "UNIDAD 1","ase":"ASESOR 1" },
                { "ndoc": 456214, "nom": "CLIENTE NUMERO 2", "pri": 2, "mon_desem": 5000, "nrie": "BAJO", "fec_sali": "2025-01-31", "uni": "UNIDAD 1","ase":"ASESOR 1" },
                { "ndoc": 456216, "nom": "CLIENTE NUMERO 3", "pri": 3, "mon_desem": 8000, "nrie": "BAJO", "fec_sali": "2025-01-31", "uni": "UNIDAD 2","ase":"ASESOR 2" },
                { "ndoc": 456219, "nom": "CLIENTE NUMERO 4", "pri": 4, "mon_desem": 4000, "nrie": "ALTO", "fec_sali": "2025-01-31", "uni": "UNIDAD 2","ase":"ASESOR 3" }
            ]
        }
    };

    dd2 = {
        code: "200",
        headers: [],
        body: {
            resultado: [
                { "ndoc": 456218, "nom": "CLIENTE NUMERO 1", "pri": 1, "mon_desem": 10000, "nrie": "BAJO", "fec_ven": "2025-02-04", "uni": "UNIDAD 1","ase":"ASESOR 1" },
                { "ndoc": 456214, "nom": "CLIENTE NUMERO 2", "pri": 2, "mon_desem": 5000, "nrie": "BAJO", "fec_ven": "2025-02-09", "uni": "UNIDAD 1","ase":"ASESOR 1" },
                { "ndoc": 456216, "nom": "CLIENTE NUMERO 3", "pri": 3, "mon_desem": 8000, "nrie": "BAJO", "fec_ven": "2025-02-16", "uni": "UNIDAD 2","ase":"ASESOR 2" },
                { "ndoc": 456219, "nom": "CLIENTE NUMERO 4", "pri": 4, "mon_desem": 4000, "nrie": "ALTO", "fec_ven": "2025-02-25", "uni": "UNIDAD 2","ase":"ASESOR 3" }
            ]
        }
    };
}
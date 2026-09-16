import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { UserService } from "app/system/admin/services/user.service";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class MonRanCampAntService extends AntService {
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

    public getDataSources(tip_cod: number, cod_rel: string, fec: string,flag:number,gru:number): Observable<IWinderResponse> {
        return this.getSimpleResponseString("mon_ran_camp.resultados", { tip_cod: tip_cod, cod_rel: cod_rel, fec: fec, flag_var:flag,grupo:gru }, "resultado");
        // let r;
        // if (tip_cod == 7) {
        //     r = this.ds1;
        // } else {
        //     r = this.ds2;
        // }
        // return timer(1000).pipe(map(() => (r)));
    }

    public getDetail(tip_cod: number, cod_rel: string,cod_camp:number, fec: string): Observable<IWinderResponse> {
        // if (cod_camp == 608) {
        //     return timer(1000).pipe(map(() => (this.dd1)));
        // } else {
        //     return timer(1000).pipe(map(() => (this.dd2)));
        // }
        return this.getSimpleResponseString("mon_ran_camp.detalle", { tip_cod: tip_cod, cod_rel: cod_rel,cod_camp:cod_camp, fec: fec}, "resultado");
    }























    ds2 = {
        code: "200",
        headers: [],
        body: {
            resultado: {
                meta: {
                    num_gru: 3
                },
                table: [
                    {
                        "tip_cod": 19, "cod_rel": 1, "flag_niv": 0, "rank": 1, "des_rel": "Corredor 3",
                        "real": 1150, "meta": 1200, "avan": 0.9567, "num_sec": 110, "prom_var": 10.05,
                        "bas_gc_01": 450, "ges_gc_01": 350, "desem_gc_01": 120, "rat_gc_01": 0.7778,
                        "bas_gc_02": 350, "ges_gc_02": 250, "desem_gc_02": 100, "rat_gc_02": 0.7143,
                        "bas_gc_03": 350, "ges_gc_03": 250, "desem_gc_03": 100, "rat_gc_03": 0.7143
                    },
                    {
                        "tip_cod": 19, "cod_rel": 1, "flag_niv": 0, "rank": 2, "des_rel": "Corredor 2",
                        "real": 1150, "meta": 1200, "avan": 0.9567, "num_sec": 110, "prom_var": 10.05,
                        "bas_gc_01": 450, "ges_gc_01": 350, "desem_gc_01": 120, "rat_gc_01": 0.7778,
                        "bas_gc_02": 350, "ges_gc_02": 250, "desem_gc_02": 100, "rat_gc_02": 0.7143,
                        "bas_gc_03": 350, "ges_gc_03": 250, "desem_gc_03": 100, "rat_gc_03": 0.7143
                    },
                    {
                        "tip_cod": 19, "cod_rel": 1, "flag_niv": 0, "rank": 3, "des_rel": "Corredor 1",
                        "real": 1150, "meta": 1200, "avan": 0.9567, "num_sec": 110, "prom_var": 10.05,
                        "bas_gc_01": 450, "ges_gc_01": 350, "desem_gc_01": 120, "rat_gc_01": 0.7778,
                        "bas_gc_02": 350, "ges_gc_02": 250, "desem_gc_02": 100, "rat_gc_02": 0.7143,
                        "bas_gc_03": 350, "ges_gc_03": 250, "desem_gc_03": 100, "rat_gc_03": 0.7143
                    },
                    {
                        "tip_cod": 20, "cod_rel": 3, "flag_niv": 1, "rank": 3, "des_rel": "Territorio 3",
                        "real": 11500, "meta": 12000, "avan": 0.9567, "num_sec": 1100, "prom_var": 10.05,
                        "bas_gc_01": 4500, "ges_gc_01": 3500, "desem_gc_01": 1200, "rat_gc_01": 0.7778,
                        "bas_gc_02": 3500, "ges_gc_02": 2500, "desem_gc_02": 1000, "rat_gc_02": 0.7143,
                        "bas_gc_03": 3500, "ges_gc_03": 2500, "desem_gc_03": 1000, "rat_gc_03": 0.7143
                    }
                ]
            }
        }
    };


    ds1 = {
        code: "200",
        headers: [],
        body: {
            resultado: {
                meta: ['Campaña 1', 'Campaña 2', 'Campaña 3'],
                table: [
                    {
                        "tip_cod": 20, "cod_rel": 1, "flag_niv": 0, "rank": 1, "des_rel": "Territorio 2",
                        "real": 11500, "meta": 12000, "avan": 0.9567, "num_sec": 1100, "prom_var": 10.05,
                        "bas_gc_01": 4500, "ges_gc_01": 3500, "desem_gc_01": 1200, "rat_gc_01": 0.7778,
                        "bas_gc_02": 3500, "ges_gc_02": 2500, "desem_gc_02": 1000, "rat_gc_02": 0.7143,
                        "bas_gc_03": 3500, "ges_gc_03": 2500, "desem_gc_03": 1000, "rat_gc_03": 0.7143
                    },
                    {
                        "tip_cod": 20, "cod_rel": 2, "flag_niv": 0, "rank": 2, "des_rel": "Territorio 1",
                        "real": 11500, "meta": 12000, "avan": 0.9567, "num_sec": 1100, "prom_var": 10.05,
                        "bas_gc_01": 4500, "ges_gc_01": 3500, "desem_gc_01": 1200, "rat_gc_01": 0.7778,
                        "bas_gc_02": 3500, "ges_gc_02": 2500, "desem_gc_02": 1000, "rat_gc_02": 0.7143,
                        "bas_gc_03": 3500, "ges_gc_03": 2500, "desem_gc_03": 1000, "rat_gc_03": 0.7143
                    },
                    {
                        "tip_cod": 20, "cod_rel": 3, "flag_niv": 0, "rank": 3, "des_rel": "Territorio 3",
                        "real": 11500, "meta": 12000, "avan": 0.9567, "num_sec": 1100, "prom_var": 10.05,
                        "bas_gc_01": 4500, "ges_gc_01": 3500, "desem_gc_01": 1200, "rat_gc_01": 0.7778,
                        "bas_gc_02": 3500, "ges_gc_02": 2500, "desem_gc_02": 1000, "rat_gc_02": 0.7143,
                        "bas_gc_03": 3500, "ges_gc_03": 2500, "desem_gc_03": 1000, "rat_gc_03": 0.7143
                    },
                    {
                        "tip_cod": 7, "cod_rel": 231, "flag_niv": 1,"rank":1, "des_rel": "Financiera",
                        "real": 11500, "meta": 12000, "avan": 0.9567, "num_sec": 1100, "prom_var": 10.05,
                        "bas_gc_01": 4500, "ges_gc_01": 3500, "desem_gc_01": 1200, "rat_gc_01": 0.7778,
                        "bas_gc_02": 3500, "ges_gc_02": 2500, "desem_gc_02": 1000, "rat_gc_02": 0.7143,
                        "bas_gc_03": 3500, "ges_gc_03": 2500, "desem_gc_03": 1000, "rat_gc_03": 0.7143
                    }
                ]
            }
        }
    };

    dd1 = {
        code: "200",
        headers: [],
        body: {
            resultado: [
                { "ndoc": 456218, "nom": "CLIENTE NUMERO CON NOMBRE LARGO 1", "pri": 1, "mon_desem": 10000, "nrie": "BAJO", "fec_sali": "2025-01-31", "uni": "UNIDAD 1", "ase": "ASESOR 1" },
                { "ndoc": 456214, "nom": "CLIENTE NUMERO 2", "pri": 2, "mon_desem": 5000, "nrie": "BAJO", "fec_sali": "2025-01-31", "uni": "UNIDAD 1", "ase": "ASESOR 1" },
                { "ndoc": 456216, "nom": "CLIENTE NUMERO 3", "pri": 3, "mon_desem": 8000, "nrie": "BAJO", "fec_sali": "2025-01-31", "uni": "UNIDAD 2", "ase": "ASESOR 2" },
                { "ndoc": 456219, "nom": "CLIENTE NUMERO 4", "pri": 4, "mon_desem": 4000, "nrie": "ALTO", "fec_sali": "2025-01-31", "uni": "UNIDAD 2", "ase": "ASESOR 3" }
            ]
        }
    };

    dd2 = {
        code: "200",
        headers: [],
        body: {
            resultado: [
                { "ndoc": 456218, "nom": "CLIENTE NUMERO 1", "pri": 1, "mon_desem": 10000, "nrie": "BAJO", "fec_ven": "2025-02-04", "uni": "UNIDAD 1", "ase": "ASESOR 1" },
                { "ndoc": 456214, "nom": "CLIENTE NUMERO 2", "pri": 2, "mon_desem": 5000, "nrie": "BAJO", "fec_ven": "2025-02-09", "uni": "UNIDAD 1", "ase": "ASESOR 1" },
                { "ndoc": 456216, "nom": "CLIENTE NUMERO 3", "pri": 3, "mon_desem": 8000, "nrie": "BAJO", "fec_ven": "2025-02-16", "uni": "UNIDAD 2", "ase": "ASESOR 2" },
                { "ndoc": 456219, "nom": "CLIENTE NUMERO 4", "pri": 4, "mon_desem": 4000, "nrie": "ALTO", "fec_ven": "2025-02-25", "uni": "UNIDAD 2", "ase": "ASESOR 3" }
            ]
        }
    };
}
import { Injectable } from "@angular/core";
import { AntService } from "app/core/data/remote/ant/ant-service.class";
import { ModSysAdminService } from "app/core/data/remote/instances/mod-sys-admin.service";
import { IWinderResponse } from "app/core/data/remote/winder/winder.interface";
import { WinderService } from "app/core/data/remote/winder/winder.service";
import { cloneObject } from "app/core/shared/functions.util";
import { UserService } from "app/system/admin/services/user.service";
import { Observable, timer } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ClientSummaryAntService extends AntService {
    profile: any;
    cod_bt: string;
    email: string;
    isAdmin: boolean;

    constructor(
        private winderService: WinderService,
        private user: UserService,
        private antAdmin: ModSysAdminService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
        let profile = this.user.get('profile');
        this.cod_bt = profile.cod_bt;
        this.email = profile.email;
        this.isAdmin = profile.tip_use === 0;
    }

    public getSummary(num_doc: string, tip_doc: number, pais: number): Observable<IWinderResponse> {
        //return this.getSimpleResponseString("incentivos3.lista3", { tip_cod: tip_cod, cod_rel: cod_rel, tip_cod_l: tip_cod_l }, "resultado");
        return timer(1000).pipe(map(() => (cloneObject(this.ds1))));
    }


    ds1 = {
        code: '200',
        headers: [],
        body: {
            resultado: {
                base: {
                    nam: 'Nombre1 Nombre2 Apellido1 Apellido2',
                    geo: { lat: -12.092478, lng: -77.024376 },
                    dat_ini: '2020-01-01'
                },
                contact: [
                    {
                        desc: 'Genero',
                        val: 'Mujer'
                    },
                    {
                        desc: 'Teléfono',
                        val: '123456789'
                    },
                    {
                        desc: 'Email',
                        val: 'correo@correo.com'
                    },
                    {
                        desc: 'Dirección',
                        val: 'direccion 321 distrito - region'
                    }
                ],
                blocks: [
                    {
                        title: 'Res. Creditos',
                        lab_flex: 70,
                        items: [
                            {
                                desc: 'Cuenta',
                                val: ['6002']
                            },
                            {
                                desc: 'Número de operaciones',
                                val: '3'
                            },
                            {
                                desc: 'Monto desembolsado total',
                                val: '100000'
                            },
                            {
                                desc: 'Saldo capital total',
                                val: '100000'
                            },
                            {
                                desc: 'Saldo vencido total',
                                val: '500'
                            },
                            {
                                desc: 'Nivel de riesgo',
                                val: 'bajo'
                            },
                            {
                                desc: 'Jerarquías',
                                val: [
                                    [
                                        {
                                            desc: 'Asesor',
                                            val: 'Asesor 1'
                                        },
                                        {
                                            desc: 'Unidad',
                                            val: 'Unidad 1'
                                        },
                                        {
                                            desc: 'Corredor',
                                            val: 'Corredor 1'
                                        },
                                        {
                                            desc: 'Territorio',
                                            val: 'Territorio 1'
                                        }
                                    ],
                                    [
                                        {
                                            desc: 'Asesor',
                                            val: 'Asesor 2'
                                        },
                                        {
                                            desc: 'Unidad',
                                            val: 'Unidad 2'
                                        },
                                        {
                                            desc: 'Corredor',
                                            val: 'Corredor 2'
                                        },
                                        {
                                            desc: 'Territorio',
                                            val: 'Territorio 2'
                                        }
                                    ]
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    };
}
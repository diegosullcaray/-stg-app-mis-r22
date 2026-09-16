import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonImrService } from '../compartido/servicios/mon-imr.service';
import { MonImrAntService } from '../compartido/servicios/mon-imr-ant.service';
import { StgAppLoaderService } from 'app/core/screen/components/stg-app-loader/stg-app-loader.service';
import { headers1, headers2, tblOpts } from './lista-clientes.util';
import { UserService } from 'app/system/admin/services/user.service';


@Component({
    selector: 'app-rep2-lista-clientes-mon-imr',
    templateUrl: './lista-clientes.component.html',
    styleUrls: ['./lista-clientes.component.scss'],
})
export class ListaClientesComponent implements OnInit {
    config: any;
    show_tbl: boolean;

    dataSource: any;
    top: number;
    headers: any;
    tableOpts: any;

    curr_hier: any;
    curr_fec: string;
    max_len: number;
    curr_pointer: number;

    is_admin: boolean;

    constructor(
        private user: UserService,
        private sali: MonImrService,
        private ant: MonImrAntService,
        private loader: StgAppLoaderService,
        private antSali: MonImrAntService,
        private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.config = this.sali.detalle;
        let profile = this.user.get('profile');
        this.is_admin = profile.tip_use === 0;
        if (this.config.firstLoad) {
            this.loader.open();
            this.curr_fec = moment(this.sali.curr_fec, "YYYYMMDD").format("DD-MMM-YY");

            let row = this.config.evt.row;
            let key = this.config.evt.key;
            this.max_len = this.config.evt.value;
            //console.log(this.max_len);
            let tip_cod = row.tip_cod;
            this.curr_hier = {
                des_rel: row.desc,
                des_lab: ""
            };
            if (tip_cod == 18) {
                this.curr_hier.des_lab = "Unidad";
            } else if (tip_cod == 19) {
                this.curr_hier.des_lab = "Corredor";
            } else if (tip_cod == 20) {
                this.curr_hier.des_lab = "Territorio";
            } else if (tip_cod == 21) {
                this.curr_hier.des_lab = "Grupo";
            } else {
                this.curr_hier.des_lab = "Total";
            }
            this.top = 10;
            this.curr_pointer = 0;
            /*if (key == "sali1" || key == "sali3") {
                this.headers = headers1;
            } else {
                this.headers = headers2;
            }*/
            this.headers = headers1;
            this.tableOpts = tblOpts;
            this.data();
        }
    }

    private data() {
        let r = this.config.evt.row;
        let fs = 1;
        //console.log(this.config.evt.key );
        if (this.config.evt.key == "sali2") {
            fs = 2;
        } else if (this.config.evt.key == "sali3") {
            fs = 3;
        }else if (this.config.evt.key == "sali4") {
            fs = 4;
        }else if (this.config.evt.key == "sali5") {
            fs = 5;
        }


        this.antSali.getDetail(r.tip_cod, r.cod_rel, this.sali.curr_fec, fs, this.top).subscribe(x => {
            this.dataSource = x.body.resultado;
            this.config.firstLoad = false;
            this.show_tbl = true;
            this.loader.close();
        });
        //console.log(fs);
    }

    changeTop(top: number, idx: number) {
        this.top = top;
        this.curr_pointer = idx;
        this.loader.open();
        this.show_tbl = false;
        //this.config.loading = true;
        this.data();
    }

    getChipStyle(idx: number) {
        if (idx == this.curr_pointer) {
            return {
                'background-color': '#007bff',
                'color': 'white'
            };
        } else {
            return {
                'background-color': 'white',
                'color': 'rgba(59, 130, 246)'
            };
        }

    }

    ddEvent(evt: any) {
        /*if (evt.key == 'nom' && this.is_admin) {
            this.router.navigate(['../cliente'], { relativeTo: this.activatedRoute, skipLocationChange: true });
        }*/
    }
}


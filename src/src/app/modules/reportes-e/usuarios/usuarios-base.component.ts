import { cloneObject, isNullOrUndefined } from "app/core/shared/functions.util";
import { InFormDialogService } from "app/modules/shared/components/in-form-dialog/in-form-dialog.service";
import { Subscription } from "rxjs";
import { ModReportesEService } from "../compartido/servicios/mod-reportes-e.service";
import { ReportesEService } from "../compartido/servicios/reportes-e.service";

export abstract class UsuariosBaseComponent {
    alertState = "closed";
    alertHide = true;
    alertMsg: string;
    resultState: string;

    reportsDataSource: any[];
    usersDataSource: any;
    private usersDataSourceA: any;
    private usersDataSourceO: any

    listOptions: any;

    subsSubmit: Subscription;

    disabledAddUser: boolean;
    disabledRemoveUser: boolean;
    disabledRefreshUser: boolean;

    spinn: boolean;
    submit: boolean;
    currUser: any;

    constructor(public antService: ModReportesEService, public reportesE: ReportesEService) { }

    destroy() {
        this.subsSubmit.unsubscribe();
    }

    init() {
        this.spinn = false;
        this.submit = false;

        this.disabledAddUser = true;
        this.disabledRemoveUser = true;
        this.disabledRefreshUser = true;

        this.usersDataSourceA = {};
        this.usersDataSourceO = {};
        this.listOptions = {
            style: {
                background: '#F7F7F8'
            },
            body: {
                hover: {
                    enabled: true
                },
                selection: {
                    enabled: true
                },
                loading: {
                    enabled: false
                }
            }
        };

        this.subsSubmit = this.reportesE.onSubmitForm$.subscribe(x => {
            let v = x.cod_bt.value;
            this.usersDataSource.value.push({ cod_bt: v });
            this.submit = true;
        });


        this.usersDataSource = { value: [] };
        this.reportsDataSource = [{ id: '_ALL_', name: 'Todos' }].concat(this.reportesE.reportList);
    }

    openAlert(): void {
        this.alertState = 'open';
        this.alertHide = false;
        setTimeout(() => {
            this.alertState = 'closed';
        }, 2500);
    }

    private alertSR() {
        this.resultState = "warn";
        this.alertMsg = "Sin registros.";
        this.openAlert();
    }

    selectUser(evt: any) {
        this.disabledRemoveUser = false;
        this.currUser = evt;
    }

    selectReport(evt: any) {
        this.disabledAddUser = true;
        this.disabledRemoveUser = true;
        this.disabledRefreshUser = true;
        this.usersDataSource = { id: evt.id, value: [] };

        let uds = this.usersDataSourceA[evt.id];
        if (uds) {
            this.usersDataSource.value = uds;
            this.disabledAddUser = false;
            this.disabledRefreshUser = false;
        } else {
            this.spinn = true;
            this.antService.getObjectUsers(evt.id).subscribe(x => {
                let res = x.body.resultado;
                let u: string = res.row ? res.row['use_lis'] : undefined;
                let dr = [];
                if (res.code !== 'void' && !isNullOrUndefined(u) &&u!='') {
                    let ds = [];
                    u.split(',').forEach(x => ds.push({ cod_bt: x }));
                    dr = ds;
                }
                this.usersDataSource.value = dr;
                this.usersDataSourceA[evt.id] = dr;
                this.usersDataSourceO[evt.id] = cloneObject(dr);
                this.disabledAddUser = false;
                this.disabledRefreshUser = false;
                this.spinn = false;
                if (dr.length == 0) {
                    this.alertSR();
                }
            });
        }



    }

    addUser() {
        this.reportesE.showFormDialog();
    }

    removeUser() {
        let ds = this.usersDataSource;
        let idx = ds.value.indexOf(this.currUser);
        ds.value.splice(idx, 1);
        this.disabledRemoveUser = true;
        this.submit = true;
    }

    refreshUser() {
        let ds = this.usersDataSource;
        let ov = cloneObject(this.usersDataSourceO[ds.id]);
        this.usersDataSourceA[ds.id] = ov;
        this.usersDataSource.value = ov;
    }

    saveUsers() {
        let su = [];
        for (const k in this.usersDataSourceA) {
            let v = this.usersDataSourceA[k];
            let av =[];
            v.forEach((x:any)=>{
                av.push(x.cod_bt);
            });
            let u = {
                id: k,
                val: av.join()
            }
            su.push(u);
        }
        this.reportesE.openLoader();
        this.antService.postObjectUsers(su).subscribe(x=>{
            this.reportesE.closeLoader();
        });
    }

    abstract navMain(): void;


}
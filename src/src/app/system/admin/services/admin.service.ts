import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AdDialogComponent } from "../components/ad-dialog/ad-dialog.component";
import { AltUserDialogComponent } from "../components/alt-user-dialog/alt-user-dialog.component";
import { SessionEndDialogComponent } from "../components/session-end-dialog/session-end-dialog.component";
import { UserService } from "./user.service";
import { StgWindowConfig } from "app/core/screen/components/stg-window/stg-window.config";

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    //private 

    constructor(private user: UserService, public dialog: MatDialog) { }

    openAltUserDialog(): void {
        const dialogConfig = new MatDialogConfig();
        let as = this.user.get('alternates');
        dialogConfig.data = {
            alts: as
        };
        const dialogRef = this.dialog.open(AltUserDialogComponent, dialogConfig);
    }

    disableAltUserBtn() {
        let alts = this.user.get('alternates');
        return this.user.isAlt || !alts || alts.length == 0;
    }

    openAdDialog(): void {
        /*let cfg = new StgWindowConfig();
        cfg.width="860px";
        cfg.height="550px";
        cfg.disableClose = false;
        th1is.dialog.open(AdDialogComponent,cfg);*/
        this.dialog.open(AdDialogComponent);
    }
    
    openSessionEndDialog(){
        this.dialog.open(SessionEndDialogComponent,{ disableClose: true});
    }
}
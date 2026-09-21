import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LocalStoreService } from "app/core/data/local/local-store.service";
import { TokenService } from "app/core/shared/token.service";
import { AuthService } from "app/system/session/authentication/auth.service";
import { environment } from "environments/environment";

@Component({
    selector: 'session-end-dialog',
    templateUrl: './session-end-dialog.component.html',
    styleUrls: ['./session-end-dialog.component.scss']
})
export class SessionEndDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<SessionEndDialogComponent>, 
        public dialog: MatDialog,
        private router: Router,
        private tokenService: TokenService) {
        
    }

    actionPerformed(){
        this.tokenService.clearToken();
        this.dialog.closeAll();
        //this.router.navigateByUrl(environment.rootDomain);
        window.open(environment.rootDomain,"_self")
    }

    ngOnInit(): void {

    }
}
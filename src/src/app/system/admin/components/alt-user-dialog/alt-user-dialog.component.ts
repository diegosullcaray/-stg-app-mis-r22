import { SelectionModel } from "@angular/cdk/collections";
import { Inject, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LoginService } from "app/system/session/views/login/login.service";

@Component({
    selector: 'app-alt-user',
    templateUrl: './alt-user-dialog.component.html',
    styleUrls: ['./alt-user-dialog.component.scss']
})
export class AltUserDialogComponent implements OnInit {
    altData: any;
    
    selection = new SelectionModel<any>(false, []);

    constructor(@Inject(MAT_DIALOG_DATA) data,private login:LoginService,private dialogRef: MatDialogRef<AltUserDialogComponent>) {
        this.altData = data.alts;
    }

    selectItem(item: any) {
        this.selection.toggle(item);
        //this.onSelectRow.emit(row);
    }

    actionPerformed(){
        let alt = this.selection.selected[0];
        this.dialogRef.close();
        this.login.onAltLogin(alt.email_alt,alt.nombre_alt);
    }

    ngOnInit(): void {

    }
}
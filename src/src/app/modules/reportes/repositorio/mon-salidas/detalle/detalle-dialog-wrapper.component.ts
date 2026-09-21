import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { DetalleDialogComponent } from "./detalle-dialog.component";
import { StgWindowConfig } from "app/core/screen/components/stg-window/stg-window.config";

@Component({
    template: `
    <ng-template>
        <router-outlet></router-outlet>
    </ng-template>
  `
})
export class DetalleDialogWrapperComponent implements OnInit {
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.openDialog();
    }

    private openDialog() {
        const dialogConfig = new StgWindowConfig();
        dialogConfig.width = '700px';
        dialogConfig.height = '480px';
        //dialogConfig.disableClose = true;
        const dialog = this.dialog.open(DetalleDialogComponent, dialogConfig)
        dialog.componentInstance.contentTemplate = this.templateRef;

        dialog.afterClosed().subscribe(result => {
            this.router.navigate(["../"], {
                relativeTo: this.route
            });
        });
    }
}

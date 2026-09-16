import { AfterViewInit, Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { bottomAlert } from "app/core/screen/animations/animations.util";
import { AnalistaService } from "../compartido/servicios/analista.service";
import { DetalleBaseComponent } from "./detalle-base.component";

@Component({
    selector: 'app-detalle-dialog-cliente',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleDialogComponent extends DetalleBaseComponent implements OnInit,AfterViewInit {
    dataRef:any;
    constructor(
        public analista: AnalistaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dialogRef: MatDialogRef<DetalleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        super(analista);
        this.dataRef=data;
    }

    ngAfterViewInit(): void {
        //this.router.navigate(['cliente'], { relativeTo: this.dataRef.activatedRoute });
        //this.router.navigate([{ outlets: { analistaDetalleContent: [ './cliente'] }}]);
    }

    ngOnInit(): void {
        this.init();
    }

    navMain() {
        this.dialogRef.close();
    }
}
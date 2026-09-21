import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import SwiperCore, {
    Navigation,
    Pagination,
    EffectCoverflow
} from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

@Component({
    selector: 'app-ad',
    templateUrl: './ad-dialog.component.html',
    styleUrls: ['./ad-dialog.component.scss']
})
export class AdDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<AdDialogComponent>) { }

    ngOnInit() {
    }

    goToLink(url: string) {
        window.open(url, "_blank");
    }
}
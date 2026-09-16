import { ActivatedRoute, Router } from "@angular/router";

export abstract class ContenedorBaseComponent {

    constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

    navMain() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }

    navRoot() {
        this.router.navigateByUrl('/app/administracion');
    }

}
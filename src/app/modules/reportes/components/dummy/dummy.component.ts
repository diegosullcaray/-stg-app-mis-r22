import { Component } from "@angular/core";

@Component({
    selector: 'dummy-comp',
    templateUrl: './dummy.html'
})
export class DummyComponent {
    constructor() { }

    ngOnInit() {
        window.location.href = 'https://www.google.com/url?q=https://sites.google.com/confianza.pe/imparables/p%25C3%25A1gina-principal?authuser%3D1%26read_current%3D1&sa=D&source=hangouts&ust=1622759679613000&usg=AFQjCNHIqDgGl6yJ3CGAfgkkkBXqpzKNyA'
        //window.open('https://www.google.com/url?q=https://sites.google.com/confianza.pe/imparables/p%25C3%25A1gina-principal?authuser%3D1%26read_current%3D1&sa=D&source=hangouts&ust=1622759679613000&usg=AFQjCNHIqDgGl6yJ3CGAfgkkkBXqpzKNyA', '_blank').focus();
    }
}
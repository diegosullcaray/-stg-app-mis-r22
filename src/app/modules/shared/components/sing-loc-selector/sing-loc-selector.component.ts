import { EventEmitter, Input, Output } from "@angular/core";
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";

@Component({
    selector: 'sing-loc-selector',
    templateUrl: './sing-loc-selector.component.html',
    styleUrls: ['./sing-loc-selector.component.scss']
})
export class SingLocSelectorComponent implements OnInit {
    @Input() label:string;
    @Input() selectedValue:any;
    @Input() selectedIndex:string;
    @Input() data:any;
    @Output() onSelectItem = new EventEmitter<any>();

    ngOnInit(): void {
        if(this.selectedIndex && !this.selectedValue){
            let idx = +this.selectedIndex;
            this.selectedValue = this.data[idx];
        }
    }

    private selectItem(evt:any){
        this.onSelectItem.emit(evt);
    }

    onSelect(evt: any) {
        if (evt.isUserInput) {
            this.selectItem(evt.source.value);
        }
    }
}
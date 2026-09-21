import { EventEmitter, Input, Output } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { cloneObject, mergeObjects, onNullOrUndefined } from "app/core/shared/functions.util";

const defaultIconOptions = {
    style: {
        'font-size': '24px'
    },
    source: 'google',
    type: ''
}

@Component({
    selector: 'stg-window-bar',
    templateUrl: './stg-window-bar.component.html',
    styleUrls: ['./stg-window-bar.component.scss']
})
export class StgWindowBarComponent implements OnInit {
    @Input() title: string;
    @Input() barIcon: string;
    @Input() navigable: boolean;
    @Input() navLeftIcon: string;
    @Input() navRightIcon: string;
    @Input() closable: boolean;
    @Input() closeIcon: string;
    @Input() barIconSource: string;
    @Input() barIconType: string;
    @Input() navIconSource: string;
    @Input() closeIconSource: string;
    @Input() backgroundColor: string;

    @Input() fontSize:string;
    @Input() titleSize: string;
    @Input() barIconSize: string;
    @Input() navIconSize: string;
    @Input() closeIconSize: string;

    @Input() titleAlign: string;

    @Input() fontColor:string;
    @Input() titleColor: string;
    @Input() barIconColor: string;
    @Input() navIconColor: string;
    @Input() closeIconColor: string;

    @Input() disableNavLeft: boolean;
    @Input() disableNavRight: boolean;

    titleStyle:any;
    iconStyle:any;
    closeStyle:any;
    navStyle:any;

    @Output() onClose = new EventEmitter<any>();
    @Output() onNavigate = new EventEmitter<any>();

    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.setStyles();
    }

    close() {
        this.onClose.emit();
    }

    navLeft(){
        this.onNavigate.emit({value:'left'});
    }

    navRight(){
        this.onNavigate.emit({value:'right'});
    }

    getTitleAlign() {
        let a: string = this.titleAlign;
        a = a.trim();
        if (a.indexOf(' ') > -1) {
            a = a + ' center';
        }
        return a;
    }

    private setStyles() {
        if(this.navigable){
            this.navLeftIcon=onNullOrUndefined(this.navLeftIcon,'arrow_back');
            this.navRightIcon=onNullOrUndefined(this.navRightIcon,'arrow_forward');
            this.navIconSource=onNullOrUndefined(this.navIconSource,'google');
            this.navStyle={
                color: this.fontColor?this.fontColor:'white'
            };
            if(this.navIconColor){
                this.navStyle.color=this.navIconColor;
            }
            if(this.fontSize){
                this.navStyle['font-size']=this.fontSize;
            }
            if(this.navIconSize){
                this.navStyle['font-size']=this.navIconSize;
            }
        }
        if(this.closable){
            this.closeIcon=onNullOrUndefined(this.closeIcon,'cancel');
            this.closeIconSource=onNullOrUndefined(this.closeIconSource,'google');
            this.closeStyle={
                color: this.fontColor?this.fontColor:'white'
            };
            if(this.closeIconColor){
                this.closeStyle.color=this.closeIconColor;
            }
            if(this.fontSize){
                this.closeStyle['font-size']=this.fontSize;
            }
            if(this.closeIconSize){
                this.closeStyle['font-size']=this.closeIconSize;
            }
        }
        if(this.barIcon){
            this.barIconSource=onNullOrUndefined(this.barIconSource,'google');
            this.barIconType=onNullOrUndefined(this.barIconType,'');
            this.iconStyle={
                color: this.fontColor?this.fontColor:'white'
            };
            if(this.fontSize){
                this.iconStyle['font-size']=this.fontSize;
            }
            if(this.barIconSize){
                this.iconStyle['font-size']=this.barIconSize;
            }
        }
        this.titleAlign=onNullOrUndefined(this.titleAlign,'center');
        this.titleStyle={
            background: this.backgroundColor?this.backgroundColor:'#035096',
            color: this.fontColor?this.fontColor:'white'
        };
        if(this.titleColor){
            this.titleStyle.color=this.titleColor;
        }
        if(this.fontSize){
            this.titleStyle['font-size']=this.fontSize;
        }
    }

    getIcon() {
        let s = this.barIconSource;
        let t = this.barIconType;
        if (t != '') {
            t = '-' + t;
        }
        if (s == 'google') {
            return this.sanitizer.bypassSecurityTrustHtml('<span class="material-icons' + t + '">' + this.barIcon + '</span>');
        }
        else if (s == 'microsoft') {
            return this.sanitizer.bypassSecurityTrustHtml('<span class="ms-Icon ms-Icon--' + this.barIcon + '"></span>');
        }
        return '';
    }

}
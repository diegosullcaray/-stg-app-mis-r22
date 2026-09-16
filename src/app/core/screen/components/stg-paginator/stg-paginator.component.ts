import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'stg-paginator',
    templateUrl: './stg-paginator.component.html',
    styleUrls: ['./stg-paginator.component.scss']
})
export class StgPaginatorComponent implements OnInit,OnChanges {
    @Input() totalLenght: any;
    @Input() pageLenght: any;

    disableNext: boolean;
    disablePrevious: boolean;
    disableFirst: boolean;
    disableLast: boolean;
    currentPage: number;
    maxPage: number;

    @Output() onChangePage = new EventEmitter<any>();

    ngOnInit(): void {
        this.toFirstPage();
        this.maxPage = Math.ceil(this.totalLenght/this.pageLenght);
    }

    ngOnChanges(changes: SimpleChanges): void {
        let nv = changes.totalLenght.currentValue;
        this.maxPage = Math.ceil(nv/this.pageLenght);
    }

    public toFirstPage(): void {
        this.currentPage = 1;
        this.disableNext = false;
        this.disablePrevious = true;
        this.disableFirst = true;
    }

    private changePage() {
        let evt = {
            page: this.currentPage
        }
        this.onChangePage.emit(evt);
    }
    
    nextPage() {
        this.currentPage++;
        if (this.currentPage <= this.maxPage) {
            this.changePage();
            this.disablePrevious=false;
            this.disableFirst=false;
        }
        if(this.currentPage>= this.maxPage){
            this.currentPage=this.maxPage;
            this.disableNext=true;
            this.disableLast=true;
        }
    }

    previousPage() {
        this.currentPage--;
        if (this.currentPage >= 1) {
            this.changePage();
            this.disableNext=false;
            this.disableLast=false;
        }
        if(this.currentPage<= 1){
            this.currentPage=1;
            this.disablePrevious=true;
            this.disableFirst=true;
        }
    }

    firstPage() {
        this.currentPage = 1;
        this.changePage();
        this.disableFirst = true;
        this.disablePrevious = true;
        this.disableNext = false;
        this.disableLast = false;
    }
    
    lastPage() {
        this.currentPage = this.maxPage;
        this.changePage();
        this.disableFirst = false;
        this.disablePrevious = false;
        this.disableNext = true;
        this.disableLast = true;
    }
}
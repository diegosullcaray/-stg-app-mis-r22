import { Component, OnInit ,ChangeDetectorRef,ViewChild,Input,Output,EventEmitter,OnChanges,SimpleChanges,HostListener} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import 'rxjs/add/observable/of';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent implements OnInit {
  @Output() refresh = new EventEmitter<Object>();
  @Input() config_table;
 // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  private paginator: MatPaginator;
  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns=[];
  dataSource=new MatTableDataSource();
  //dataSource = new dataSource();
  isLoadingTable=false;
  isInit=false;
  screenHeight=200;  
  constructor(private cdr: ChangeDetectorRef) { this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight-80;
  } 

  ngOnChanges(changes: SimpleChanges){
    if (changes.config_table && !changes.config_table.isFirstChange()
    ) {
      //console.log(this.config_table);
      this.dataSource.data=this.config_table.ELEMENT_DATA;
      this.displayedColumns = this.config_table.columns.map(c => c.columnDef);
      this.isLoadingTable=true;
      this.isInit=this.config_table.conf.isInit;
    }
  }

  ngOnInit() {

  }

  viewEdit(row){
    if(this.config_table.conf.edit){
      this.refresh.emit(row);
    }
  }

}
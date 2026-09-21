import { NestedTreeControl } from "@angular/cdk/tree";
import { EventEmitter, Host, OnInit, Output } from "@angular/core";
import { Component, Input } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Router } from "@angular/router";
import { LayoutService } from "app/system/admin/services/layout.service";
import { IMenuItem } from "app/system/admin/services/navigation.service";

interface IRepItem {
    name: string,
    state?: string,
    children?: IRepItem[];
}

@Component({
    selector: 'mod-rep-sidenav',
    templateUrl: './rep-sidenav.component.html',
    styleUrls: ['./rep-sidenav.component.scss']
})
export class RepSidenavComponent implements OnInit {
    @Input() menuItems: IMenuItem[];

    treeControl = new NestedTreeControl<IRepItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<IRepItem>();

    @Output() onSelectMenuItem = new EventEmitter<any>();

    constructor(private router: Router, private layout: LayoutService) {

    }

    ngOnInit(): void {
        let ds: IRepItem[] = [];
        this.menuItems.forEach(e => {
            let m: IRepItem = {
                name: e.name,
                state: e.state,
                children: this.genChilds(e.sub)
            }
            ds.push(m);
        });
        this.dataSource.data = ds;
    }

    public onClick(a) {
        this.onSelectMenuItem.emit(this.layout.isMobile);
        this.router.navigateByUrl(a);
        //this.router.navigateByUrl('/app/reportes/leg/dummy');
    }

    private genChilds(sub: any[]): IRepItem[] {
        let mi: IRepItem[] = [];
        sub.forEach(e => {
            let m: IRepItem = {
                name: e.name,
                state: e.state,
                children: this.genChilds(e.sub)
            }
            mi.push(m);
        });
        return mi;
    }

    hasChild = (_: number, node: IRepItem) => !!node.children && node.children.length > 0;

}
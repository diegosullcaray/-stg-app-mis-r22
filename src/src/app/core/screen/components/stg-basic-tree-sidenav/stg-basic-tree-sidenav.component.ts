import { NestedTreeControl } from "@angular/cdk/tree";
import { EventEmitter, Host, OnInit, Output } from "@angular/core";
import { Component, Input } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { Router } from "@angular/router";
import { isNullOrUndefined } from "app/core/shared/functions.util";
import { LayoutService } from "app/system/admin/services/layout.service";
import { IMenuItem } from "app/system/admin/services/navigation.service";

interface IBasicSideNavTreeItem {
    name: string,
    state?: string,
    children?: IBasicSideNavTreeItem[];
    meta?: any
}

@Component({
    selector: 'stg-basic-tree-sidenav',
    templateUrl: './stg-basic-tree-sidenav.component.html',
    styleUrls: ['./stg-basic-tree-sidenav.component.scss']
})
export class StgBasicTreeSidenavComponent implements OnInit {
    @Input() menuItems: IMenuItem[];

    treeControl = new NestedTreeControl<IBasicSideNavTreeItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<IBasicSideNavTreeItem>();

    @Output() onSelectMenuItem = new EventEmitter<any>();

    constructor(private router: Router, private layout: LayoutService) {

    }

    ngOnInit(): void {
        let ds: IBasicSideNavTreeItem[] = [];
        this.menuItems.forEach(e => {
            let m: IBasicSideNavTreeItem = {
                name: e.name,
                state: e.state,
                children: this.genChilds(e.sub)
                //meta: e.meta
            }
            ds.push(m);
        });
        this.dataSource.data = ds;
    }

    public onClick(a) {
        this.onSelectMenuItem.emit(a);
        this.router.navigateByUrl(a.state);
        //this.router.navigateByUrl('/app/reportes/leg/dummy');
    }

    private genChilds(sub: any[]): IBasicSideNavTreeItem[] {
        let mi: IBasicSideNavTreeItem[] = [];
        if(sub){
            sub.forEach(e => {
                let m: IBasicSideNavTreeItem = {
                    name: e.name,
                    state: e.state,
                    children: this.genChilds(e.sub)
                    //meta: e.meta
                }
                mi.push(m);
            });
        }
        return mi;
    }

    hasChild = (_: number, node: IBasicSideNavTreeItem) => !!node.children && node.children.length > 0;

}
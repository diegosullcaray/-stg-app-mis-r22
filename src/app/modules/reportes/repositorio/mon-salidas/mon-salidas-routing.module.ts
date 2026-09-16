import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MonSalidasComponent } from "./mon-salidas.component";
import { PrincipalComponent } from "./principal/principal.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { ListaClientesComponent } from "./lista-clientes/lista-clientes.component";
import { DetalleDialogWrapperComponent } from "./detalle/detalle-dialog-wrapper.component";
import { ClientSummaryComponent } from "app/modules/shared/components/client-summary/client-summary.component";


const routes: Routes = [
    {
        path: '',
        component: MonSalidasComponent,
        data: { title: 'Salidas y Retenciones' },
        children: [
            {
                path: '',
                component: PrincipalComponent,
                children: [
                    {
                        path: 'routed-detalle',
                        component: DetalleDialogWrapperComponent,
                        children: [
                            {
                                path: 'lista-clientes',
                                component: ListaClientesComponent
                            },
                            {
                                path: "cliente",
                                component: ClientSummaryComponent
                            },
                            {
                                path: '**',
                                redirectTo: 'lista-clientes'
                            }
                        ]
                    }
                ]
            },
            {
                path: 'detalle',
                component: DetalleComponent,
                children: [
                    {
                        path: 'lista-clientes',
                        component: ListaClientesComponent
                    },
                    {
                        path: "cliente",
                        component: ClientSummaryComponent
                    },
                    {
                        path: '**',
                        redirectTo: 'lista-clientes'
                    }
                ]
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonSalidasRoutingModule { }
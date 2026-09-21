import { Routes } from "@angular/router";
import { SigninComponent } from "./views/signin/signin.component";


export const SessionRoutes: Routes = [
  {
    path:"",
    redirectTo:"signin",
    pathMatch: 'full'
  },
  {
    path: "",
    children: [
      {
        path: "signin",
        component: SigninComponent,
        data: { title: "Inicio Sesion" }
      }
    ]
  }
];

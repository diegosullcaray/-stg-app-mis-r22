import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './system/admin/views/admin-layout/admin-layout.component';
import { AuthGuard } from './system/session/authentication/auth.guard';
import { LoginGuard } from './system/session/guards/login.guard';
import { AuthLayoutComponent } from './system/session/views/auth-layout/auth-layout.component';
import { LoginComponent } from './system/session/views/login/login.component';
import { DesktopComponent } from './system/admin/views/desktop/desktop.component';
import { DummyComponent } from './modules/reportes/components/dummy/dummy.component';
import { RouteGuard } from './system/admin/guards/route-guard.guard';  

const routes: Routes = [
  {
    path: '',
    redirectTo: 'session/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'session',
        loadChildren: () => import('./system/session/session.module').then(m => m.SessionModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'app',
    redirectTo: 'app/desktop',
    pathMatch: 'full'
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    //canLoad:[AuthGuard],
    //canActivateChild:[AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'desktop',
        component: DesktopComponent,
        data: { title: 'Desktop' }
      },
      {
        path: 'reportes',
        loadChildren: () => import('app/modules/reportes/rep01.module').then(m => m.Rep01Module),
        data: { title: 'Reportes' }
      },
      {
        path: 'consulta-fen',
        loadChildren: () => import('app/modules/consulta-fen/consulta-fen.module').then(m => m.ConsultaFenModule),
        data: { title: 'Consulta FEN - CENEPRED' }
      },
      /*  {
        path: 'incentivos',
        loadChildren: () => import('app/modules/incentivos2/incentivos2.module').then(m => m.Incentivos2Module),
        data: { title: 'Incentivos' }
      }, */
      {
        path: 'incentivos3',
        loadChildren: () => import('app/modules/incentivos3/incentivos3.module').then(m => m.Incentivos3Module),
        data: { title: 'Incentivos' }
      },
      {
        path: 'incentivos4',
        loadChildren: () => import('app/modules/incentivos4/incentivos4.module').then(m => m.Incentivos4Module),
        data: { title: 'Incentivos' }
      },
      {
        path: 'incentivos-a',
        loadChildren: () => import('app/modules/incentivos-a/incentivos-a.module').then(m => m.IncentivosAModule),
        data: { title: 'Incentivos' }
      },
      {
        path: 'corresponsales',
        //canActivate: [AuthGuard],
        //loadChildren: () => import('app/modules/reportes/legacy/banca-electronica/banca-electronica.module').then(m => m.BancaElectronicaModule),
        loadChildren: () => import('app/modules/corresponsales/corresponsales.module').then(m => m.CorresponsalesModule),
        data: { title: 'Corresponsales' }
      },
      {
        path: 'presupuesto',
        canActivate: [RouteGuard],
        loadChildren: () => import('app/modules/presupuesto/presupuesto.module').then(m => m.PresupuestoModule),
        data: { title: 'Presupuesto' }
      },
      {
        path: 'imparables',
        //data: { externalUrl: 'https://www.google.com/url?q=https://sites.google.com/confianza.pe/imparables/p%25C3%25A1gina-principal?authuser%3D1%26read_current%3D1&sa=D&source=hangouts&ust=1622759679613000&usg=AFQjCNHIqDgGl6yJ3CGAfgkkkBXqpzKNyA' },
        component: DummyComponent
      },
      {
        path: 'actividades',
        canActivate: [RouteGuard],
        loadChildren: () => import('app/modules/actividades/actividades.module').then(m => m.ActividadesModule),
        data: { title: 'Actividades' }
      },
      {
        path: 'kaypacha',
        //canActivate:[RouteGuard],
        loadChildren: () => import('app/modules/kaypacha/kaypacha.module').then(m => m.KaypachaModule),
        data: { title: 'Kaypacha' }
      },
      {
        path: 'administracion',
        loadChildren: () => import('app/modules/administracion/administracion.module').then(m => m.AdministracionModule),
        data: { title: 'Administracion' }
      },
      {
        path: 'Kaypacha_',
        // canActivate:[RouteGuard],
        loadChildren: () => import('app/modules/Kaypacha2/kaypacha2.module').then(m => m.Kaypacha2Module),
        data: { title: 'Kaypacha' }
      },
      {
        path: 'Kaypacha__',
        // canActivate:[RouteGuard],
        loadChildren: () => import('app/modules/Kaypacha3/kaypacha3.module').then(m => m.Kaypacha3Module),
        data: { title: 'Kaypacha' }
      },
      /*{
        path: 'cons_base_negativa_rie',
        // canActivate:[RouteGuard],
        loadChildren: () => import('app/modules/basenegativa_rie/basenegativa_rie.module').then(m => m.BaseNegativa_rieModule),
        data: { title: 'Basenegativa_rie' }
      },*/
      {
        path: 'dashboards',
        loadChildren: () => import('app/modules/reportes-e/reportes-e.module').then(m=> m.ReportesEModule)
      },
      {
        path: 'ranking-k',
        loadChildren: () => import('app/modules/ranking-k/ranking-k.module').then(m=> m.RankingKModule)
      }, 
      {
        path: 'esg',
        loadChildren: () => import('app/modules/framework-esg/framework-esg.module').then(m=> m.FrameworkEsgModule)
      },
      {
        path: 'analista',
        loadChildren: () => import('app/modules/analista/analista.module').then(m=> m.AnalistaModule)
      },
      {
        path: 'sistematica',
        loadChildren: () => import('app/modules/sistematica/sistematica.module').then(m=> m.SistematicaModule)
      },
      {
        path: 'prospecto',
        loadChildren: () => import('app/modules/analista/prospecto/prospecto-cor.module').then(m=> m.ProspectoCorModule)
      },
      { 
        path: 'reasignacion-cart-cap',
        loadChildren: () => import('app/modules/reasignacion-cart-cap/reasignacion-cart-cap.module').then(m=> m.ReasignacionCartCapModule)
      },
       
    ]
  },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, { useHash: true })],
  //imports: [RouterModule.forRoot(routes,{ enableTracing: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

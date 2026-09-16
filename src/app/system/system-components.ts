import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../core/screen/components/shared-material.module';
//import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { SearchModule } from '../search/search.module';
//import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
//import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
/*import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';*/

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './admin/components/header-top/header-top.component';
import { SidebarTopComponent } from './admin/components/sidebar-top/sidebar-top.component';

// ONLY FOR DEMO
//import { CustomizerComponent } from './customizer/customizer.component';

// ALWAYS REQUIRED 

//import { FooterComponent } from './footer/footer.component';
//import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidenavComponent } from './admin/components/sidenav/sidenav.component';
import { NotificationsComponent } from './admin/components/notifications/notifications.component';
import { AdminLayoutComponent } from './admin/views/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './session/views/auth-layout/auth-layout.component';
import { AdminDirectivesModule } from './admin/directives/admin-directives.module';
import { LoginComponent } from './session/views/login/login.component';
import { StartMenuComponent } from './admin/components/start-menu/start-menu.component';
import { DesktopComponent } from './admin/views/desktop/desktop.component';
import { SharedCWCModule } from 'app/core/screen/components/shared-cwc.module';
import { LoginService } from './session/views/login/login.service';
import { AltUserDialogComponent } from './admin/components/alt-user-dialog/alt-user-dialog.component';
import { AdDialogComponent } from './admin/components/ad-dialog/ad-dialog.component';
import { SessionEndDialogComponent } from './admin/components/session-end-dialog/session-end-dialog.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
//import { ButtonLoadingComponent } from './button-loading/button-loading.component';
//import { EgretSidebarComponent, EgretSidebarTogglerDirective } from './egret-sidebar/egret-sidebar.component';
//import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
//import { EgretExampleViewerComponent } from './example-viewer/example-viewer.component';
//import { EgretExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';
//import { EgretNotifications2Component } from './egret-notifications2/egret-notifications2.component';
//import { SwiperModule } from 'swiper/angular';



const components = [
    HeaderTopComponent,
    SidebarTopComponent,
    SidenavComponent,
    NotificationsComponent,
    StartMenuComponent,

    AltUserDialogComponent,
    AdDialogComponent,
    SessionEndDialogComponent,

    //SidebarSideComponent,
    //HeaderSideComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,

    LoginComponent,
    DesktopComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FlexLayoutModule,
        NgScrollbarModule,
        //SharedPipesModule,
        AdminDirectivesModule,
        SharedMaterialModule,
        //SwiperModule,
        SharedCWCModule
    ],
    declarations: components,
    // entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent],
    exports: components,
    providers:[LoginService]
})
export class SystemComponentsModule { }
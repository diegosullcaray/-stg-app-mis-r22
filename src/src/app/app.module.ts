import { NgModule, ErrorHandler } from '@angular/core';

import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { GestureConfig } from '@angular/material/core';


//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './shared/inmemory-db/inmemory-db.service';

//import { rootRouterConfig } from './app.routing';
//import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SystemModule } from './system/system.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './system/admin/interceptors/http-interceptors';
import { RouteTrackerService } from './system/admin/services/route-tracker.service';
import { DatePipe } from '@angular/common';
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { ErrorHandlerService } from './shared/services/error-handler.service';
//import { TokenInterceptor } from './shared/interceptors/token.interceptor';


// AoT requires an exported function for factories
/*export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}*/

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SystemModule,
    HttpClientModule,
    AppRoutingModule 
    
    /*TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),*/
    //InMemoryWebApiModule.forRoot(InMemoryDataService, { passThruUnknownUrl: true}),
    //RouterModule.forRoot(rootRouterConfig, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  declarations: [AppComponent],
  providers: [
    //{ provide: ErrorHandler, useClass: ErrorHandlerService },
    // { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    DatePipe,

    httpInterceptorProviders
    // REQUIRED IF YOU USE JWT AUTHENTICATION
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private tracker: RouteTrackerService) {
    tracker.init();
  }
}
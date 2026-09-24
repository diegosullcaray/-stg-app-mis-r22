// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  structure:'corredor',
  devTracing: false,
  devAd: false,
  ipProvider: 'http://api.ipify.org/?format=json',
  cypherSecret:'85A99A2F37313C9B921BCC827AB7FC67',
  rootPage: '/session/signin',
  rootDomain: 'http://localhost:4200',
  homePage: '/app/desktop',
  
   redirectUri:'http://localhost:4200/login',
 //redirectUri:'https://stg.confianza.pe/login',
  
//requestConfigRootURL:'https://stg.confianza.pe/cores2/ant',
 requestConfigRootURL:'http://localhost:8080/ant',
  
  //devUser:  'nilda.quilla@confianza.pe' // comercial
  //devUser:  'giomara.acevedo@confianza.pe' //operaciones  157
  //devUser: 'flor.garcia@confianza.pe' // asesor
  
  devUser: 'pierro.flores@confianza.pe'
  //devUser: 'roy.caso@confianza.pe'
 // devUser: 'hermes.chuquillanqui@confianza.pe'
 //**************** */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'environments/environment';

export const gmailAuthConfig: AuthConfig = {
 
    // Url of the Identity Provider
    issuer: 'https://accounts.google.com',
   
    // URL of the SPA to redirect the user to after login
    redirectUri:environment.redirectUri,
    //redirectUri: 'http://localhost:4200/redirect',
    //redirectUri: window.location.origin +'/redirect',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    //clientId: '996390130380-kvc3hvkulanmbbr21l1j6htfvlvue6g4.apps.googleusercontent.com',
    clientId: '690217690558-7l16jg0u9r7udt2jjp6tjmtd3mhkgihu.apps.googleusercontent.com',
   
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile email',

    strictDiscoveryDocumentValidation:false,
  }
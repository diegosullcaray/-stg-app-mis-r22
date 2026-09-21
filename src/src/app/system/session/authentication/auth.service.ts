import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from "rxjs";
import { filter, map,tap } from "rxjs/operators";
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { gmailAuthConfig } from "./gmail.config";
import { printError, printLog, printTable, printWarn } from "app/core/shared/debug.util";
import { environment } from "environments/environment";
import { LocalStoreService } from "app/core/data/local/local-store.service";
import { system_keys } from "../../system-keys.config";
import { Buffer } from 'buffer';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

    private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);//new ReplaySubject<boolean>();
    public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

    public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([this.isAuthenticated$, this.isDoneLoading$])
        .pipe(map(values => values.every(b => b)));

    public bodyAuthResponse;

    constructor(
        private oauthService: OAuthService,
        private router: Router,
        private storage: LocalStoreService
    ) {
        this.oauthService.configure(gmailAuthConfig);

        // Useful for debugging:
        this.oauthService.events.subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
                printError('OAuthErrorEvent Object:', event);
            } else {
                printLog('OAuthEvent Object:', event);
            }
        });

        window.addEventListener('storage', (event) => {
            // The `key` is `null` if the event was caused by `.clear()`
            if (event.key !== 'access_token' && event.key !== null) {
                return;
            }

            printWarn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());

            if (!this.oauthService.hasValidAccessToken()) {
                this.navigateToLoginPage();
            }
        });

        this.oauthService.events
            .subscribe(_ => {
                this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
            });

        this.oauthService.events
            .pipe(filter(e => ['token_received'].includes(e.type)))
            .subscribe(_ => this.oauthService.loadUserProfile());

        this.oauthService.events
            .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
            .subscribe(e => this.navigateToLoginPage());

        //this.oauthService.setupAutomaticSilentRefresh();
    }

    private navigateToLoginPage() {
        // TODO: Remember current URL
        this.router.navigateByUrl(environment.rootPage);
    }

    private loadAuthResponse(gr) {
        let parts = gr.id_token.split('.');
        let bodyBuf = Buffer.from(parts[1], 'base64');
        this.bodyAuthResponse = JSON.parse(bodyBuf.toString());
    }

    private processHash(hash: String) {
        let gr = {};
        hash.substr(1).split('&').map(kvp => {
            let s = kvp.split('=');
            gr[s[0]] = s[1];
        });
        this.storage.setItem(system_keys.auth_resp, gr);
        return gr;
    }

    public runInitialLoginSequence(): Promise<void> {
        if (location.hash) {
            printLog('Encountered system_keys fragment, plotting as table...');
            let hash = location.hash;
            printTable(hash.substr(1).split('&').map(kvp => kvp.split('=')));
            let gr = this.processHash(hash);
            this.loadAuthResponse(gr);
        }

        // 0. LOAD CONFIG:
        // First we have to check to see how the IdServer is
        // currently configured:
        return this.oauthService.loadDiscoveryDocument()

            // For demo purposes, we pretend the previous call was very slow
            //.then(() => new Promise<void>(resolve => setTimeout(() => resolve(), 1000)))

            // 1. HASH LOGIN:
            // Try to log in via hash fragment after redirect back
            // from IdServer from initImplicitFlow:
            .then(() => this.oauthService.tryLogin())

            /*.then(() => {
                if (this.oauthService.hasValidAccessToken()) {
                    return Promise.resolve();
                }

                // 2. SILENT LOGIN:
                // Try to log in via a refresh because then we can prevent
                // needing to redirect the user:
                return this.oauthService.silentRefresh()
                    .then(() => Promise.resolve())
                    .catch(result => {
                        // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
                        // Only the ones where it's reasonably sure that sending the
                        // user to the IdServer will help.
                        const errorResponsesRequiringUserInteraction = [
                            'interaction_required',
                            'login_required',
                            'account_selection_required',
                            'consent_required',
                        ];

                        if (result
                            && result.reason
                            && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {

                            // 3. ASK FOR LOGIN:
                            // At this point we know for sure that we have to ask the
                            // user to log in, so we redirect them to the IdServer to
                            // enter credentials.
                            //
                            // Enable this to ALWAYS force a user to login.
                            // this.login();
                            //
                            // Instead, we'll now do this:
                            console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
                            return Promise.resolve();
                        }

                        // We can't handle the truth, just pass on the problem to the
                        // next handler.
                        return Promise.reject(result);
                    });
            })*/

            .then(() => {
                this.isDoneLoadingSubject$.next(true);
                // Check for the strings 'undefined' and 'null' just to be sure. Our current
                // login(...) should never have this, but in case someone ever calls
                // initImplicitFlow(undefined | null) this could happen.
                if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
                    let stateUrl = this.oauthService.state;
                    if (stateUrl.startsWith('/') === false) {
                        stateUrl = decodeURIComponent(stateUrl);
                    }
                    printLog(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
                    this.router.navigateByUrl(stateUrl);
                }
            })
            .catch(() => this.isDoneLoadingSubject$.next(true));
    }

    public login(targetUrl?: string) {
        // Note: before version 9.1.0 of the library you needed to
        // call encodeURIComponent on the argument to the method.
        //console.log("Iniciado en: "+this.router.url)
        //this.oauthService.initLoginFlow(targetUrl || this.router.url);
        this.oauthService.initImplicitFlow();
    }

    public configure() {
        return this.oauthService.loadDiscoveryDocument();
    }

    public logout() { 
        this.oauthService.logOut();
        this.router.navigateByUrl(environment.rootPage);

    }
    public refresh() { this.oauthService.silentRefresh(); }
    public get hasValidToken() { return this.oauthService.hasValidAccessToken(); }
    public get tokenExpired() {
        const expiry = this.bodyAuthResponse.exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    public get isLoged(){
        let v = this.storage.getItem(system_keys.auth_resp);
        return (v!==null);
    }

    // These normally won't be exposed from a service like this, but
    // for debugging it makes sense.
    public get accessToken() { return this.oauthService.getAccessToken(); }
    public get refreshToken() { return this.oauthService.getRefreshToken(); }
    public get identityClaims() { return this.oauthService.getIdentityClaims(); }
    public get idToken() { return this.oauthService.getIdToken(); }
    public get logoutUrl() { return this.oauthService.logoutUrl; }



}
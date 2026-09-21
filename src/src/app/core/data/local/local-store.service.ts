import { Injectable } from '@angular/core';
import { CypherService } from 'app/core/shared/cypher.service';
import { printLog } from 'app/core/shared/debug.util';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStoreService {
  private ls = window.localStorage;
  private ss = window.sessionStorage;

  constructor(private cypherService: CypherService) { }

  public setItem(key, value) {
    value = JSON.stringify(value);
    if (environment.production) {
      value = this.cypherService.encrypt(value);
    }
    this.ls.setItem(key, value);
    return true;
  }

  public getItem(key) {
    let value = this.ls.getItem(key);
    try {
      //printLog
      if (environment.production) {
        value = this.cypherService.decrypt(value);
      }
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public removeItem(key) {
    this.ls.removeItem(key);
  }

  public clear() {
    this.ls.clear();
    /*Object.keys(system_keys).forEach(x => {
      this.ls.removeItem(x);
    });*/
  }
}

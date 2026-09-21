import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as shajs from 'sha.js';

@Injectable()
export class CypherService {
  public secret = '85A99A2F37313C9B921BCC827AB7FC67';

  constructor() { }

  public toSha256(secret:string):string{
    return shajs('sha256').update(secret).digest('hex');
  }

  public encryptForRoute(key: string, secret?: string): string{
    let r = this.encrypt(key,secret);
    return r.replace(/\+/g,"$");
  }

  public decryptFromRoute(key: string, secret?: string):string {
    return this.decrypt(key.replace(/\$/g,"+"),secret);
  }

  public encrypt(key: string, secret?: string): string {
    var bSecret = CryptoJS.enc.Hex.parse(secret?secret:this.secret);
    var iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
    var encrypted = CryptoJS.AES.encrypt(key, bSecret, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      keySize: 8,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  }

  public decrypt(key: string, secret?: string): string {
    var bSecret = CryptoJS.enc.Hex.parse(secret?secret:this.secret);
    var iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
    var decrypted = CryptoJS.AES.decrypt(key, bSecret, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      keySize: 8,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
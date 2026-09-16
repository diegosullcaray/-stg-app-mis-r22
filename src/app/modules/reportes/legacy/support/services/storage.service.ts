import { Injectable } from '@angular/core';
import { isUndefined, isNull } from 'util';


@Injectable({ providedIn: 'root' })
export class StorageService {
    private keys:Set<string> = new Set<string>();

    public setLocalItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
        this.keys.add(key);
    }

    public getLocalItem<T = unknown>(key: string):T{
        return JSON.parse(localStorage.getItem(key));
    }

    public removeLocalItem(key:string){
        localStorage.removeItem(key);
        this.keys.delete(key);
    }

    public clearAll(f?:boolean){
        /*console.log('holi');
        console.log(this.keys.size);
        if(f){
            localStorage.clear();
        }else{            
            this.keys.forEach(x=>{
                console.log(x);
                localStorage.removeItem(x);
            });
            this.keys = new Set<string>();

        }*/
        localStorage.clear();
    }
}
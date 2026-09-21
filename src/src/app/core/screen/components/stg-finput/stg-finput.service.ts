import { Injectable } from '@angular/core';
import { AntService } from 'app/core/data/remote/ant/ant-service.class';
import { WinderService } from 'app/core/data/remote/winder/winder.service';
import { isNullOrUndefined } from 'app/core/shared/functions.util';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StgFInputService extends AntService {
    private dbFiles: any[];
    onCompleteSaveFile$: Subject<any> = new Subject();
    onCompleteSaveAllFiles$: Subject<any> = new Subject();

    constructor(private winderService: WinderService) {
        super({
            port: 6302,
            secret: "CCAFE0F473E9B66F2EA57D46C5C3047E",
            appId: "app"
        }, winderService);
        this.onCompleteSaveAllFiles$.subscribe(x=>{
            this.dbFiles=undefined;
        });
    }

    private postFile(id: string, file: File): Observable<any> {
        return this.postFileSimpleResponseStringNP("file.save1",id,file);
    }

    private getFile(id: string): Observable<any>{
        return this.getSimpleResponseResource("file.get1",{id:id});
    }


    public register(id: String, file: File) {
        if (isNullOrUndefined(this.dbFiles)) {
            this.dbFiles = [];
        }
        this.dbFiles.push({ id: id, file: file });
    }

    /*public remove(id: string) {
        this.dbFiles = this.dbFiles.filter(x => x.id !== id);
    }

    private convertFile(file: File): Observable<string> {
        const result = new ReplaySubject<string>(1);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => result.next(btoa(event.target.result.toString()));
        return result;
    }*/

    public download(id:string){
        return this.getFile(id);
    }

    public upload() {
        let cobs: BehaviorSubject<boolean>[] = [];
        this.dbFiles.forEach(x => {
            cobs.push(new BehaviorSubject(false));
        });

        let ids: string[] = [];

        combineLatest(cobs).subscribe((a) => {
            let r = true;
            a.forEach(x => {
                r = r && x;
            });

            if (r) {
                let c: string;
                if (ids.length == this.dbFiles.length) {
                    c = "success";
                } else {
                    c = "with_error";
                }
                this.onCompleteSaveAllFiles$.next({ code: c, ids: ids });
            }
        });

        this.dbFiles.forEach((x, i) => {
            this.postFile(x.id, x.file).subscribe(p => {
                let res = p.body.result;
                if (res.code == 200) {
                    ids.push(x.id);
                }
                this.onCompleteSaveFile$.next({ idx: i, code: res.code, name: x.file.name });
                cobs[i].next(true);
            });

        });
    }

}

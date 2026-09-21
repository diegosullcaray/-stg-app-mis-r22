import { Injectable } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchMediaService {
  activeMediaQuery: string;
  onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private mediaObserver: MediaObserver) {
    this.activeMediaQuery = '';
    this.init();
  }

  private init(): void {
    this.mediaObserver.asObservable().subscribe((change) => {
      change.forEach(item=>{
        if (this.activeMediaQuery !== item.mqAlias) {
          this.activeMediaQuery = item.mqAlias;
          this.onMediaChange.next(item.mqAlias);
        }
      })
      
    });
  }
}

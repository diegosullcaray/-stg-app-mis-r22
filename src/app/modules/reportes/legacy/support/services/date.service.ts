import { Injectable } from '@angular/core';
import { isUndefined } from 'app/core/shared/functions.util';
import * as Moments from 'moment';
import { extendMoment } from 'moment-range';
const mo = extendMoment(Moments);

@Injectable()
export class DateService {
  public pRange = {
    format_name: 'MMMM - YYYY',
    format_name_2: 'YYYY-MM-DD',
    format_id: 'YYYYMMDD',
  }
  private interval: 'months' = 'months';
  private interval2: 'days' = 'days';
  private lang: string = 'es';
  constructor() {
  }

  dataRange2(now_start, now_end) {
    let data = [];
    const range = mo.range(now_start, now_end);
    for (let i of range.by(this.interval2)) {
      let desc = i.locale(this.lang).format(this.pRange.format_name_2);
      let id = i.locale(this.lang).format(this.pRange.format_id);
      data.push({ desc: desc, id: id })
    }

    let id = now_end.locale(this.lang).format(this.pRange.format_id);
    let desc = now_end.locale(this.lang).format(this.pRange.format_name_2)
    if (isUndefined(data.find(d => d.id == id)))
      data.push({ desc: desc, id: id });
    return data;
  }

  dataRange(now_start, now_end) {
    let data = [];
    const range = mo.range(now_start, now_end);
    for (let i of range.by(this.interval)) {
      let desc = i.locale(this.lang).format(this.pRange.format_name);
      let id = i.locale(this.lang).endOf('month').format(this.pRange.format_id);
      data.push({ desc: desc, id: id })
    }

    let id = now_end.locale(this.lang).format(this.pRange.format_id);
    let desc = now_end.locale(this.lang).format(this.pRange.format_name)
    if (isUndefined(data.find(d => d.id == id)))
      data.push({ desc: desc, id: id });
    return data;
  }

  counterDiference() {
    var fecA = Moments();
    var fecL = Moments('06/03/2020 18:00:00', 'DD/MM/YYYY HH:mm:ss');
    //var fecL=Moments('20200306');

    if (fecA >= fecL)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    let seconds = fecL.diff(fecA, 'seconds');
    let days = Math.floor(seconds / 86400)
    seconds = seconds % 86400;
    let hours = Math.floor(seconds / 3600)
    seconds = seconds % 3600;
    let minutes = Math.floor(seconds / 60)
    seconds = seconds % 60;
    return { days: days, hours: hours, minutes: minutes, seconds: seconds }
  }

  now() {
    return mo();
  }



}

import * as Moments from 'moment';
import { extendMoment } from 'moment-range';
import { isUndefined } from 'util';
const mo = extendMoment(Moments);


export function dateArray(now_start, now_end,config?:IDate) {
    if(!config){
        console.log('no hay config');
    }
    let data = [];
    const range = mo.range(now_start, now_end);
    for (let i of range.by(config.interval)) {
      let desc = i.locale(config.lang).format(config.format.desc);
      let id = i.locale(config.lang).format(config.format.id);
      data.push({ desc: desc, id: id })
    }

    /*let desc = now_end.locale(config.lang).format(config.format.desc);
    let id = now_end.locale(config.lang).format(config.format.id);
    if (isUndefined(data.find(d => d.id == id)))
      data.push({ desc: desc, id: id });*/
    return data;
}



export interface IDate {
    interval:'months'
    lang:string
    format:{
        id:string
        desc:string
    }


  }

  /*@Injectable()
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
*/
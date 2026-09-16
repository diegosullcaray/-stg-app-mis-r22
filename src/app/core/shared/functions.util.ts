import * as cloneDeep from 'lodash/cloneDeep';
import * as merge from 'lodash/merge'


export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  var definitions = search.split('&');
  definitions.forEach(function (val, key) {
    var parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return (prop && prop in params) ? params[prop] : params;
}

export function cloneObject(source: any) {
  return cloneDeep(source);
}

export function mergeObjects(target: any, ...source: any) {
  return merge(target, ...source);
}

export function copyFields(target: {}, source: {}, listKeys?: string[]) {
  if (source) {
    let ss = cloneDeep(source);
    Object.keys(ss).forEach(e => {
      if (listKeys) {
        if (listKeys.includes(e)) {
          target[e] = source[e];
        }
      } else {
        target[e] = source[e];
      }
    });
  }
}

export function jsonStringifyIgnoringFields(source: any, ignoreList: string[]): string {
  function replacer(key, value) {
    if (ignoreList.indexOf(key) > -1) return undefined;
    else return value;
  }
  return JSON.stringify(source, replacer);
}

export function isNullOrUndefined(v) {
  return v === null || v === undefined;
}

export function isUndefined(v) {
  return v === undefined;
}

export function isNull(v) {
  return v === null;
}

export function onNullOrUndefined(nv, df) {
  return isNullOrUndefined(nv) ? df : nv;
}

export function round(num, decimalPlaces) {
  var p = Math.pow(10, decimalPlaces || 0);
  var n = (num * p) * (1 + Number.EPSILON);
  return Math.round(n) / p;
}

export function ceil(num, decimalPlaces) {
  var p = Math.pow(10, decimalPlaces || 0);
  var n = (num * p) * (1 - Math.sign(num) * Number.EPSILON);
  return Math.ceil(n) / p;
}

export function floor(num, decimalPlaces) {
  var p = Math.pow(10, decimalPlaces || 0);
  var n = (num * p) * (1 + Math.sign(num) * Number.EPSILON);
  return Math.floor(n) / p;
}

export function trunc(num, decimalPlaces) {
  return (num < 0 ? ceil : floor)(num, decimalPlaces);
}

export function toFixed(num, decimalPlaces) {
  return round(num, decimalPlaces).toFixed(decimalPlaces);
}

function interpolate(a: number, b: number, x: number) {
  return a * (1 - x) + b * x;
}

export function gradientColor(sc: any, ec: any, percent: number) {
  let r = { r: sc.r, g: sc.g, b: sc.b };
  r.r = interpolate(sc.r, ec.r, percent);
  r.g = interpolate(sc.g, ec.g, percent);
  r.b = interpolate(sc.b, ec.b, percent);
  return r;
}

function interpolateCos(a: number, b: number, x: number) {
  var ft = x * Math.PI,
    f = (1 - Math.cos(ft)) * 0.5;
  return a * (1 - f) + b * f;
}

export function gradientCosColor(sc: any, ec: any, percent: number) {
  let r = { r: sc.r, g: sc.g, b: sc.b };
  r.r = interpolateCos(sc.r, ec.r, percent);
  r.g = interpolateCos(sc.g, ec.g, percent);
  r.b = interpolateCos(sc.b, ec.b, percent);
  return r;
}

//format YYYYMMDD
export function stringToDate1(date: string) {

  let year = Number(date.slice(0, 4));
  let month = Number(date.slice(4, 6)) - 1;
  let day = Number(date.slice(6, 8));

  return new Date(year, month, day);
}


export function stringsToDate1(dates: string) {
  let da = dates.split(',');
  let ra = [];
  da.forEach(x => {
    ra.push(stringToDate1(x));
  });
  return ra;
}
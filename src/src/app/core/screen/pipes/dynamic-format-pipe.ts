import { formatDate, formatNumber } from '@angular/common';
import {
    Pipe,
    PipeTransform
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isNullOrUndefined, mergeObjects } from 'app/core/shared/functions.util';


@Pipe({
    name: 'dynamicFormatPipe'
})
export class DynamicFormatPipe implements PipeTransform {
    private formatDefaults: any = {
        decimal: {
            max_decimals: 2,
            fix_decimals: false
        },
        percent: {
            max_decimals: 2,
            fix_decimals: true
        },
        pbs: {
            max_decimals: 0,
            fix_decimals: false
        },
        icon: {
            type: '',
            size: '20px',
            src: 'google'
        },
        trafficlight: {
            type: 'traffic-light'
        },
        truncate: {
            limit: 25,
            complete_words: false,
            ellipsis: '...',
            link: false,
            link2: false
        }
    }

    constructor(private sanitizer: DomSanitizer, public router: Router) { }

    private appendTrafficLight() {

    }

    private escapeHtml(value: any): string {
        if (isNullOrUndefined(value)) {
            return '';
        }
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    transform(value: string, format: any, tr: any, key: string) {
        if (isNullOrUndefined(format)) {
            return value;
        }
        //return eval('this.' + format.mod + '(' + format.params + ')');
        return this[format.type](value, format.params, tr, key);
    }

    custom(value: string, params: any, tr: any, key: string) {
        let fn = params.typeFn;
        let t = fn(value, tr, key);
        if (t.type !== 'none') {
            return this[t.type](value, t.params, tr, key);
        }
        return value;
    }

    link(value: string, params: any) {
        let su = params && params.underline == true ? 'stg-link2' : 'stg-link';
        return this.sanitizer.bypassSecurityTrustHtml('<span class="' + su + '">' + value + '</span>');
    }

    time(value: string): string {
        return formatDate(value, 'yyyy-MM-dd hh:mm a', 'en-US');
    }

    chip(v: any, p: any, tr: any, k: string) {
        let fc = p.contStyleFn;
        let sc = fc(v, tr, k);
        let ft = p.textStyleFn;
        let st = ft(v, tr, k);
        //let a = p.align?p.align:"center center";
        let tf = p.format ? p.format : 'decimal';

        let nv = "";
        if (tf == 'integer') {
            nv = formatNumber(v, 'en-US', '.0-0');
        } else if (tf == 'decimal') {
            nv = formatNumber(v, 'en-US', '.0-2');
        } else if (tf == 'percent') {
            nv = formatNumber(v * 100, 'en-US', '.0-2') + '%';
        } else if (tf == 'pen') {
            nv = 'S/. ' + formatNumber(v, 'en-US', '.0-2');
        } else if (tf == 'text') {
            nv = this.escapeHtml(v);
        }
        let html = '<div style="' + sc + '"><span style="' + st + '">' + nv + '</span></div>';
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    icon(value: string, params: any) {
        //filled:''
        //outlined:'outlined'
        //rounded: 'round'
        //sharp: 'sharp'
        //two tone: 'two-tone'
        let p = mergeObjects(this.formatDefaults.icon, params ? params : {});
        let v = value;
        if (p.convertFn) {
            v = p.convertFn(v);
        }
        let t = p.type;
        if (t != '') {
            t = '-' + t;
        }
        if (p.src == 'google') {
            return this.sanitizer.bypassSecurityTrustHtml('<span class="material-icons' + t + '" style="font-size:' + p.size + ' !important;">' + v + '</span>');
        }
        else if (p.src == 'microsoft') {
            return this.sanitizer.bypassSecurityTrustHtml('<span class="ms-Icon ms-Icon--' + v + '" style="font-size:' + p.size + ' !important;"></span>');
        }
        return value;
    }



    integer(value: number, params: any) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        let r = formatNumber(value, 'en-US', '.0-0');
        if (params && (params.link == true || params.link2 == true)) {
            let cls = params.link2 ? 'stg-link2' : 'stg-link';
            return this.sanitizer.bypassSecurityTrustHtml('<span class="' + cls + ' ">' + r + '</span>');
            //return this.sanitizer.bypassSecurityTrustHtml('<div class="stg-table2-cell-container"><span class="material-icons stg-green-icon tl">lens</span><span class="'+cls+' ">' + r + '</span></div>');
        }
        return r;
    }

    integerTraffic(value: number, params: any) {
        if (isNullOrUndefined(value)) {
            return '';
        }

        const formatted = formatNumber(value, 'en-US', '.0-0');
        const trafficFn = params && params.trafficFn;
        const color = trafficFn ? trafficFn(value) : value < 0 ? 'red' : 'green';
        const iconClass = color === 'red' ? 'stg-red-icon' : color === 'orange' ? 'stg-orange-icon' : 'stg-green-icon';
        if (params && params.indicator === 'arrow') {
            const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '';
            const textClass = this.trafficTextClass(color, params.softColors);
            const arrowHtml = arrow ? '<span class="stg-traffic-arrow ' + textClass + '">' + arrow + '</span> ' : '';
            const shownValue = params.colorValue ? formatNumber(Math.abs(value), 'en-US', '.0-0') : formatted;
            return this.sanitizer.bypassSecurityTrustHtml('<span class="stg-traffic-value ' + (params.colorValue ? textClass : '') + '">' + arrowHtml + shownValue + '</span>');
        }
        const html = '<div class="stg-table2-cell-with-traffic">' +
            '<div><span class="material-icons ' + iconClass + '">lens</span></div>' +
            '<div><span>' + formatted + '</span></div></div>';

        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    private trafficTextClass(color: string, softColors: boolean): string {
        if (softColors) {
            return color === 'red' ? 'stg-red-soft-text' : color === 'orange' ? 'stg-orange-soft-text' : 'stg-green-soft-text';
        }
        return color === 'red' ? 'stg-red-text' : color === 'orange' ? 'stg-orange-text' : 'stg-green-text';
    }

    decimal(value: number, params: any) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        let p = mergeObjects(this.formatDefaults.decimal, params ? params : {});
        let d1 = p.fix_decimals ? p.max_decimals : 0;
        let d2 = p.max_decimals;
        let r = formatNumber(value, 'en-US', '.' + d1 + '-' + d2);
        if (params && (params.link == true || params.link2 == true)) {
            let cls = params.link2 ? 'stg-link2' : 'stg-link';
            return this.sanitizer.bypassSecurityTrustHtml('<span class="' + cls + '">' + r + '</span>');
        }
        return r;
    }


    percent(value: number, params: any) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        // Se combinan los parámetros por defecto con los que se reciben
        const p = mergeObjects(this.formatDefaults.percent, params || {});
        const d1 = p.fix_decimals ? p.max_decimals : 0;
        const d2 = p.max_decimals;
        const formatted = formatNumber(value * 100, 'en-US', `.${d1}-${d2}`) + '%';

        // Determinar si se debe retornar SafeHtml
        const hasLink = params && (params.link || params.link2);
        const hasTraffic = params && (typeof params.trafficFn === 'function');

        if (params && params.indicator === 'arrow' && hasTraffic) {
            const color = params.trafficFn(value);
            const textClass = this.trafficTextClass(color, params.softColors);
            const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '';
            const arrowHtml = arrow ? '<span class="stg-traffic-arrow ' + textClass + '">' + arrow + '</span> ' : '';
            const shownValue = params.colorValue ? formatNumber(Math.abs(value * 100), 'en-US', `.${d1}-${d2}`) + '%' : formatted;
            return this.sanitizer.bypassSecurityTrustHtml('<span class="stg-traffic-value ' + (params.colorValue ? textClass : '') + '">' + arrowHtml + shownValue + '</span>');
        }

        // Si se indicó al menos uno de los atributos link, link2 o trafficFn
        if (hasLink || hasTraffic) {
            // Caso en que se indique trafficFn (puede venir solo o acompañado de link/link2)
            if (hasTraffic) {
                // Se obtiene la clase de color a partir de la función trafficFn
                const colorClass = params.trafficFn(value); // Se espera que retorne 'rojo', 'naranja' o 'verde'

                // Se construye el segundo span siguiendo la lógica del punto 1:
                // si se pasa link o link2 se asigna la clase correspondiente; de lo contrario, se muestra el valor formateado sin clase
                const spanClass = hasLink ? (params.link2 ? 'stg-link2' : 'stg-link') : '';
                const secondSpan = spanClass
                    ? `<span class="${spanClass}">${formatted}</span>`
                    : `<span>${formatted}</span>`;

                // Se arma el HTML con un contenedor principal que incluye dos div internos:
                // - El primer div (35%) contiene el span con el semáforo (ícono "lens" y la clase de color)
                // - El segundo div (65%) contiene el span con el valor formateado (con link si corresponde)
                const html = `<div class="stg-table2-cell-with-traffic"><div><span class="material-icons stg-${colorClass}-icon">lens</span></div><div>${secondSpan}</div></div>
      `;
                return this.sanitizer.bypassSecurityTrustHtml(html);
            } else {
                // Caso en que solo se indique link o link2 (sin trafficFn)
                const cls = params.link2 ? 'stg-link2' : 'stg-link';
                const html = `<span class="${cls}">${formatted}</span>`;
                return this.sanitizer.bypassSecurityTrustHtml(html);
            }
        }

        // Si no se pasan los parámetros especiales, se retorna el valor formateado normalmente
        return formatted;
    }


    trafficlight(value: number, params: string) {
        if (isNullOrUndefined(value)) {
            return '';
        }
        let color = (value == 0) ? 'stg-orange-icon' : (value == -1) ? 'stg-red-icon' : (value == 1) ? 'stg-green-icon' : false
        if (color) {
            return this.sanitizer.bypassSecurityTrustHtml('<span class="material-icons ' + color + '">lens</span>');
        } else {
            return '';
        }
    }

    pbs(value: number, params: any) {
        let p = mergeObjects(this.formatDefaults.pbs, params ? params : {});
        let d1 = p.fix_decimals ? p.max_decimals : 0;
        let d2 = p.max_decimals;
        return formatNumber(value * 10000, 'en-US', '.' + d1 + '-' + d2) + ' pbs';
    }

    truncate(value: string, params: any) {
        if (isNullOrUndefined(value) || value == '') {
            return value;
        }
        let p = mergeObjects(this.formatDefaults.truncate, params ? params : {});
        let l = p.limit;
        if (p.complete_words) {
            l = value.substr(0, l).lastIndexOf(' ');
        }
        let r = value.length > l ? value.substr(0, l - p.ellipsis.length) + p.ellipsis : value;
        if (params && (params.link == true || params.link2 == true)) {
            let cls = params.link2 ? 'stg-link2' : 'stg-link';
            return this.sanitizer.bypassSecurityTrustHtml('<span class="' + cls + ' ">' + r + '</span>');
        }
        return r;
    }
}

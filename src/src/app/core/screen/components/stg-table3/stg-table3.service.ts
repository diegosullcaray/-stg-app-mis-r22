import { Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * Opciones disponibles para cada key de los objetos generados.
 *
 * - type: 'integer' | 'decimal' | 'date' | 'string'
 * - max, min: límites para números y fechas.
 *   - Si type es 'integer' o 'decimal': se espera max/min de tipo number.
 *   - Si type es 'date': se espera que max/min sean fechas o convertibles a fecha.
 * - name: si es 'string' y name === true, genera un "nombre" aleatorio de 4 palabras.
 * - doc_num: si es 'string' y doc_num === true, genera 8 dígitos aleatorios (tipo documento).
 * - address: si es 'string' y address === true, genera una dirección aleatoria.
 * - email: si es 'string' y email === true, genera un correo electrónico aleatorio.
 * - hour: si es 'date' y hour === true, incluye hora (HH:mm:ss) en la fecha generada.
 */
export interface StgTable3RandomOptions {
  key: string;
  type?: 'integer' | 'decimal' | 'date' | 'string';
  max?: number | string | Date;
  min?: number | string | Date;
  name?: boolean;
  doc_num?: boolean;
  address?: boolean;
  email?: boolean;
  hour?: boolean;
}

@Injectable()
export class StgTable3Service {

  /**
   * Base de 2000 palabras aleatorias para generación de texto.
   * Puedes personalizar o cargar externamente. Aquí se muestra un ejemplo reducido.
   */
  private randomWords: string[] = [];

  constructor() {
    this.buildRandomWordsArray();
  }

  /**
   * Genera un arreglo de objetos con datos "dummy" a partir de las keys y sus opciones.
   * @param size Cantidad de objetos que se generarán
   * @param keys Arreglo de claves que tendrá cada objeto
   * @param options Configuración específica por cada key
   * @returns Un array de objetos con valores generados aleatoriamente
   */
  public buildDemoData(size: number, keys: string[], options?: StgTable3RandomOptions[]): any[] {
    const data: any[] = [];

    for (let i = 0; i < size; i++) {
      const item: any = {};
      for (const k of keys) {
        const opt = this.getKeyOption(k, options);

        // Generar el valor para la key k
        item[k] = this.generateValue(opt);
      }
      data.push(item);
    }
    return data;
  }

  /**
   * Devuelve la configuración StgTable3RandomOptions para una key específica.
   * Si no encuentra una configuración, utiliza valores por defecto.
   */
  private getKeyOption(k: string, options?: StgTable3RandomOptions[]): StgTable3RandomOptions {
    if (!options || options.length === 0) {
      return { key: k, type: 'string' };
    }
    const found = options.find(o => o.key === k);
    if (!found) {
      // por defecto, type string y sin banderas
      return { key: k, type: 'string' };
    }
    return {
      // fusión con defaults
      key: found.key,
      type: found.type || 'string',
      max: found.max,
      min: found.min,
      name: found.name,
      doc_num: found.doc_num,
      address: found.address,
      email: found.email,
      hour: found.hour
    };
  }

  /**
   * De acuerdo a las opciones, genera un valor aleatorio.
   */
  private generateValue(opt: StgTable3RandomOptions): any {
    const type = opt.type || 'string';

    switch (type) {
      case 'integer':
        return this.generateRandomInteger(
          (opt.min as number) ?? 0,
          (opt.max as number) ?? 9999
        );

      case 'decimal':
        return this.generateRandomDecimal(
          (opt.min as number) ?? 0,
          (opt.max as number) ?? 9999
        );

      case 'date':
        return this.generateRandomDate(opt);

      case 'string':
      default:
        return this.generateRandomString(opt);
    }
  }

  //#region Generadores de datos

  private generateRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private generateRandomDecimal(min: number, max: number): number {
    const val = Math.random() * (max - min) + min;
    // Ejemplo: número con 2 decimales
    return parseFloat(val.toFixed(2));
  }

  /**
   * Genera una fecha aleatoria entre min y max. Usa moment para mayor comodidad.
   */
  private generateRandomDate(opt: StgTable3RandomOptions): string {
    const now = moment();
    // Determinar min y max por defecto
    const defaultMin = moment(now).startOf('year'); // 1er día del año actual
    const defaultMax = moment();

    // min y max pueden ser string/Date/number, intentamos parsear con moment
    const minDate = opt.min ? moment(opt.min) : defaultMin;
    const maxDate = opt.max ? moment(opt.max) : defaultMax;

    if (!minDate.isValid()) {
      minDate.set(defaultMin.toObject());
    }
    if (!maxDate.isValid()) {
      maxDate.set(defaultMax.toObject());
    }

    const diff = maxDate.diff(minDate, 'seconds');
    const randomSec = Math.floor(Math.random() * diff);
    const randomDate = moment(minDate).add(randomSec, 'seconds');

    // Formato de salida
    return opt.hour
      ? randomDate.format('YYYY-MM-DD HH:mm:ss')
      : randomDate.format('YYYY-MM-DD');
  }

  /**
   * Genera una cadena de texto. Determina si se requiere name, doc_num, address, email
   * o bien un string básico.
   */
  private generateRandomString(opt: StgTable3RandomOptions): string {
    // Generar "nombre" (4 palabras)
    if (opt.name) {
      return this.pickRandomWords(4).join(' ');
    }
    // Generar doc_num (8 dígitos)
    if (opt.doc_num) {
      let doc = '';
      for (let i = 0; i < 8; i++) {
        doc += Math.floor(Math.random() * 10).toString();
      }
      return doc;
    }
    // Generar dirección (ej. 2-5 palabras + "Street" / "Ave." etc.)
    if (opt.address) {
      const streetNumber = this.generateRandomInteger(100, 9999);
      const wordsForAddress = this.pickRandomWords(this.generateRandomInteger(2, 5));
      const suffixes = ['St.', 'Ave.', 'Blvd.', 'Way', 'Lane'];
      const randomSuffix = suffixes[this.generateRandomInteger(0, suffixes.length - 1)];
      return `${streetNumber} ${wordsForAddress.join(' ')} ${randomSuffix}`;
    }
    // Generar email
    if (opt.email) {
      const part1 = this.pickRandomWords(1)[0];
      const part2 = this.pickRandomWords(1)[0];
      return `${part1}.${part2}@demo.com`.toLowerCase();
    }
    // Si no hay configuración especial -> 1 palabra
    return this.pickRandomWords(1)[0];
  }

  //#endregion

  //#region Utilidades de palabras

  /**
   * Crea o llena el array de 2000 palabras aleatorias.
   * Para demo, se rellenan con seeds simples (en un proyecto real, cargarías un diccionario).
   */
  private buildRandomWordsArray(): void {
    // Usamos un set para evitar duplicados. Luego convertimos a array.
    const wordSet = new Set<string>();
    const baseChars = 'abcdefghijklmnopqrstuvwxyz';

    // Genera "falsas palabras" con longitud variable
    while (wordSet.size < 2000) {
      const wordLength = this.generateRandomInteger(3, 10);
      let w = '';
      for (let i = 0; i < wordLength; i++) {
        const randIndex = this.generateRandomInteger(0, baseChars.length - 1);
        w += baseChars[randIndex];
      }
      wordSet.add(w);
    }
    this.randomWords = Array.from(wordSet);
  }

  /**
   * Retorna un sub-array de palabras aleatorias (size especificado).
   */
  private pickRandomWords(count: number): string[] {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      const idx = this.generateRandomInteger(0, this.randomWords.length - 1);
      words.push(this.randomWords[idx]);
    }
    return words;
  }

  //#endregion

}

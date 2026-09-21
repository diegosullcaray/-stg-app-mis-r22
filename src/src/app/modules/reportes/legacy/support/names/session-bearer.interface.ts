/*interface IUserProfile {
    email:string,
    access_token: string,
    nombre:string,
    num_doc: string,
    cargo: string,
    codigo_bt: string,
    tip_use:number
}

interface IUserAlternate{
    email_alt:string,
    nombre_alt:string,
    cargo_alt:string
}

interface IStrategosApp {
    cod_app: string,
    des_app: string,
    icon_app: string,
    det_app: string,
    tip_app: string,
    ger_app: string
}
*/
export interface IStrategosCache {
    math:{  tip_cod: number,
            cod_rel: string,
            level_load: number,
            jerar:string},
    data:{  label: string,
            data: [],
            tip_cod: number,
            level: number,
            sel: number,
            flag:boolean,
            ext: boolean,
            level_load: number}
}
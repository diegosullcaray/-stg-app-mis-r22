export interface IStgTableHeader{
    label:string,
    key?:string,
    blank?:boolean,
    sticky?:boolean,
    style?:{},
    actions?:any[],
    type?:string,
    format?:string,
    iconizer?:any,
    subs?:IStgTableHeader[]
}

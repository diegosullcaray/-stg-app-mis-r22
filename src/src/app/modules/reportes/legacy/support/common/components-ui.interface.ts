export interface confInit{
    width?:string,
    class?:string,
    edit?:boolean,
    paginator?:boolean,
    paginator_size?:number,
    sticky?:boolean,
  }
  
  export interface confTable{
    report:string,
    theme:{},
    width?:string,
    content?:{
        higher?:string,
        lower?:string
    }
  }
export class Strand{
    private actionRoute:string;
    private name:string;
    private payload:any;
    formData:FormData;
    private withFormData:boolean;

    constructor(actionRoute:string,name?:string) {
        this.actionRoute=actionRoute;
        this.name=name;
        this.payload={};
        this.withFormData=false;
    }

    public haveFormData():boolean{
        return this.withFormData;
    }

    public setFile(file:File,id:string){
        this.formData = new FormData();
        this.formData.append('winder-file', file, id);
        this.pushToPayload('_req_file_name_',file.name);
        this.pushToPayload('_req_file_id_',id);
        this.withFormData=true;
    }

    public getFormData():FormData{
        return this.formData;
    }

    public addToPayload(o:{}):Strand{
        this.payload = Object.assign(this.payload, o);
        return this;
    }

    public pushToPayload(k:string,v:any):Strand{
        this.payload[k]=v;
        return this;
    }
}
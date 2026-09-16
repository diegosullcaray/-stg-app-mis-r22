import { environment } from "environments/environment";

export function printLog(message: any, ...optionalParams: any[]){
    if(!environment.production){
        if(optionalParams===undefined || optionalParams.length==0){
            console.log(message);
        }else{
            console.log(message,optionalParams);
        }
    }
}

export function printWarn(message: any, ...optionalParams: any[]){
    if(!environment.production){
        if(optionalParams===undefined || optionalParams.length==0){
            console.warn(message);
        }else{
            console.warn(message,optionalParams);
        }
    }
}

export function printError(message: any, ...optionalParams: any[]){
    if(!environment.production){
        if(optionalParams===undefined || optionalParams.length==0){
            console.error(message);
        }else{
            console.error(message,optionalParams);
        }
    }
}

export function printTable(tabularData: any, properties?: string[]){
    if(!environment.production){
        console.table(tabularData,properties);
    }
}
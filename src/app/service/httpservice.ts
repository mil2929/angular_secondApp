import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from '../config/app.config';

@Injectable()
export class HttpService{
    base = config.base;
    
    constructor(private http: HttpClient){
    }

    public get(url){
        let res = this.http.get(this.base + url, this.getOption());
        return res;
    }

    public post(url, data:any){
        let res = this.http.post(this.base + url, JSON.stringify(data), this.getOption());
        return res;
    }

    public put(url, data:any){
        let res = this.http.put(this.base + url, JSON.stringify(data), this.getOption());
        return res;
    }

    public delete(url){
        let res = this.http.delete(this.base + url, this.getOption());
        return res;
    }

    private getOption(){
        let token = localStorage.getItem("auth-token")||"";
        let headers = new HttpHeaders({
            "Content-type" : "application/json",
            "Authorization":"Bearer "+ token //enter the token here
        });
        return {
            headers : headers
        }
    }
}
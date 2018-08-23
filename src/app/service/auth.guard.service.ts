import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpService } from './httpservice';

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private route: Router, private http:HttpService){}
    canActivate(activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        console.log(state.url);
        let status = this.http.get("/login/cektoken").toPromise().then(
            res=> {
                console.log(res);
                if(res['status']==false){
                    this.route.navigateByUrl("login");
                }
                return res['status'];
            },
            
                err=>{
                    this.route.navigateByUrl("login");
                    return false;
                }
            
        ) || false;

        if (status==false){
            this.route.navigateByUrl("login");
            console.log("invalid token");
        }
        console.log(status);
        return status;
    }

}

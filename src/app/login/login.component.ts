import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/httpservice';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
})
export class LoginComponent  { 
    constructor(private service: HttpService, private router: Router) {
        
    }

    message = '';
    formlogin = {
        username: "",
        password: ""
    }
    login(){
        this.service.post("/login/login", this.formlogin)
        .subscribe(
            res=>{
                if(res["login"]==true){
                    localStorage.setItem("auth-token", res["token"]);
                    this.router.navigateByUrl("pages");
                    console.log(this.formlogin.username);
                } else {
                    this.message = res["message"];
                    console.log(res["login"]);
                    console.log(this.formlogin.username);
                }
            },
            err => {
                console.log("Login Failed");
                console.log(err);
            },
            ()=>{}
        );
    }
}
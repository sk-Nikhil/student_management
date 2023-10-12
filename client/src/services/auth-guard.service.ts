import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { AsyncSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.authService.isAuthenticated()
        .then((authenticated:boolean)=>{
            console.log(authenticated);
            
            if(authenticated){
                return true
            }
            else{
                this.router.navigate(['/'])
                return false
            }
        })
    }
}
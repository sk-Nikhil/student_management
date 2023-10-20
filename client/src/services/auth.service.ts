import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import axios from 'axios'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AxiosService } from './axios.service';

@Injectable({
    providedIn:'root'
})

export class AuthService{
    constructor(private router:Router, private axiosService:AxiosService){}

    loggedIn = this.getStatus();
    getStatus()
    {
        const s = sessionStorage.getItem('isLogged')
        if(s != undefined)
        {
            if(s === 'true')
                return true;
            else
                return false;
        }
        else 
            return false;

    }

    private isValidUser = new BehaviorSubject<boolean>(this.loggedIn);
    isValidUser$ = this.isValidUser.asObservable();

    isAuthenticated(){
        const promise = new Promise(
            (resolve)=>{
                resolve(this.loggedIn);
            }
        )
        return promise;
    }

    // async login(user:any){
    //     let token:string;
    //     await axios.post('http://localhost:3000/login', user).then((response)=>{
    //         if(response.data.token){
    //             token = response.data.token;
    //             this.loggedIn = true;
    //             sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn)); 
    //             localStorage.setItem('token', token);
    //             this.router.navigate(['/home'], {replaceUrl:true});
    //             this.updateValidation(true);
    //         }
    //         else{
    //             this.loggedIn = false;  
    //             this.updateValidation(false);
    //         }
    //     })
    //     if(token){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }

    async login(user:any){
        let isValidUser:boolean;
        await axios.post('http://localhost:3000/login', user).then((response)=>{
            console.log(response.data)
            if(response.data.success){
                this.loggedIn = true;
                sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn)); 
                // localStorage.setItem('token', token);
                this.router.navigate(['/home'], {replaceUrl:true});
                this.updateValidation(true);
                isValidUser = true;
            }
            else{
                this.loggedIn = false;  
                this.updateValidation(false);
                isValidUser = false;
            }
        })
        return isValidUser;
    }

    logout(){
        this.router.navigate(['/']);
        this.updateValidation(false);
        sessionStorage.removeItem('isLogged');   
        localStorage.removeItem('token');
        
    }

    updateValidation(data:boolean){
        this.isValidUser.next(data);
    }

}
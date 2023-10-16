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
        {
            return false;
        }

    }

    private isValidUser = new BehaviorSubject<boolean>(this.loggedIn);
    isValidUser$ = this.isValidUser.asObservable();

    isAuthenticated(){
        const promise = new Promise(
            (resolve, reject)=>{
                resolve(this.loggedIn)
            }
        )
        return promise
    }

    async login(user){
        await axios.post('http://localhost:3000/login', user).then((response)=>{
            const token = response.data
            console.log("token",token)
            if(token){
                this.loggedIn = true
                this.isValidUser.next(true)
                // localStorage.setItem('isLogged', JSON.stringify(this.loggedIn));
                sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn)); 

                // adding token to ls
                localStorage.setItem('token', token)     

                this.router.navigate(['/home'])
                this.updateValidation(true)

            }
            else{
                this.loggedIn = false;
                sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn));    
                this.updateValidation(false)
            }
 

        })
    }


    logout(){
        this.router.navigate(['/'])
        // this.loggedIn = false 
        this.updateValidation(false)
        sessionStorage.removeItem('isLogged')   
        localStorage.removeItem('token')
        
    }

    getUserValidation(){
        return this.isValidUser
    }

    updateValidation(data){
        this.isValidUser.next(data)
    }

}
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
            if(response.data.token){
                const token = response.data.token
                this.loggedIn = true
                sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn)); 
                localStorage.setItem('token', token)     
                this.router.navigate(['/home'], {replaceUrl:false})
                this.updateValidation(true)

            }
            else{
                this.loggedIn = false;  
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
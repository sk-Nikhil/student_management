import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import axios from 'axios'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn:'root'
})

export class AuthService{
    constructor(private router:Router){}

    private isValidUser = new BehaviorSubject<boolean>(false);
    isValidUser$ = this.isValidUser.asObservable();

    loggedIn = this.getStatus();
    getStatus()
    {
        const s = localStorage.getItem('isLogged');
        if(s != undefined)
        {
            if(s === 'true')
                return true;
            else
                return false;
        }
        else 
        {
            localStorage.setItem('isLogged', 'false');
            return false;
        }

    }

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
            console.log(response.data)
            if(response.data !== 'authorized'){
                this.loggedIn = false;
                localStorage.setItem('isLogged', JSON.stringify(this.loggedIn));    

                this.updateValidation(false)
            }
            else{
                this.loggedIn = true
                this.isValidUser.next(true)
                localStorage.setItem('isLogged', JSON.stringify(this.loggedIn));    

                this.router.navigate(['/home'])
                this.updateValidation(true)
            }
 

        })
    }

    logout(){
        this.router.navigate(['/'])
        this.loggedIn = false
        localStorage.setItem('isLogged', JSON.stringify(this.loggedIn)); 
        
    }

    getUserValidation(){
        return this.isValidUser
    }

    updateValidation(data){
        this.isValidUser.next(data)
    }

}
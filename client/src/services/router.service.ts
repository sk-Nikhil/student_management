import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import axios from 'axios'
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class RouterService{
    baseurl = 'http://localhost:3000'

    constructor(private router:Router){}
    
    private signupError = new Subject<String>();
    signupError$ = this.signupError.asObservable();



    // add User
    async signup(user:any){
        console.log("signup")
        await axios.post(`${this.baseurl}/addUser`, user)
        .then(response => {
            if(response.status === 201 && response.data === 'success'){
                this.router.navigate(['/login'])
                return
            }
            else if(response.data === 'user-exists'){
                console.log(response)
                this.signupError.next('user already exists, please login!')
                // this.signupError = 'user already exists, please login!'
            }
            else{
                this.signupError.next('Internal server error! please try again later')
                // this.signupError = 'Internal server error!'
            }
        })
    }
}
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import axios from 'axios'
import { Subject } from "rxjs";
import { AuthService } from "./auth.service";
import { AxiosService } from "./axios.service";
import { DataService } from "./data.service";

@Injectable({
    providedIn:'root'
})

export class RouterService{
    baseurl = 'http://localhost:3000'

    constructor(private router:Router, private authService:AuthService, private axiosService:AxiosService, private dataService:DataService){}
    
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



    // async login(user){
    //     await axios.post('http://localhost:3000/login', user).then((response)=>{
    //         const token = response.data
    //         console.log("token",token)
    //         if(token){
    //             this.loggedIn = true
    //             this.isValidUser.next(true)
    //             // localStorage.setItem('isLogged', JSON.stringify(this.loggedIn));
    //             sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn)); 

    //             // adding token to ls
    //             localStorage.setItem('token', token)     

    //             this.router.navigate(['/home'])
    //             this.updateValidation(true)

    //         }
    //         else{
    //             this.loggedIn = false;
    //             sessionStorage.setItem('isLogged', JSON.stringify(this.loggedIn));    
    //             this.updateValidation(false)
    //         }
 

    //     })
    // }


    async getStudentId(){
        let id=0 
        await this.axiosService.get('/getStudentId')
        .then((response)=>{
          id = response.data
        })
        return id
    }

    async addStudent(id,studentData){
      const student = {S_No:id,...studentData};
      await this.axiosService.post('/addStudent', student)
    }


    async getFilteredStudents(searchTerm,page){
        let data
        await this.axiosService.get(`/filterSearch/${searchTerm}?page=${page}`)
        .then(response=>{
            data = response.data
        })
        return data
    }


    async removeStudent(S_No:any){
        await this.axiosService.delete(`/removeStudent/${S_No}`)
        .then(()=>{
            return "removed"
        })
    }

    async updateStudent(student){
        await this.axiosService.patch('/updateStudent', student)
      .then(()=>{
        this.dataService.updateStudent(student)
      })
    }
}
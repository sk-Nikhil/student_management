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
      const res=   await axios.post(`${this.baseurl}/addUser`, user)
        .then(response => {
            if(response.status === 201 && response.data === 'success'){
                this.router.navigate(['/login'])
                return
            }
            else if(response.data === 'user-exists'){
                this.signupError.next('user already exists, please login!')
            }
            else{
                this.signupError.next('Internal server error! please try again later')
            }
        })
    }

    async addStudent(studentData){
      const student = {...studentData};
      var res
      
      await this.axiosService.post('/addStudent', student)
      .then(response => {
            console.log("added successfully")
            res = response.status
      })
      return res
    }

    async getFilteredStudents(searchTerm,page){
        let data:any
        await this.axiosService.get(`/filterSearch/${searchTerm}?page=${page}`)
        .then(response=>{
            data = response.data
        })
        return data
    }

    async removeStudent(id:any){
        await this.axiosService.delete(`/removeStudent/${id}`)
        .then(()=>{
            return "removed"
        })
    }

    async updateStudent(student:any){
        var res
        await this.axiosService.patch('/updateStudent', student)
      .then((response)=>{
        res = response.status
        this.dataService.updateStudent(student)
      })

      return res
    }
}
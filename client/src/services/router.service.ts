import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import axios from 'axios'
import { AuthService } from "./auth.service";
import { AxiosService } from "./axios.service";
import { DataService } from "./data.service";

@Injectable({
    providedIn:'root'
})

export class RouterService{
    baseurl = 'http://localhost:3000';

    constructor(private router:Router, private authService:AuthService, private axiosService:AxiosService, private dataService:DataService){}

    // add User
    async signup(user:any){
        let error:String;
        await axios.post(`${this.baseurl}/addUser`, user)
        .then(response => {
            if(response.status === 201 && response.data === 'success'){
                this.router.navigate(['/login']);
                return;
            }
            else if(response.data === 'user-exists')
                error = 'user already exists, please login!';
            else
                error = 'Internal server error! please try again later';
        })
        return error;
    }

    async addStudent(id:String,studentData){
      const student = {id,...studentData};
      var res:String;
      
      await this.axiosService.post('/addStudent', student)
      .then(response => {
            this.dataService.addStudent(student)
            res = response.data;
      })
      return res;
    }

    async getFilteredStudents(searchTerm,page){
        let data:any;
        await this.axiosService.get(`/filterSearch/${searchTerm}?page=${page}`)
        .then(response=>{
            data = response.data;
        })
        return data;
    }

    async removeStudent(id:any, page:Number){
        await this.axiosService.delete(`/removeStudent/${id}`)
        .then((response)=>{
            this.dataService.removeStudent(id, page)
            console.log(response)
            this.dataService.addInfoToast(` record has been removed successfully`)
        })
    }

    async updateStudent(student:any){
        var res:any;
        await this.axiosService.patch('/updateStudent', student)
        .then((response)=>{
            res = response.data;
            this.dataService.updateStudent(student);
        })
        return res;
    }
}
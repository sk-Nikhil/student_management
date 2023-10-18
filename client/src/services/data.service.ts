import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { AxiosService } from "./axios.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})

export class DataService {
    students:any=[]
    constructor( private axiosService:AxiosService, private router:Router, private authService:AuthService){}

    // show add-child component on the click of add-child button in home compoents
    // and on clicking backdrop on add-child component
    // used in home component
    private showAddForm = new BehaviorSubject<boolean>(false);
    showAddForm$ = this.showAddForm.asObservable();
    
    // show/hide edit-child component used in home component of click of edit button
    // or on click of backdrop of app-edit component
    // used in home component
    private showEditForm = new BehaviorSubject<boolean>(false);
    showEditForm$ = this.showEditForm.asObservable();

    // whenever a new student is added, is edited or removed a modal will be shown up
    // showing the successfully completion of the work
    private showModal = new BehaviorSubject<any>({status:false, text:''});
    showModal$ = this.showModal.asObservable();

    private StudentRecords = new BehaviorSubject<any>(this.students);
    StudentRecords$ = this.StudentRecords.asObservable();

    addStudent(data:any){
        this.students.unshift(data)
        this.updateStudentRecords(this.students)
    }
    
    // updating student record in local instance of students
    // triggered in router service
    updateStudent(student:any){
        const index = this.students.findIndex((stud:any)=>student._id === stud._id);
        this.students.splice(index, 1, student);
        this.updateStudentRecords(this.students)
    }

    removeStudent(id:any, page:Number){
        this.getStudents(page)
    }

    // make add child form hidden or visible
    updateAddFormStatus(data:boolean){
        this.showAddForm.next(data)
    }

    // make edit child form hidden or visible
    updateEditFormStatus(data:boolean){
        this.showEditForm.next(data)
    }

    updateModal(status:boolean, text:String){
        this.showModal.next({status:status, text:text})
    }

    updateStudentRecords(students:any){
        this.StudentRecords.next(students)
    }

    // initializing student array on loading component
    async getStudents(page:Number){
        let studentData:any
        let invalidToken:any
        await this.axiosService.get(`/getStudents?page=${page}`)
        .then((response)=>{
            // here invalidToken is the error that arised due to the token authenthentication or received an empty token
            // so if we do not have any error in token verification desired data is successfully fetched
            if(!response.data.invalidToken) {
                studentData = response.data;
                this.students = response.data.students;
                this.updateStudentRecords(this.students)
            }
            else{
                invalidToken=response.data.invalidToken
            }
        })
        if(!invalidToken)
            return {studentData, students:this.students};
        else{
            // if we have any error in verifying token which may arise due to manually overriding token
            // it will end the user-session and will be redirected to login page
            this.authService.logout()
            return {invalidToken}
        }
    
    }

}
import { EventEmitter, Injectable, OnInit } from "@angular/core"
import axios from "axios"
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { AxiosService } from "./axios.service";

@Injectable({
    providedIn:'root'
})

export class DataService {

    constructor( private axiosService:AxiosService){}

    private canAdd = new BehaviorSubject<boolean>(false);
    canAdd$ = this.canAdd.asObservable();

    private canEdit = new BehaviorSubject<boolean>(false);
    canEdit$ = this.canEdit.asObservable();

    private showAddDialog = new BehaviorSubject<boolean>(false);
    showAddDialog$ = this.showAddDialog.asObservable();

    private showEditDialog = new BehaviorSubject<boolean>(false);
    showEditDialog$ = this.showEditDialog.asObservable();

    students:any=[]

    studentUpdated = new EventEmitter<any>()

    addStudent(data:any){
        this.students.push(data)
    }


    getFormStatus(){
        return this.canAdd
    }
    getEditForm(){
        return this.canEdit
    }
   
    

    updateStudent(student:any){
        const index = this.students.findIndex((stud)=>student.S_No === stud.S_No)
        this.students.splice(index, 1, student)        
    }

    updateAddFormStatus(data:boolean){
        this.canAdd.next(data)
    }

    updateEditFormStatus(data:boolean){
        this.canEdit.next(data)
    }

    updateAddDialogStatus(data){
        this.showAddDialog.next(data)
    }

    updateEditDialogStatus(data){
        this.showEditDialog.next(data)
    }


    async getStudents(page){
        let studentData
        await this.axiosService.get(`/getStudents?page=${page}`)
        .then((response)=>{
            studentData = response.data
            this.students = response.data.students
        })
        return {studentData, students:this.students}
    }

}
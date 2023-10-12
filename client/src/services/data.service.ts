import { EventEmitter, OnInit } from "@angular/core"
import axios from "axios"
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

export class DataService {

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
        // this.getStudents()
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
        await axios.get(`http://localhost:3000/getStudents?page=${page}`)
        .then((response)=>{
            studentData = response.data
            this.students = response.data.students
        })
        return {studentData, students:this.students}
    }


    async getFilteredStudents(searchTerm,page){
        let data
        await axios.get(`http://localhost:3000/filterSearch/${searchTerm}?page=${page}`)
        .then(response=>{
            data = response.data
        })
        return data
    }
}
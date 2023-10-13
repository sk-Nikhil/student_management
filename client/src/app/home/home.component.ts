import { Component, DoCheck, OnInit } from '@angular/core';
import axios from 'axios';
import { AxiosService } from 'src/services/axios.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // currentPage:Number

  showAddDialog:boolean
  showEditDialog:boolean

  currentPage = 1;
  totalPages=1
  totalEntries=0
  dataFound=0
  
  editForm=null
  editStud=null
  
  students:any=[]
  
  onPageChange(page: number) {
    this.loadPage(page)
  }

  constructor(private dataService:DataService, private axiosService:AxiosService){}

  ngOnInit(){
    console.log("home")
    this.dataService.canEdit$.subscribe((canEdit)=>{
      this.editForm = canEdit
    })

    this.dataService.showAddDialog$.subscribe((showDialog)=>{
      this.showAddDialog = showDialog
    })

    this.dataService.showEditDialog$.subscribe((editDialog)=>{
      this.showEditDialog = editDialog
    })

    this.loadPage()

  }

  loadPage(page=this.currentPage){
    if(!this.searchTerm){
      this.dataService.getStudents(page)
      .then((response)=>{
        this.students = response.students;
        // console.log(this.students)
        this.currentPage = response.studentData.currentPage
        this.totalPages = response.studentData.totalPages
        this.totalEntries = response.studentData.totalEntries
      })
    }
    else{
      this.dataService.getFilteredStudents(this.searchTerm, page)
      .then(response=>{
        console.log(response)
        this.students = response.students;
        this.currentPage = response.currentPage
        // this.totalPages = response.studentData.totalPages
        this.dataFound = this.students.length
    })
    }
  }

  searchTerm:' '
  filteredData: any=[];

 

  search() {
    this.currentPage=1
    this.loadPage(this.currentPage)
  }
  
  async removeStudent(S_No:any){
    // await axios.delete(`http://localhost:3000/removeStudent/${S_No}`)
    await this.axiosService.delete(`/removeStudent/${S_No}`)
    .then(()=>{
      this.loadPage(this.currentPage)
    })
  }
  
  showForm(){
    this.dataService.updateAddFormStatus(true)
  }

  editStudent(student:any){
    this.editStud = student
    this.dataService.updateEditFormStatus(true)
  }

  async onUpdateStudent(studentData){
    await this.loadPage()
    this.students.push(studentData)
  }
}

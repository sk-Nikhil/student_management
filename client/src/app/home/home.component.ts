import { Component, DoCheck, OnInit } from '@angular/core';
import axios from 'axios';
import { AxiosService } from 'src/services/axios.service';
import { DataService } from 'src/services/data.service';
import { RouterService } from 'src/services/router.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  showAddDialog:boolean
  showEditDialog:boolean
  editMsg=''

// pagination
  currentPage = 1;
  totalPages=1
  totalEntries=0
  dataFound=0
  
  editForm=null
  editStud=null
  
  students:any=[]

// to filter records
  searchTerm:''
  
  onPageChange(page: number) {
    this.loadPage(page)
  }

  constructor(private dataService:DataService, private axiosService:AxiosService, private routerService:RouterService){}

  ngOnInit(){
    this.loadPage()

    this.dataService.canEdit$.subscribe((canEdit)=>{
      this.editForm = canEdit
    })

    this.dataService.showAddDialog$.subscribe((showDialog)=>{
      this.showAddDialog = showDialog
    })

    this.dataService.showEditDialog$.subscribe((editDialog)=>{
      this.showEditDialog = editDialog.show
      this.editMsg = editDialog.msg
    })
  }

  loadPage(page=this.currentPage){
    if(!this.searchTerm){
      this.dataService.getStudents(page)
      .then((response)=>{
        this.students = response.students;
        this.currentPage = response.studentData.currentPage
        this.totalPages = response.studentData.totalPages
        this.totalEntries = response.studentData.totalEntries
      })
    }
    else{
      this.routerService.getFilteredStudents(this.searchTerm, page)
      .then(response=>{
        this.students = response.students;
        this.currentPage = response.currentPage
        this.dataFound = this.students.length
    })
    }
  }

  search() {
    this.currentPage=1
    this.loadPage(this.currentPage)
  }
  
  showForm(){
    this.dataService.updateAddFormStatus(true)
  }

  editStudent(student:any){
    this.editStud = student
    this.dataService.updateEditFormStatus(true)
  }

  async onUpdateStudent(){
    this.loadPage()  
  }


  async removeStudent(id:any){
    await this.routerService.removeStudent(id)
    this.loadPage()
  }

  downloadRecordAsPDF(record) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const docDefinition = {
      content: [
        { text: 'Record Details', style: 'header' },
        { text: 'Student Id: ' + record.S_No },
        { text: 'Name: ' + record.name },
        { text: 'Parent Name: ' + record.parent },
        { text: 'class: ' + record.class },
        { text: 'Address: ' + record.address },
        { text: 'Contact: ' + record.contact },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(`${record.name}_${record.S_No}.pdf`);
  }

}

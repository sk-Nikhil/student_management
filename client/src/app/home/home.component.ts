import { Component, OnInit } from '@angular/core';
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
  showAddForm:boolean;   //used on app-add-child, responsible to show form which is used to add student
  showEditForm:boolean;
  showModal:boolean;
  modalText:String="testing";
  students:any=[];

// pagination
  currentPage = 1;
  totalPages=1;
  totalEntries=0;
  dataFound=0;
  searchTerm:'';   //search query to filter student records
   
// student to be edited is stored in a variable and send as a prop to app-edit-child template
  studentToBeEdited=null;
  
  constructor(private dataService:DataService, private routerService:RouterService){}

  ngOnInit(){
    this.loadPage();

    this.dataService.StudentRecords$.subscribe(students=>{
      this.students = students.slice(0,5);
    })

    this.dataService.showAddForm$.subscribe((showAddForm)=>{
      this.showAddForm = showAddForm;
    })

    this.dataService.showEditForm$.subscribe((showEditForm)=>{
      this.showEditForm = showEditForm;
    })

    // show modal on editing or adding student record
    this.dataService.showModal$.subscribe((showModal)=>{
      this.showModal = showModal.status;
      this.modalText = showModal.text;
    })

  }

  // methods
  // it displays the add-child component which contains a form
  showForm(){
    this.dataService.updateAddFormStatus(true);
  }

  // send student data which is to be edited to app-edit-child as a prop
  // and it makes the edit form visible
  editStudent(student:any){
    this.studentToBeEdited = student;
    this.dataService.updateEditFormStatus(true);
  }

  async removeStudent(id:any, name:String){
    await this.routerService.removeStudent(id, this.currentPage);
    this.dataService.updateModal(true, `${name}'s record has been removed successfully`);
  }

  // for pagination
  // loads students record on the basis of page number
  onPageChange(page: number) {
    this.loadPage(page);
  }

  // load the filtered or searched student from the first page
  search() {
    this.currentPage=1;
    this.loadPage(this.currentPage);
  }

  loadPage(page=this.currentPage){
    if(!this.searchTerm){
      this.dataService.getStudents(page)
      .then((response)=>{
        if(!response.invalidToken){
          this.currentPage = response.studentData.currentPage;
          this.totalEntries = response.studentData.totalEntries;
          this.totalPages = response.studentData.totalPages;
          // every time we request for new records of the student
          // we update it in the studentrecords observable in data.service.ts
          // from where we subscribe and display the student records
          this.dataService.updateStudentRecords(response.students);
        }
      })
    }
    else{
      this.routerService.getFilteredStudents(this.searchTerm, page)
      .then(response=>{
        this.currentPage = response.currentPage;
        this.dataFound = this.students.length;
        this.dataService.updateStudentRecords(response.students);
    })
    }
  }


  // download student records in pdf format
  downloadRecordAsPDF(record:any) {
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

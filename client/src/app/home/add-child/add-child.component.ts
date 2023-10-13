import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios'
import { AxiosService } from 'src/services/axios.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent{
  studentForm: FormGroup;
  @Output() updateStudent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dataService:DataService, private axiosService:AxiosService){
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      parent: ['', Validators.required],
      class: ['', Validators.required],
      address:[''],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$'),  Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  showForm:any

  ngDoCheck(){
    this.dataService.canAdd$.subscribe((canAdd)=>{
      this.showForm = canAdd
    })
  }

  async addStudent(){
    if(this.studentForm.valid){
      let id=0 

      // await axios.get('http://localhost:3000/getStudentId')
      await this.axiosService.get('/getStudentId')
      .then((response)=>{
        console.log(response)
        id = response.data
      })
      
      const studentData = {S_No:id,...this.studentForm.value};
      // adding to database
      // await axios.post('http://localhost:3000/addStudent', studentData)
      await this.axiosService.post('/addStudent', studentData)
      .then(()=>{
        // this.dataService.addStudent(studentData)
        this.updateStudent.emit(studentData)
      })
    }
    this.showDialog()
    this.hideForm()
  }

  showDialog(){
    this.dataService.updateAddDialogStatus(true)
    setTimeout(()=>{
      this.dataService.updateAddDialogStatus(false)
    },2000)
  }

  hideForm(){
    this.dataService.updateAddFormStatus(false)
    this.studentForm.reset();
  }
}

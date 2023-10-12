import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import axios from 'axios'

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent implements OnInit{

  studentForm: FormGroup;
  editForm:boolean=false

  @Input('editStudent') student

  constructor(private fb: FormBuilder, private dataService:DataService){}

  ngOnInit(){
    this.dataService.canEdit$.subscribe((canEdit)=>{
      this.editForm = canEdit
    })

    this.studentForm = this.fb.group({
      name: new FormControl({ value: `${this.student.name}`, disabled: true }),
      parent: new FormControl({ value: `${this.student.parent}`, disabled: true }),
      class: new FormControl({ value: `${this.student.class}`, disabled: false }),
      address:new FormControl({ value: `${this.student.address}`, disabled: false }),
      contact: [`${this.student.contact}`, [Validators.required, Validators.pattern('^[0-9]+$'),  Validators.minLength(10), Validators.maxLength(10)]],
    });
  }


  async submitForm(){
    if(this.studentForm.valid){
      console.log("valid")
      const student = {...this.student,...this.studentForm.value,}
      await axios.patch('http://localhost:3000/updateStudent', student)
      .then((response)=>{

        this.dataService.updateStudent(student)
      })
    }
    this.editDialog()
    this.hideForm()
  }

  editDialog(){
    this.dataService.updateEditDialogStatus(true)
    setTimeout(()=>{
      this.dataService.updateEditDialogStatus(false)
    },2000)
  }

  hideForm(){
    this.studentForm.reset();
    this.dataService.updateEditFormStatus(false)
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import axios from 'axios'
import { AxiosService } from 'src/services/axios.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent implements OnInit{

  studentForm: FormGroup;
  editForm:boolean=false

  @Input('editStudent') student

  constructor(private fb: FormBuilder, private dataService:DataService, private axiosService:AxiosService, private routerService:RouterService){}

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
      const student = {...this.student,...this.studentForm.value}
      this.routerService.updateStudent(student)
      .then(response=>{
        if(response === 201) {
          this.editDialog("student data updated successfully")
        }
        else{
          this.editDialog("failed to update student data")
        }
      })
    }
    this.hideForm()
  }

  editDialog(data){
    this.dataService.updateEditDialogStatus(true, data)
    setTimeout(()=>{
      this.dataService.updateEditDialogStatus(false, '')
    },2000)
  }

  hideForm(){
    this.studentForm.reset();
    this.dataService.updateEditFormStatus(false)
  }
}

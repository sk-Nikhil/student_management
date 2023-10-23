import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent implements OnInit{
  studentForm: FormGroup;
  @Input('editStudent') student:any;

  constructor(private fb: FormBuilder, private dataService:DataService, private routerService:RouterService, private router:Router){}

  ngOnInit(){
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
      const student = {...this.student,...this.studentForm.value};
      this.routerService.updateStudent(student)
      .then(response=>{
        if(response.error){
          this.hideForm();
          this.dataService.addInfoToast(response.error)
          this.router.navigate(['/login'])
        }
        else{
          this.dataService.addInfoToast(response)
          this.hideForm();
        }
      })
    }
  }

  hideForm(){
    this.studentForm.reset();
    this.dataService.updateEditFormStatus(false);
  }
}

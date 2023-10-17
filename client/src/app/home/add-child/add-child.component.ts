import { Component, Output, EventEmitter} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent{
  studentForm: FormGroup;
  @Output() updateStudent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dataService:DataService, private routerService:RouterService){
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      parent: ['', Validators.required],
      class: ['', Validators.required],
      address:[''],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$'),  Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  async addStudent(){
    if(this.studentForm.valid){
      this.routerService.addStudent(this.studentForm.value)
      .then((response)=>{
        if(response === 201) {
          this.showDialog("student added successfully");
          this.hideForm();
        }
      })
    }
  }

  showDialog(data:String){
    this.dataService.updateModal(true, data);
    setTimeout(()=>{
      this.dataService.updateModal(false, '')
    },2000)
  }

  hideForm(){
    this.dataService.updateAddFormStatus(false);
    this.studentForm.reset();
  }
}

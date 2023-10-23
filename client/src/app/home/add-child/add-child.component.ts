import { Component, Output, EventEmitter} from '@angular/core';
import { DataService } from 'src/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/services/router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent{
  studentForm: FormGroup;
  @Output() updateStudent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dataService:DataService, private routerService:RouterService, private router:Router){
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
      const id = this.generateRandomId(this.studentForm.get('name').value)
      this.routerService.addStudent(id,this.studentForm.value)
      .then((response)=>{
        console.log(response)
        if(!response.error){
          this.hideForm();
          this.dataService.addInfoToast(response);
        }
        else{
          this.dataService.addInfoToast(response.error);
          this.router.navigate(['/login']);
        }
      })
    }
  }

  hideForm(){
    this.dataService.updateAddFormStatus(false);
    this.studentForm.reset();
  }

  generateRandomId(name) {
    // Use a cryptographic random number generator to ensure uniqueness
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const randomValue = randomArray[0] % 1000000; // Ensure it's a 6-digit number
  
    // Convert the random value to a 6-digit string
    const randomId = randomValue.toString().padStart(6, '0');
  
    // Take the first 3 characters of the name and concatenate with the random 6-digit ID
    const namePart = name.slice(0, 3).toUpperCase();
  
    return namePart + randomId;
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/services/router.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup;
  signupError:String = ''

  constructor(private formBuilder: FormBuilder, private routerService:RouterService) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(){
    this.routerService.signupError$.subscribe((data)=>{
      this.signupError = data
    })
  }


  onSubmit(){
    if(this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.signupForm.reset()
      this.routerService.signup(userData)
    }
  }

  clear(){
    this.signupError = ''
  }

}

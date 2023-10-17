import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService:AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // store the validity of the user
  // if the user details entered by user is valid
  isValidUser:boolean=true
  errMsg:String

  async login(){
    if(true){
      this.isValidUser = await this.authService.login(this.loginForm.value)
      console.log(this.isValidUser)
      if(!this.isValidUser){
        this.errMsg = "please check your username and password again!!"
      }
      this.loginForm.reset()
    }
  }

  clear(){
    this.errMsg = ''
  }

}

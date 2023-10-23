import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService:AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
      this.authService.logout()
  }

  // store the validity of the user
  // if the user details entered by user is valid
  errMsg:String
  isValidUser:boolean;

  async login(){
    if(true){
      this.isValidUser = await this.authService.login(this.loginForm.value)
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { DataService } from 'src/services/data.service';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private dataService:DataService, private authService:AuthService, private router:Router){}

  username:string = ""
  password:string = ""
  isValid:boolean=true

  ngOnInit(){
  }

  async login(){

    const user = {
      username: this.username,
      password:this.password
    }
    
    await this.authService.login(user)
    this.authService.isValidUser$.subscribe((isValidUser)=>{
      this.isValid = isValidUser
    })
    // localStorage.setItem('isAuthenticated',this.isValid.toString())
    
    this.username = ''
    this.password = ''
  }

}

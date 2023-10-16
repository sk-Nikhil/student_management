import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(private dataService:DataService, private authService:AuthService, private router:Router){}

  isAuthenticated:boolean

  ngOnInit(): void {    
    this.authService.isValidUser$.subscribe((isValidUser)=>{
      this.isAuthenticated = isValidUser
      // this.isAuthenticated = localStorage.getItem('isLogged') === 'true' ? true : false
    })
  }

  logout(){
    this.authService.updateValidation(false)
    this.authService.logout()
  }
}

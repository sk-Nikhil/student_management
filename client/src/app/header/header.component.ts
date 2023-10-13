import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(private dataService:DataService, private authService:AuthService, private router:Router, private route:ActivatedRoute){}

  isAuthenticated:boolean
  buttonContent=''

  ngOnInit(): void {    
    this.authService.isValidUser$.subscribe((isValidUser)=>{
      this.isAuthenticated = isValidUser
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentURL = this.router.url;
        if(currentURL === '/login') 
          this.buttonContent = 'Sign Up'

        else if(currentURL === '/signup')
          this.buttonContent = 'Login'
      }
    });

  }

  getDynamicRouterLink(): string[] {
    if (this.buttonContent === 'Login') {
      return ['/login'];
    } else {
      return ['/signup'];
    }
  }

  logout(){
    // this.authService.updateValidation(false)
    this.authService.logout()
  }


}

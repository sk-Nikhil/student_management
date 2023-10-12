import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthService, private router:Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.shouldAllowNavigation()) {
          // event.preventDefault();
          
        }
      }
    });
  }

  shouldAllowNavigation(): boolean {
    return true; // Return true to allow navigation, or false to cancel it
  }
}

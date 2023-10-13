import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddChildComponent } from './home/add-child/add-child.component';
import { PaginationComponent } from './home/pagination/pagination.component';
import { EditChildComponent } from './home/edit-child/edit-child.component';

// import { DataService } from 'src/services/data.service';
// import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const router:Routes=[
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]}

  // {path:'**', redirectTo:'not-found'}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    AddChildComponent,
    PaginationComponent,
    EditChildComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

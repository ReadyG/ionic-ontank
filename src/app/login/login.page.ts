import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoginError: Boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  LoginOnSubmit(email,password) {
    this.dataService.userAuthentication(email,password).subscribe((data : any) => {
      localStorage.setItem('userToken',data.access_token);
      this.router.navigate(['']);
      console.log(localStorage.getItem("userToken"))
    },
  (err : HttpErrorResponse)=>{
    this.isLoginError = true;
  });
  }



}

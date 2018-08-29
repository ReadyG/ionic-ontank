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

  objerror: Object;
  public devices = [];
  public accessTokens = [];
  
  isLoginError: Boolean = false;
  devicesExist: boolean = false;

  devSelected: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {



  }

  LoginOnSubmit(email,password) {

    //check if there are any avaiablie access tokens.
    this.dataService.listAccessTokens(email,password).subscribe((data : any) =>  {
      this.accessTokens = data;
      
      //finding the tokens with client type password only
      this.accessTokens.forEach(element => {
        if (element.client == "__PASSWORD_ONLY__"){
          localStorage.setItem('accessToken',element.token);
          console.log(element.token);
                  //finds all devices based on the access token
        }
      });

    //lists devices
    this.listDevices();

    },
    (err : HttpErrorResponse)=>{
      this.objerror = err.error;
      this.isLoginError = true;
    });

    //if there isn't an access token generate one
    if(!localStorage.getItem('accessToken')) {
      //generate access token
      this.dataService.generateAccessToken(email,password).subscribe((data : any) => {
        localStorage.setItem('accessToken',data.access_token);
        console.log(localStorage.getItem('accessToken'));
      

        //finds all devices based on the access token
        this.listDevices();

      },
      (err : HttpErrorResponse)=>{
        this.objerror = err.error;
        this.isLoginError = true;
      });
    }
  }


  





  private listDevices() {
    this.dataService.listDevices(localStorage.getItem('accessToken'))
      .subscribe((data: any) => {
        this.devices = data;
        this.devicesExist = true;
        console.log(this.devices);
        
      }, (err: HttpErrorResponse) => {
      });
  }

  NotifySelect() {
    localStorage.setItem('deviceId',this.devSelected);
    this.router.navigate(['']);
  };

}

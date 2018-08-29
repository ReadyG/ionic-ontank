import { DataService } from './../data.service';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photon: Object;
  connectionError: boolean = true;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {

    // checks if there is a user token avaiable in local storage. If not avaiable routes to login page.
    if (!localStorage.getItem('accessToken')) {
      this.router.navigate(['login']);
    }


    this.data.getTemp(localStorage.getItem('accessToken'),localStorage.getItem('deviceId'))
      .subscribe(data => this.photon = data)
    
    interval(1000).pipe(
      switchMap(() => 
        this.data.getTemp(localStorage.getItem('accessToken'),localStorage.getItem('deviceId'))
        
      
      )
    ).subscribe(data => {
      this.photon = data
    
    });

    setInterval(() => {
          
      this.listDevices()

      for (let device of this.devices) {
        if (device.id == localStorage.getItem('deviceId')) {
          if (!device.connected) {
            this.connectionError = true;
          }
          else {
            this.connectionError = false;
          }
        }
      }

    
    }, 1000);


  }

  public devices = [];

  private listDevices() {
    this.data.listDevices(localStorage.getItem('accessToken'))
      .subscribe((data: any) => {
        this.devices = data;
        console.log(this.devices);
        
      }, (err: HttpErrorResponse) => {
      });
  }



}

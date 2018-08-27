import { DataService } from './../data.service';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  photon: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getTemp(localStorage.getItem('userToken'))
      .subscribe(data => this.photon = data)
    
    interval(1000).pipe(
      switchMap(() => 
        this.data.getTemp()
      )
    )
      .subscribe(data => this.photon = data
    )
  }

}

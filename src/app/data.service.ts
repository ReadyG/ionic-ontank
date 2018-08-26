import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'testapp-6704:07702a6ed62fb5aa7c703e6f195dbf11d2c73da6'
  })
};

const apiRoot = 'https://api.particle.io/v1'
var accessToken = '695635676ab7e30b840c6cae7c9e2a540d3371ec'
const photonVar = 'temp'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }


  getTemp() {
    return this.http.get(apiRoot+'/devices/250030000a47343232363230/'+photonVar+'?access_token='+accessToken)
  }


}

/* https://api.particle.io/v1/devices/250030000a47343232363230/temp?access_token=1eba25f1ff1bb7e2990157c4f2b24b522a2af320 */
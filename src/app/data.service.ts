import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'particle:particle'
  })
};

const apiRoot = 'https://api.particle.io'
var accessToken = '695635676ab7e30b840c6cae7c9e2a540d3371ec'
const photonVar = 'temp'

@Injectable({
  providedIn: 'root'
})

export class DataService {


  constructor(private http: HttpClient) { }


  getTemp() {
    return this.http.get(apiRoot+'/v1/devices/250030000a47343232363230/'+photonVar+'?access_token='+accessToken)
  }

  userAuthentication(email,password) {
    var data = "grant_type=password&username="+email+"&password="+password;
    var base64Auth = btoa("particle:particle");
    var reqHeader = new HttpHeaders();
    reqHeader = reqHeader.append('Content-Type','application/x-www-form-urlencoded');
    reqHeader = reqHeader.append('Authorization','Basic '+base64Auth);
    
    console.log(apiRoot+'/oauth/token');
    console.log(reqHeader);
    console.log(data);
    console.log(base64Auth);
    
    return this.http.post(apiRoot+'/oauth/token',data,{headers: reqHeader});
  }


}

/* https://api.particle.io/v1/devices/250030000a47343232363230/temp?access_token=1eba25f1ff1bb7e2990157c4f2b24b522a2af320 */
import { IDevice } from './device';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'particle:particle'
  })
};

const apiRoot = 'https://api.particle.io'
/*var accessToken = '695635676ab7e30b840c6cae7c9e2a540d3371ec'*/
const photonVar = 'temp'

@Injectable({
  providedIn: 'root'
})

export class DataService {


  constructor(private http: HttpClient) { }


  getTemp(accessToken, deviceId) {
    return this.http.get(apiRoot+'/v1/devices/'+deviceId+'/'+photonVar+'?access_token='+accessToken)
  }

  userAuthentication(email,password) {
    var data = "grant_type=password&username="+email+"&password="+password;
    var base64Auth = btoa("particle:particle");
    var reqHeader = new HttpHeaders();
    reqHeader = reqHeader.append('Content-Type','application/x-www-form-urlencoded');
    reqHeader = reqHeader.append('Authorization','Basic '+base64Auth);
    return this.http.post(apiRoot+'/oauth/token',data,{headers: reqHeader});
  }

  listDevices(accessToken): Observable<IDevice[]>{
    return this.http.get<IDevice[]>(apiRoot+'/v1/devices/?access_token='+accessToken);
  }


}

/* https://api.particle.io/v1/devices/250030000a47343232363230/temp?access_token=1eba25f1ff1bb7e2990157c4f2b24b522a2af320 */
/* https://api.particle.io/v1/devices/access_token=695635676ab7e30b840c6cae7c9e2a540d3371ec */
/* https://api.particle.io/v1/devices/?access_token=47fa581e655d0e95d3263544366ceb29ad9de7e1 */
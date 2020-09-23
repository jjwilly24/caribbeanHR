import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Client } from './Models/Client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

server = "https://api.caribbeanhrsolutions.com/";

constructor(private http: HttpClient) { }


loginAd(email, password) {
  return this.http.get(this.server+"auth/loginAdmin/"+email+"/"+password).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  )
}

emlogin(email, password) {
  return this.http.get(this.server+"auth/loginEmployee/"+email+"/"+password).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  )
}

createClient(client: Client){

  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.post(this.server+"api/client/CreateClient", client, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  )

}

getClients(){

  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+"api/client/getClients", httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  )

}

getClient(id){

  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/client/getClient/${id}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}

batchUpdate(data: any) {

  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.post(this.server+`api/employee/BatchUpdate`, data, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );


}

getEmployees(id) {
  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/employee/getEmployeesByClient/${id}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}

getEmployeesByID(id) {
  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/employee/getEmployeesByID/${id}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}

uploadFile(file: File, type) {
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');

  let uData = JSON.parse(user);

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  let formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('id', uData.id);
  formData.append('type', type);

  return this.http.post(this.server+`api/employee/uploadImages`, formData, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );

}

getFiles() {

  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');

  let uData = JSON.parse(user);

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/employee/getUploads/${uData.id}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}


getFilesAdmin(id) {

  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/employee/getUploads/${id}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}

updateEmployee(employee: any) {

  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');

  let uData = JSON.parse(user);

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.post(this.server+`api/employee/UpdateEmployee`, employee, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}

approve(id){

  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');

  let uData = JSON.parse(user);

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/admin/approve/${uData.id}/${id}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );
}

MoveTo(id, direction, client) {
  let token = localStorage.getItem('token');

  const httpOptionsSecure = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };

  return this.http.get(this.server+`api/admin/move/${id}/${direction}/${client}`, httpOptionsSecure).pipe(
    map((response: any) => {
      if (response) {
        return response;
      }
    })
  );


}






}

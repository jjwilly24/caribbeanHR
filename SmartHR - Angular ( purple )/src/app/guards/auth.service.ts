import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;

    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  public isAuthenticated() : boolean {

    const token = localStorage.getItem('token');

    if(token != null){

      console.log(this.tokenExpired(token));

      return !this.tokenExpired(token);

    }else{
      return false;
    }
  }
}

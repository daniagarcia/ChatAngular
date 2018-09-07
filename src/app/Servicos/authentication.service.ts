import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  ngOnInit(){}

  login(username:string,password:string){
    return this.http.post<any>(`${config}/users/authenticate`,{username:username,password:password})
    .pipe(map(user =>{
      if(user && user.token){
        localStorage.setItem('id_user',JSON.stringify(user));
      }
      return user;
    }));
  }
  logout(){
    localStorage.removeItem('id_user');
  }
}
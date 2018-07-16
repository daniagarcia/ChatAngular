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

  GetUser(){
    return this.http.get<any>('http://127.0.0.1:3333/TraerUsu'); //ruta en adonis

  }

  SetUser(username:string , password:string):any
  {
      return this.http.post('http://127.0.0.1:3333/insertarUsu',{username,password});
  }


  
  login(username:string,password:string){
    return this.http.post<any>(`${config}/users/authenticate`,{username:username,password:password})
    .pipe(map(user =>{
      if(user && user.token){
        localStorage.setItem('currentUser',JSON.stringify(user));
      }
      return user;
    }));
  }
  logout(){
    localStorage.removeItem('currentUset');
  }
}

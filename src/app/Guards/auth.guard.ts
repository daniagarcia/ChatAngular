import { Injectable } from '@angular/core';    
import { Observable } from 'rxjs';
import { AuthenticationService } from './../Servicos/authentication.service'
import { LoginComponent } from './../Componentes/login/login.component'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){ }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')){
      return true;
    }
    this.router.navigate(['/'], {queryParams: {returnUrl:state.url}})
    return false;

  }
}


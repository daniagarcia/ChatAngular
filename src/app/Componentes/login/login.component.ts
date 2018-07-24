import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../Servicos/authentication.service';
import { HttpClient } from '@angular/common/http';

 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  bool: boolean
  constructor(private  route: ActivatedRoute,
    private router: Router,private http:HttpClient,
    private authenticationService: AuthenticationService) { }

    
   
  ngOnInit() {
    this.bool = false;
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  setBool() 
  {
    return this.bool;
  }

  get f() { return this.loginForm.controls; }

  onSubmit(event){
    event.preventDefault()
    const target = event.target
    const usu = target.querySelector('#usu').value
    const psw = target.querySelector('#psw').value
    console.log(usu, psw)
    // localStorage.getItem('id_user')
     this.http.post<any>('http://127.0.0.1:3333/login',{usu:usu,psw:psw}).subscribe(res=>{
       console.log(res)
       localStorage.setItem('token',res.sesion.token);
       localStorage.setItem('usuario',res.user.username);
       localStorage.setItem('id_user',res.user.id);

       this.router.navigate(['chat']);
     });
  }





}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../Servicos/authentication.service';

 

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
    private router: Router,
    private authenticationService: AuthenticationService) { }

    

  ngOnInit() {
    this.bool = false;
  //   this.loginForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  // });
      this.authenticationService.logout();

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  setBool() 
  {
    return this.bool;
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted =true;
    if(this.loginForm.invalid){return;}

    this.loading=true;
    this.authenticationService.login(this.f.username.value,this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error =>{
        this.loading=false;
    });
  }

}

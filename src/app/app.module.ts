
import {HttpModule} from '@angular/http';
import {HttpClientModule} from'@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './Componentes/chat/chat.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { NotifyModule } from 'ngx-notify';
// import { AuthGuard } from './guardias/auth.guard';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { AuthenticationService } from './Servicos/authentication.service';
import { User } from './Clases/User';


const routes :Routes = [
  {path:'registro',component:RegistroComponent},
  {path:'chat', component: ChatComponent},
  {path:'login', component: LoginComponent},
  {path: '**',   redirectTo: '', pathMatch: 'full' }
 


  // otherwise redirect to home
  // { path: '**', redirectTo: '' }

];


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavbarComponent,
    LoginComponent,
     RegistroComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule,
    NotifyModule.forRoot({
      options: { },
      notify: {
          progress: true
      }
  })


  ],
  providers: [AuthenticationService,User],
  bootstrap: [AppComponent]
})
export class AppModule { }


import {HttpModule} from '@angular/http';
import {HttpClientModule} from'@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
//componentes 
import { AppComponent } from './app.component';
import { ChatComponent } from './Componentes/chat/chat.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { HistorialComponent } from './Componentes/historial/historial.component';

//notificaciones
import { NotifyModule } from 'ngx-notify';
//servicios
import { AuthenticationService } from './Servicos/authentication.service';
import { ClienteService } from './Servicos/cliente.service';
import {ChatService} from './Servicos/chat.service'
//clases
import { User } from './Clases/User';
import { Message } from './Clases/Message';
import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';


const routes :Routes = [
  {path:'registro',component:RegistroComponent, canActivate: [LoginGuard]},
  {path:'chat', component: ChatComponent,canActivate:[AuthGuard]},  
  {path:'historial',component:HistorialComponent},
  {path:'', component: LoginComponent,canActivate:[LoginGuard]},
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
    RegistroComponent,
    HistorialComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule,
    FormsModule,
    NotifyModule.forRoot({
      options: { },
      notify: {
          progress: true
      }
  })


  ],
  providers: [AuthenticationService,User,ClienteService,ChatService,Message,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

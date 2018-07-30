
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
//notificaciones
import { NotifyModule } from 'ngx-notify';
//servicios
import { AuthenticationService } from './Servicos/authentication.service';
import { ClienteService } from './Servicos/cliente.service';
import {ChatService} from './Servicos/chat.service'
//clases
import { User } from './Clases/User';
import { Message } from './Clases/Message';


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
    FormsModule,
    NotifyModule.forRoot({
      options: { },
      notify: {
          progress: true
      }
  })


  ],
  providers: [AuthenticationService,User,ClienteService,ChatService,Message],
  bootstrap: [AppComponent]
})
export class AppModule { }

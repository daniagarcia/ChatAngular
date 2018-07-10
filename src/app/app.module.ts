import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatComponent } from './Componentes/chat/chat.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { NotifyModule } from 'ngx-notify';
const routes :Routes = [
  {path:'Chat', component: ChatComponent},
  {path:'Login', component: LoginComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NotifyModule.forRoot({
      options: { },
      notify: {
          progress: true
      }
  })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

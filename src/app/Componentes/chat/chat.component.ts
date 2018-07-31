import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../Servicos/authentication.service';
import { ClienteService } from '../../Servicos/cliente.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ws = Ws('ws://localhost:3333');
  users: any[] = []
  conversando: any = null;

  clickUsuario(user: any) {
    this.conversando = { 'user': user,'username':this.username }

  }

  username: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private authenticationService: AuthenticationService, private cliente: ClienteService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('usuario');

    // this.mensaje=localStorage.getItem('mensaje')

    this.http.get<any>('http://127.0.0.1:3333/users').subscribe(res => {
      console.log(res)
      this.users = res.users

      //  this.setUpChat();
    });
  }

  SendMensaje(event) {
    event.preventDefault()
    const target = event.target
    const mensaje = target.querySelector('#msj').value;
    const id_usu = localStorage.getItem('id_user')
    var ArrayUsers = [id_usu, this.conversando.user.id]

    ArrayUsers.sort()
    var UsersArray = ArrayUsers.join('-')
    console.log(mensaje)

    this.http.post('http://127.0.0.1:3333/chats', { mensaje: mensaje, UsersArray: UsersArray }).subscribe(res => {
      console.log(res)
      console.log(mensaje)
      // localStorage.setItem('token',res+);

    });


  }
  setUpChat() {
    this.ws.connect();
    const chat = this.ws.subscribe('chat');

    chat.on('new:msj', (data) => {

      console.log(' SOY UN MENSAJE ')

      this.conversando.unshift(JSON.parse(data));
      console.log(data)
    })
  }


}

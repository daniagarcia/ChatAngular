import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../Servicos/authentication.service';
import { ClienteService } from '../../Servicos/cliente.service';
import { mergeNsAndName } from '@angular/compiler';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ws = Ws('ws://localhost:3333');
  users: any[] = []
  conversando: any = null;
  usernameChat: string = "Default";
  idusuarios: any = null;
  mensajes:Message;
  canal: any;

  clickUsuario(user: any) {
    this.canal.close()
    this.conversando = { 'user': user }
    this.usernameChat = user.username;
    // console.log(user)
    // console.log(this.conversando)


    const id_usu = localStorage.getItem('id_user')
    var UsersArray = [id_usu, this.conversando.user.id]
    UsersArray.sort()
    var ArrayUsers = UsersArray.join('_')
    console.log(ArrayUsers)
    this.subscribirCanal(ArrayUsers)
    //const idusuarios = localStorage.getItem('')
    this.http.get<any>('http://127.0.0.1:3333/chats/'+ArrayUsers).subscribe(res => {
      this.mensajes=res
      console.log(this.mensajes)
      // this.users = res.users
    });
    // const userdos=localStorage.getItem('user')

  }


  username: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private authenticationService: AuthenticationService, private cliente: ClienteService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('usuario');
    this.iniciarConexion()
    // this.SendMensaje(event);  

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
    var UsersArray = ArrayUsers.join('_')
    console.log(mensaje)

    this.http.post('http://127.0.0.1:3333/chats', { mensaje: mensaje, UsersArray: UsersArray }).subscribe(res => {
      console.log(res)
      console.log(mensaje)
    });

  }

  iniciarConexion(){
    this.ws = new Ws('ws:/localhost:3333').connect();
    this.ws.on('open',data => {
      console.log('se conecto!c:');
      // this.subscribirCanal();
        // this.ws.getSubscription('chat').emit('message','me conecte!:Dñ.ñ')
    })
    this.ws.on('error',data => {
      console.log('Error de conexión :c')
    })
    
  }

  subscribirCanal(room : String){
    this.canal  = this.ws.subscribe('chat:'+room)
    this.ws.getSubscription('chat:'+room).emit('message','Este es el room')
    console.log('SUBSCRITO AL CANAL CHAT ')

    this.canal.on('error',data => {
      console.log('error al suscribir canal')
    })

    this.canal.on('message',data => {
      console.log(data)
      
    })

    this.canal.on('open',data => {
      console.log()
      //this.ws.getSubscription('chat:'+room).emit('open','Este es el room')
    })

    this.canal.on('close',data => {
      console.log(data)
      //this.ws.getSubscription('chat:'+room).emit('close','Este es el room')
    })
    
  }

  


}

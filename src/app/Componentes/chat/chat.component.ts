import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../Servicos/authentication.service';
import { ClienteService } from '../../Servicos/cliente.service';
import { mergeNsAndName } from '@angular/compiler';
import { Message } from '../../Clases/Message';


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
  mensajes: Message;
  canal: any;
  id:string;
  room:string='';

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
    this.room= ArrayUsers
    this.subscribirCanal(ArrayUsers)
    //const idusuarios = localStorage.getItem('')
    //PETEICION
      //  REQUEST
    this.http.get<any>('http://127.0.0.1:3333/chats/' + ArrayUsers).subscribe(res => {
      this.mensajes = res
    
      console.log(this.mensajes)
      // this.users = res.users
    });
 
  }


  username: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private authenticationService: AuthenticationService, private cliente: ClienteService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('usuario');
    this.id = localStorage.getItem('id_user')
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
    const id_usuario = localStorage.getItem('id_usuario')
    
    var ArrayUsers = [id_usu, this.conversando.user.id]

    ArrayUsers.sort()
    var UsersArray = ArrayUsers.join('_')
    console.log(mensaje)

    this.http.post('http://127.0.0.1:3333/chats', { mensaje: mensaje, UsersArray: UsersArray, id_usuario:id_usu }).subscribe(res => {
      console.log(res)
      console.log(mensaje)
    });
    this.ws.getSubscription('chat:'+ this.room).emit('message',
  {
    id:UsersArray
  }
  )

  }

  iniciarConexion() {
    this.ws = new Ws('ws:/localhost:3333').connect();
    this.ws.on('open', data => {



    })
    this.ws.on('error', data => {

    })
    this.canal = this.ws.subscribe('chat:Libre')

  }
  subscribirCanal(room: String) {
    this.canal = this.ws.subscribe('chat:'+this.room)
    // this.ws.getSubscription('chat:10').emit('entrar', 'Este es el room')
    

    this.canal.on('error', data => {

    })

    this.canal.on('message', data => {

      this.http.get<any>('http://127.0.0.1:3333/chats/' + data.id).subscribe(res => {
        this.mensajes = res
      
        console.log(this.mensajes)
        // this.users = res.users
      });
   
     
    })
    this.canal.on('entrar', data => {
      console.log('acaba de entrar un usuario')
    })

    this.canal.on('close', data => {

    })

  }




}

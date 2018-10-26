import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../Servicos/authentication.service';
import { ClienteService } from '../../Servicos/cliente.service';
import { mergeNsAndName, removeSummaryDuplicates } from '@angular/compiler';
import { Message } from '../../Clases/Message';
import { Grupos } from '../../Clases/Grupos';
import {Subirarchivo} from '../../Servicos/subirarchivos.service'
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  ws = Ws('ws://192.168.1.130:3333');
  users: any[] = []
  conversando: any = null;
  usernameChat: string = "Default";
  nombreGrupo: string = "Default";
  idusuarios: any = null;
  mensajes: Message;
  canal: any;
  id:string;
  room:string='';
  modal:boolean=false;
  modalgrupo:boolean=false;
  listUsuarios:any[]=[]
  isTyping:Boolean=true;
  trueimg:Boolean = false;
  loader:Boolean = false;
  myimg:string;
  final:Boolean = true;
  msn:string;
  fileToUpload: File = null;

  msjval:String;
  
  clickUsuario(user: any) {
    this.canal.close()
    this.conversando = { 'user': user }
    this.usernameChat = user.username;
    const id_usu = localStorage.getItem('id_user')
    var UsersArray = [id_usu, this.conversando.user.id]
    
    UsersArray.sort()
    var ArrayUsers = UsersArray.join('_')
    this.room= ArrayUsers
    localStorage.setItem('ArrayUsers',this.room);
    this.subscribirCanal(ArrayUsers)
      //PETEICION //  REQUEST
    this.http.get<any>('http://192.168.1.130:3333/chats/' + ArrayUsers).subscribe(res => {
      this.mensajes = res    
      console.log(this.mensajes)
   });
 
  }

  clickGrupo(usergrupo: any) {
    this.canal.close()
    this.conversando = { 'user':{
      'username': usergrupo.nombre 
    } 
  }
    this.nombreGrupo = usergrupo.nombre;
    this.room= usergrupo.id
    this.subscribirCanal(this.room)
      //PETEICION //  REQUEST
    this.http.get<any>('http://192.168.1.130:3333/chats/' + this.room).subscribe(res => {
      this.mensajes=res
   });
 
  }
  username: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private authenticationService: AuthenticationService, private cliente: ClienteService, private archivo:Subirarchivo) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('usuario');
    this.id = localStorage.getItem('id_user')
    this.iniciarConexion()
    this.RecuperarGrupoUsuario()
    this.msn = "subibiendo img"
    // this.SendMensaje(event);  

    // this.mensaje=localStorage.getItem('mensaje')

    this.http.get<any>('http://192.168.1.130:3333/users').subscribe(res => {
      console.log(res)
      this.users = res.users

      //  this.setUpChat();
    });
  }

  SendMensaje(event) {
    event.preventDefault()
    const target = event.target
    const mensaje = target.querySelector('#msj').value
    const id_usu = localStorage.getItem('id_user')
    const id_usuario = localStorage.getItem('id_usuario') 
   
    this.http.post('http://192.168.1.130:3333/chats', { mensaje: mensaje, UsersArray: this.room, id_usuario:id_usu}).subscribe(res => {
      console.log(res)
      console.log(mensaje)
  
    });
    this.ws.getSubscription('chat:'+ this.room).emit('message','')

       target.querySelector("#msj").value=''
      
      //  if(target.querySelector("#msj").value !== '[]'){
      //    this.mensajes.mensajes
        
      //  }
      //  this.isTyping = true
  

  }

  iniciarConexion() {
    this.ws = new Ws('ws://192.168.1.130:3333').connect();
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

      console.log('entr3')
      this.http.get<any>('http://192.168.1.130:3333/chats/' + this.room).subscribe(res => {
        this.mensajes = res      
        this.file=res
      
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

  crearGrupo(event){
    event.preventDefault()
    console.log("algo")
    const target = event.target
    const grupo = target.querySelector('#grupo').value
    const id_usu = localStorage.getItem('id_user')

    console.log(grupo)
    if(grupo != ''){
      this.http.post('http://192.168.1.130:3333/grupos',{grupo:grupo,id_user:id_usu}).subscribe(res => {
      })

    }
    
  }
       grupos:Grupos

  RecuperarGrupos(){
     this.modalgrupo = true;
    const id_usu = localStorage.getItem('id_user')

    this.http.get<Grupos>('http://192.168.1.130:3333/grupos/'+id_usu).subscribe(res =>{
      this.grupos=res
      console.log(this.grupos)
    })

  }

  AgregarUsuarios(event){
    event.preventDefault()
    const target = event.target
    const grupo_id = target.querySelector("#grupoid").value;
    const user_id = target.querySelector("#userid").value;
    console.log(grupo_id)
    console.log(user_id)


    this.http.post('http://192.168.1.130:3333/gruposusers',{grupo:grupo_id,usuario:user_id}).subscribe(res =>{
     console.log(res)
    
    })

  }
      gruposuser:Grupos
  RecuperarGrupoUsuario(){
    const id_usu = localStorage.getItem('id_user')

    this.http.get<any>('http://192.168.1.130:3333/gruposusers/'+id_usu).subscribe(res =>{
      this.gruposuser = res

      // console.log(this.grupos)
    })

  }



file: any;
  subirarchivo(event){  
   console.log( localStorage.getItem('id_usuario'));
   console.log(localStorage.getItem('ArrayUsers'));
   let elemnt = event.target

   let formData = new FormData()
   formData.append('id_usuario',localStorage.getItem('id_user'));   
   formData.append('UsersArray', localStorage.getItem('ArrayUsers')); //llega vacio
   if(elemnt.files.length > 0)
   {
     formData.append('file',elemnt.files[0])
     this.http.post<any>('http://192.168.1.130:3333/archivos',formData).subscribe(res =>{

     })
     
   }
      
  }
}

// event.preventDefault()
//   const target = event.target  
//   let img = event.img;    
//   const mensaje = target.querySelector('#msj')
//   const id_usu = localStorage.getItem('id_user')
//   const id_usuario = localStorage.getItem('id_usuario')
//   const file = target.querySelector('archivos')
//   console.log(target.files[0])

// if(target.files.length > 0){
  
//   this.loader = true;
//   let formData = new FormData();    
//   formData.append('file',target.files[0]);
//   this.http.post<any>('http://192.168.1.130:3333/chats',{mensaje: mensaje, UsersArray: this.room, id_usuario:id_usu,'files':target.files[0]}).subscribe((data =>
 
//   resp => {
//     localStorage.setItem('token',target.sesion.token);
//     this.loader = false;
//     if(resp.status){

     
//     }
//   }
// )),(error) => console.log(error.message)
   
//     error => {
//       this.loader = false;
//       alert('Imagen supera el tamaño permitido');
      
//     }
//   );
// }
// }

// subir
  // subirarchivo(event){
  //   let elemento = event.target
  //   if(elemento.files.length > 0){
  //     let formData = new FormData();
  //     formData.append('file',elemento.files[0]);
  //     console.log(event)
  //     console.log(formData)
      
  //     this.http.post('http://192.168.1.130:3333/chats', formData)
  //     .subscribe((data) => {
      
  //       let jsonRes = data
      
        
  //     },(error) => console.log(error.message))
   
  //     }
    

  
  //   }
// filee:any = {
    
//     nombre:""
   
//   }
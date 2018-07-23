import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../Servicos/authentication.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ws=Ws('ws://localhost:3333');
  users:any[]=[]

  conversando:any=null;

  clickUsuario(user:any){
    this.conversando=user
  }
  
  username : string;
  constructor(private  route: ActivatedRoute,
    private router: Router,private http:HttpClient,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
        this.username=localStorage.getItem('usuario');

        this.http.get<any>('http://127.0.0.1:3333/users').subscribe(res=>{
          console.log(res)
            this.users = res.users
        });
  }

  SendMensaje(event){
    event.preventDefault()
    const target = event.target
    const mensaje = target.querySelector('#msj').value;   
    const id_usu = localStorage.getItem('id_user');
    console.log(mensaje)

    // const objeto = {
    //   ajdnaksjd:0,asdasdadasd:9,adsasd:32,adsadasdada:[1,2,3,4,4],asdasd:{
    //     sadasd:23
    //   }
    // }

    this.http.post('http://127.0.0.1:3333/chats',{mensjae:mensaje,id_usu:[id_usu]}).subscribe(res=>{
      console.log(res)
    
    });

  }

  
}

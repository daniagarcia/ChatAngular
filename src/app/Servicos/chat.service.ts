import { Injectable } from '@angular/core';
import { Message } from '../Clases/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats:any[]=[];

  constructor() { }


  agregarMensaje(texto:string,event ){
    // let mensaje: Message={
    //   chat
    //   userid
    //   texto
  
    // }

  }
}

import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ws=Ws('ws://localhost:3333');
  

  constructor() { }

  ngOnInit() {
  }

}

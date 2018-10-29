import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AuthenticationService } from '../../Servicos/authentication.service';
import { ClienteService } from '../../Servicos/cliente.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  mensajes:any
  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient,
    private authenticationService: AuthenticationService, private cliente: ClienteService) { }

  ngOnInit() {
    this.ConsultaHistorial()
  }

  ConsultaHistorial(){

    this.http.get<any>('http://192.168.0.11:3333/chats').subscribe(res => {
      this.mensajes=res

    })
  }


}

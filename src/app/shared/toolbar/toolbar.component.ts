import { Usuario } from './../../models/usuario';
import { FirestoreService } from './../../services/firestore.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  rols!: 'Cliente' | 'Admin';

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private toast: NgToastService, private router: Router) {

  }

  ngOnInit(): void {
    this.statusUser();
  }

  cerrarSesion(){
    this.authService.logout();
    this.toast.success({detail: 'Mensaje de éxito', summary:'Sesión finalizada.', duration: 5000});
  }

  async statusUser(){
    this.authService.stateUser().subscribe((res: any) => {

      if(res){
        console.log('Estas logueado');
        this.dataUser(res.uid);
        console.log(res);
      } else{
        console.log('No estas logueado');

      }
    })

  }

  dataUser(uid: string){
    const path = 'users';
    const id = uid;

    this.firestoreService.getDoc<Usuario>(path, id).subscribe(res => {
      if(res){
        this.rols = res.rol
      }
    })
  }

}

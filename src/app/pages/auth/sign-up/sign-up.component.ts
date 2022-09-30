import { FirestoreService } from './../../../services/firestore.service';
import { AuthService } from './../../../services/auth.service';
import { Usuario } from './../../../models/usuario';
import { NgToastService } from 'ng-angular-popup';
import { Genero } from './../../../models/genero';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { query, orderBy, limit } from "firebase/firestore";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  gender$: Genero[] = [];

  mostrar: Genero[] = [];

  formRegister!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private toast: NgToastService, private firestore: FirestoreService ) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      otroGenero: ['']
    });

    this.showGenders();
  }

  async register(){
    const datos: Usuario = {
      uid: '',
      name: this.formRegister.value.name,
      lastname: this.formRegister.value.lastname,
      dateOfBirth: this.formRegister.value.dateOfBirth,
      gender: this.formRegister.value.gender,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      rol: 'Cliente',
      create_at: new Date()
    };


    //condition to see if the gender is or not
    if(this.mostrar.includes(this.formRegister.value.gender)){
      console.log('Si esta el genero en la bd');
    }
    else{
      datos.gender = this.formRegister.value.otroGenero
      console.log('No esta el genero en la bd');
    }

    console.log(datos);

    /*const res = await this.authService.registerUser(datos).catch((error) => {
      console.log(error);
      this.toast.error({detail: 'Mensaje de error', summary: this.firebaseError(error.code), duration: 5000});
    });

    if(res){
      const path = 'users';
      const id = res.user?.uid;
      datos.uid = id;
      // datos.password = '';
      await this.firestore.createDoc(datos, path, id);
      this.verificarEmail();
      this.formRegister.reset();
    }*/

  }

  verificarEmail(){
    this.authService.verifyEmail().then(user => user?.sendEmailVerification()).then(() =>{
      this.toast.success({detail: 'Mensaje de éxito', summary:'Usuario registrado.', duration: 5000});
    })
  }

  firebaseError(code: string){
    switch (code) {
      case 'auth/email-already-exists':
        return 'El email ya esta registrado con otro usuario.';
      default:
        return 'Error desconocido.';
    }
  }


  showGenders(){
    const path = 'genders';
    const attribute = 'name';
    this.firestore.getCollectionAsc<Genero>(path, attribute).subscribe((res: Genero[]) => {
      this.gender$ = res;
      this.mostrar = res.map((res:any) => res.name);
      console.log('Generos', this.mostrar);
    })
    /*this.firestore.getCollection<Genero>(path).subscribe((res: Genero[]) => {
      //console.log('Generos', res);
      this.gender$ = res;
      this.mostrar = res.map((res:any) => res.name);
      console.log('Generos', this.mostrar);
    })*/
  }



}


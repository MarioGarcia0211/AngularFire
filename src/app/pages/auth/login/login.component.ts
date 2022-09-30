import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  loading =  false;

  constructor(private fb: FormBuilder, private authService: AuthService, private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  async ingresar(){
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    const res: any = await this.authService.signIn(email, password).catch((error) => {
      this.toast.error({detail: 'Mensaje de error', summary: this.firebaseError(error.code), duration: 5000});
    });

    // if(res){
    //   this.toast.success({detail: 'Mensaje de éxito', summary:'Ingresando correctamente', duration: 5000});
    //   this.formLogin.reset();
    //   this.router.navigate(['home']);
    //   console.log(res);
    // }

    if(res.user.emailVerified){
      this.toast.success({detail: 'Mensaje de éxito', summary:'Usuario encontrado.', duration: 5000});
      this.formLogin.reset();
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['verify-email']);
      this.toast.info({detail: 'Mensaje de información', summary:'Verifica su correo para iniciar sesión.', duration:5000});
      this.verificarEmail();
    }
  }

  verificarEmail(){
    this.authService.verifyEmail().then(user => user?.sendEmailVerification()).then((res) =>{
      console.log(res);
    })
  }

  firebaseError(code: string){
    switch (code) {
      case 'auth/user-not-found':
        return 'Email no encontrado.';
      case 'auth/wrong-password':
        return 'Contrasena incorrecta.';
      default:
        return 'Error desconocido.';
    }
  }
}

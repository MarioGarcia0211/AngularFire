import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formReset!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
    this.formReset = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  async recuperar(){
    const email = this.formReset.value.email;

    this.authService.resetPassword(email).then(() =>{
      this.toast.info({detail: 'Mensaje de información', summary:'Le enviamos un correo restablecer su contraseña', duration:5000});
      this.formReset.reset();
      this.router.navigate(['login'])

    }).catch((error) => {
      this.toast.error({detail: 'Mensaje de error', summary: this.firebaseError(error.code), duration: 5000});
    });

  }

  firebaseError(code: string){
    switch (code) {
      case 'auth/user-not-found':
        return 'Email no encontrado.';
      default:
        return 'Error desconocido.';
    }
  }

}

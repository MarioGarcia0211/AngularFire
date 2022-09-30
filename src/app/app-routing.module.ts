import { VerifyEmailComponent } from './pages/auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component:LoginComponent },
  { path: 'sign-up', component:SignUpComponent },
  { path: 'reset-password', component:ResetPasswordComponent },
  { path: 'verify-email', component:VerifyEmailComponent },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', redirectTo:'inicio', pathMatch:'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'perfil', component:PerfilComponent },
    { path: 'usuarios', component:UsuariosComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

import { LoggedGuard } from './guards/logged.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'contate-nos',
    loadChildren: () => import('./pages/contate-nos/contate-nos.module').then( m => m.ContateNosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./pages/criar-conta/criar-conta.module').then( m => m.CriarContaPageModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/perfil-outro-usuario/perfil-outro-usuario.module').then( m => m.PerfilOutroUsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'slides',
    loadChildren: () => import('./components/slides/slides.module').then( m => m.SlidesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'materia/:materia',
    loadChildren: () => import('./pages/filtro-materias/filtro-materias.module').then( m => m.FiltroMateriasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grau/:nivel',
    loadChildren: () => import('./pages/filtro-nivel/filtro-nivel.module').then( m => m.FiltroNivelPageModule),
    canActivate: [AuthGuard]
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

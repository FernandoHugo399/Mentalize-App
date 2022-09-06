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
    path: 'configuracoes',
    loadChildren: () => import('./pages/configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule),
    canActivate: [AuthGuard]
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

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

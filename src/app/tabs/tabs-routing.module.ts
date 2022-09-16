import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { SlidesPage } from './slides.page';
 
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'pesquisar',
        loadChildren: () => import('./pesquisar/pesquisar.module').then(m => m.PesquisarPageModule)
      },
      {
        path: 'publicar',
        loadChildren: () => import('./publicar/publicar.module').then(m => m.PublicarPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: '',
        redirectTo: '/components/slides',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/components/slides',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

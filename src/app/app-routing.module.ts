import { TestComponent } from './components/general/test/test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path : 'seller',
    loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule),
  },
  { path: 'modern', loadChildren: () => import('./modules/modern/modern.module').then(m => m.ModernModule)
  },
  {
    path: '',
    redirectTo: 'modern',
    pathMatch: 'full'
  }
  // {
  //   path: 'user',
  //   loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  // },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

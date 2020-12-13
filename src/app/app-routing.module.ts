import { TestComponent } from './components/general/test/test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path : 'modern',
    loadChildren: () => import('./modules/modern/modern.module').then(m => m.ModernModule)
  },
  { path : 'seller',
    loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule)
  },
  // {
  //   path: 'seller',
  //   loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule)
  // },
  // {
  //   path: 'user',
  //   loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  // },
  { path: '', component: TestComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

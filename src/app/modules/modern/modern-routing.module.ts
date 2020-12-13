import { CreateOrEditCategoryComponent } from './components/create-or-edit-category/create-or-edit-category.component';
import { EditFirstLevelComponent } from './components/levels/edit-first-level/edit-first-level.component';
import { ModernComponent } from './modern.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {DashboardComponent} from '../modern/components/dashboard/dashboard.component';
import {ZeroLevelComponent} from '../modern/components/levels/zero-level/zero-level.component';
import {ThirdLevelComponent} from '../modern/components/levels/third-level/third-level.component';
import {SecondLevelComponent} from '../modern/components/levels/second-level/second-level.component';
import {FirstLevelComponent} from '../modern/components/levels/first-level/first-level.component';
import {EditZeroLevelComponent} from '../modern/components/levels/edit-zero-level/edit-zero-level.component';



const routes: Routes = [
  { path : '', component: ModernComponent, children :
   [
    { path : '', component: DashboardComponent},
    { path : 'dashboard', component: DashboardComponent},
    { path : 'create_edit_category', component: CreateOrEditCategoryComponent},
    { path : 'zero_level', component: ZeroLevelComponent},
    { path : 'first_level', component: FirstLevelComponent},
    { path : 'second_level', component: SecondLevelComponent},
    { path : 'third_level', component: ThirdLevelComponent},
    { path : 'zero_level/edit/:categoryId', component: EditZeroLevelComponent},
    { path : 'first_level/edit/:categoryId', component: EditFirstLevelComponent},
    ]
  }
 ];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class ModernRoutingModule { }

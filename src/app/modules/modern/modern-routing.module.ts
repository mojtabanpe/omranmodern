import { CreateMaterialComponent } from './components/material/create-material/create-material.component';
import { ManageMaterialsComponent } from './components/material/manage-materials/manage-materials.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { CreateOrEditCategoryComponent } from './components/category/create-or-edit-category/create-or-edit-category.component';
import { ModernComponent } from './modern.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {DashboardComponent} from '../modern/components/dashboard/dashboard.component';



const routes: Routes = [
  { path : '', component: ModernComponent, children :
   [
    { path : '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path : 'dashboard', component: DashboardComponent},
    { path : 'categories', component: CategoriesComponent},
    { path : 'create_edit_category', component: CreateOrEditCategoryComponent},
    { path : 'create_edit_category/:id', component: CreateOrEditCategoryComponent},
    { path : 'manage_materials', component: ManageMaterialsComponent},
    { path : 'create_material', component: CreateMaterialComponent},

  ]}
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class ModernRoutingModule { }

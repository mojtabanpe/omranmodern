import { AddServiceToSellerComponent } from './components/seller/add-service-to-seller/add-service-to-seller.component';
import { SellerDetailsComponent } from './components/seller/seller-details/seller-details.component';
import { ManageSellersComponent } from './components/seller/manage-sellers/manage-sellers.component';
import { CreateSellerComponent } from './components/seller/create-seller/create-seller.component';
import { ManageServicesComponent } from './components/service/manage-services/manage-services.component';
import { CreateServiceComponent } from './components/service/create-service/create-service.component';
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
    { path : 'create_service', component: CreateServiceComponent},
    { path : 'manage_services', component: ManageServicesComponent},
    { path : 'create_seller', component: CreateSellerComponent},
    { path : 'manage_sellers', component: ManageSellersComponent},
    { path : 'seller-details', component: SellerDetailsComponent},
    { path : 'add-service-to-seller', component: AddServiceToSellerComponent},
  ]}
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class ModernRoutingModule { }

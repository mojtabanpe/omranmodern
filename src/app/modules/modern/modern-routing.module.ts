import { ManageUsersComponent } from './components/users/manage-users/manage-users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { EditSellerServiceComponent } from './components/seller/seller-details/seller-services/edit-seller-service/edit-seller-service.component';
import { EditSellerMaterialComponent } from './components/seller/seller-details/seller-materials/edit-seller-material/edit-seller-material.component';
import { SellersOfMotherMaterialComponent } from './components/material/sellers-of-mother-material/sellers-of-mother-material.component';
import { SellersOfMaterialComponent } from './components/material/sellers-of-material/sellers-of-material.component';
import { EditMotherServiceComponent } from './components/service/edit-mother-service/edit-mother-service.component';
import { EditServiceComponent } from './components/service/edit-service/edit-service.component';
import { EditMotherMaterialComponent } from './components/material/edit-mother-material/edit-mother-material.component';
import { EditMaterialComponent } from './components/material/edit-material/edit-material.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddMaterialToSellerComponent } from './components/seller/add-material-to-seller/add-material-to-seller.component';
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
    { path : 'edit_material/:id', component: EditMaterialComponent},
    { path : 'sellers-of-material/:id', component: SellersOfMaterialComponent},
    { path : 'edit_mother_material/:id', component: EditMotherMaterialComponent},
    { path : 'sellers-of-mother-material/:id', component: SellersOfMotherMaterialComponent},
    { path : 'create_service', component: CreateServiceComponent},
    { path : 'edit_service/:id', component: EditServiceComponent},
    { path : 'edit_mother_service/:id', component: EditMotherServiceComponent},
    { path : 'manage_services', component: ManageServicesComponent},
    { path : 'create_seller', component: CreateSellerComponent},
    { path : 'manage_sellers', component: ManageSellersComponent},
    { path : 'seller-details/:id', component: SellerDetailsComponent},
    { path : 'add-service-to-seller/:id', component: AddServiceToSellerComponent},
    { path : 'add-material-to-seller/:id', component: AddMaterialToSellerComponent},
    { path : 'edit_seller_material/:id', component: EditSellerMaterialComponent},
    { path : 'edit_seller_service/:id', component: EditSellerServiceComponent},
    { path : 'create_user', component: CreateUserComponent},
    { path : 'manage_users', component: ManageUsersComponent},
    { path : 'messages', component: MessagesComponent}
  ]}
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class ModernRoutingModule { }

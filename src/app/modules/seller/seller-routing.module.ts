import { MyProductsComponent } from '../../components/seller/my-products/my-products.component';
import { SellerInformationComponent } from '../../components/seller/seller-information/seller-information.component';
import { DashboardComponent } from '../../components/seller/dashboard/dashboard.component';
import { SellerComponent } from './seller.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { MyProjectsComponent } from '../../components/seller/my-projects/my-projects.component';
import { ContactInformationComponent } from '../../components/seller/contact-information/contact-information.component';
import { ProfileInformationsComponent } from '../../components/seller/profile-informations/profile-informations.component';

const routes: Routes = [
  { path : '', component: SellerComponent, children :
   [
    { path : '', component: DashboardComponent},
    { path : 'sellerInformation', component: SellerInformationComponent},
    { path : 'myProjects', component: MyProjectsComponent},
    { path : 'profileInformation', component: ProfileInformationsComponent},
    { path : 'contactInformation', component: ContactInformationComponent},
    { path : 'myProducts', component: MyProductsComponent},
    ]
  }
 ];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class SellerRoutingModule { }

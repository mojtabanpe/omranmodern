import { SellerInformationComponent } from './../../components/seller/seller-information/seller-information.component';
import { ProfileInformationsComponent } from './../../components/seller/profile-informations/profile-informations.component';
import { AddWorkSampleComponent } from './../../components/seller/add-work-sample/add-work-sample.component';
import { ContactInformationComponent } from './../../components/seller/contact-information/contact-information.component';
import { MyProductsComponent } from './../../components/seller/my-products/my-products.component';
import { DashboardComponent } from './../../components/seller/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { SellerComponent } from './seller.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../shared/shared.module';
import { SellerRoutingModule } from './seller-routing.module';

@NgModule({
  imports: [
    SellerRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    SharedModule
  ],
  declarations: [
    SellerComponent,
    DashboardComponent,
    MyProductsComponent,
    ContactInformationComponent,
    AddWorkSampleComponent,
    ProfileInformationsComponent,
    SellerInformationComponent,
    MyProductsComponent
  ]
})
export class SellerModule { }

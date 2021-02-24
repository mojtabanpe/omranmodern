import { PermutationCreateChildsComponent } from './components/material/permutation-create-childs/permutation-create-childs.component';
import { ManageUsersComponent } from './components/users/manage-users/manage-users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { AddSampleWorkDialogComponent } from './components/seller/create-seller/add-sample-work-dialog/add-sample-work-dialog.component';
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
import { SampleWorksComponent } from './components/seller/seller-details/sample-works/sample-works.component';
import { CoveragesComponent } from './components/seller/seller-details/coverages/coverages.component';
import { SellerServicesComponent } from './components/seller/seller-details/seller-services/seller-services.component';
import { SellerMaterialsComponent } from './components/seller/seller-details/seller-materials/seller-materials.component';
import { EditSellerComponent } from './components/seller/seller-details/edit-seller/edit-seller.component';
import { InformationComponent } from './components/seller/seller-details/information/information.component';
import { SellerDetailsComponent } from './components/seller/seller-details/seller-details.component';
import { ManageSellersComponent } from './components/seller/manage-sellers/manage-sellers.component';
import { CreateSellerComponent } from './components/seller/create-seller/create-seller.component';
import { ManageServicesComponent } from './components/service/manage-services/manage-services.component';
import { CreateServiceComponent } from './components/service/create-service/create-service.component';
import { CreateBrandDialogComponent } from './../../components/dialogs/create-brand-dialog/create-brand-dialog.component';
import { CreateMaterialComponent } from './components/material/create-material/create-material.component';
import { ManageMaterialsComponent } from './components/material/manage-materials/manage-materials.component';
import { PartialCategoriesComponent } from './components/category/partial-categories/partial-categories.component';
import { CreateAttributeDialogComponent } from './../../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { CategoryChildsComponent } from './components/category/create-or-edit-category/category-childs/category-childs.component';
import { CategoryAttributesComponent } from './components/category/create-or-edit-category/category-attributes/category-attributes.component';
import { RelatedComponent } from './components/category/create-or-edit-category/related/related.component';
import { MainDetailComponent } from './components/category/create-or-edit-category/main-detail/main-detail.component';
import { CreateOrEditCategoryComponent } from './components/category/create-or-edit-category/create-or-edit-category.component';


import {DashboardComponent} from '../modern/components/dashboard/dashboard.component';


import { NgModule } from '@angular/core';
import { ModernComponent } from './modern.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModernRoutingModule } from './modern-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ModernRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule
  ],
  declarations: [
    ModernComponent,
    DashboardComponent,
    CreateOrEditCategoryComponent,
    MainDetailComponent,
    RelatedComponent,
    CategoryAttributesComponent,
    CategoryChildsComponent,
    CategoriesComponent,
    CreateAttributeDialogComponent,
    PartialCategoriesComponent,
    ManageMaterialsComponent,
    CreateMaterialComponent,
    CreateBrandDialogComponent,
    CreateServiceComponent,
    ManageServicesComponent,
    CreateSellerComponent,
    ManageSellersComponent,
    SellerDetailsComponent,
    InformationComponent,
    EditSellerComponent,
    SellerMaterialsComponent,
    SellerServicesComponent,
    CoveragesComponent,
    SampleWorksComponent,
    AddServiceToSellerComponent,
    AddMaterialToSellerComponent,
    MessagesComponent,
    EditMaterialComponent,
    EditMotherMaterialComponent,
    EditServiceComponent,
    EditMotherServiceComponent,
    SellersOfMaterialComponent,
    SellersOfMotherMaterialComponent,
    EditSellerMaterialComponent,
    EditSellerServiceComponent,
    AddSampleWorkDialogComponent,
    CreateUserComponent,
    ManageUsersComponent,
    PermutationCreateChildsComponent
  ]
})
export class ModernModule { }

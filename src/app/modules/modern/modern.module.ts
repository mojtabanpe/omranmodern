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
    ManageServicesComponent
  ]
})
export class ModernModule { }

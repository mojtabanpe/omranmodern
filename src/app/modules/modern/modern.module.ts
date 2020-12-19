import { PartialCategoriesComponent } from './components/partial-categories/partial-categories.component';
import { CreateAttributeDialogComponent } from './../../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryChildsComponent } from './components/create-or-edit-category/category-childs/category-childs.component';
import { CategoryAttributesComponent } from './components/create-or-edit-category/category-attributes/category-attributes.component';
import { RelatedComponent } from './components/create-or-edit-category/related/related.component';
import { MainDetailComponent } from './components/create-or-edit-category/main-detail/main-detail.component';
import { CreateOrEditCategoryComponent } from './components/create-or-edit-category/create-or-edit-category.component';
import { EditFirstLevelComponent } from './components/levels/edit-first-level/edit-first-level.component';

import {DashboardComponent} from '../modern/components/dashboard/dashboard.component';
import {ZeroLevelComponent} from '../modern/components/levels/zero-level/zero-level.component';
import {ThirdLevelComponent} from '../modern/components/levels/third-level/third-level.component';
import {SecondLevelComponent} from '../modern/components/levels/second-level/second-level.component';
import {FirstLevelComponent} from '../modern/components/levels/first-level/first-level.component';
import {EditZeroLevelComponent} from '../modern/components/levels/edit-zero-level/edit-zero-level.component';

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
    ZeroLevelComponent,
    ThirdLevelComponent,
    SecondLevelComponent,
    FirstLevelComponent,
    EditZeroLevelComponent,
    EditFirstLevelComponent,
    CreateOrEditCategoryComponent,
    MainDetailComponent,
    RelatedComponent,
    CategoryAttributesComponent,
    CategoryChildsComponent,
    CategoriesComponent,
    CreateAttributeDialogComponent,
    PartialCategoriesComponent
  ]
})
export class ModernModule { }

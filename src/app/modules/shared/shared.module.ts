import { YesOrNoDialogComponent } from './../../components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { TrueFalsePipe } from '../../pipes/true-false.pipe';
import { PersianNumberPipe } from '../../pipes/persian-number.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    ToastrModule,
    MatTreeModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatRadioModule,
  ],
  declarations: [
    SharedComponent,
    TrueFalsePipe,
    PersianNumberPipe,
    YesOrNoDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrueFalsePipe,
    PersianNumberPipe,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    ToastrModule,
    MatTreeModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatRadioModule,
    YesOrNoDialogComponent
    // BrowserAnimationsModule
  ]
})
export class SharedModule { }

import { UploadSection } from './../../../../../interfaces/upload-section';
import { RepositoryService } from './../../../../../services/repository.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-edit-first-level',
  templateUrl: './edit-first-level.component.html',
  styleUrls: ['./edit-first-level.component.css']
})
export class EditFirstLevelComponent implements OnInit {
//   subGroups = [
//     {
//     title: 'مشارکت و ساخت/ اخذ مجوز',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: true
//   }, {
//     title: 'خدمات آزمایشگاهی ساختمان',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: true
//   }, {
//     title: 'مهندس طراح/ شرکت مشاور',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: true
//   }, {
//     title: 'مهندس و شرکت های مجری',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: false
//   }, {
//     title: 'مصالح سفت کاری و نازک کاری',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: true
//   }, {
//     title: 'پیمانکاری جز',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: true
//   }, {
//     title: 'تاسیسات برقی و مکانیکی',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: false
//   }, {
//     title: 'تجهیزات/ ماشین آلات',
//     productsCount: 3,
//     sellersCount: 5,
//     situation: 0,
//     status: true
//   }
// ];
  // reader = new FileReader();
  // sections: Array<UploadSection> = [];
  // inProgress = false;
  // images = [];
  // selectedImage: any;
  // public Editor = ClassicEditor;
  // // mode = 'edit';
  // // category;
  // editOrCreateForm: FormGroup;
  // imageName = '1'; // must be unique

//   categories = [
//     { item_id: 1, item_text: 'منطقه ۱' },
//     { item_id: 2, item_text: 'منطقه ۲' },
//     { item_id: 3, item_text: 'آهن آلات'  },
//     { item_id: 4, item_text: 'آزمایشگاهی' },
//     { item_id: 5, item_text: 'منطقه ۵' }
//   ];
//   selectedCategories = [
//   { item_id: 3, item_text: 'آهن آلات' },
//   { item_id: 4, item_text: 'آزمایشگاهی' }
// ];
//   dropdownSettings: IDropdownSettings;
  // attributes = [
  //   {
  //     name: 'رنگ',
  //     possibleValues: ['آبی', 'قرمز', 'سبز'],
  //     showInFilter: true
  //   },
  //   {
  //     name: 'واحد',
  //     possibleValues: ['سانتی متر', 'متر'],
  //     showInFilter: false
  //   }
  // ];
  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(private activatedRoute: ActivatedRoute, private repository: RepositoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // ClassicEditor.create( document.querySelector( '#editor' ), {
    //     toolbar: [
    //       'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'link', 'blockQuote', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'fontSize', 'fontColor', 'fontBackgroundColor', 'undo', 'redo'
    //   ],
    //     alignment: {
    //         options: [ 'left', 'right', 'center', 'justify' ]
    //     }
    // });
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'انتخاب همه',
    //   unSelectAllText: 'حذف همه',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
    // const groupId = +this.activatedRoute.snapshot.paramMap.get('categoryId');
    // if (groupId !== 0) {
    //   this.mode = 'edit';
    //   this.repository.getCategory(groupId).subscribe((res: any) => {
    //     this.category = res;
    //   });
    // } else { this.mode = 'create'; }

    // this.editOrCreateForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   explain: ['', [Validators.required]],
    // });

    }
    // onFileChanged(event): void {
    //   this.inProgress = true;
    //   // tslint:disable-next-line: prefer-const
    //   const uploadSection: UploadSection = {
    //     progressPercent: 0,
    //     started: true,
    //     finished: false,
    //     src: ''
    //   };
    //   this.sections.push(uploadSection);
    //   this.selectedImage = event.target.files[0];
    //   this.reader.readAsDataURL(this.selectedImage);
    //   const data = new FormData();
    //   data.append('myFile', this.selectedImage, this.imageName);
    //   this.repository.uploadImage(data).subscribe(res => {
    //     if (res !== undefined) {
    //       if (res.mode === 'progress') {
    //         uploadSection.progressPercent = res.percent;
    //       } else if (res.mode === 'init') {
    //         uploadSection.started = true;
    //       }
    //       else if (res.mode === 'finish') {
    //         uploadSection.finished = true;
    //         uploadSection.started = false;
    //         this.images.push(res.message);
    //         setTimeout(() => {
    //           uploadSection.src = this.reader.result.toString();
    //           }, 1000);
    //         this.inProgress = false;
    //       }
    //     }
    //   });
    // }

    // removePicture(index: number): void {
    //  this.images.splice(index, 1);
    //  this.sections.splice(index, 1);
    // }
    // onItemSelect(item: any): void {
    //   console.log(item);
    // }
    // onSelectAll(items: any): void {
    //   console.log(items);
    // }

    // addAttribute(): void {

    // }
    // add(event: MatChipInputEvent, attribute): void {
    //   const input = event.input;
    //   const value = event.value;
    //   // Add our fruit
    //   if ((value || '').trim()) {
    //     attribute.possibleValues.push(value.trim());
    //   }
    //   // Reset the input value
    //   if (input) {
    //     input.value = '';
    //   }
    // }
    // remove(value, attribute): void {
    //   const index = attribute.possibleValues.indexOf(value);
    //   if (index >= 0) {
    //     attribute.possibleValues.splice(index, 1);
    //   }
    // }
    // submit(): void {
    //   console.log(this.editOrCreateForm.value);
    //   console.log(this.images);
    // }
}

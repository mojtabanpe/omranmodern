import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Category } from 'src/app/interfaces/category';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { RepositoryService } from 'src/app/services/repository.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.css']
})
export class MainDetailComponent implements OnInit, OnDestroy {
  deepSub;
  categorySub;
  @Input() mode = '';
  initialized = false;
  deep = 13;
  category: Category;
  nameChanged = false;
  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  public editor = ClassicEditor;
  // mode = 'edit';
  // category;
  editOrCreateForm: FormGroup;
  imageDirectory = 'categories'; // must be unique

  categories = [];
  selectedCategories = [];
  dropdownSettings: IDropdownSettings;
  passToServer = {};

  deletedImage = false;
  changedParents = {
    addedParents: [],
    removedParents: []
  };
  config;
  // @ViewChild( 'editor' ) editorComponent: CKEditorComponent;

  constructor(private fb: FormBuilder, private repository: RepositoryService, private general: GeneralService,
              private alert: ToastrService, private router: Router) {
                this.config = {
                  language: {
                    ui: 'en',
                    content: 'fa'
                  },
                  pasteFromWordRemoveStyles: false,
                  pasteFromWordRemoveFontStyles: false,
                  simpleUpload: {
                    uploadUrl: 'http://localhost:8000/upload/',
                }
              };
          }

  ngOnInit(): void {
  this.deepSub = this.general.currentDeep.subscribe(res => {
      this.deep = res;
    });
  if (this.mode === 'create') {
      this.category = this.general.defaultCategory;
      if (this.deep !== 0) {
        this.repository.getTopDeepCategories(this.deep).subscribe((result) => {
          this.categories = result;
        });
      }
    } else {
      this.categorySub = this.general.currentCategory.subscribe((res: Category) => {
        this.category = res;
        this.images[0] = this.category.image;
      });
      this.repository.getCategoryParentsByIDs(this.category.id).subscribe((result) => {
          this.categories = result.categories;
          this.selectedCategories = result.selectedCategories;
        });
      }
  this.dropdownSettings = {
      singleSelection: false,
      idField: 'parent_id',
      textField: 'parent_name',
      selectAllText: 'انتخاب همه',
      unSelectAllText: 'حذف همه',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    // console.log(this.getEditor);
    // const editor = document.querySelector('#editor');
    // console.log(editor);
    
  }
  onFileChanged(event): void {
  this.inProgress = true;
  // tslint:disable-next-line: prefer-const
  const uploadSection: UploadSection = {
    progressPercent: 0,
    started: true,
    finished: false,
    src: ''
  };
  this.sections.push(uploadSection);
  this.selectedImage = event.target.files[0];
  this.reader.readAsDataURL(this.selectedImage);
  const data = new FormData();
  data.append('myFile', this.selectedImage, this.imageDirectory);
  this.repository.uploadImage(data).subscribe(res => {
    if (res !== undefined) {
      if (res.mode === 'progress') {
        uploadSection.progressPercent = res.percent;
      } else if (res.mode === 'init') {
        uploadSection.started = true;
      }
      else if (res.mode === 'finish') {
        uploadSection.finished = true;
        uploadSection.started = false;
        this.images.push(res.message);
        setTimeout(() => {
          uploadSection.src = this.reader.result.toString();
          }, 1000);
        this.inProgress = false;
      }
    }
  });
  }

  removePicture(index: number): void {
  this.images.splice(index, 1);
  this.sections.splice(index, 1);
  }
  deleteImage(): void {
    this.deletedImage = true;
    this.images = [];
  }

  submit(): void {
    const ids = [];
    this.selectedCategories.forEach((value, element) => {
      ids.push(value.parent_id);
    });
    if (this.mode === 'create') {
    this.passToServer = {
      name : this.editOrCreateForm.get('name').value,
      explain: this.editOrCreateForm.get('explain').value,
      parents_id: ids ,
      image: this.images[0],
      deep: this.deep
    };
    this.repository.createCategory(this.passToServer).subscribe((res: any) => {
      this.alert.success('گروه جدید با موفقیت ایجاد شد!');
      this.repository.UpdateParentsWithThisChild(this.changedParents, res.id).subscribe();
      this.router.navigate(['/modern/create_edit_category', {skipLocationChange: true}]);
    }, error => {
      this.alert.error('ورودی های خود را کنترل کنید!');
    });
  } else if (this.mode === 'edit') {
    this.category.image = this.images[0];
    this.general.changeCategory(this.category);
    this.passToServer = {
      name : this.category.name,
      explain: this.category.explain,
      parents_id: ids,
      image: this.category.image
    };
    this.repository.updateCategory(this.passToServer, this.category.id).subscribe(res => {
      this.alert.success('گروه با موفقیت ویرایش شد!');
      if (this.nameChanged) {
        if (this.category.is_cluster) {
          this.repository.changeProductsCategoryName(this.category.id).subscribe(response => {

          });
        }
      }
    }, err => {
      this.alert.error('مشکلی در ویرایش گروه وجود دارد!');
    });
  }
  }

  public onChange( { editor }: ChangeEvent ) {
    // const data = editor.getData();
}

  onItemSelect($event): void {
    const index = this.changedParents.removedParents.indexOf($event.parent_id);
    if (index > -1) {
      console.log(index);
      this.changedParents.removedParents.splice(index, 1);
    }
    this.changedParents.addedParents.push($event.parent_id);
  }
  onItemDeSelect($event): void {
    const index = this.changedParents.addedParents.indexOf($event.parent_id);
    if (index > -1) {
      this.changedParents.addedParents.splice(index, 1);
    }
    this.changedParents.removedParents.push($event.parent_id);
  }

  public getEditor() {
    // Warning: This may return "undefined" if the editor is hidden behind the `*ngIf` directive or
    // if the editor is not fully initialised yet.
    // const editor: CKEditorComponent = document.querySelector('#editor').editorInstance;
    // return this.editorComponent.editorInstance;
  }

  ngOnDestroy(): void {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    this.deepSub.unsubscribe();
  }
}

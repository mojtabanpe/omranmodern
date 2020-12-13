import { GeneralService } from 'src/app/services/general.service'
import { Category } from '../../../../../interfaces/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.css']
})
export class MainDetailComponent implements OnInit {
  category: Category;
  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  public Editor = ClassicEditor;
  // mode = 'edit';
  // category;
  editOrCreateForm: FormGroup;
  imageName = '1'; // must be unique
  constructor(private fb: FormBuilder, private repository: RepositoryService, private general: GeneralService) { }

  ngOnInit(): void {
    this.general.currentCategory.subscribe((res: Category) => {
      this.category = res;
    });
    ClassicEditor.create( document.querySelector( '#editor' ), {
      toolbar: [
        'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'link', 'blockQuote', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'fontSize', 'fontColor', 'fontBackgroundColor', 'undo', 'redo'
    ],
      alignment: {
          options: [ 'left', 'right', 'center', 'justify' ]
      }
  });
    if (this.general.mode) {
      this.editOrCreateForm = this.fb.group({
        name: ['', [Validators.required]],
        explain: ['', [Validators.required]],
      });
    }
    else {
      this.editOrCreateForm = this.fb.group({
        name: [this.category.name, [Validators.required]],
        explain: [this.category.explain, [Validators.required]],
      });
    }
    
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
  data.append('myFile', this.selectedImage, this.imageName);
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

  submit(): void {
    console.log(this.editOrCreateForm.value);
    console.log(this.images);
  }
}

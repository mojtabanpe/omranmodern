import { UploadSection } from './../../../../../interfaces/upload-section';
import { RepositoryService } from './../../../../../services/repository.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-zero-level',
  templateUrl: './edit-zero-level.component.html',
  styleUrls: ['./edit-zero-level.component.css']
})
export class EditZeroLevelComponent implements OnInit {
  subGroups = [
    {
    title: 'مشارکت و ساخت/ اخذ مجوز',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'خدمات آزمایشگاهی ساختمان',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'مهندس طراح/ شرکت مشاور',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'مهندس و شرکت های مجری',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: false
  }, {
    title: 'مصالح سفت کاری و نازک کاری',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'پیمانکاری جز',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }, {
    title: 'تاسیسات برقی و مکانیکی',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: false
  }, {
    title: 'تجهیزات/ ماشین آلات',
    productsCount: 3,
    sellersCount: 5,
    situation: 0,
    status: true
  }
];
  reader = new FileReader();
  sections: Array<UploadSection> = [];
  inProgress = false;
  images = [];
  selectedImage: any;
  mode = 'edit';
  category;
  editOrCreateForm: FormGroup;
  imageName = '1'; // must be unique
  constructor(private activatedRoute: ActivatedRoute, private repository: RepositoryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // ClassicEditor
    // .create( document.querySelector( '#editor' ), {
    //     toolbar: [
    //       'heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'link', 'blockQuote', 'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', 'fontSize', 'fontColor', 'fontBackgroundColor', 'undo', 'redo'
    //   ],
    //     alignment: {
    //         options: [ 'left', 'right', 'center', 'justify' ]
    //     }
    // } );

    const groupId = +this.activatedRoute.snapshot.paramMap.get('categoryId');
    if (groupId !== 0) {
      this.mode = 'edit';
      this.repository.getCategory(groupId).subscribe((res: any) => {
        this.category = res;
      });
    } else { this.mode = 'create'; }

    this.editOrCreateForm = this.fb.group({
      name: ['', [Validators.required]],
      explain: ['', [Validators.required]],
    });

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

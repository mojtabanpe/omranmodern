import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UploadSection } from 'src/app/interfaces/upload-section';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-add-sample-work-dialog',
  templateUrl: './add-sample-work-dialog.component.html',
  styleUrls: ['./add-sample-work-dialog.component.css']
})
export class AddSampleWorkDialogComponent implements OnInit {
  sampleWork = {
    title: '',
    description: '',
    images: []
  };
  reader = new FileReader();
  sections: Array<UploadSection> = [];
  selectedImage: any;
  imageDirectory = 'sellers/worksamples';
  initializedImage = false;

  constructor(public dialogRef: MatDialogRef<AddSampleWorkDialogComponent>, private repository: RepositoryService,
              private alert: ToastrService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChanged(event): void {
    this.initializedImage = true;
    const uploadSection: UploadSection = {
      progressPercent: 0,
      started: true,
      finished: false,
      src: ''
    };
    try {
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
            this.sampleWork.images.push(res.message);
            setTimeout(() => {
              uploadSection.src = this.reader.result.toString();
              }, 1000);
          }
        }
      });
    } catch (error) {
      this.initializedImage = false;
      this.alert.error('متاسفانه مشکلی در آپلود عکس بوجود آمده است!');
    }

    }

  removePicture(index): void {
    this.initializedImage = false;
    this.sampleWork.images.splice(index, 1);
    this.sections.splice(index, 1);
  }
}

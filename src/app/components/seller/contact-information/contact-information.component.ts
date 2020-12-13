import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {
  contactInfo: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactInfo = this.fb.group({
      address: ['', Validators.required],
      phones: ['', [Validators.required]],
      fax: ['', Validators.required],
      site: ['']
    });
  }

  submit(): void {
    
  }

}

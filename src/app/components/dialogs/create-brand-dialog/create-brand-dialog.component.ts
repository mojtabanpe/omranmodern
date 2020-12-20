import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-brand-dialog',
  templateUrl: './create-brand-dialog.component.html',
  styleUrls: ['./create-brand-dialog.component.css']
})
export class CreateBrandDialogComponent implements OnInit {
  result = {
    name: '',
    explain: '',
    is_active: true
  };
  constructor() { }

  ngOnInit(): void {
  }

}

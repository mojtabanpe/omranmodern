import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-attribute-dialog',
  templateUrl: './create-attribute-dialog.component.html',
  styleUrls: ['./create-attribute-dialog.component.css']
})
export class CreateAttributeDialogComponent implements OnInit {
  attrName = '';
  constructor() { }

  ngOnInit(): void {
  }

}

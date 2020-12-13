import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-category-attributes',
  templateUrl: './category-attributes.component.html',
  styleUrls: ['./category-attributes.component.css']
})
export class CategoryAttributesComponent implements OnInit {
  attributes = [
    {
      name: 'رنگ',
      possibleValues: ['آبی', 'قرمز', 'سبز'],
      showInFilter: true
    },
    {
      name: 'واحد',
      possibleValues: ['سانتی متر', 'متر'],
      showInFilter: false
    }
  ];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  ngOnInit(): void {
  }
  addAttribute(): void {

  }
  add(event: MatChipInputEvent, attribute): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      attribute.possibleValues.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(value, attribute): void {
    const index = attribute.possibleValues.indexOf(value);
    if (index >= 0) {
      attribute.possibleValues.splice(index, 1);
    }
  }

}

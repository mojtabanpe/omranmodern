import { CreateAttributeDialogComponent } from './../../../../../../components/dialogs/create-attribute-dialog/create-attribute-dialog.component';
import { Category } from 'src/app/interfaces/category';
import { CategoryAttribute } from 'src/app/interfaces/category-attribute';
import { RepositoryService } from 'src/app/services/repository.service';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-category-attributes',
  templateUrl: './category-attributes.component.html',
  styleUrls: ['./category-attributes.component.css']
})
export class CategoryAttributesComponent implements OnInit, OnDestroy {
  categorySub;
  category: Category;
  attributes: Array<CategoryAttribute>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  constructor(private repository: RepositoryService, private general: GeneralService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.categorySub = this.general.currentCategory.subscribe((res: Category) => {
      this.category = res;
    });
    this.repository.getCategoryAttributes(this.category.id).subscribe(res => {
      this.attributes = res;
    });
  }
  addAttribute(): void {
    const dialogRef = this.dialog.open(CreateAttributeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel') {
        const attribute = {
          name: result,
          possible_values: [],
          show_in_filter: false,
          category_id: this.category.id
        };
        this.repository.createCategoryAttribute(attribute).subscribe(res => {
          this.attributes.push(res);
        });
      }
    });
    // this.attributes.push(attribute);
  }
  addChip(event: MatChipInputEvent, attribute): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      attribute.possible_values.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeChip(value, attribute): void {
    const index = attribute.possible_values.indexOf(value);
    if (index >= 0) {
      attribute.possible_values.splice(index, 1);
    }
  }

  toggleShowInFilter(): void {

  }

  saveAttribute(attr: CategoryAttribute): void {
    this.repository.updateAttribute(attr).subscribe();
  }
  deleteAttribute(id: number): void {
    this.repository.deleteAttribute(id).subscribe(res => {
      const attr = this.attributes.filter(a => a.id === id)[0];
      const index = this.attributes.indexOf(attr);
      this.attributes.splice(index, 1);
    });
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

}

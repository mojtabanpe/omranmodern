import { GeneralService } from './../../../../services/general.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';
import { Category } from 'src/app/interfaces/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-or-edit-category',
  templateUrl: './create-or-edit-category.component.html',
  styleUrls: ['./create-or-edit-category.component.css']
})
export class CreateOrEditCategoryComponent implements OnInit, OnDestroy {
  categorySubs;
  category: Category;
  deep = 13;
  mode = 'edit';
  initialized = false;
  constructor(private activatedRoute: ActivatedRoute, private repository: RepositoryService, private general: GeneralService, 
              private alert: ToastrService) { }

  ngOnInit(): void {
    const groupId = +this.activatedRoute.snapshot.paramMap.get('id');
    if (groupId !== 0) {
      this.mode = 'edit';
      this.general.mode = 'edit';
      this.categorySubs = this.repository.getCategory(groupId).subscribe((res: any) => {
        this.general.changeCategory(res);
        this.initialized = true;
      });
    } else {
      this.general.currentDeep.subscribe((res: number) => {
        this.deep = res;
        this.initialized = true;
      });
      this.mode = 'create';
      this.general.mode = 'create';
    }
  }

  ngOnDestroy(): void {
    if (this.categorySubs !== undefined) {
      this.categorySubs.unsubscribe();
    }
  }
}

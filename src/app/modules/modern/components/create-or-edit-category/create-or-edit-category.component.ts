import { GeneralService } from './../../../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-create-or-edit-category',
  templateUrl: './create-or-edit-category.component.html',
  styleUrls: ['./create-or-edit-category.component.css']
})
export class CreateOrEditCategoryComponent implements OnInit {
  mode = 'edit';
  constructor(private activatedRoute: ActivatedRoute, private repository: RepositoryService, private general: GeneralService) { }

  ngOnInit(): void {
    const groupId = +this.activatedRoute.snapshot.paramMap.get('categoryId');
    if (groupId !== 0) {
      this.mode = 'edit';
      this.general.mode = 'edit';
      this.repository.getCategory(groupId).subscribe((res: any) => {
        this.general.changeCategory(res)
      });
    } else { 
      this.mode = 'create';
      this.general.mode = 'create';
    }
  }

}

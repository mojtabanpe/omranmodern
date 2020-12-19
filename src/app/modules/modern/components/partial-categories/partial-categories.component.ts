import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-partial-categories',
  templateUrl: './partial-categories.component.html',
  styleUrls: ['./partial-categories.component.css']
})
export class PartialCategoriesComponent implements OnInit {
  @Input() type: string;
  deep = 13;
  groupId = 0;
  groups = [];

  constructor(private general: GeneralService, private repository: RepositoryService) { }

  ngOnInit(): void {
   if (this.type === 'deep') {
    this.general.currentDeep.subscribe((res: number) => {
      this.deep = res;
    });
    this.repository.GetCagtegoriesByDeep(this.deep).subscribe( (response: any) => {
      this.groups = response;
    }
    );
   } else if (this.type === 'childs') {
     this.general.currentCategory.subscribe((res: Category) => {
      this.groupId = res.id;
    });
     this.repository.GetChildCagtegories(this.groupId).subscribe( (response: any) => {
      this.groups = response;
    }
    );
   }
  }

  changeActivity(groupID): void{
    this.repository.changeCategoryActivity(groupID).subscribe();
  }

  changePosition(groupID, op): void {
    const group = this.groups.filter(g => g.id === groupID)[0];
    if (op === 'up') {
      group.position += 1;
    }else {
      group.position -= 1;
    }
    group.edited = true;
  }

  savePosition(groupID): void{
    const group = this.groups.filter(g => g.id === groupID)[0];
    this.repository.changeCategoryPosition(groupID, group.position).subscribe();
    group.edited = false;
  }

}

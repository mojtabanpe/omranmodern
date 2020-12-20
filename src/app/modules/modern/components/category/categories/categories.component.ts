import { RepositoryService } from 'src/app/services/repository.service';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
 deep = 13;
  groups = [];
  constructor(private general: GeneralService, private repository: RepositoryService) { }

  ngOnInit(): void {
    this.general.currentDeep.subscribe((res: number) => {
      this.deep = res;
    });
    this.repository.GetCagtegoriesByDeep(this.deep).subscribe( (response: any) => {
      this.groups = response;
    }
    );

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

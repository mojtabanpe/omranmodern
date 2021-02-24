import { YesOrNoDialogComponent } from './../../../../../components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partial-categories',
  templateUrl: './partial-categories.component.html',
  styleUrls: ['./partial-categories.component.css']
})
export class PartialCategoriesComponent implements OnInit, OnDestroy {
  @Input() type: string;
  deep = 13;
  groupId = 0;
  groups = [];
  showOrNot = false;
  routerSubscription;

  constructor(private general: GeneralService, private repository: RepositoryService, private router: Router, public dialog: MatDialog,
              private alert: ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
   }

  ngOnInit(): void {
   if (this.type === 'deep') {
    this.general.currentDeep.subscribe((res: number) => {
      this.deep = res;
    });
    this.repository.GetCagtegoriesByDeep(this.deep).subscribe( (response: any) => {
      this.groups = response;
      this.showOrNot = true;
    }
    );
   } else if (this.type === 'childs') {
     this.general.currentCategory.subscribe((res: Category) => {
      this.groupId = res.id;
      if (res.is_cluster === false) {
        this.showOrNot = true;
      }

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
    } else {
      group.position -= 1;
    }
    group.edited = true;
  }

  savePosition(groupID): void{
    const group = this.groups.filter(g => g.id === groupID)[0];
    this.repository.changeCategoryPosition(groupID, group.position).subscribe();
    group.edited = false;
  }

  edit(groupId): void {
    this.router.navigate(['/modern/create_edit_category/' + groupId]);
    this.ngOnInit();
  }

  delete(group): void {
    const dialogRef = this.dialog.open(YesOrNoDialogComponent, {
      data: { title: 'آیا از حذف این گروه اطمینان دارید؟'},
      width: '25rem'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        this.repository.deleteCategory(group.id).subscribe(response => {
          this.alert.success('گروه با موفیتت حذف شد!');
          const index = this.groups.indexOf(group);
          this.groups.splice(index, 1);
        }, err => {
          this.alert.error('مشکلی در حذف گروه بوجود آمده است!');
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}

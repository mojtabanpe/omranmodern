import { YesOrNoDialogComponent } from './../../../../../components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/services/repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-materials',
  templateUrl: './manage-materials.component.html',
  styleUrls: ['./manage-materials.component.css']
})
export class ManageMaterialsComponent implements OnInit {
  materialsSub;
  tableMode = true;
  statuses = [
    {value: 'active', viewValue: 'فعال'},
    {value: 'inactive', viewValue: 'غیرفعال'},
  ];
  selectedStatus: string = this.statuses[0].value;
  materials = [];
  motherMaterials = [];
  initialized = false;
  constructor(private repository: RepositoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.materialsSub = this.repository.getMaterialsByStatus(this.selectedStatus).subscribe(res => {
      this.materials = res;
    });
  }
  activityChanged(): void {
    this.materialsSub.unsubscribe();
    if (this.tableMode) {
      this.repository.getMaterialsByStatus(this.selectedStatus).subscribe(res => {
        this.materials = res;
      });
    } else {
      this.repository.getMotherMaterialsByStatus(this.selectedStatus).subscribe(res => {
        this.motherMaterials = res;
        this.initialized = true;
      });
    }
  }
  chageTableMode(): void {
    this.tableMode = !this.tableMode;
    this.activityChanged();
  }

  openAggrementDeleteMaterialDialog(material, type): void {
    const dialogRef = this.dialog.open(YesOrNoDialogComponent, {
      data: { title: 'آیا از حذف این کالا اطمینان دارید؟'}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        if (type === 'child') {
          this.repository.deleteMaterial(material.id).subscribe(res1 => {
            const index = this.materials.indexOf(material);
            this.materials.splice(index, 1);
          });
        } else {
          this.repository.deleteMotherMaterial(material.id).subscribe(response => {
            const index = this.motherMaterials.indexOf(material);
            this.motherMaterials.splice(index, 1);
          });
        }
      }
    });
  }


}

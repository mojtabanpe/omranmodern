import { Seller } from 'src/app/interfaces/seller';
import { AddCoverageDialogComponent } from './add-coverage-dialog/add-coverage-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryService } from 'src/app/services/repository.service';
import { GeneralService } from 'src/app/services/general.service';
import { AfterViewChecked, Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-coverages',
  templateUrl: './coverages.component.html',
  styleUrls: ['./coverages.component.css']
})
export class CoveragesComponent implements OnInit {
  allAreas = [];
  coverages;
  initialized = false;
  seller: Seller;
  constructor(private general: GeneralService, private repository: RepositoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.seller = res;
      this.coverages = res.coverages ? res.coverages : {
        materials: [],
        services: []
      };
      this.initialized = true;
    });

    this.repository.getAllAreas().subscribe(res => {
      this.allAreas = res;
    });
  }

  addCoverage(type): void {
    const dialogRef = this.dialog.open(AddCoverageDialogComponent, {
      width: '26rem',
      data: {type, areas: this.allAreas}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (type === 'material') {
        this.seller.coverages.materials.push(res);
      } else {
        this.seller.coverages.services.push(res);
      }
      this.general.changeSeller(this.seller);
      const passToServer = {
        coverages: this.seller.coverages
      };
      this.repository.updateSeller(passToServer, this.seller.id).subscribe();
    });
  }

}

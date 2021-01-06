import { Component, OnInit } from '@angular/core';
import { SellerMaterial } from 'src/app/interfaces/material';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-seller-materials',
  templateUrl: './seller-materials.component.html',
  styleUrls: ['./seller-materials.component.css']
})
export class SellerMaterialsComponent implements OnInit {
  materials: Array<SellerMaterial>;
  sellerId = 0;
  constructor(private general: GeneralService, private repository: RepositoryService) { }

  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.materials = res.materials;
      this.sellerId = res.id;
    });
  }

  saveMaterial(material): void {
    const passToServer = {
      id: material.material.id,
      status: material.material.status,
      prices: material.prices
    };
    this.repository.updateSellerMaterialPriceAndStatus(passToServer, this.sellerId).subscribe();
  }
}

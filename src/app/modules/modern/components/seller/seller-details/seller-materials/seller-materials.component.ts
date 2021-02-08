import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SellerMaterial } from 'src/app/interfaces/material';
import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-seller-materials',
  templateUrl: './seller-materials.component.html',
  styleUrls: ['./seller-materials.component.css']
})
export class SellerMaterialsComponent implements OnInit {
  sellerMaterials: Array<SellerMaterial>;
  sellerId = 0;
  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.sellerMaterials = res.materials_list;
      this.sellerId = res.id;
    });
  }

  saveMaterial(sellerMaterial): void {
    const passToServer = {
      status: sellerMaterial.status,
      prices: sellerMaterial.prices
    };
    this.repository.updateSellerMaterial(passToServer, sellerMaterial.id).subscribe(res => {
      this.alert.success('ویرایش با موفقیت انجام شد!');
    });
  }
}

import { RepositoryService } from 'src/app/services/repository.service';
import { GeneralService } from './../../../../../../services/general.service';
import { SellerService } from './../../../../../../interfaces/service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-services',
  templateUrl: './seller-services.component.html',
  styleUrls: ['./seller-services.component.css']
})
export class SellerServicesComponent implements OnInit {
  sellerServices: Array<SellerService>;
  sellerId = 0;
  constructor(private general: GeneralService, private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.general.currentSeller.subscribe(res => {
      this.sellerServices = res.services_list;
      this.sellerId = res.id;
    });
  }

  saveService(sellerService): void {
    const passToServer = {
      status: sellerService.status,
      prices: sellerService.prices
    };
    this.repository.updateSellerService(passToServer, sellerService.id).subscribe(res => {
      this.alert.success('ویرایش با موفقیت انجام شد!');
    });
  }
}

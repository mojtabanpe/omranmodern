import { RepositoryService } from 'src/app/services/repository.service';
import { GeneralService } from './../../../../../../services/general.service';
import { SellerService } from './../../../../../../interfaces/service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-services',
  templateUrl: './seller-services.component.html',
  styleUrls: ['./seller-services.component.css']
})
export class SellerServicesComponent implements OnInit {
  services: Array<SellerService>;
  sellerId = 0;
  constructor(private general: GeneralService, private repository: RepositoryService) { }

  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.services = res.services;
      this.sellerId = res.id;
    });
  }

  saveService(service): void {
    const passToServer = {
      id: service.service.id,
      status: service.service.status,
      prices: service.prices
    };
    this.repository.updateSellerServicePriceAndStatus(passToServer, this.sellerId).subscribe();
  }
}

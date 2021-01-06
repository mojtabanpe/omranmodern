import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Seller } from './../../../../../interfaces/seller';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {
  seller: Seller;
  constructor(private general: GeneralService, private router: Router) { }

  ngOnInit(): void {
      this.general.currentSeller.subscribe(res => {
      this.seller = res;
    });
  }

}

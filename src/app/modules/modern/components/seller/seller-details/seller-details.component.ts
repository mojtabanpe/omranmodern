import { RepositoryService } from 'src/app/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { Seller } from './../../../../../interfaces/seller';
import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {
  seller: Seller;
  constructor(private general: GeneralService, private router: Router, private activatedRoute: ActivatedRoute,
              private repository: RepositoryService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getSeller(id).subscribe(res => {
      this.seller = res;
      this.general.changeSeller(this.seller);
    });
  }

}

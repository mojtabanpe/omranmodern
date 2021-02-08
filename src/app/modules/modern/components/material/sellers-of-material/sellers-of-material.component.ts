import { RepositoryService } from 'src/app/services/repository.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellers-of-material',
  templateUrl: './sellers-of-material.component.html',
  styleUrls: ['./sellers-of-material.component.css']
})
export class SellersOfMaterialComponent implements OnInit {
  sellersOfMaterial;
  constructor(private activatedRoute: ActivatedRoute, private repository: RepositoryService) { }

  ngOnInit(): void {
    const materilId = this.activatedRoute.snapshot.paramMap.get('id');
    this.repository.getSellersOfMaterial(materilId).subscribe(res => {
      this.sellersOfMaterial = res;
    });
  }

}

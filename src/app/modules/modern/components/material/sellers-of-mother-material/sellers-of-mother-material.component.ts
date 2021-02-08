import { RepositoryService } from 'src/app/services/repository.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellers-of-mother-material',
  templateUrl: './sellers-of-mother-material.component.html',
  styleUrls: ['./sellers-of-mother-material.component.css']
})
export class SellersOfMotherMaterialComponent implements OnInit {
  motherMaterial;
  initialized = false;
  constructor(private activateRoute: ActivatedRoute, private repository: RepositoryService) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.repository.getMotherMaterial(id).subscribe(res => {
      this.motherMaterial = res;
      this.initialized = true;
    });
  }

}

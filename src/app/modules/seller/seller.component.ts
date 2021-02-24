import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  navIsOpen = true;
  constructor(private router: Router) { }


  ngOnInit(): void {

  }

  logout(): void {
    window.location.href = environment.appUrl;
    localStorage.removeItem('token');
  }

  toggleNav(): void {
    this.navIsOpen = !this.navIsOpen;
  }


}

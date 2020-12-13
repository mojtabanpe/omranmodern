import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  toggleNav(): void {
    this.navIsOpen = !this.navIsOpen;
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modern',
  templateUrl: './modern.component.html',
  styleUrls: ['./modern.component.css']
})
export class ModernComponent implements OnInit {
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

import { ToastrService } from 'ngx-toastr';
import { RepositoryService } from 'src/app/services/repository.service';
import { environment } from './../../../environments/environment';
import { AuthService } from './../../services/auth.service';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modern',
  templateUrl: './modern.component.html',
  styleUrls: ['./modern.component.css']
})
export class ModernComponent implements OnInit {
  navIsOpen = true;
  username = '';
  constructor(private router: Router, private general: GeneralService, private auth: AuthService,
              private repository: RepositoryService, private alert: ToastrService) { }


  ngOnInit(): void {
    this.username = this.auth.username;
  }

  logout(): void {
    this.auth.logout();
  }

  toggleNav(): void {
    this.navIsOpen = !this.navIsOpen;
  }

  showCategories(level: number): void {
    this.general.changeDeep(level);
    this.router.navigate(['/modern/categories']);

    const currentRoute = this.router.url;
    if (currentRoute === '/modern/categories') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    });
    }
  }

  arrangeMenu(): void {
    this.repository.arrangeMenu().subscribe(res => {
      this.alert.success('ساختتار منو با موفقیت بازسازی شد!');
    }, () => {
      this.alert.error('مشکلی در بازسازی منو ایجاد شد!');
    });
  }


}

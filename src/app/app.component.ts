import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OmranModern-Admin';
  jwtHelper = new JwtHelperService();
  isLogin = false;
  constructor(public cookieService: CookieService, private auth: AuthService) {
    if (this.cookieService.get('token')) {
      this.auth.updateData(this.cookieService.get('token'));
      this.cookieService.delete('token');
      this.isLogin = this.auth.isLoggedIn();
    } else if (localStorage.getItem('token')){
      this.auth.updateData(localStorage.getItem('token'));
      this.isLogin = this.auth.isLoggedIn();
    }
    else {
      // window.location.href = environment.appUrl + 'auth';
    }

}
}

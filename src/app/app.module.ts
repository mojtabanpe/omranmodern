import { TestComponent } from './components/general/test/test.component';
import { UserModule } from './modules/user/user.module';
import { SellerModule } from './modules/seller/seller.module';
import { ModernModule } from './modules/modern/modern.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.intercept';
import { AuthService } from './services/auth.service';
import { GeneralService } from './services/general.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ModernModule,
    SellerModule,
    UserModule,
  ],
  providers: [GeneralService, AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }

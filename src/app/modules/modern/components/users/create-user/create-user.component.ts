import { RepositoryService } from 'src/app/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  defaultUser = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: ''
  };
  user;
  roles = [
    {value: 'seller', viewValue: 'فروشنده'},
    {value: 'buyer', viewValue: 'خریدار'},
    {value: 'admin', viewValue: 'ادمین'}
  ];
  selectedRole: string = this.roles[0].value;
  errors = [];
  constructor(private repository: RepositoryService, private alert: ToastrService) { }

  ngOnInit(): void {
    this.user = this.defaultUser;
  }

  submit(): void {
    if (this.user.username === '') {
      this.errors.push('لطفا نام کاربری را وارد کنید!');
    }
    if (this.user.password === '') {
      this.errors.push('لطفا رمز عبور را وارد کنید!');
    }
    if (this.user.password !== this.user.confirmPassword) {
      this.errors.push('رمز عبور و تکرار آن مطابقت ندارند!');
    }
    if (this.errors.length === 0) {
      const passToServer = {
        user: {
          username: this.user.username,
          password: this.user.password,
          first_name: this.user.firstName,
          last_name: this.user.lastName,
          email: this.user.email,
        },
        mobile: this.user.mobile,
        mobile_verified: false,
        address: [],
        type: this.selectedRole,
        campaigns: [],
        favarite_materials: []
      };
      this.repository.createUser(passToServer).subscribe(res => {
        this.alert.success('کاربر با موفقیت ایجاد شد');
        this.user = this.defaultUser;
      });
    } else {
      for (const err of this.errors) {
        this.alert.error(err);
      }
    }
  }

}

import { RepositoryService } from './../../../../../../services/repository.service';
import { GeneralService } from 'src/app/services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  profile;
  editName = false;
  editEmail = false;
  editMobile = false;
  constructor(private general: GeneralService, private repository: RepositoryService) { }
 
  ngOnInit(): void {
    this.general.currentSeller.subscribe(res => {
      this.profile = res.user_profile;
    });
  }

  saveName(): void {
    this.editName = !this.editName;
    const passToServer = {
      user: {
        first_name: this.profile.user.first_name,
        last_name: this.profile.user.last_name
      }
    };
    this.repository.editUserProfile(passToServer, this.profile.id).subscribe();
  }

  saveEmail(): void {
    this.editEmail = !this.editEmail;
    const passToServer = {
      user: {
        email: this.profile.user.email
      }
    };
    this.repository.editUserProfile(passToServer, this.profile.id).subscribe();
  }

  saveMobile(): void {
    this.editMobile = !this.editMobile;
    const passToServer = {
      mobile: this.profile.mobile
    };
    this.repository.editUserProfile(passToServer, this.profile.id).subscribe();
  }

}

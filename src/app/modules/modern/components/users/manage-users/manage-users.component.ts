import { RepositoryService } from 'src/app/services/repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  userProfiles;
  constructor(private repositroy: RepositoryService) { }

  ngOnInit(): void {
    this.repositroy.getUsers().subscribe(res => {
      this.userProfiles = res;
    });
  }

}

import { PermutationCreateChildsComponent } from './../material/permutation-create-childs/permutation-create-childs.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  showDialog(): void {
    const dialogRef = this.dialog.open(PermutationCreateChildsComponent, {
      width: '35rem',
      // data: {
      //   mother: res
      // }
    });
  }

}

import { GeneralService } from 'src/app/services/general.service';
import { RepositoryService } from './../../../../services/repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  showSections = {
    showInbox: true,
    showComments: false,
    showSent: false,
    showTrashed: false,
    showImportant: false,
    showInstagram: false,
    showSpam: false
  };
  comments = [];

  constructor(private repository: RepositoryService, private general: GeneralService) { }

  ngOnInit(): void {
    this.repository.getComments().subscribe(res => {
      this.comments = res;
    });
  }
  showSection(section: string): void {
    // tslint:disable-next-line: forin
    for (const item in this.showSections) {
      this.showSections[item] = false;
    }
    this.showSections[section] = true;
  }

  approveComment(comment): void {
    this.repository.approveComment(comment).subscribe(res => {
      this.deleteComment(comment);
    });
  }
  deleteComment(comment): void {
    console.log(comment);
    this.repository.deleteComment(comment.id).subscribe(res => {
      const index = this.comments.indexOf(comment);
      this.comments.splice(index, 1);
    });
  }

}

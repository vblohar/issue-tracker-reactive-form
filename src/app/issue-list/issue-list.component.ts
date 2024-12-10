import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent implements OnInit, OnChanges {
  issues: Issue[] = [];
  showReportIssue = false;
  selectedIssue: Issue |null = null;

  constructor(private issueService: IssuesService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('new issue - ',this.selectedIssue);
  }

  ngOnInit(): void {
    console.log('new issue - ',this.selectedIssue);
    this.getIssues();

  }

  private getIssues() {
    this.issues = this.issueService.getPendingIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssues();
  }

  onConfirm(confirmed: boolean){
    if(confirmed && this.selectedIssue){
      this.issueService.completeIssue(this.selectedIssue);
      this.getIssues();
    }
    this.selectedIssue = null;
  }


}

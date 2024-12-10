import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { issues } from '../assets/mock-issues';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = [];

  constructor() {
    this.issues = issues;

  }

  getPendingIssues() {
    return this.issues.filter(issue => !issue.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);

  }

  completeIssue(issue: Issue){
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = this.issues.findIndex(i=> i === issue);
    this.issues[index] = selectedIssue;
  }

  getSuggestions(title: string): Issue[]{
    if(title.length > 3){
      let result = this.issues.filter(issue => issue.title.indexOf(title) !==-1 );
      console.log(result);

    }
    
    return[];
  }
}

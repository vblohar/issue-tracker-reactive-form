import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.css'
})


export class IssueReportComponent {

  @Output() formClose = new EventEmitter();

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    priority: new FormControl('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl('', { nonNullable: true, validators: Validators.required }),
  })

  constructor(private issueService: IssuesService) { }

  addIssue() {
    if(this.issueForm && this.issueForm.invalid){
      this.issueForm.markAllAsTouched();
      return
    }else{
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);

    this.formClose.emit();}
  }

}

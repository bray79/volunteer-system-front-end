import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageOpportunitiesService } from '../manage-opportunities.service';
import { ManageOpportunities } from '../manage-opportunities';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  formdata: ManageOpportunities = {
    id: this.generateUniqueId(), // we can handle this on back-end if we want to
    opportunityName: '',
    info1: '',
    info2: ''
  };

  constructor(
    private manageOpportunitiesService: ManageOpportunitiesService,
    private router: Router
  ) {}

  generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  createOpportunity() {
    this.manageOpportunitiesService.createOpportunity(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["/manageOpportunities/home"]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

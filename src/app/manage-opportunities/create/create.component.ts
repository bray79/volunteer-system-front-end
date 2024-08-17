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
    id: this.generateUniqueId(),
    opportunityName: '',
    centerName: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    status: ''  
  };

  constructor(
    private manageOpportunitiesService: ManageOpportunitiesService,
    private router: Router
  ) {}

  generateUniqueId(): string {
    return String(Date.now()); // Use current timestamp as unique ID
  }

  createOpportunity() {

    // Fields to validate
    const requiredFields: (keyof ManageOpportunities)[] = ['opportunityName', 'centerName', 'description', 'date', 
                                                          'startTime', 'endTime', 'location', 'status'];

    // Check if any of the required fields are empty
    const hasEmptyField = requiredFields.some(field => !this.formdata[field]);

    //Alert User if empty
    if (hasEmptyField) {
      alert('Please fill in all required fields.');
      return;
    }

    this.manageOpportunitiesService.createOpportunity(this.formdata).subscribe({
      next: () => {
        this.router.navigate(["/manageOpportunities/home"]);
      },
      error: (err) => {
        console.error('Error creating opportunity:', err);
        alert('An error occurred while creating the opportunity. Please try again.');
      }
    });
  }
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManageOpportunitiesService } from '../manage-opportunities.service';
import { ManageOpportunities } from '../manage-opportunities';

// Helper function to get the local date in YYYY-MM-DD format
function getLocalDate(): string {
  const localDate = new Date();
  const offset = localDate.getTimezoneOffset(); // Get the local timezone offset in minutes
  localDate.setMinutes(localDate.getMinutes() - offset); // Adjust the date by the offset
  return localDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
}

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
    date: getLocalDate()
  };

  constructor(
    private manageOpportunitiesService: ManageOpportunitiesService,
    private router: Router
  ) {}

  generateUniqueId(): number {
    return Date.now(); // Use current timestamp as unique ID
  }

  createOpportunity() {
    // Basic validation to ensure all required fields are filled
    if (!this.formdata.opportunityName || !this.formdata.centerName) {
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


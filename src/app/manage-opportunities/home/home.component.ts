import { Component, OnInit } from '@angular/core';
import { ManageOpportunities } from '../manage-opportunities';
import { ManageOpportunitiesService } from '../manage-opportunities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allOpportunities: ManageOpportunities[] = [];

  constructor(private manageOpportunitiesService: ManageOpportunitiesService) {}

  ngOnInit(): void {
    this.manageOpportunitiesService.getAll().subscribe((data) => {
      this.allOpportunities = data;
    });
  }

  deleteOpportunity(id: number) {
    // Confirm the delete action
    const confirmed = window.confirm('Are you sure you want to delete this opportunity?');

    if (confirmed) {
      this.manageOpportunitiesService.delete(id).subscribe({
        next: () => {
          // Update the UI to remove the deleted opportunity
          this.allOpportunities = this.allOpportunities.filter(opportunity => opportunity.id !== id);
        },
        error: (err) => {
          console.error('Error deleting opportunity', err);
        }
      });
    }
  }
}



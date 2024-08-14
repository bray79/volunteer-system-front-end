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
  filteredOpportunities: ManageOpportunities[] = [];
  dropdownVisible = false; 

  constructor(private manageOpportunitiesService: ManageOpportunitiesService) {}

  ngOnInit(): void {
    this.manageOpportunitiesService.getAll().subscribe((data) => {
      this.allOpportunities = data;
      this.filteredOpportunities = data; 
    });
  }

  deleteOpportunity(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this opportunity?');

    if (confirmed) {
      this.manageOpportunitiesService.delete(id).subscribe({
        next: () => {
          this.allOpportunities = this.allOpportunities.filter(opportunity => opportunity.id !== id);
          this.filteredOpportunities = this.filteredOpportunities.filter(opportunity => opportunity.id !== id);
        },
        error: (err) => {
          console.error('Error deleting opportunity', err);
        }
      });
    }
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredOpportunities = this.allOpportunities.filter(opportunity =>
      opportunity.opportunityName.toLowerCase().includes(query) || 
      opportunity.centerName.toLowerCase().includes(query)
    );
  }

  filterByRecent(): void {
    const today = new Date();
    this.filteredOpportunities = this.allOpportunities.filter(opportunity => {
      const opportunityDate = new Date(opportunity.date); 
      const timeDiff = today.getTime() - opportunityDate.getTime(); // Calc difference in milliseconds between current time and opportunity's date
      const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert the time difference from milliseconds to days
      return daysDiff <= 60; // Filter opportunities within the last 60 days
    });
    this.dropdownVisible = false; // Hide dropdown after filtering
  }

  filterByCenter(): void {
    const availableCenters = [...new Set(this.allOpportunities.map(opportunity => opportunity.centerName))];
    const selectedCenter = prompt(`Enter Center Name:\nAvailable: ${availableCenters.join(', ')}`);
    if (selectedCenter) {
      this.filteredOpportunities = this.allOpportunities.filter(opportunity =>
        opportunity.centerName.toLowerCase() === selectedCenter.toLowerCase()
      );
      this.dropdownVisible = false;
    }
  }

  showAll(): void {
    this.filteredOpportunities = this.allOpportunities; // Reset to show all opportunities
    this.dropdownVisible = false;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
  }
}

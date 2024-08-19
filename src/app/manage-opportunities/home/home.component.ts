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
  availableCenters: string[] = [];
  selectedOpportunityId: string | null = null;
  dropdownVisible = false; 
  centerDropdownVisible: boolean = false; 

  constructor(private manageOpportunitiesService: ManageOpportunitiesService) {}

  ngOnInit(): void {
    this.manageOpportunitiesService.getAll().subscribe((data) => {
      this.allOpportunities = data;
      this.filteredOpportunities = data;
      this.availableCenters = [...new Set(this.allOpportunities.map(opportunity => opportunity.centerName))];
    });
  }

  deleteOpportunity(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this opportunity?');
  
    if (confirmed) {
      // Use the id as a number for the service method
      this.manageOpportunitiesService.delete(id).subscribe({
        next: () => {
          // Use id as a number for comparisons
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
      opportunity.centerName.toLowerCase().includes(query) ||
      opportunity.description.toLowerCase().includes(query) ||
      opportunity.location.toLowerCase().includes(query) ||
      opportunity.status.toLowerCase().includes(query)
    );
  }

  filterByRecent(): void {
    const today = new Date();
    const sixtyDaysFromNow = new Date(today.getTime() + (60 * 24 * 60 * 60 * 1000)); // Calculate the date 60 days from today

    this.filteredOpportunities = this.allOpportunities.filter(opportunity => {
        const opportunityDate = new Date(opportunity.date);

        // Filter opportunities that are within the next 60 days
        return opportunityDate >= today && opportunityDate <= sixtyDaysFromNow;
    });

    this.dropdownVisible = false; // Hide dropdown after filtering
  }

  filterBySelectedCenter(center: string): void {
    this.filteredOpportunities = this.allOpportunities.filter(opportunity =>
        opportunity.centerName.toLowerCase() === center.toLowerCase()
    );
    this.centerDropdownVisible = false; // Hide centers dropdown after selecting a center
    this.dropdownVisible = false; // Hide dropdown after filtering
  }

  showAll(): void {
    this.filteredOpportunities = this.allOpportunities; // Reset to show all opportunities
    this.dropdownVisible = false;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
    this.centerDropdownVisible = false; // Reset centers dropdown when main dropdown is toggled
  }

  toggleCenterDropdown(): void {
    this.centerDropdownVisible = !this.centerDropdownVisible;
  }

  viewMatchedVolunteers(opportunityId: string): void {
    this.selectedOpportunityId = this.selectedOpportunityId === opportunityId ? null : opportunityId;
  }

}

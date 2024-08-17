import { Component, OnInit } from '@angular/core';
import { VolSvcService } from '../services/vol-svc.service';
import { VolunteerInfo } from '../models/volunteer-info';

@Component({
  selector: 'app-manage-volunteer',
  templateUrl: './manage-volunteer.component.html',
  styleUrl: './manage-volunteer.component.css'
})
export class ManageVolunteerComponent implements OnInit {
    allVolunteers: VolunteerInfo [] = []
    filteredVolunteers: VolunteerInfo[] = []
    dropdownVisible = false; 
  constructor (private volSvc : VolSvcService) {}

  ngOnInit(): void {
    this.volSvc.getVolunteers().subscribe((data)=>{
      this.allVolunteers = data;
      this.filteredVolunteers = data; 
    });
  }
  showAll() {
    this.filteredVolunteers = this.allVolunteers; // Reset to show all opportunities
    this.dropdownVisible = false;
  }
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
  }

  deleteVolunteer(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this opportunity?');

    if (confirmed) {
      this.volSvc.deleteVolunteers(id).subscribe({
        next: () => {
          this.allVolunteers = this.allVolunteers.filter(volunteer => volunteer.id !== id);
          this.filteredVolunteers = this.filteredVolunteers.filter(volunteer => volunteer.id !== id);
        },
        error: (err) => {
          console.error('Error deleting volunteer', err);
        }
      });
    }
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredVolunteers = this.allVolunteers.filter(volunteer =>
      volunteer.first_name.toLowerCase().includes(query) || 
      volunteer.last_name.toLowerCase().includes(query) ||
      volunteer.preferred_centers.toString().toLowerCase().includes(query) ||
      volunteer.approval_status.toString().toLowerCase().includes(query)
    );
  }

}

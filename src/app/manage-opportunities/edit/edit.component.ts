import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageOpportunities } from '../manage-opportunities';
import { ManageOpportunitiesService } from '../manage-opportunities.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  formdata: ManageOpportunities = {
    id: '',
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getById(id);
      } else {
        console.error('Invalid ID');
      }
    });
}

  getById(id: string) {
    this.manageOpportunitiesService.getOpportunityById(id).subscribe(data => {
      if (data.length > 0) {
        this.formdata = data[0];
      } else {
        console.error('Opportunity not found');
      }
    });
  }

  updateOpportunity() {

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

    const updatedOpportunity: ManageOpportunities = {
      ...this.formdata, 
    };

    this.manageOpportunitiesService.updateOpportunity(updatedOpportunity).subscribe({
      next: () => {
        this.router.navigate(["/manageOpportunities/home"]);
      },
      error: err => {
        console.error('Error updating opportunity:', err);
        alert('An error occurred while updating the opportunity. Please try again.');
      }
    });

  }
}
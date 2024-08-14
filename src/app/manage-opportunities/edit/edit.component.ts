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
    id: 0,
    opportunityName: '',
    centerName: '',
    date: ''  
  };

  originalDate: string = ''; 

  constructor(
    private manageOpportunitiesService: ManageOpportunitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getById(parseInt(id, 10));
      } else {
        console.error('Invalid ID');
      }
    });
  }

  getById(id: number) {
    this.manageOpportunitiesService.getOpportunityById(id).subscribe(data => {
      if (data.length > 0) {
        this.formdata = data[0];
        this.originalDate = this.formdata.date; 
      } else {
        console.error('Opportunity not found');
      }
    });
  }

  updateOpportunity() {

    if (!this.formdata.opportunityName || !this.formdata.centerName) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedOpportunity: ManageOpportunities = {
      ...this.formdata,
      date: this.originalDate 
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
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
    info1: '',
    info2: ''
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
    this.manageOpportunitiesService.edit(Number(id)).subscribe(data => {
      if (data.length > 0) {
        this.formdata = data[0];
      } else {
        console.error('Opportunity not found');
      }
    });
  }

  updateOpportunity() {
    this.manageOpportunitiesService.updateOpportunity(this.formdata).subscribe({
      next: () => {
        this.router.navigate(["/manageOpportunities/home"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}




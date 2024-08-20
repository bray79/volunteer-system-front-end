import { Component, OnInit, Input } from '@angular/core';
import { MatchedVolunteersService } from '../../manage-opportunities/matched-volunteers/matched-volunteers.service';
import { ManageOpportunities } from '../../manage-opportunities/manage-opportunities';
@Component({
  selector: 'app-opportunities-list',
  templateUrl: './opportunities-list.component.html',
  styleUrls: ['./opportunities-list.component.css']
})
export class OpportunityListComponent implements OnInit {

  @Input() volunteerId!: string;
  @Input() volunteerName!: string;
  opportunities: ManageOpportunities[] = [];

  constructor(private matchedVolunteersService: MatchedVolunteersService) { }

  ngOnInit(): void {
    console.log(this.volunteerId);
    if (this.volunteerId) {
      this.fetchVolunteers();
    }
  }

  fetchVolunteers(): void {
    this.matchedVolunteersService.getMatchedOpportunities(this.volunteerId)?.subscribe(opportunities => {
      this.opportunities = opportunities;
    });
  }
}




import { Component, OnInit, Input } from '@angular/core';
import { MatchedVolunteersService } from '../matched-volunteers.service';
import { VolunteerInfo } from '../../../models/volunteer-info';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnInit {

  @Input() opportunityId!: string;
  @Input() opportunityName!: string;
  volunteers: VolunteerInfo[] = [];

  constructor(private matchedVolunteersService: MatchedVolunteersService) { }

  ngOnInit(): void {
    console.log(this.opportunityId);
    if (this.opportunityId) {
      this.fetchVolunteers();
    }
  }

  fetchVolunteers(): void {
    this.matchedVolunteersService.getMatchedVolunteers(this.opportunityId)?.subscribe(volunteers => {
      this.volunteers = volunteers;
    });
  }
}




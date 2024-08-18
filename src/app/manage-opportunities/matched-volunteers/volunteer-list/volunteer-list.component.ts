import { Component, OnInit, Input } from '@angular/core';
import { MatchedVolunteersService } from '../matched-volunteers.service';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.css']
})
export class VolunteerListComponent implements OnInit {

  @Input() opportunityId!: string;
  @Input() opportunityName!: string;
  volunteers: any[] = [];

  constructor(private matchedVolunteersService: MatchedVolunteersService) { }

  ngOnInit(): void {
    if (this.opportunityId) {
      this.fetchVolunteers();
    }
  }

  fetchVolunteers(): void {
    this.matchedVolunteersService.getMatchedVolunteers(this.opportunityId)
      .subscribe(data => {
        this.volunteers = data;
      });
  }
}




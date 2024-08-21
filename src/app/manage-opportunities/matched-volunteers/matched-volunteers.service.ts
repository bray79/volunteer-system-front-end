import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ManageOpportunities } from '../manage-opportunities';
import { VolunteerInfo } from '../../models/volunteer-info';
import { ManageOpportunitiesService } from '../manage-opportunities.service';
import { VolSvcService } from '../../services/vol-svc.service';

// A class that matches volunteers to opportunities or vic versa
@Injectable({
  providedIn: 'root'
})
export class MatchedVolunteersService {

  private opportunitiesService: ManageOpportunitiesService
  private volunteersService: VolSvcService
  constructor(
    http: HttpClient, 
    opportunitiesService: ManageOpportunitiesService | null,
    volunteersService: VolSvcService | null
  ) {
    this.opportunitiesService = opportunitiesService ?? new ManageOpportunitiesService(http);
    this.volunteersService = volunteersService ?? new VolSvcService(http);
   }

  // Helper function to match the volunteer
  getMatchingVolunteersFromOpportunity(volunteers: VolunteerInfo[], opportunity: ManageOpportunities): VolunteerInfo[] {

    return volunteers.filter((volunteer) => {
      console.log("volunteer's centers: " + volunteer.preferred_centers.toString());
      console.log("opportunity's centers: " + opportunity.centerName.toString());
      // To string is needed to normalize the values
      const hasMatched = volunteer.preferred_centers.toString().includes(opportunity.centerName.toString())
      return hasMatched
    })
  }
  // Gets volunteers that are matched with an opportunity
  getMatchedVolunteers(opportunityID: string): Observable<VolunteerInfo[]> {
    return this.opportunitiesService.getOpportunityById(opportunityID).pipe(
      switchMap(opportunity => {
        if (opportunity.length > 0) {
          return this.volunteersService.getVolunteers().pipe(
            map(volunteers => this.getMatchingVolunteersFromOpportunity(volunteers, opportunity[0]))
          );
        } else {
          // Return an empty array if no opportunity is found
          return of([]); 
        }
      })
    );
  }

   // Helper function to match the volunteer
   getMatchingOpportunitiesFromVolunteer(opportunities: ManageOpportunities[], volunteer: VolunteerInfo): ManageOpportunities[] {

    return opportunities.filter((opportunity) => {
      // To string is needed to normalize the values
      const hasMatched = volunteer.preferred_centers.toString().includes(opportunity.centerName.toString())
      return hasMatched
    })
  }

  // Gets opportunities that are matched with a volunteer
  getMatchedOpportunities(volunteerID: string): Observable<ManageOpportunities[]> {
    return this.volunteersService.getVolunteersById(volunteerID).pipe(
      switchMap(volunteer => {
        if (volunteer.length > 0) {
          return this.opportunitiesService.getAll().pipe(
            map(opportunities => this.getMatchingOpportunitiesFromVolunteer(opportunities, volunteer[0]))
          );
        } else {
          // Return an empty array if no volunteer is found
          return of([]); 
        }
      })
    );
  }
}


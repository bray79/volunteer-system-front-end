import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ManageOpportunities } from '../manage-opportunities';
import { VolunteerInfo } from '../../models/volunteer-info';
import { ManageOpportunitiesService } from '../manage-opportunities.service';
import { VolSvcService } from '../../services/vol-svc.service';
@Injectable({
  providedIn: 'root'
})
export class MatchedVolunteersService {

  private opportunitiesService: ManageOpportunitiesService
  private volunteersService: VolSvcService
  private http: HttpClient;
  constructor(
    http: HttpClient, 
    opportunitiesService: ManageOpportunitiesService | null,
    volunteersService: VolSvcService | null
  ) {
    this.opportunitiesService = opportunitiesService ?? new ManageOpportunitiesService(http);
    this.volunteersService = volunteersService ?? new VolSvcService(http);
    this.http = http;
   }

  getMatchingVolunteersFromOpportunity(volunteers: VolunteerInfo[], opportunity: ManageOpportunities): VolunteerInfo[] {

    return volunteers.filter((volunteer) => {
      console.log("volunteer's centers: " + volunteer.preferred_centers.toString());
      console.log("opportunity's centers: " + opportunity.centerName.toString());
      
      const hasMatched = volunteer.preferred_centers.toString().includes(opportunity.centerName.toString())
      return hasMatched
    })
  }
  
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
}


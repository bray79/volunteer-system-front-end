import { Component } from '@angular/core';
import { LoginModel } from '../login/login.component';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ManageOpportunities } from '../manage-opportunities/manage-opportunities';
import { ManageVolunteers } from '../manage-volunteer/manage-volunteers';
import { count, Observable } from 'rxjs';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {
  
  private apiUrlV = 'http://localhost:3000/volunteers';
  private apiUrlO = 'http://localhost:3000/opportunities';

  loggedUser: any;
  volunteers: Observable<ManageVolunteers[]>;
  volunteersLength: number = 0;
  assignedVolunteers: number = 0;
  topVolunteers: ManageVolunteers[] = [];
  opportunities: Observable<ManageOpportunities[]>;
  opportunitiesLength: number = 0;
  topOpportunities: ManageOpportunities[] = [];
  
  constructor(private router: Router, private httpClient: HttpClient) {
    const localUser = localStorage.getItem('loggedUser');

    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }

    this.volunteers = this.getAllV()
    this.opportunities = this.getAllO()
  }

  ngOnInit(): void {
    // Below line was for testing, showed that it grabbed all json objects
    // this.volunteers.forEach(V => { V.length; console.log("Volunteers:"); console.log(V) })
    this.volunteers.subscribe((line) => {
      line.forEach(volunteer => {
        this.volunteersLength++
        this.topVolunteers.push(volunteer)
        if (volunteer.opportunities_ids.length > 0) {
          this.assignedVolunteers++
        }
      })
      // console.log(x[3]["id"])
    })

    // Below line was for testing, showed that it grabbed all json objects
    // this.opportunities.forEach(O => { console.log("Opportunities:"); console.log(O) })
    this.opportunities.subscribe((line) => {
      line.forEach(opportunity => {
        this.opportunitiesLength++
        this.topOpportunities.push(opportunity)
      })
    })
  }

  getAllV(): Observable<ManageVolunteers[]> {
    return this.httpClient.get<ManageVolunteers[]>(this.apiUrlV);
  }

  getAllO(): Observable<ManageOpportunities[]> {
    return this.httpClient.get<ManageOpportunities[]>(this.apiUrlO);
  }

  onLogout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login')
  }

  goToV(){
    this.router.navigateByUrl('/manageVolunteer')
  }

  goToO(){
    this.router.navigateByUrl('/manageOpportunities')
  }

}

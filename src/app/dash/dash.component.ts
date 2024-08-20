import { Component } from '@angular/core';
import { LoginModel } from '../login/login.component';
import { Router } from '@angular/router';
import { ManageOpportunitiesService } from '../manage-opportunities/manage-opportunities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ManageOpportunities } from '../manage-opportunities/manage-opportunities';
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
  volunteers: Observable<ManageOpportunities[]>;
  volunteersLength: number = 0;
  opportunities: Observable<ManageOpportunities[]>;
  opportunitiesLength: number = 0;
  
  constructor(private router: Router, private httpClient: HttpClient) {
    const localUser = localStorage.getItem('loggedUser');

    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }

    this.volunteers = this.getAllV()
    this.opportunities = this.getAllO()
  }

  ngOnInit(): void {
    this.volunteers.forEach(V => {
      console.log(V)
    })
    this.volunteers.subscribe((x) => {
      x.forEach(y => this.volunteersLength++)
    })

    this.opportunities.forEach(O => {
      console.log(O)
    })
    this.volunteers.subscribe((x) => {
      x.forEach(y => this.opportunitiesLength++)
    })
  }

  getAllV(): Observable<ManageOpportunities[]> {
    return this.httpClient.get<ManageOpportunities[]>(this.apiUrlV);
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

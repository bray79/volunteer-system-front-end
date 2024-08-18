import { Component } from '@angular/core';
import { LoginModel } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {

  loggedUser: any;

  // Make this section after volunteers get section is added?
  // let volunteers:

  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');

    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser);
    }
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

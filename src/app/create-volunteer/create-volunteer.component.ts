import { Component } from '@angular/core';
import { VolSvcService } from '../services/vol-svc.service';
import { Router } from '@angular/router';
import { UserAvailability } from '../models/user-availability';
import { UserAddress } from '../models/user-address';
import { UserPhoneNumber } from '../models/user-phone-number';
import { EmergencyContact } from '../models/emergency-contact';

@Component({
  selector: 'app-create-volunteer',
  templateUrl: './create-volunteer.component.html',
  styleUrl: './create-volunteer.component.css'
})
export class CreateVolunteerComponent {

  formdata = {

    id: 0, //FIGURE OUT HOW TO INCREMENT ID
    first_name : "",
    last_name: "",
    user_name : "",
    password: "",
    preferred_centers : [],
    skills_interests : [],
    availabilty_times: [{day:"",start_time:"",end_time:""}],
    address : [{street:"",city:"",state:"",zip_code:0}],
    phone_numbers : [{home:undefined,work:undefined,cell:undefined}],
    email: "",
    educational_background: "",
    current_licenses: [],
    emergency_contact: [{name:"",phone_number:[{home:0, work:0, cell:0}],email:"",address:[{street:"",city:"",state:"",zip_code:0}]}],
    drivers_license_on_file: false,
    social_security_on_file: false,
    approval_status: "",

  }

  constructor (private volSvc: VolSvcService, private router: Router) {}

  createVolunteer () {

    this.volSvc.addVolunteers(this.formdata).subscribe({
      next: () => {
        this.router.navigate(["/manageVolunteer"]);
      },
      error: (err) => {
        console.error('Error creating volunteer:', err);
        alert('An error occurred while creating this volunteer. Please try again.');
      }
    });
    
  }
}

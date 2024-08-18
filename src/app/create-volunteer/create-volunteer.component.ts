import { Component } from '@angular/core';
import { VolSvcService } from '../services/vol-svc.service';
import { Router } from '@angular/router';
import { UserAvailability } from '../models/user-availability';
import { UserAddress } from '../models/user-address';
import { UserPhoneNumber } from '../models/user-phone-number';
import { EmergencyContact } from '../models/emergency-contact';
import { VolunteerInfo } from '../models/volunteer-info';

@Component({
  selector: 'app-create-volunteer',
  templateUrl: './create-volunteer.component.html',
  styleUrl: './create-volunteer.component.css'
})
export class CreateVolunteerComponent {
  allVolunteers: VolunteerInfo[] = []
  formdata = {

    id: "",
    first_name : "",
    last_name: "",
    user_name : "",
    password: "",
    preferred_centers : [],
    skills_interests : [],
    availability_times: [{day:"",start_time:"",end_time:""}],
    address : [{street:"",city:"",state:"",zip_code:0}],
    phone_numbers : [{home:undefined,work:undefined,cell:undefined}],
    email: "",
    educational_background: "",
    current_licenses: [],
    emergency_contact: [{name:"",phone_number:[{home:undefined, work:undefined, cell:undefined}],email:"",address:[{street:"",city:"",state:"",zip_code:0}]}],
    drivers_license_on_file: false,
    social_security_on_file: false,
    approval_status: "",

  }

  constructor (private volSvc: VolSvcService, private router: Router) {}

  ngOnInit(): void {
    this.initializeId();
  }

  async initializeId(): Promise<void> {
    try {
      const volunteers = await this.volSvc.getVolunteers().toPromise();
      let highestID = 0;
      
      volunteers?.forEach((volunteer) => {
        const currentID = Number(volunteer.id);
        if (currentID > highestID) {
          highestID = currentID;
        }
      });
      
      this.formdata.id = (highestID + 1).toString();
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      alert('An error occurred while initializing ID. Please try again.');
    }
  }

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VolSvcService } from '../services/vol-svc.service';
import { VolunteerInfo } from '../models/volunteer-info';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrl: './edit-volunteer.component.css'
})
export class EditVolunteerComponent implements OnInit {

  formdata:VolunteerInfo = {
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
  constructor (private route:ActivatedRoute, private router: Router,private volSvc: VolSvcService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getById(id);
      } else {
        console.error('Invalid ID');
      }
    });
}

  getById(id: string) {
    this.volSvc.getVolunteersById(id).subscribe(data => {
      if (data.length > 0) {
        this.formdata = data[0];
      } else {
        console.error('Volunteer not found');
      }
    });
  }
  editVolunteer() {

    // Fields to validate
    const requiredFields: (keyof VolunteerInfo)[] = ['first_name', 'last_name', 'user_name', 'password', 'address', 'preferred_centers',
                                                      'availability_times','address','phone_numbers', 'email',
                                                      'current_licenses', 'approval_status'];

    // Check if any of the required fields are empty
    const hasEmptyField = requiredFields.some(field => !this.formdata[field]);

    //Alert User if empty
    if (hasEmptyField) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedVolunteer: VolunteerInfo = {
      ...this.formdata, 
    };

    this.volSvc.updateVolunteer(updatedVolunteer).subscribe({
      next: () => {
        this.router.navigate(["manageVolunteer"]);
      },
      error: err => {
        console.error('Error updating volunteer:', err);
        alert('An error occurred while updating the volunteer. Please try again.');
      }
    });

  }
}

import { Injectable } from '@angular/core';
import { VolunteerInfo } from '../models/volunteer-info';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolSvcService {

  //private apiUrl = 'http://localhost:3000/opportunities';
  constructor(private httpClient: HttpClient) { }
  
  getVolunteers() {
    return this.httpClient.get<VolunteerInfo[]>('http://localhost:3000/volunteers')
  }
  addVolunteers(data : VolunteerInfo) {
    return this.httpClient.post<VolunteerInfo>('http://localhost:3000/volunteers',data) //Might have to remove VolunteerInfo in braces
  }
  deleteVolunteers(id: number) {
   return this.httpClient.delete(`http://localhost:3000/volunteers/${id}`)
  }
}

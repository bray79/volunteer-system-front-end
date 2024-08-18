import { Injectable } from '@angular/core';
import { VolunteerInfo } from '../models/volunteer-info';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.httpClient.post<VolunteerInfo>('http://localhost:3000/volunteers',data)
  }
  deleteVolunteers(id: string): Observable<void> {
   return this.httpClient.delete<void>(`http://localhost:3000/volunteers/${id}`)
  }

  getVolunteersById(id: string): Observable<VolunteerInfo[]> {
    const params = { id: id.toString() }
    return this.httpClient.get<VolunteerInfo[]>('http://localhost:3000/volunteers', { params });
  }
  edit(id: number): Observable<VolunteerInfo[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.httpClient.get<VolunteerInfo[]>('http://localhost:3000/volunteers', { params });
  }

  // Update the opportunity by sending a PUT request directly to /opportunities/{id}
  updateVolunteer(volunteer: VolunteerInfo): Observable<VolunteerInfo> {
    return this.httpClient.put<VolunteerInfo>(`http://localhost:3000/volunteers/${volunteer.id}`, volunteer);
  }

}

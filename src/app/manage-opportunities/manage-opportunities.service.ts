import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageOpportunities } from './manage-opportunities';

@Injectable({
  providedIn: 'root'
})
export class ManageOpportunitiesService {
  private apiUrl = 'http://localhost:3000/opportunities';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ManageOpportunities[]> {
    return this.httpClient.get<ManageOpportunities[]>(this.apiUrl);
  }

  createOpportunity(data: ManageOpportunities): Observable<ManageOpportunities> {
    return this.httpClient.post<ManageOpportunities>(this.apiUrl, data);
  }

  // Fetch opportunities by ID (handle ID as string)
  edit(id: number): Observable<ManageOpportunities[]> {
    const params = new HttpParams().set('id', id.toString());
    return this.httpClient.get<ManageOpportunities[]>(this.apiUrl, { params });
  }

  // Update opportunity by ID (handle ID as string)
  updateOpportunity(opportunity: ManageOpportunities): Observable<ManageOpportunities> {
    return this.httpClient.put<ManageOpportunities>(`${this.apiUrl}/${opportunity.id}`, opportunity);
  }

  // Delete opportunity by ID
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}


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

  // Get the opportunity by ID using the query parameter
  getOpportunityById(id: string): Observable<ManageOpportunities[]> {
    const params = { id: id.toString() };
    return this.httpClient.get<ManageOpportunities[]>(this.apiUrl, { params });
  }

  // Update the opportunity by sending a PUT request directly to /opportunities/{id}
  updateOpportunity(opportunity: ManageOpportunities): Observable<ManageOpportunities> {
    return this.httpClient.put<ManageOpportunities>(`${this.apiUrl}/${opportunity.id}`, opportunity);
  }

  // Delete opportunity by ID
  delete(id: string): Observable<void> {
    
    // Make the DELETE request using the ID as a query parameter
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}


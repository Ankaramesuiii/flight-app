import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { environment } from '../environments/environment';

export interface FlightPage {
  content: Flight[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFlights(params: {
    villeDepart?: string;
    villeArrivee?: string;
    dateDepart?: string;
    dateArrivee?: string;
    page?: number;
    size?: number;
    sort?: string;   // ex: "prix,asc"
  }): Observable<FlightPage> {
    let httpParams = new HttpParams();

    if (params.villeDepart) httpParams = httpParams.set('villeDepart', params.villeDepart);
    if (params.villeArrivee) httpParams = httpParams.set('villeArrivee', params.villeArrivee);
    if (params.dateDepart) httpParams = httpParams.set('dateDepart', params.dateDepart);
    if (params.dateArrivee) httpParams = httpParams.set('dateArrivee', params.dateArrivee);
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
    if (params.sort) httpParams = httpParams.set('sort', params.sort);

    return this.http.get<FlightPage>(`${this.apiUrl}/vols`, { params: httpParams });
  }
}

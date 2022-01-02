import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CardDetails } from '../../models/card-details.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseURL: string = 'api/'
  headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  getCardDetails(): CardDetails {
    return new CardDetails(1, '12345', 10);
  }

  issueCard(): CardDetails {
    return new CardDetails(1, '12345', 10);
  }

  topupCardBalance(): CardDetails {
    return new CardDetails(1, '12345', 10);
  }

  validatecard(cardNumber: string): Observable<any> {
    return this.http.get(this.baseURL + 'card/' + cardNumber, { 'headers': this.headers });
  }

  calculateJourneyAmount(journeyDetails: any): Observable<any> {
    return this.http.post(this.baseURL + 'fare/calculation', journeyDetails, { 'headers': this.headers });
  }

  saveJourneyFlow(journeyFlow: any): Observable<any> {
    return this.http.post(this.baseURL + 'save/journey', journeyFlow, { 'headers': this.headers });
  }

}
